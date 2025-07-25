<template>
  <div class="results">
    <div class="results-header">
      <h3 class="results-title">Race Results</h3>
    </div>

    <div class="results-content">
      <div v-if="raceDay && selectedRace" class="results-list">
        <div v-if="selectedRace.results.length > 0">
          <ResultItem
            v-for="(result, index) in selectedRace.results"
            :key="result.horseId"
            :result="result"
            :position="index + 1"
          />
        </div>

        <div v-else-if="selectedRace.status === 'in-progress'" class="race-running">
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
import type { RaceDay } from '../../../../types/race'
import ResultItem from './ResultItem.vue'

defineOptions({
  name: 'RaceResults',
})

interface Props {
  raceDay: RaceDay | null
  selectedRaceIndex: number
}

const props = defineProps<Props>()

const selectedRace = computed(() => {
  if (!props.raceDay) return null
  return props.raceDay.races[props.selectedRaceIndex] ?? null
})
</script>

<style scoped>
.results {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.results-header {
  padding: 16px;
  background-color: #e5e7eb;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.results-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--foreground);
}

.results-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.race-running,
.no-results,
.no-race {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--muted-foreground);
  font-size: 14px;
}
</style>
