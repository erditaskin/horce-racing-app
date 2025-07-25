<template>
  <div
    class="program-item"
    :class="{
      selected: isSelected,
      current: isCurrent,
      completed: race.status === 'completed',
      'in-progress': race.status === 'in-progress',
    }"
  >
    <div class="race-header">
      <div class="race-number">Race {{ race.raceNumber }}</div>
      <div class="race-status">{{ getStatusText(race.status) }}</div>
    </div>

    <div class="race-details">
      <div class="race-distance">{{ race.distance }}m</div>
      <div class="race-time">{{ race.startTime }}</div>
      <div class="race-horses">{{ race.selectedHorses.length }} horses</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Race } from '../../../../types/race'

interface Props {
  race: Race
  isSelected: boolean
  isCurrent: boolean
}

defineProps<Props>()

const getStatusText = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'Pending'
    case 'in-progress':
      return 'Running'
    case 'completed':
      return 'Finished'
    default:
      return status
  }
}
</script>

<style scoped>
.program-item {
  background-color: white;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.program-item:hover {
  border-color: var(--primary);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.program-item.selected {
  border-color: var(--primary);
  background-color: hsl(from var(--primary) h s l / 0.1);
}

.program-item.current {
  border-color: #f59e0b;
  background-color: hsl(45 93% 47% / 0.1);
}

.program-item.completed {
  border-color: #10b981;
  background-color: hsl(160 84% 39% / 0.1);
}

.program-item.in-progress {
  border-color: #3b82f6;
  background-color: hsl(217 91% 60% / 0.1);
}

.race-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.race-number {
  font-weight: 600;
  font-size: 14px;
  color: var(--foreground);
}

.race-status {
  font-size: 12px;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: var(--muted);
  color: var(--muted-foreground);
}

.race-details {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--muted-foreground);
}

.race-distance {
  font-weight: 500;
}

.race-time {
  font-weight: 500;
}

.race-horses {
  font-weight: 500;
}
</style>
