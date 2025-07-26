<template>
  <div
    class="race-item"
    :class="{
      completed: race.status === 'completed',
      running: race.status === 'running',
      pending: race.status === 'pending',
      'pist-grass': race.pistType === 'grass',
      'pist-sand': race.pistType === 'sand',
    }"
  >
    <div class="race-header">
      <div class="race-number">Race {{ race.raceNumber }}</div>
      <div class="race-status">
        {{ getStatusText(race.status) }}
        <div v-if="race.status === 'running'" class="running-indicator">
          <div class="spinner"></div>
        </div>
      </div>
    </div>

    <div class="race-details">
      <div class="race-name">{{ race.raceName }}</div>
      <div class="race-info">
        <span class="race-time">{{ race.startTime }}</span>
        <span class="race-horses">{{ race.horseCount }} horses</span>
        <span class="pist-type">{{ race.pistType }}</span>
      </div>
    </div>

    <div v-if="race.winner" class="race-winner">
      <span class="winner-label">Winner:</span>
      <div class="winner-info">
        <div class="winner-color" :style="{ backgroundColor: race.winner.horseColor }"></div>
        <span class="winner-name">{{ race.winner.horseName }}</span>
        <span class="winner-time">{{ formatTime(race.winner.finishTime) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DashboardRaceSummary } from '../../types'
import { formatTime, getStatusText } from '../../utils/formatters'

defineOptions({
  name: 'RaceItem',
})

interface Props {
  race: DashboardRaceSummary
}

defineProps<Props>()
</script>

<style scoped>
.race-item {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background-color: var(--muted);
  transition: all 0.2s ease;
}

.race-item:hover {
  border-color: var(--primary);
  box-shadow: 0 2px 8px hsl(from var(--primary) h s l / 0.1);
}

.race-item.completed {
  border-left: 4px solid var(--success);
}

.race-item.running {
  border-left: 4px solid var(--primary);
}

.race-item.pending {
  border-left: 4px solid var(--warning);
}

.race-item.pist-grass {
  background: linear-gradient(135deg, hsl(from var(--success) h s l / 0.05) 0%, var(--muted) 100%);
}

.race-item.pist-sand {
  background: linear-gradient(135deg, hsl(from var(--warning) h s l / 0.05) 0%, var(--muted) 100%);
}

.race-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.race-number {
  font-weight: 600;
  color: var(--foreground);
}

.race-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.race-status:has(.running-indicator) {
  color: var(--primary);
}

.running-indicator {
  width: 12px;
  height: 12px;
}

.spinner {
  width: 100%;
  height: 100%;
  border: 2px solid var(--border);
  border-top: 2px solid var(--primary);
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
  margin-bottom: 8px;
}

.race-name {
  font-weight: 500;
  color: var(--foreground);
  margin-bottom: 4px;
}

.race-info {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: var(--muted-foreground);
}

.race-time {
  font-weight: 500;
}

.pist-type {
  text-transform: capitalize;
  background-color: var(--card);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
}

.race-winner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--border);
}

.winner-label {
  font-size: 12px;
  color: var(--muted-foreground);
  font-weight: 500;
}

.winner-info {
  display: flex;
  align-items: center;
  gap: 6px;
}

.winner-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid var(--border);
}

.winner-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--foreground);
}

.winner-time {
  font-size: 11px;
  color: var(--muted-foreground);
  background-color: var(--card);
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
