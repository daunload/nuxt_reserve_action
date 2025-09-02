<template>
	<UTable
		:data="items"
		:columns="scheduleColumn"
		ref="table"
		@update:row-selection="onUpdate"
	/>
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue';
import type { TableColumn } from '@nuxt/ui';
import type { ScheduleDocument } from '~~/server/models/schedule.model';

defineProps<{
	items: ScheduleDocument[];
}>();

const emit = defineEmits<{
	(e: 'select-item', items: ScheduleDocument[]): void;
}>();

const UBadge = resolveComponent('UBadge');
const UCheckbox = resolveComponent('UCheckbox');

const scheduleColumn: TableColumn<ScheduleDocument>[] = [
	{
		id: 'select',
		header: ({ table }) =>
			h(UCheckbox, {
				modelValue: table.getIsSomePageRowsSelected()
					? 'indeterminate'
					: table.getIsAllPageRowsSelected(),
				'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
					table.toggleAllPageRowsSelected(!!value),
				'aria-label': 'Select all',
			}),
		cell: ({ row }) =>
			h(UCheckbox, {
				modelValue: row.getIsSelected(),
				'onUpdate:modelValue': (value: boolean | 'indeterminate') => {
					row.toggleSelected(!!value);
				},
				'aria-label': 'Select row',
			}),
		enableSorting: false,
		enableHiding: false,
		enableColumnFilter: false,
	},
	{
		accessorKey: '_id',
		header: 'Id',
		cell: ({ row }) => `#${row.getValue('_id')}`,
	},
	{
		accessorKey: 'title',
		header: 'Title',
		cell: ({ row }) => `${row.getValue('title')}`,
	},
	{
		accessorKey: 'branch',
		header: 'Branch',
		cell: ({ row }) => `${row.getValue('branch')}`,
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
		header: 'Created',
		cell: ({ row }) =>
			`${new Date(row.getValue('createdAt')).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`,
	},
	{
		accessorKey: 'action_date',
		header: 'Action',
		cell: ({ row }) =>
			`${new Date(row.getValue('action_date')).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`,
	},
];

const table = useTemplateRef('table');
const onUpdate = () => {
	if (!table.value) return;

	const selectedItems = table.value.tableApi
		.getFilteredSelectedRowModel()
		.rows.map((row) => row.original);

	emit('select-item', selectedItems);
};
</script>
