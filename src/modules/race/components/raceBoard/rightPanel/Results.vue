<template>
  <div class="results">
    <div class="results-header">
      <h3 class="results-title">
        {{ selectedRace ? `Round ${props.currentRoundIndex + 1} Results` : 'Race Results' }}
      </h3>
    </div>

    <div class="results-content">
      <div v-if="raceDay && selectedRace" class="results-list">
        <div v-if="roundResults && roundResults.length > 0">
          <ResultItem
            v-for="(result, index) in roundResults"
            :key="result.horseId"
            :result="result"
            :position="index + 1"
            :selected-race="selectedRace"
          />
        </div>

        <div v-else-if="selectedRace.status === 'running'" class="race-running">
          <p>Race in progress...</p>
        </div>

        <div v-else class="no-results">
          <p>No results yet</p>
        </div>
      </div>

      <div v-else class="no-race">
        <p>Select a race to view results</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RaceDay, RoundResult } from '../../../types/race'
import ResultItem from './results/ResultItem.vue'

defineOptions({
  name: 'RaceResults',
})

interface Props {
  raceDay: RaceDay | null
  selectedRaceIndex: number
  currentRoundIndex: number
}

const props = defineProps<Props>()

const selectedRace = computed(() => {
  if (!props.raceDay || props.selectedRaceIndex < 0) return null
  return props.raceDay.races[props.selectedRaceIndex] ?? null
})

const roundResults = computed((): RoundResult[] => {
  if (!selectedRace.value || props.currentRoundIndex < 0) return []

  const round = selectedRace.value.rounds[props.currentRoundIndex]
  return round?.results ?? []
})
</script>

<style scoped>
.results {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700;
}

.results-header {
  @apply px-4 py-3 border-b border-gray-200 dark:border-gray-700;
}

.results-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}

.results-content {
  @apply p-4;
}

.results-list {
  @apply space-y-2;
}

.race-running,
.no-results,
.no-race {
  @apply text-center py-8 text-gray-500 dark:text-gray-400;
}
</style>
