import { defineEventHandler, createError } from 'h3';
import { createSchedule } from '../../services/schedule.service';
import { z } from 'zod';

const ScheduleParamsSchema = z.object({
	title: z.string().trim().min(1, 'title is required'),
	action_date: z
		.string()
		.refine(
			(v) => v === undefined || !Number.isNaN(Date.parse(v)),
			'invalid action_date',
		)
		.min(1, 'action_date is required'),
});

export type ScheduleParams = z.infer<typeof ScheduleParamsSchema>;

export default defineEventHandler(async (event) => {
	const params = {
		title: getRouterParam(event, 'title'),
		action_date: getRouterParam(event, 'action_date'),
	};

	const parsed = ScheduleParamsSchema.safeParse(params);
	if (!parsed.success) {
		const msg = parsed.error.issues.map((i) => i.message).join(', ');
		throw createError({
			statusCode: 400,
			statusMessage: msg || 'Invalid params',
		});
	}

	const { title, action_date } = parsed.data;

	try {
		const schedule = await createSchedule(title, action_date);
		setResponseStatus(event, 201);

		return { success: true, data: schedule };
	} catch (error: any) {
		throw createError({
			statusCode: 500,
			statusMessage:
				error?.message ?? '스케줄 생성 중 오류가 발생했습니다',
		});
	}
});
