<script setup lang="ts">
import type { ApiResponse } from '#shared/types/api';
import { type Schedule } from '~~/server/models/schedule.model';
import { h, resolveComponent } from 'vue';
import type { TableColumn } from '@nuxt/ui';

const { data, pending, error } =
	await useFetch<ApiResponse<Schedule[]>>('/api/schedules');

interface ScheduleColumn {
	title: string;
	status: 'pending' | 'done';
	created: string;
	action: string;
}

const UBadge = resolveComponent('UBadge');
const scheduleColumn: TableColumn<ScheduleColumn>[] = [
	{
		accessorKey: '_id',
		header: '#',
		cell: ({ row }) => `#${row.getValue('_id')}`,
	},
	{
		accessorKey: 'title',
		header: 'Title',
		cell: ({ row }) => `#${row.getValue('title')}`,
	},
	{
		accessorKey: 'is_done',
		header: 'Status',
		cell: ({ row }) => {
			const color = {
				true: 'neutral' as const,
				false: 'success' as const,
			}[row.getValue('is_done') as string];

			return h(
				UBadge,
				{ class: 'capitalize', variant: 'subtle', color },
				() => (row.getValue('is_done') ? 'done' : 'pending'),
			);
		},
	},
	{
		accessorKey: 'createdAt',
		header: 'created',
	},
	{
		accessorKey: 'action_date',
		header: 'action',
	},
];
</script>

<template>
	<div v-if="pending">No data</div>
	<UTable v-else :data="data.data" :columns="scheduleColumn" class="flex-1" />
</template>
