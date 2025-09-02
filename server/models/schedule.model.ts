import {
	type HydratedDocument,
	type InferSchemaType,
	model,
	Schema,
} from 'mongoose';

const scheduleSchema = new Schema(
	{
		title: { type: String, required: true },
		action_date: { type: Date, required: true, unique: true },
		branch: { type: String, required: true },
		is_done: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	},
);

export type Schedule = InferSchemaType<typeof scheduleSchema>;
export type ScheduleDocument = HydratedDocument<Schedule>;
export const ScheduleModel = model<Schedule>('schedule', scheduleSchema);
