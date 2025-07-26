<template>
  <div class="toolbar">
    <div class="toolbar-left">
      <div v-if="raceDaySummary?.venue" class="venue-info">
        <h2 class="venue-name">{{ raceDaySummary.venue.name }}</h2>
        <div class="venue-details">
          <span class="venue-location">{{ raceDaySummary.venue.location }}</span>
          <span class="venue-capacity"
            >{{ raceDaySummary.venue.capacity.toLocaleString() }} capacity</span
          >
        </div>
      </div>
    </div>

    <div class="toolbar-right">
      <div v-if="raceDaySummary?.weather" class="weather-info">
        <span class="weather-icon">{{ getWeatherIcon(raceDaySummary.weather) }}</span>
        <span class="weather-text">{{ raceDaySummary.weather }}</span>
      </div>

      <AppDatePicker
        name="dashboard-day"
        :model-value="selectedDate"
        placeholder="Choose date"
        @update:model-value="$emit('selectDate', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppDatePicker from '@/lib/components/ui/input/AppDatePicker.vue'
import type { DashboardRaceDaySummary } from '../types'

defineOptions({
  name: 'DashboardToolbar',
})

interface Props {
  selectedDate: string
  raceDaySummary: DashboardRaceDaySummary | null
}

defineProps<Props>()

defineEmits<{
  selectDate: [date: string]
}>()

/**
 * Get weather icon based on weather condition
 */
const getWeatherIcon = (weather: string): string => {
  switch (weather) {
    case 'sunny':
      return '☀️'
    case 'cloudy':
      return '☁️'
    case 'rainy':
      return '🌧️'
    case 'snowy':
      return '❄️'
    case 'foggy':
      return '🌫️'
    case 'windy':
      return '💨'
    default:
      return '🌤️'
  }
}
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: var(--card);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.venue-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.venue-name {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--foreground);
}

.venue-details {
  display: flex;
  gap: 12px;
  font-size: 11px;
  color: var(--muted-foreground);
}

.weather-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--muted-foreground);
}

.weather-icon {
  font-size: 14px;
}

.weather-text {
  text-transform: capitalize;
}
</style>
