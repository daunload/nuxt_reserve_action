<template>
	<AppHeader></AppHeader>
	<div class="mt-8">
		<slot />
	</div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue';
</script>
