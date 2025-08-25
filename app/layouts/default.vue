<template>
	<AppHeader></AppHeader>
	<UContainer>
		<div class="flex mt-8">
			<aside class="">
				<UNavigationMenu
					orientation="vertical"
					:items="items"
					class="data-[orientation=vertical]:w-48"
				/>
			</aside>
			<slot />
		</div>
	</UContainer>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import AppHeader from '~/components/AppHeader.vue';

const items = ref<NavigationMenuItem[][]>([
	[
		{
			label: '스케쥴 관리',
		},
		{
			label: '스케쥴 관리',
		},
		{
			label: '스케쥴 관리',
		},
		{
			label: '스케쥴 관리',
		},
		{
			label: '스케쥴 관리',
		},
	],
]);
</script>
