<template>
  <div class="left-panel">
    <!-- Controls -->
    <div class="controls-section">
      <Controls
        :can-start="canStart"
        :is-running="isRunning"
        :is-paused="isPaused"
        :selected-race="selectedRace"
        :pist-status="pistStatus"
        :is-selected-race-paused="isSelectedRacePaused"
        @start="$emit('start')"
        @reset="$emit('reset')"
      />
    </div>

    <!-- Horse Pool -->
    <div class="roster-section">
      <Roster :horses="horses" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Race } from '../../../types/'
import type { Horse } from '../../../types/raceHorse'
import Controls from './controls/Controls.vue'
import Roster from './roster/Roster.vue'

interface Props {
  horses: Horse[]
  canStart: boolean
  isRunning: boolean
  isPaused?: boolean
  selectedRace?: Race | null
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
}>()
</script>

<style scoped>
.left-panel {
  width: 280px;
  background-color: #f3f4f6;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.controls-section {
  flex-shrink: 0;
  padding: 16px;
  background-color: #e5e7eb;
  border-bottom: 1px solid var(--border);
}

.roster-section {
  flex: 1;
  overflow: hidden;
}
</style>
