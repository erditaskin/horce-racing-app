<template>
  <div class="race-board">
    <!-- Toolbar -->
    <Toolbar
      :selected-date="selectedDate"
      :race-day="raceDay"
      @select-date="$emit('selectDate', $event)"
    />

    <div class="board-layout">
      <!-- Left Panel -->
      <LeftPanel
        :horses="horses"
        :can-start="canStart"
        :is-running="isRunning"
        :is-paused="isPaused"
        :selected-race="selectedRace"
        :pist-status="pistStatus"
        :is-selected-race-paused="isSelectedRacePaused"
        @start="$emit('start')"
        @reset="$emit('reset')"
      />

      <!-- Center Panel -->
      <CenterPanel
        :selected-race="selectedRace"
        :is-running="isRunning"
        :overlay-state="overlayState"
        :final-results="finalResults"
        @start-race="$emit('startRace')"
        @start-race-direct="$emit('startRaceDirect')"
        @close-overlay="$emit('closeOverlay')"
        @reset-race="$emit('resetRace')"
        @resume-race="$emit('resumeRace')"
      />

      <!-- Right Panel -->
      <RightPanel
        :race-day="raceDay"
        :selected-race-index="selectedRaceIndex"
        :current-round-index="currentRoundIndex"
        @select-race="$emit('selectRace', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Horse } from '@/modules/horse/types/horse'
import type { Race, RaceDay, RaceResult } from '../../types/'
import CenterPanel from './centerPanel/CenterPanel.vue'
import LeftPanel from './leftPanel/LeftPanel.vue'
import RightPanel from './rightPanel/RightPanel.vue'
import Toolbar from './Toolbar.vue'

defineOptions({
  name: 'RaceBoardContainer',
})

interface Props {
  horses: Horse[]
  raceDay: RaceDay | null
  selectedRaceIndex: number
  currentRoundIndex: number
  selectedRace: Race | null
  selectedDate: string
  isRunning: boolean
  canStart: boolean
  isPaused?: boolean
  overlayState: 'pre-race' | 'countdown' | 'running' | 'post-race' | 'paused' | null
  finalResults: RaceResult[]
  pistStatus?: {
    grass: { isAvailable: boolean; currentRaceId?: string }
    sand: { isAvailable: boolean; currentRaceId?: string }
  } | null
  isSelectedRacePaused?: boolean
}

defineProps<Props>()

defineEmits<{
  start: []
  reset: []
  selectRace: [index: number]
  selectDate: [date: string]
  startRace: []
  startRaceDirect: []
  closeOverlay: []
  resetRace: []
  resumeRace: []
}>()
</script>

<style scoped>
.race-board {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--background);
}

.board-layout {
  flex: 1;
  display: flex;
  min-height: 0;
  overflow: hidden;
}
</style>
