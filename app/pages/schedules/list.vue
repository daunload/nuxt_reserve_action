<script setup lang="ts">
import type { ApiResponse } from '#shared/types/api';
import type { ScheduleDocument } from '~~/server/models/schedule.model';
import { UButton } from '#components';
import ScheduleTable from '~/entities/schedule/ui/ScheduleTable.vue';

const allSchedule = ref<ScheduleDocument[]>([]);
onBeforeMount(() => {
	refreshSchedules();
});

const refreshSchedules = async () => {
	const response =
		await $fetch<ApiResponse<ScheduleDocument[]>>('/api/schedules');

	if (response.success) allSchedule.value = response.data;
};

const selectedSchedules = ref<ScheduleDocument[]>([]);
const onSelectSchedule = (schedules: ScheduleDocument[]) => {
	selectedSchedules.value = schedules;
};

const removeSchedule = async () => {
	if (!selectedSchedules.value) return;

	await Promise.all(
		selectedSchedules.value.map(async (schedule) => {
			await $fetch(`/api/schedules/${schedule._id}`, {
				method: 'DELETE',
			});
		}),
	);

	refreshSchedules();
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
			:items="allSchedule as ScheduleDocument[]"
			@select-item="onSelectSchedule"
		></ScheduleTable>
	</div>
</template>
