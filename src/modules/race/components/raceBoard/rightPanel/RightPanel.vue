<template>
  <div class="right-panel">
    <!-- Program -->
    <div class="program-section">
      <Program
        :race-day="raceDay"
        :selected-race-index="selectedRaceIndex"
        @select-race="$emit('selectRace', $event)"
      />
    </div>

    <!-- Results -->
    <div class="results-section">
      <Results
        :race-day="raceDay"
        :selected-race-index="selectedRaceIndex"
        :current-round-index="currentRoundIndex"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RaceDay } from '../../../types/'
import Program from './program/Program.vue'
import Results from './results/Results.vue'

interface Props {
  raceDay: RaceDay | null
  selectedRaceIndex: number
  currentRoundIndex: number
}

defineProps<Props>()

defineEmits<{
  selectRace: [index: number]
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
