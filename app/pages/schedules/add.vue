<template>
	<UContainer class="p-10 flex gap-4 flex-col">
		<UFormField label="Title" required>
			<UInput v-model="scheduleTitle" />
		</UFormField>

		<UFormField label="Date" required>
			<Popover>
				<PopoverTrigger as-child>
					<Button
						variant="outline"
						:class="
							cn(
								'w-[280px] justify-start text-left font-normal',
								!actionDate && 'text-muted-foreground',
							)
						"
					>
						<CalendarIcon class="mr-2 h-4 w-4" />
						{{ calendarText }}
					</Button>
				</PopoverTrigger>
				<PopoverContent class="w-auto p-0">
					<Calendar v-model="actionDate" initial-focus />
				</PopoverContent>
			</Popover>
		</UFormField>
		<UFormField label="Time" required>
			<TimePicker
				v-model="actionTime"
				placeholder="시간을 선택하세요"
			></TimePicker>
		</UFormField>
		<UButton
			class="w-fit"
			active
			color="neutral"
			variant="outline"
			active-color="primary"
			active-variant="solid"
			@click="addSchedule"
		>
			생성
		</UButton>
	</UContainer>
</template>

<script lang="ts" setup>
import type { DateValue } from '@internationalized/date';
import { DateFormatter, getLocalTimeZone } from '@internationalized/date';
import { CalendarIcon } from 'lucide-vue-next';
import TimePicker from '~/components/TimePicker.vue';
import { ref } from 'vue';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { toLocalISOString } from '~~/server/utils/day';

const df = new DateFormatter('en-US', {
	dateStyle: 'long',
});

const scheduleTitle = ref('');
const actionDate = ref<DateValue>();
const calendarText = computed(() => {
	return actionDate.value
		? df.format(actionDate.value.toDate(getLocalTimeZone()))
		: 'Pick a date';
});
const actionTime = ref('09:00');

const addSchedule = async () => {
	if (!scheduleTitle.value) return;
	if (!actionDate.value) return;
	if (!actionTime.value) return;

	const date = new Date(
		`${df.format(actionDate.value.toDate(getLocalTimeZone()))} ${actionTime.value}`,
	);

	const response = await $fetch('/api/schedules', {
		method: 'post',
		params: {
			title: scheduleTitle.value,
			action_date: toLocalISOString(date),
		},
	});

	if (response.success) {
		console.log(response.data);
		await navigateTo('/schedules/list');
	} else {
		console.log(response);
	}
};
</script>

<style></style>
