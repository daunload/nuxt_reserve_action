<script setup lang="ts">
import type { ApiResponse } from '#shared/types/api';
import { type Schedule } from '~~/server/models/schedule.model';
import type { NavigationMenuItem } from '@nuxt/ui';
import { UContainer, UButton } from '#components';
import ScheduleTable from '~/entities/schedule/ui/ScheduleTable.vue';

const { data } = await useFetch<ApiResponse<Schedule[]>>('/api/schedules');

const items = ref<NavigationMenuItem[][]>([
	[
		{
			label: '스케쥴 관리',
		},
	],
]);

const selectedSchedules = ref<Schedule[]>([]);
const onSelectSchedule = (schedules: Schedule[]) => {
	selectedSchedules.value = schedules;
};

const removeSchedule = () => {
	if (!selectedSchedules.value) return;

	// TODO - 삭제 기능 추가
};
</script>

<template>
	<UContainer>
		<div class="flex">
			<UNavigationMenu
				orientation="vertical"
				:items="items"
				class="data-[orientation=vertical]:w-48"
			/>
			<div class="">
				<div class="flex gap-2 mb-4">
					<UButton color="success">
						{{ '추가' }}
					</UButton>
					<UButton
						v-if="selectedSchedules.length > 0"
						color="error"
						@click="removeSchedule"
					>
						{{ '삭제' }}
					</UButton>
				</div>
				<ScheduleTable
					v-if="data?.success"
					:items="data.data"
					@select-item="onSelectSchedule"
				></ScheduleTable>
			</div>
		</div>
	</UContainer>
</template>
