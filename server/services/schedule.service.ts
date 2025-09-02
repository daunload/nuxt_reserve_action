import { isValidObjectId, startSession } from 'mongoose';
import { ScheduleModel } from '../models/schedule.model';
import AppError from '../utils/errors';
import { ScheduleJobService } from './scheduleJob.service';
import { WorkflowService } from './workflow.service';

/**
 * 스케줄 초기화
 */
const initSchedule = async () => {
	const schedules = await ScheduleModel.find({}).lean();

	for (const schedule of schedules) {
		if (Date.now() > new Date(schedule.action_date).getTime()) {
			await ScheduleModel.updateOne(
				{ _id: schedule._id },
				{ $set: { is_done: true } },
			);
		} else {
			ScheduleJobService.create(
				schedule._id.toString(),
				schedule.action_date,
				() => {
					doneSchedule(schedule._id.toString());
					WorkflowService.triggerWorkflow('stage');
				},
			);
		}
	}

	return;
};

/**
 * 모든 스케줄 조회
 */
const getAllSchedule = async () => {
	return ScheduleModel.find().sort({ action_date: 1 }).lean();
};

/**
 * 스케줄 생성
 */
const createSchedule = async (
	title: string,
	actionDate: string,
	branch: string,
) => {
	const session = await startSession();
	session.startTransaction();

	try {
		const schedule = await ScheduleModel.create(
			[
				{
					title: title,
					action_date: actionDate,
					branch: branch,
				},
			],
			{ session },
		);

		const newSchedule = schedule[0];

		if (!newSchedule) throw new Error('스케쥴 생성 실패');

		ScheduleJobService.create(
			newSchedule._id.toString(),
			actionDate,
			() => {
				doneSchedule(newSchedule._id.toString());
				WorkflowService.triggerWorkflow(branch);
			},
		);

		await session.commitTransaction();
		return newSchedule.toObject();
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
};

/**
 * 스케줄 종료
 */
const doneSchedule = async (id: string) => {
	if (!isValidObjectId(id)) {
		throw new AppError('유효하지 않은 ObjectId입니다.', 400);
	}

	const updatedSchedule = await ScheduleModel.findByIdAndUpdate(
		id, // Schedule ID
		{ is_done: true },
		{ new: true }, // Update the document with the latest changes.
	).lean();

	if (!updatedSchedule) {
		throw new AppError('상태를 업데이트할 스케줄이 없습니다.', 404);
	}

	return updatedSchedule;
};

/**
 * 스케줄 지우기
 */
const removeSchedule = async (id: string) => {
	if (!isValidObjectId(id)) {
		throw new AppError('유효하지 않은 ObjectId입니다.', 400);
	}

	const deletedSchedule = await ScheduleModel.findByIdAndDelete(id).lean();

	if (deletedSchedule && !deletedSchedule.is_done)
		ScheduleJobService.remove(id);

	return deletedSchedule;
};

export {
	initSchedule,
	getAllSchedule,
	createSchedule,
	doneSchedule,
	removeSchedule,
};
