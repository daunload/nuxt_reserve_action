export default defineEventHandler((event) => {
	deleteCookie(event, 'auth_session', {
		httpOnly: true,
		path: '/',
	});

	return { message: 'Logged out' };
});
