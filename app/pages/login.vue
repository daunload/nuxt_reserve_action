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
				<UFormGroup label="이메일 주소" name="email" class="mb-4">
					<UInput
						v-model="state.email"
						placeholder="이메일을 입력하세요"
						icon="i-heroicons-envelope"
						size="lg"
						class="w-full"
					/>
				</UFormGroup>

				<UFormGroup label="비밀번호" name="password" class="mb-4">
					<UInput
						v-model="state.password"
						class="w-full"
						type="password"
						placeholder="비밀번호를 입력하세요"
						icon="i-heroicons-lock-closed"
						size="lg"
						:ui="{ icon: { trailing: { pointer: '' } } }"
					>
						<template #trailing>
							<UButton
								variant="link"
								color="gray"
								:icon="
									state.showPassword
										? 'i-heroicons-eye-slash'
										: 'i-heroicons-eye'
								"
								:padded="false"
								@click="
									state.showPassword = !state.showPassword
								"
							/>
						</template>
					</UInput>
				</UFormGroup>

				<div class="flex justify-between items-center mb-6">
					<UCheckbox
						v-model="state.rememberMe"
						label="로그인 상태 유지"
					/>
					<ULink
						to="/forgot-password"
						class="text-sm text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
					>
						비밀번호 찾기
					</ULink>
				</div>

				<UButton
					type="submit"
					block
					size="lg"
					icon="i-heroicons-arrow-right"
					trailing
					class="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
				>
					로그인
				</UButton>
			</UForm>

			<template #footer>
				<p
					class="text-center text-sm text-gray-500 dark:text-gray-400 mt-6"
				>
					아직 계정이 없으신가요?
					<ULink
						to="/signup"
						class="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 ml-1"
					>
						회원가입
					</ULink>
				</p>
			</template>
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
