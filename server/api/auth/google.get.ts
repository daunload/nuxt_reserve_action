export default defineEventHandler(async (event) => {
	// Google OAuth 2.0 인증 페이지 URL 생성
	const googleAuthURL = new URL(
		'https://accounts.google.com/o/oauth2/v2/auth',
	);

	const config = useRuntimeConfig(event);

	googleAuthURL.searchParams.set('response_type', 'code');
	googleAuthURL.searchParams.set('client_id', config.GOOGLE_CLIENT_ID);
	googleAuthURL.searchParams.set(
		'redirect_uri',
		`${getRequestURL(event).origin}/api/auth/callback`,
	);
	googleAuthURL.searchParams.set(
		'scope',
		[
			'https://www.googleapis.com/auth/userinfo.email',
			'https://www.googleapis.com/auth/userinfo.profile',
		].join(' '),
	);
	googleAuthURL.searchParams.set('access_type', 'offline');
	googleAuthURL.searchParams.set('prompt', 'consent');

	// 생성된 URL로 사용자를 리디렉션
	await sendRedirect(event, googleAuthURL.toString());
});
