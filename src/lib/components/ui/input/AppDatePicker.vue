<template>
  <div class="relative">
    <label v-if="label" :for="name" class="block text-sm font-medium text-foreground mb-2">
      {{ label }}
    </label>

    <div class="relative">
      <input
        :id="name"
        :name="name"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        type="text"
        readonly
        class="w-full px-3 py-2 bg-white text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        @click="toggleCalendar"
        @focus="toggleCalendar"
      />

      <button
        type="button"
        class="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
        @click="toggleCalendar"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>

    <!-- Calendar Popup -->
    <div
      v-if="isOpen"
      class="absolute z-50 mt-1 w-full bg-white dark:bg-slate-900 text-foreground border border-border rounded-md shadow-lg"
      @click.stop
    >
      <!-- Calendar Header -->
      <div class="flex items-center justify-between p-3 border-b border-border">
        <button type="button" class="p-1 hover:bg-muted rounded-md" @click="previousMonth">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <h3 class="text-sm font-medium text-foreground">
          {{ currentMonthYear }}
        </h3>

        <button type="button" class="p-1 hover:bg-muted rounded-md" @click="nextMonth">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <!-- Calendar Grid -->
      <div class="p-3">
        <!-- Day Headers -->
        <div class="grid grid-cols-7 gap-1 mb-2">
          <div
            v-for="day in weekDays"
            :key="day"
            class="text-xs font-medium text-muted-foreground text-center py-1"
          >
            {{ day }}
          </div>
        </div>

        <!-- Calendar Days -->
        <div class="grid grid-cols-7 gap-1">
          <div v-for="day in calendarDays" :key="day.key" class="relative">
            <button
              v-if="day.date"
              type="button"
              :class="[
                'w-full h-8 text-sm rounded-md transition-colors',
                day.isCurrentMonth ? 'text-foreground' : 'text-muted-foreground',
                day.isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
                day.isToday ? 'ring-2 ring-primary ring-offset-1' : '',
              ]"
              @click="selectDate(day.date)"
            >
              {{ day.day }}
            </button>
          </div>
        </div>
      </div>

      <!-- Today Button -->
      <div class="p-3 border-t border-border">
        <button
          type="button"
          class="w-full px-3 py-2 text-sm text-primary hover:bg-primary/10 rounded-md transition-colors"
          @click="selectToday"
        >
          Today
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, onMounted, onUnmounted, ref } from 'vue'

interface Props {
  name: string
  modelValue?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  minDate?: string
  maxDate?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select date',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// State
const isOpen = ref(false)
const currentDate = ref(dayjs())
const selectedDate = ref(props.modelValue ? dayjs(props.modelValue) : null)

// Computed
const displayValue = computed(() => {
  return selectedDate.value ? selectedDate.value.format('YYYY-MM-DD') : ''
})

const currentMonthYear = computed(() => {
  return currentDate.value.format('MMMM YYYY')
})

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const calendarDays = computed(() => {
  const startOfMonth = currentDate.value.startOf('month')
  const endOfMonth = currentDate.value.endOf('month')
  const startOfCalendar = startOfMonth.startOf('week')
  const endOfCalendar = endOfMonth.endOf('week')

  const days = []
  let current = startOfCalendar

  while (current.isBefore(endOfCalendar) || current.isSame(endOfCalendar, 'day')) {
    days.push({
      key: current.format('YYYY-MM-DD'),
      date: current.format('YYYY-MM-DD'),
      day: current.date(),
      isCurrentMonth: current.month() === currentDate.value.month(),
      isSelected: selectedDate.value?.isSame(current, 'day') ?? false,
      isToday: current.isSame(dayjs(), 'day'),
    })
    current = current.add(1, 'day')
  }

  return days
})

// Methods
const toggleCalendar = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const selectDate = (date: string) => {
  selectedDate.value = dayjs(date)
  emit('update:modelValue', date)
  isOpen.value = false
}

const selectToday = () => {
  const today = dayjs().format('YYYY-MM-DD')
  selectDate(today)
}

const previousMonth = () => {
  currentDate.value = currentDate.value.subtract(1, 'month')
}

const nextMonth = () => {
  currentDate.value = currentDate.value.add(1, 'month')
}

// Click outside to close
const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
