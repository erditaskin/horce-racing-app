<template>
  <div class="center-panel">
    <div class="race-track-container">
      <div class="track-header">
        <span class="race-info">
          {{
            selectedRace
              ? `Race ${selectedRace.raceNumber} - ${selectedRace.name}`
              : 'No Race Selected'
          }}
        </span>
        <span v-if="selectedRace" class="start-time"> Start: {{ selectedRace.startTime }} </span>
      </div>

      <Track v-if="selectedRace" :race="selectedRace" :is-running="isRunning" />

      <div v-else class="no-race">
        <p>Select a race to view the track</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Race } from '../../../types/race'
import Track from './raceTrack/Track.vue'

interface Props {
  selectedRace: Race | null
  isRunning: boolean
}

defineProps<Props>()
</script>

<style scoped>
.center-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
  min-width: 0;
}

.race-track-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 0;
}

.track-header {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.race-info {
  font-size: 18px;
  font-weight: 600;
  color: var(--foreground);
}

.start-time {
  font-size: 14px;
  color: var(--muted-foreground);
}

.no-race {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 2px dashed var(--border);
  border-radius: 8px;
}

.no-race p {
  color: var(--muted-foreground);
  font-size: 16px;
}
</style>
