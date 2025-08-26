<template>
	<Popover v-model:open="isOpen">
		<PopoverTrigger as-child>
			<Button
				variant="outline"
				:class="
					cn(
						'w-[280px] justify-start text-left font-normal',
						!modelValue && 'text-muted-foreground',
					)
				"
			>
				<Clock class="mr-2 h-4 w-4" />
				{{ formattedTime }}
			</Button>
		</PopoverTrigger>

		<PopoverContent class="w-auto p-0" align="start">
			<div class="flex divide-x">
				<!-- 시간 선택 -->
				<div class="p-4">
					<div class="text-center">
						<div class="text-sm font-medium mb-2">시간</div>
						<div class="flex flex-col items-center space-y-2">
							<Button
								size="sm"
								variant="ghost"
								@click="updateTime('hours', 1)"
							>
								<ChevronUp class="h-4 w-4" />
							</Button>

							<div
								class="w-16 h-12 flex items-center justify-center bg-muted rounded-md"
							>
								<span class="text-2xl font-mono font-bold">
									{{ hours.toString().padStart(2, '0') }}
								</span>
							</div>

							<Button
								size="sm"
								variant="ghost"
								@click="updateTime('hours', -1)"
							>
								<ChevronDown class="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>

				<!-- 분 선택 -->
				<div class="p-4">
					<div class="text-center">
						<div class="text-sm font-medium mb-2">분</div>
						<div class="flex flex-col items-center space-y-2">
							<Button
								size="sm"
								variant="ghost"
								@click="updateTime('minutes', 1)"
							>
								<ChevronUp class="h-4 w-4" />
							</Button>

							<div
								class="w-16 h-12 flex items-center justify-center bg-muted rounded-md"
							>
								<span class="text-2xl font-mono font-bold">
									{{ minutes.toString().padStart(2, '0') }}
								</span>
							</div>

							<Button
								size="sm"
								variant="ghost"
								@click="updateTime('minutes', -1)"
							>
								<ChevronDown class="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div class="border-t p-3">
				<Button class="w-full" @click="confirmTime"> 확인 </Button>
			</div>
		</PopoverContent>
	</Popover>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Clock, ChevronUp, ChevronDown } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface Props {
	modelValue?: string;
	placeholder?: string;
}

interface Emits {
	(e: 'update:modelValue', value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
	placeholder: '시간을 선택하세요',
});

const emit = defineEmits<Emits>();

const isOpen = ref(false);
const hours = ref(9);
const minutes = ref(30);

watch(
	() => props.modelValue,
	(newValue) => {
		if (newValue) {
			const [h, m] = newValue.split(':').map(Number);
			hours.value = h ?? 0;
			minutes.value = m ?? 0;
		}
	},
	{ immediate: true },
);

const formattedTime = computed(() => {
	if (!props.modelValue) return props.placeholder;
	return `${hours.value.toString().padStart(2, '0')}:${minutes.value.toString().padStart(2, '0')}`;
});

const updateTime = (field: 'hours' | 'minutes', increment: number) => {
	if (field === 'hours') {
		let newHours = hours.value + increment;
		if (newHours > 23) newHours = 0;
		if (newHours < 0) newHours = 23;
		hours.value = newHours;
	} else {
		let newMinutes = minutes.value + increment;
		if (newMinutes > 59) newMinutes = 0;
		if (newMinutes < 0) newMinutes = 59;
		minutes.value = newMinutes;
	}
};

const confirmTime = () => {
	const timeString = `${hours.value.toString().padStart(2, '0')}:${minutes.value.toString().padStart(2, '0')}`;
	emit('update:modelValue', timeString);
	isOpen.value = false;
};
</script>
