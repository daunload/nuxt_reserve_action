import { type UserSession } from '#imports';

export default defineNuxtPlugin(() => {
	const user = useState<UserSession | null>('user', () => null);

	if (import.meta.server) {
		const event = useRequestEvent();
		user.value = event?.context.user || null;
	}
});
