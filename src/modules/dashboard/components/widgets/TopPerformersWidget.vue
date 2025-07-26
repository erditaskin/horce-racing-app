<template>
  <WidgetBase title="Top Performers" badge="Win Rate" scrollable>
    <div class="performers-list">
      <div
        v-for="(performer, index) in topPerformers"
        :key="performer.horseId"
        class="performer-item"
        :class="{ 'top-performer': index === 0 }"
      >
        <div class="performer-rank">
          <div class="rank-number">{{ index + 1 }}</div>
          <div class="rank-medal" v-if="index < 3">
            {{ getMedalIcon(index) }}
          </div>
        </div>

        <div class="performer-info">
          <div class="performer-header">
            <div class="performer-color" :style="{ backgroundColor: performer.horseColor }"></div>
            <div class="performer-name">{{ performer.horseName }}</div>
            <div class="performer-stats">
              <span class="wins">{{ performer.wins }}W</span>
              <span class="races">{{ performer.totalRaces }}R</span>
            </div>
          </div>

          <div class="performer-metrics">
            <div class="metric-item">
              <span class="metric-label">Win Rate:</span>
              <span class="metric-value">{{ performer.winRate }}%</span>
            </div>

            <div class="metric-item">
              <span class="metric-label">Avg Time:</span>
              <span class="metric-value">{{ formatTime(performer.averageTime) }}</span>
            </div>

            <div class="metric-item">
              <span class="metric-label">Best Time:</span>
              <span class="metric-value best-time">{{ formatTime(performer.bestTime) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </WidgetBase>
</template>

<script setup lang="ts">
import type { TopPerformer } from '../../types'
import { formatTime, getMedalIcon } from '../../utils/formatters'
import WidgetBase from './WidgetBase.vue'

defineOptions({
  name: 'TopPerformersWidget',
})

interface Props {
  topPerformers: TopPerformer[]
}

defineProps<Props>()
</script>

<style scoped>
.performers-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.performer-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background-color: var(--muted);
  transition: all 0.2s ease;
}

.performer-item:hover {
  border-color: var(--primary);
  box-shadow: 0 2px 8px hsl(from var(--primary) h s l / 0.1);
}

.performer-item.top-performer {
  border-color: var(--success);
  background: linear-gradient(135deg, hsl(from var(--success) h s l / 0.05) 0%, var(--muted) 100%);
}

.performer-rank {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.rank-number {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  color: var(--foreground);
}

.rank-medal {
  font-size: 16px;
}

.performer-info {
  flex: 1;
  min-width: 0;
}

.performer-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.performer-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid var(--border);
  flex-shrink: 0;
}

.performer-name {
  font-weight: 600;
  color: var(--foreground);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.performer-stats {
  display: flex;
  gap: 8px;
  font-size: 11px;
  color: var(--muted-foreground);
  flex-shrink: 0;
}

.wins {
  background-color: var(--success);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.races {
  background-color: var(--card);
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}

.performer-metrics {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.metric-label {
  color: var(--muted-foreground);
}

.metric-value {
  font-weight: 600;
  color: var(--foreground);
}

.metric-value.best-time {
  color: var(--success);
}
</style>
