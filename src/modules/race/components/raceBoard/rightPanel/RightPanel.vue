<template>
  <div class="right-panel">
    <!-- Date Selector -->
    <div class="date-section">
      <DaySelector :selected-date="selectedDate" @select-date="$emit('selectDate', $event)" />
    </div>

    <!-- Round Selector -->
    <div class="round-section">
      <RoundSelector
        :selected-race-index="selectedRaceIndex"
        :round-options="roundOptions"
        @select-race="$emit('selectRace', $event)"
      />
    </div>

    <!-- Program -->
    <div class="program-section">
      <Program :race-day="raceDay" :selected-race-index="selectedRaceIndex" />
    </div>

    <!-- Results -->
    <div class="results-section">
      <Results :race-day="raceDay" :selected-race-index="selectedRaceIndex" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AppOption } from '@/lib/types/option'
import type { RaceDay } from '../../../types/race'
import DaySelector from './daySelector/DaySelector.vue'
import Program from './program/Program.vue'
import Results from './results/Results.vue'
import RoundSelector from './roundSelector/RoundSelector.vue'

interface Props {
  raceDay: RaceDay | null
  selectedRaceIndex: number
  roundOptions: AppOption[]
  selectedDate: string
}

defineProps<Props>()

defineEmits<{
  selectRace: [index: number]
  selectDate: [date: string]
}>()
</script>

<style scoped>
.right-panel {
  width: 320px;
  background-color: #f3f4f6;
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow-x: hidden;
}

.date-section {
  flex-shrink: 0;
  padding: 16px 16px 0 16px;
  background-color: #e5e7eb;
  border-bottom: 1px solid var(--border);
}

.round-section {
  flex-shrink: 0;
  padding: 16px;
  background-color: #e5e7eb;
  border-bottom: 1px solid var(--border);
}

.program-section {
  flex: 1;
  overflow: hidden;
}

.results-section {
  flex: 1;
  overflow: hidden;
}
</style>
