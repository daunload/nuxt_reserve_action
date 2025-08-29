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
			<UButton class="w-full bg-white flex justify-center">
				<a href="/api/auth/google">구글 로그인</a>
			</UButton>
		</UCard>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'login',
});
</script>
