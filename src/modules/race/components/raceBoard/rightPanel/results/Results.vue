<template>
  <div class="results">
    <div class="results-header">
      <h3 class="results-title">
        {{ selectedRace ? `Race ${selectedRace.raceNumber} Results` : 'Race Results' }}
      </h3>
      <p v-if="selectedRace" class="results-subtitle">
        {{ selectedRace.name }}
      </p>
    </div>

    <div class="results-content">
      <div v-if="raceDay && selectedRace" class="results-list">
        <!-- Show all completed rounds and current running round -->
        <div
          v-for="roundIndex in visibleRounds"
          :key="roundIndex"
          class="round-section"
          data-testid="round-progress"
        >
          <div class="round-header">
            <h4 class="round-title" data-testid="current-round">
              Round {{ roundIndex + 1 }} (<span data-testid="round-distance"
                >{{ getRoundDistance(roundIndex) }}m</span
              >)
            </h4>
          </div>

          <!-- Round in progress -->
          <div v-if="isRoundRunning(roundIndex)" class="round-running">
            <Loader text="In progress..." size="sm" />
          </div>

          <!-- Round completed - show results -->
          <div
            v-else-if="getRoundResults(roundIndex).length > 0"
            class="round-results"
            data-testid="race-results"
          >
            <!-- Column headers -->
            <div class="results-header-row">
              <div class="col-position">Pos</div>
              <div class="col-name">Name</div>
              <div class="col-time">Time</div>
            </div>

            <!-- Results list -->
            <div class="results-body">
              <ResultItem
                v-for="(result, index) in getRoundResults(roundIndex)"
                :key="result.horseId"
                :result="result"
                :position="index + 1"
                :selected-race="selectedRace"
              />
            </div>
          </div>

          <!-- Round not started yet -->
          <div v-else class="round-pending">
            <p class="text-gray-400 text-sm">Not started</p>
          </div>
        </div>

        <!-- No rounds visible yet -->
        <div v-if="visibleRounds.length === 0" class="no-rounds">
          <p>Race has not started yet</p>
        </div>
      </div>

      <div v-else class="no-race">
        <p>Select a race to view results</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Loader from '@/lib/components/ui/Loader.vue'
import { computed, watch } from 'vue'
import type { RaceDay, RaceRoundResult } from '../../../../types/'
import ResultItem from './ResultItem.vue'

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

// Watch for race data changes
watch(
  selectedRace,
  () => {
    // Race data changed
  },
  { immediate: true },
)

// Get visible rounds (completed + current running, in reverse order: 6,5,4,3,2,1)
const visibleRounds = computed(() => {
  if (!selectedRace.value) {
    return []
  }

  const rounds: number[] = []

  // Add completed rounds
  for (let i = 0; i < 6; i++) {
    const round = selectedRace.value.rounds[i]
    if (round?.status === 'completed' || round?.status === 'running') {
      rounds.push(i)
    }
  }

  // Sort in reverse order (Round 6 first, then 5, 4, etc.)
  return rounds.sort((a, b) => b - a)
})

// Check if a specific round is currently running
const isRoundRunning = (roundIndex: number): boolean => {
  if (!selectedRace.value) return false
  const round = selectedRace.value.rounds[roundIndex]
  return round?.status === 'running'
}

// Get results for a specific round
const getRoundResults = (roundIndex: number): RaceRoundResult[] => {
  if (!selectedRace.value) return []
  const round = selectedRace.value.rounds[roundIndex]
  const results = round?.results ?? []
  return results
}

// Get distance for a specific round
const getRoundDistance = (roundIndex: number): number => {
  const distances = [1200, 1400, 1600, 1800, 2000, 2200]
  return distances[roundIndex] ?? 0
}
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

.results-subtitle {
  margin: 4px 0 0 0;
  font-size: 12px;
  color: var(--muted-foreground);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.results-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.round-section {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.round-header {
  padding: 12px 16px;
  background-color: var(--muted);
  border-bottom: 1px solid var(--border);
}

.round-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--foreground);
}

.round-running,
.round-pending,
.no-rounds,
.no-race {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  color: var(--muted-foreground);
  font-size: 14px;
}

.results-header-row {
  display: grid;
  grid-template-columns: 50px 1fr 80px;
  gap: 0;
  padding: 8px 12px;
  background-color: var(--muted);
  font-weight: 600;
  font-size: 12px;
  color: var(--foreground);
  border-bottom: 1px solid var(--border);
}

.col-position {
  text-align: center;
}

.col-name {
  padding-left: 8px;
}

.col-time {
  text-align: center;
}

.results-body {
  max-height: 200px;
  overflow-y: auto;
}
</style>
