<template>
  <div class="race-track">
    <div class="lane-numbers" :class="pistTypeClass">
      <div v-for="i in 10" :key="i" class="lane-number">
        {{ i }}
      </div>
    </div>

    <div class="track-lanes" :class="pistTypeClass">
      <Lane
        v-for="(raceHorse, index) in race.selectedHorses"
        :key="raceHorse.horseId"
        :race-horse="raceHorse"
        :lane-number="index + 1"
        :is-running="isRunning"
      />
    </div>

    <div class="finish-line">FINISH</div>

    <!-- Track Overlay -->
    <TrackOverlay
      :overlay-state="overlayState"
      :race-number="race.raceNumber"
      :race-name="race.name"
      :final-results="finalResults"
      :pist-type="race.pistType"
      @start-race="$emit('startRace')"
      @start-race-direct="$emit('startRaceDirect')"
      @close-overlay="$emit('closeOverlay')"
      @reset-race="$emit('resetRace')"
      @resume-race="$emit('resumeRace')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Race, RaceResult } from '../../../../types/'
import Lane from './Lane.vue'
import TrackOverlay from './overlay/TrackOverlay.vue'

defineOptions({
  name: 'RaceTrack',
})

interface Props {
  race: Race
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

// Computed class for pist type styling
const pistTypeClass = computed(() => {
  return `pist-${props.race.pistType}`
})
</script>

<style scoped>
.race-track {
  flex: 1;
  display: flex;
  background-color: white;
  border: 2px solid var(--border);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  min-height: 0;
}

.lane-numbers {
  width: 60px;
  background-color: #6b7280;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: background-color 0.3s ease;
}

.lane-numbers.pist-grass {
  background-color: #16a34a;
}

.lane-numbers.pist-sand {
  background-color: #d97706;
}

.lane-number {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.3);
}

.lane-number:last-child {
  border-bottom: none;
}

.track-lanes {
  flex: 1;
  position: relative;
  background: linear-gradient(to right, #f9fafb 0%, #f3f4f6 50%, #f9fafb 100%);
  overflow: hidden;
  transition: background 0.3s ease;
}

.track-lanes.pist-grass {
  background: linear-gradient(to right, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%);
}

.track-lanes.pist-sand {
  background: linear-gradient(to right, #fffbeb 0%, #fef3c7 50%, #fffbeb 100%);
}

.finish-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: #dc2626;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 12px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  flex-shrink: 0;
}
</style>
