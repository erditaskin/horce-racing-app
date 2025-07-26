<template>
  <div class="top-horse-item">
    <div class="horse-color" :style="{ backgroundColor: horse.horseColor }"></div>
    <div class="horse-name">{{ horse.horseName }}</div>
    <div class="horse-stats">
      <span class="horse-wins">{{ horse.wins }}W</span>
      <span class="horse-rate">{{ horse.winRate }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TopPerformer } from '../../types'

defineOptions({
  name: 'TopHorseItem',
})

interface Props {
  horse: TopPerformer
}

defineProps<Props>()
</script>

<style scoped>
.top-horse-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: var(--muted);
  border: 1px solid var(--border);
  transition: all 0.2s ease;
}

.top-horse-item:hover {
  border-color: var(--primary);
  box-shadow: 0 2px 8px hsl(from var(--primary) h s l / 0.1);
}

.horse-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid var(--border);
  flex-shrink: 0;
}

.horse-name {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: var(--foreground);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.horse-stats {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.horse-wins {
  background-color: var(--success);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

.horse-rate {
  background-color: var(--card);
  color: var(--muted-foreground);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}
</style>
