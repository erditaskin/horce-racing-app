<template>
  <div class="horse-row">
    <div class="col-name">{{ horse.name }}</div>
    <div class="col-condition">{{ horse.condition }}</div>
    <div class="col-color">
      <div class="color-indicator" :style="{ backgroundColor: horse.color }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Horse } from '@/modules/horse/types/horse'

interface Props {
  horse: Horse
}

defineProps<Props>()
</script>

<style scoped>
.horse-row {
  display: grid;
  grid-template-columns: 1fr 80px 60px;
  gap: 0;
  padding: 8px;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}

.horse-row:last-child {
  border-bottom: none;
}

.col-name {
  font-weight: 500;
  color: var(--foreground);
  padding-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.col-condition {
  text-align: center;
  color: var(--muted-foreground);
}

.col-color {
  display: flex;
  justify-content: center;
  align-items: center;
}

.color-indicator {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid var(--border);
}
</style>
