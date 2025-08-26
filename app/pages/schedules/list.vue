<script setup lang="ts">
import type { ApiResponse } from '#shared/types/api';
import type { ScheduleDocument } from '~~/server/models/schedule.model';
import { UButton } from '#components';
import ScheduleTable from '~/entities/schedule/ui/ScheduleTable.vue';

const { data } =
	await useFetch<ApiResponse<ScheduleDocument[]>>('/api/schedules');

const selectedSchedules = ref<ScheduleDocument[]>([]);
const onSelectSchedule = (schedules: ScheduleDocument[]) => {
	selectedSchedules.value = schedules;
};

const removeSchedule = async () => {
	if (!selectedSchedules.value) return;

	// TODO - 삭제 기능 추가
	const responseList = await Promise.all(
		selectedSchedules.value.map(async (schedule) => {
			await useFetch(`/api/schedules/${schedule._id}`, {
				method: 'DELETE',
			});
		}),
	);

	console.log(responseList);
};
</script>

<template>
	<div class="">
		<div class="flex gap-2 mb-4">
			<UButton
				v-if="selectedSchedules.length > 0"
				color="error"
				@click="removeSchedule"
			>
				{{ '삭제' }}
			</UButton>
		</div>
		<ScheduleTable
			v-if="data && data.success"
			:items="data.data"
			@select-item="onSelectSchedule"
		></ScheduleTable>
	</div>
</template>
