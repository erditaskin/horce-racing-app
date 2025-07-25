<template>
  <div class="result-item">
    <div class="result-position">{{ position }}</div>

    <div class="result-horse">
      <div class="horse-color" :style="{ backgroundColor: result.horse.color }"></div>
      <div class="horse-name">{{ result.horse.name }}</div>
    </div>

    <div class="result-time">{{ formatTime(result.finishTime) }}</div>
  </div>
</template>

<script setup lang="ts">
import type { RaceResult } from '../../../../types/race'

interface Props {
  result: RaceResult
  position: number
}

defineProps<Props>()

const formatTime = (time: number): string => {
  const seconds = Math.floor(time / 1000)
  const milliseconds = time % 1000
  return `${seconds}.${milliseconds.toString().padStart(3, '0')}s`
}
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
