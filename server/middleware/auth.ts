import { unsealData } from 'iron-session';
import { AppSession } from '~~/shared/types/session';

export default defineEventHandler(async (event) => {
	const sealedSession = getCookie(event, 'auth_session');

	if (!sealedSession) {
		event.context.user = undefined;
		return;
	}

	try {
		const config = useRuntimeConfig(event);
		const session = await unsealData<AppSession>(sealedSession, {
			password: config.SESSION_PASSWORD,
		});

		event.context.user = session.user;
	} catch (e) {
		event.context.user = undefined;
	}
});
