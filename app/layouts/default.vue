<template>
	<div class="default">
		<AppHeader></AppHeader>
		<UContainer>
			<div class="flex">
				<UNavigationMenu
					orientation="vertical"
					:items="items"
					class="data-[orientation=vertical]:w-48 mt-4"
				/>
				<slot />
			</div>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue';
import type { NavigationMenuItem } from '@nuxt/ui';
import { UContainer } from '#components';

const items = ref<NavigationMenuItem[][]>([
	[
		{
			label: '스케쥴 관리',
			children: [
				{
					label: '스케쥴 현황',
					to: '/schedules/list',
				},
				{
					label: '스케쥴 추가',
					to: '/schedules/add',
				},
			],
		},
	],
]);
</script>
