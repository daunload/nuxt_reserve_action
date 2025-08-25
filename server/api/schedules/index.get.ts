import { defineEventHandler, createError } from 'h3';
import { getAllSchedule } from '../../services/schedule.service';

export default defineEventHandler(async (event) => {
	try {
		const schedules = await getAllSchedule();
		setResponseStatus(event, 201);

		return { success: true, data: schedules };
	} catch (error: any) {
		throw createError({
			statusCode: 500,
			statusMessage:
				error?.message ?? '스케줄 조회 중 오류가 발생했습니다',
		});
	}
});
