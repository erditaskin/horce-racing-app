<template>
  <div
    class="horse-marker"
    :style="{
      backgroundColor: raceHorse.horse.color,
      left: `${raceHorse.progress}%`,
    }"
  >
    <div class="horse-name">{{ raceHorse.horse.name }}</div>
  </div>
</template>

<script setup lang="ts">
import type { RaceHorse } from '../../../../types/'

defineOptions({
  name: 'RaceHorseMarker',
})

interface Props {
  raceHorse: RaceHorse
  isRunning: boolean
}

defineProps<Props>()
</script>

<style scoped>
.horse-marker {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 30px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: left 0.1s ease-out;
}

.horse-name {
  font-size: 8px;
  line-height: 1;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
</style>
