<template>
  <div
    class="program-item"
    :class="{
      selected: props.isSelected,
      current: props.isCurrent,
      completed: props.race.status === 'completed',
      'in-progress': props.race.status === 'running',
      'pist-grass': props.race.pistType === 'grass',
      'pist-sand': props.race.pistType === 'sand',
    }"
    @click="$emit('selectRace', props.raceIndex)"
  >
    <div class="race-header">
      <div class="race-number">Race {{ props.race.raceNumber }}</div>
      <div class="race-status">
        {{ getStatusText(props.race.status) }}
        <div v-if="props.race.status === 'running'" class="running-indicator">
          <div class="spinner"></div>
        </div>
      </div>
    </div>

    <div class="race-details">
      <div class="race-name">{{ props.race.name }}</div>
      <div class="race-info">
        <span class="race-time">{{ props.race.startTime }}</span>
        <span class="race-horses">{{ props.race.selectedHorses.length }} horses</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Race } from '../../../../types/race'
import { getRaceStatusText } from '../../../../utils/formatters'

interface Props {
  race: Race
  raceIndex: number
  isSelected: boolean
  isCurrent: boolean
}

const props = defineProps<Props>()

defineEmits<{
  selectRace: [index: number]
}>()

// Use shared formatter instead of local function
const getStatusText = getRaceStatusText
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

.program-item.selected:not(.in-progress) {
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

/* Pist type colors */
.program-item.pist-grass {
  background-color: hsl(142 76% 36% / 0.1);
  border-color: #16a34a;
}

.program-item.pist-sand {
  background-color: hsl(35 85% 65% / 0.1);
  border-color: #d97706;
}

/* Override pist colors when selected or current */
.program-item.selected.pist-grass {
  background-color: hsl(217 91% 60% / 0.1);
  border-color: #3b82f6;
}

.program-item.selected.pist-sand {
  background-color: hsl(217 91% 60% / 0.1);
  border-color: #3b82f6;
}

.program-item.current.pist-grass {
  background-color: hsl(142 76% 36% / 0.2);
  border-color: #16a34a;
}

.program-item.current.pist-sand {
  background-color: hsl(35 85% 65% / 0.2);
  border-color: #d97706;
}

/* Running state should override selected state */
.program-item.in-progress.pist-grass {
  background-color: hsl(217 91% 60% / 0.15);
  border-color: #3b82f6;
}

.program-item.in-progress.pist-sand {
  background-color: hsl(217 91% 60% / 0.15);
  border-color: #3b82f6;
}

/* Selected + Running combination */
.program-item.selected.in-progress.pist-grass {
  background-color: hsl(217 91% 60% / 0.15);
  border-color: #3b82f6;
}

.program-item.selected.in-progress.pist-sand {
  background-color: hsl(217 91% 60% / 0.15);
  border-color: #3b82f6;
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
  display: flex;
  align-items: center;
  gap: 4px;
}

.running-indicator {
  display: flex;
  align-items: center;
}

.spinner {
  width: 8px;
  height: 8px;
  border: 1px solid currentColor;
  border-top: 1px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.race-details {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 12px;
  color: var(--muted-foreground);
}

.race-name {
  font-weight: 500;
  flex: 1;
  margin-right: 12px;
}

.race-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.race-time {
  font-weight: 500;
}

.race-horses {
  font-weight: 500;
}
</style>
