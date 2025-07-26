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
        <div v-if="selectedRace" class="race-details">
          <span class="start-time">Start: {{ selectedRace.startTime }}</span>
          <div class="pist-indicator" :class="pistTypeClass">
            <span class="pist-name">{{ pistTypeDisplay }} Pist</span>
          </div>
        </div>
      </div>

      <Track
        v-if="selectedRace"
        :race="selectedRace"
        :is-running="isRunning"
        :overlay-state="overlayState"
        :final-results="finalResults"
        @start-race="$emit('startRace')"
        @start-race-direct="$emit('startRaceDirect')"
        @close-overlay="$emit('closeOverlay')"
        @reset-race="$emit('resetRace')"
        @resume-race="$emit('resumeRace')"
      />

      <div v-else class="no-race">
        <p>Select a race to view the track</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Race, RaceResult } from '../../../types/'
import Track from './raceTrack/Track.vue'

interface Props {
  selectedRace: Race | null
  isRunning: boolean
  overlayState: 'pre-race' | 'countdown' | 'running' | 'post-race' | 'paused' | null
  finalResults: RaceResult[]
}

const props = defineProps<Props>()

defineEmits<{
  startRace: []
  startRaceDirect: []
  closeOverlay: []
  resetRace: []
  resumeRace: []
}>()

// Computed properties for pist type display
const pistTypeClass = computed(() => {
  if (!props.selectedRace) return ''
  return props.selectedRace.pistType === 'grass' ? 'pist-grass' : 'pist-sand'
})

const pistTypeDisplay = computed(() => {
  if (!props.selectedRace) return ''
  return props.selectedRace.pistType.charAt(0).toUpperCase() + props.selectedRace.pistType.slice(1)
})
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

.race-details {
  display: flex;
  align-items: center;
  gap: 12px;
}

.start-time {
  font-size: 14px;
  color: var(--muted-foreground);
}

.pist-indicator {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--border);
}

.pist-grass {
  background-color: #22c55e; /* Green */
}

.pist-sand {
  background-color: #f59e0b; /* Sand/Orange */
}

.pist-name {
  font-size: 11px;
  font-weight: 500;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
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
