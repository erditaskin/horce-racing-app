<template>
  <div class="race-lane" :style="{ top: `${(laneNumber - 1) * 10}%` }">
    <Horse :race-horse="raceHorse" :is-running="isRunning" />
  </div>
</template>

<script setup lang="ts">
import type { RaceHorse } from '../../../../types/race'
import Horse from './Horse.vue'

defineOptions({
  name: 'RaceLane',
})

interface Props {
  raceHorse: RaceHorse
  laneNumber: number
  isRunning: boolean
}

defineProps<Props>()
</script>

<style scoped>
.race-lane {
  position: absolute;
  width: 100%;
  height: 10%;
  border-bottom: 1px dashed #d1d5db;
}

.race-lane:last-child {
  border-bottom: none;
}
</style>
