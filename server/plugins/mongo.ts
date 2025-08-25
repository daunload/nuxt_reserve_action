import { connectDatabase } from '../db/mongoose';
import { initSchedule } from '../services/schedule.service';

export default defineNitroPlugin(async () => {
	await connectDatabase();

	await initSchedule();
});
