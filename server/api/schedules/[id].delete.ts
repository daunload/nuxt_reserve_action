import {
	defineEventHandler,
	getRouterParam,
	createError,
	setResponseStatus,
} from 'h3';
import { z } from 'zod';
import { removeSchedule } from '../../services/schedule.service';
import { zObjectId } from '~~/server/utils/validator';

const ParamsSchema = z.object({ id: zObjectId });

export default defineEventHandler(async (event) => {
	const parsed = ParamsSchema.safeParse({ id: getRouterParam(event, 'id') });

	if (!parsed.success) {
		const msg = parsed.error.issues[0]?.message ?? 'Bad Request';
		throw createError({ statusCode: 400, statusMessage: msg });
	}

	const ok = await removeSchedule(parsed.data.id);
	if (!ok)
		throw createError({
			statusCode: 404,
			statusMessage: 'Schedule not found',
		});

	setResponseStatus(event, 204);
	return null;
});
