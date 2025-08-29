export default defineNuxtRouteMiddleware((to, from) => {
	const user = useState('user');

	console.log(user);
	console.log(to.path);
	// 사용자가 로그인하지 않았고, 현재 경로가 /login이 아닌 경우
	if (!user.value && to.path !== '/login') {
		// /login 페이지로 리디렉션합니다.
		return navigateTo('/login');
	}

	// 사용자가 로그인했고, 현재 경로가 /login인 경우
	// (예: 로그인 후 뒤로 가기 버튼을 누른 경우)
	if (user.value && to.path === '/login') {
		// 메인 페이지('/')로 리디렉션합니다.
		return navigateTo('/');
	}
});
