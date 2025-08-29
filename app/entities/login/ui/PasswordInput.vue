<template>
	<UInput
		v-model="password"
		placeholder="Password"
		:type="isShow ? 'text' : 'password'"
		:ui="{ trailing: 'pe-1' }"
	>
		<template #trailing>
			<UButton
				color="neutral"
				variant="link"
				size="sm"
				:icon="isShow ? 'i-lucide-eye-off' : 'i-lucide-eye'"
				:aria-label="isShow ? 'Hide password' : 'Show password'"
				:aria-pressed="isShow"
				aria-controls="password"
				@click="isShow = !isShow"
			/>
		</template>
	</UInput>
</template>

<script setup lang="ts">

const isShow = ref(false);
</script>

<style>
::-ms-reveal {
	display: none;
}
</style>
