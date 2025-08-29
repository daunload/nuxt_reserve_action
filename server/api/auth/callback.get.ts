import { sealData } from 'iron-session';

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);
	const { code } = getQuery(event);

	if (!code) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Authorization code is missing.',
		});
	}

	const tokenResponse: any = await $fetch(
		'https://oauth2.googleapis.com/token',
		{
			method: 'POST',
			body: {
				code,
				client_id: config.GOOGLE_CLIENT_ID,
				client_secret: config.GOOGLE_CLIENT_SECRET,
				redirect_uri: `${getRequestURL(event).origin}/api/auth/callback`,
				grant_type: 'authorization_code',
			},
		},
	);

	const accessToken = tokenResponse.access_token;

	const userInfo: any = await $fetch(
		'https://www.googleapis.com/oauth2/v2/userinfo',
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	);

	const sessionData = {
		user: {
			name: userInfo.name,
			email: userInfo.email,
			picture: userInfo.picture,
		},
	};

	const sealedSession = await sealData(sessionData, {
		password: config.SESSION_PASSWORD,
	});

	setCookie(event, 'auth_session', sealedSession, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 7, // 1주일
		path: '/',
	});

	await sendRedirect(event, '/');
});
