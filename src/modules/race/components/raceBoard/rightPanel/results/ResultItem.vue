<template>
  <div class="result-item">
    <div class="result-position" :class="positionClass">{{ position }}</div>

    <div class="result-horse">
      <div class="horse-color" :style="{ backgroundColor: horseColor }"></div>
      <div class="horse-name">{{ horseName }}</div>
    </div>

    <div class="result-time">{{ formatTime(result.finishTime) }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Race, RaceResult, RoundResult } from '../../../../types/race'

interface Props {
  result: RaceResult | RoundResult
  position: number
  selectedRace?: Race // To get horse info for RoundResult
}

const props = defineProps<Props>()

const horseColor = computed(() => {
  if ('horse' in props.result) {
    return props.result.horse.color
  }
  // For RoundResult, find horse in selectedRace
  if (props.selectedRace) {
    const horse = props.selectedRace.selectedHorses.find((h) => h.horseId === props.result.horseId)
    return horse?.horse.color ?? '#ccc'
  }
  return '#ccc'
})

const horseName = computed(() => {
  if ('horse' in props.result) {
    return props.result.horse.name
  }
  // For RoundResult, find horse in selectedRace
  if (props.selectedRace) {
    const horse = props.selectedRace.selectedHorses.find((h) => h.horseId === props.result.horseId)
    return horse?.horse.name ?? 'Unknown'
  }
  return 'Unknown'
})

const formatTime = (time: number): string => {
  // Time is already in seconds, just format it nicely
  return `${time.toFixed(2)}s`
}

const positionClass = computed(() => {
  switch (props.position) {
    case 1:
      return 'position-first'
    case 2:
      return 'position-second'
    case 3:
      return 'position-third'
    case 4:
      return 'position-fourth'
    default:
      return 'position-other'
  }
})
</script>

<style scoped>
.result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background-color: white;
  border: 1px solid var(--border);
  border-radius: 6px;
}

.result-position {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary);
  color: white;
  border-radius: 50%;
  font-weight: 600;
  font-size: 12px;
  flex-shrink: 0;
}

.position-first {
  background-color: #ffd700; /* Gold */
  color: #000;
}

.position-second {
  background-color: #c0c0c0; /* Silver */
  color: #000;
}

.position-third {
  background-color: #cd7f32; /* Bronze */
  color: #fff;
}

.position-fourth {
  background-color: #4a90e2; /* Blue */
  color: #fff;
}

.position-other {
  background-color: var(--primary);
  color: white;
}

.result-horse {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.horse-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid var(--border);
  flex-shrink: 0;
}

.horse-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--foreground);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-time {
  font-size: 14px;
  font-weight: 600;
  color: var(--foreground);
  flex-shrink: 0;
}
</style>
