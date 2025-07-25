<template>
  <div class="race-track">
    <div class="lane-numbers">
      <div v-for="i in 10" :key="i" class="lane-number">
        {{ i }}
      </div>
    </div>

    <div class="track-lanes">
      <Lane
        v-for="(raceHorse, index) in race.selectedHorses"
        :key="raceHorse.horseId"
        :race-horse="raceHorse"
        :lane-number="index + 1"
        :is-running="isRunning"
      />
    </div>

    <div class="finish-line">FINISH</div>
  </div>
</template>

<script setup lang="ts">
import type { Race } from '../../../../types/race'
import Lane from './Lane.vue'

defineOptions({
  name: 'RaceTrack',
})

interface Props {
  race: Race
  isRunning: boolean
}

defineProps<Props>()
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
  background-color: #15803d;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
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
  background: linear-gradient(to right, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%);
  overflow: hidden;
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
