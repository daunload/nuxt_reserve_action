<template>
	<div
		class="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900"
	>
		<UCard class="w-full max-w-sm">
			<div class="flex flex-col items-center mb-6">
				<h1 class="text-3xl font-bold text-center mb-2">
					Reserve Action
				</h1>
			</div>
			<UForm
				:state="state"
				:schema="schema"
				@submit="handleSubmit"
				class="flex flex-col"
			>
				<UButton class="w-full bg-white flex justify-center">
					<a href="/api/auth/google">구글 로그인</a>
				</UButton>
			</UForm>
		</UCard>
	</div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

definePageMeta({
	layout: 'login',
});

// Zod를 사용한 유효성 검사 스키마 정의
const schema = z.object({
	email: z.string().email('유효한 이메일을 입력해주세요.'),
	password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

type Schema = z.output<typeof schema>;

const state = reactive({
	email: '',
	password: '',
	rememberMe: false, // 로그인 상태 유지 추가
	showPassword: false, // 비밀번호 보이기/숨기기 추가
});

async function handleSubmit(event: FormSubmitEvent<Schema>) {
	// 로그인 로직 처리
	console.log('로그인 시도:', event.data);
	// 예: API 호출
	// const { data, error } = await useFetch('/api/login', {
	//   method: 'POST',
	//   body: event.data,
	// })
}
</script>

<style scoped>
/* Google 아이콘을 위한 기본 크기 조절 (Tailwind CSS에서 직접 제어 가능) */
</style>
