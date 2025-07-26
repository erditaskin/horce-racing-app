<template>
  <WidgetBase title="Race Day Statistics" :badge="`${completionRate}%`">
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-value">{{ statistics?.totalRaces ?? 0 }}</div>
        <div class="stat-label">Total Races</div>
      </div>

      <div class="stat-item">
        <div class="stat-value completed">{{ statistics?.completedRaces ?? 0 }}</div>
        <div class="stat-label">Completed</div>
      </div>

      <div class="stat-item">
        <div class="stat-value pending">{{ statistics?.pendingRaces ?? 0 }}</div>
        <div class="stat-label">Pending</div>
      </div>

      <div class="stat-item">
        <div class="stat-value">{{ statistics?.totalHorses ?? 0 }}</div>
        <div class="stat-label">Total Horses</div>
      </div>
    </div>

    <div class="performance-stats">
      <div class="performance-item">
        <span class="performance-label">Fastest Horse:</span>
        <span class="performance-value">{{ statistics?.fastestHorse ?? 'N/A' }}</span>
      </div>

      <div class="performance-item">
        <span class="performance-label">Most Wins:</span>
        <span class="performance-value">{{ statistics?.mostWins ?? 'N/A' }}</span>
      </div>

      <div class="performance-item">
        <span class="performance-label">Avg Race Time:</span>
        <span class="performance-value">{{ formatTime(statistics?.averageRaceTime ?? 0) }}</span>
      </div>
    </div>
  </WidgetBase>
</template>

<script setup lang="ts">
import type { DashboardStats } from '../../types'
import { formatTime } from '../../utils/formatters'
import WidgetBase from './WidgetBase.vue'

defineOptions({
  name: 'StatisticsWidget',
})

interface Props {
  statistics: DashboardStats | null
  completionRate: number
}

defineProps<Props>()
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
  padding: 12px;
  background-color: var(--muted);
  border-radius: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 4px;
}

.stat-value.completed {
  color: var(--success);
}

.stat-value.pending {
  color: var(--warning);
}

.stat-label {
  font-size: 12px;
  color: var(--muted-foreground);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.performance-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.performance-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
}

.performance-item:last-child {
  border-bottom: none;
}

.performance-label {
  font-size: 14px;
  color: var(--muted-foreground);
}

.performance-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--foreground);
}
</style>
