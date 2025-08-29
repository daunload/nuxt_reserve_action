<template>
	<header
		class="bg-default/75 backdrop-blur border-b border-default h-(--ui-header-height) sticky top-0 z-50"
	>
		<nav
			class="mx-auto max-w-screen-xl h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between"
		>
			<NuxtLink to="/" class="flex items-center gap-2">
				<span class="font-semibold text-gray-900 dark:text-gray-100">
					ReserveAction
				</span>
			</NuxtLink>

			<!-- Actions (Desktop) -->
			<div class="hidden lg:flex items-center gap-3">
				<button
					type="button"
					@click="toggleDark()"
					class="inline-flex items-center justify-center rounded-md border border-gray-300/60 dark:border-gray-700/60 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
					:aria-pressed="isDark"
					aria-label="테마 전환"
					title="테마 전환"
				>
					<span v-if="!isDark">다크</span>
					<span v-else>라이트</span>
				</button>
				<UButton
					v-if="user"
					@click="logout"
					class="rounded-md bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
				>
					로그아웃
				</UButton>
				<NuxtLink
					v-else
					to="/login"
					class="rounded-md bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
				>
					로그인
				</NuxtLink>
				<UAvatar v-if="user" :src="user.picture" />
			</div>

			<!-- Mobile menu button -->
			<button
				class="lg:hidden p-2 rounded-md border border-gray-300/60 dark:border-gray-700/60 text-gray-700 dark:text-gray-200"
				@click="isOpen = !isOpen"
				:aria-expanded="isOpen"
				aria-controls="primary-nav"
				aria-label="메뉴 토글"
			>
				<svg
					v-if="!isOpen"
					viewBox="0 0 24 24"
					class="size-6"
					aria-hidden="true"
				>
					<path fill="currentColor" d="M3 6h18M3 12h18M3 18h18" />
				</svg>
				<svg
					v-else
					viewBox="0 0 24 24"
					class="size-6"
					aria-hidden="true"
				>
					<path fill="currentColor" d="M6 6l12 12M6 18L18 6" />
				</svg>
			</button>
		</nav>

		<!-- Mobile nav -->
		<transition name="fade">
			<div
				v-if="isOpen"
				class="lg:hidden border-t border-gray-200/60 dark:border-gray-800/60"
			>
				<div class="px-4 pb-4 flex items-center gap-3">
					<button
						type="button"
						@click="toggleDark()"
						class="inline-flex items-center justify-center rounded-md border border-gray-300/60 dark:border-gray-700/60 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
						:aria-pressed="isDark"
					>
						<span v-if="!isDark">다크</span>
						<span v-else>라이트</span>
					</button>
					<UButton
						v-if="user"
						class="rounded-md bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-500"
						@click="logout"
					>
						로그아웃
					</UButton>
					<NuxtLink
						v-else
						to="/login"
						class="rounded-md bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-500"
						@click="close()"
					>
						로그인
					</NuxtLink>
				</div>
			</div>
		</transition>
	</header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from '#imports';

const isOpen = ref(false);
const isDark = ref(false);

function close() {
	isOpen.value = false;
}

function applyTheme(next: 'light' | 'dark') {
	document.documentElement.classList.toggle('dark', next === 'dark');
	localStorage.setItem('theme', next);
	isDark.value = next === 'dark';
}

function toggleDark() {
	applyTheme(isDark.value ? 'light' : 'dark');
}

onMounted(() => {
	const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
	const prefersDark = window.matchMedia(
		'(prefers-color-scheme: dark)',
	).matches;
	applyTheme(saved ?? (prefersDark ? 'dark' : 'light'));
});

const user = useState<UserSession | null>('user');

const logout = async () => {
	await $fetch('/api/auth/logout', { method: 'POST' });
	user.value = null;
	await navigateTo('/login');
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
