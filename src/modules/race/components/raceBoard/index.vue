<template>
  <div class="race-board">
    <div class="board-layout">
      <!-- Left Panel -->
      <LeftPanel
        :horses="horses"
        :can-start="canStart"
        :is-running="isRunning"
        @start="$emit('start')"
      />

      <!-- Center Panel -->
      <CenterPanel :selected-race="selectedRace" :is-running="isRunning" />

      <!-- Right Panel -->
      <RightPanel
        :race-day="raceDay"
        :selected-race-index="selectedRaceIndex"
        :round-options="roundOptions"
        :selected-date="selectedDate"
        @select-race="$emit('selectRace', $event)"
        @select-date="$emit('selectDate', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AppOption } from '@/lib/types/option'
import type { Horse } from '@/modules/horse/types/horse'
import type { Race, RaceDay } from '../../types/race'
import CenterPanel from './centerPanel/CenterPanel.vue'
import LeftPanel from './leftPanel/LeftPanel.vue'
import RightPanel from './rightPanel/RightPanel.vue'

defineOptions({
  name: 'RaceBoardContainer',
})

interface Props {
  horses: Horse[]
  raceDay: RaceDay | null
  selectedRaceIndex: number
  selectedRace: Race | null
  roundOptions: AppOption[]
  selectedDate: string
  isRunning: boolean
  canStart: boolean
}

defineProps<Props>()

defineEmits<{
  start: []
  selectRace: [index: number]
  selectDate: [date: string]
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
