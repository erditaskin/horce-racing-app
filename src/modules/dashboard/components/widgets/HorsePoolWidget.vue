<template>
  <WidgetBase
    title="Horse Pool Overview"
    :badge="`${horsePoolStats?.totalHorses ?? 0} horses`"
    scrollable
  >
    <div class="pool-stats">
      <div class="average-condition">
        <div class="condition-circle">
          <div class="condition-value">{{ averageCondition }}</div>
        </div>
        <div class="condition-label">Average Condition</div>
      </div>

      <div class="condition-distribution">
        <h4 class="distribution-title">Condition Distribution</h4>
        <div class="distribution-bars">
          <ConditionBar
            v-for="condition in conditionTypes"
            :key="condition.key"
            :label="condition.label"
            :percentage="getConditionPercentage(condition.key)"
            :value="getConditionValue(condition.key)"
            :type="condition.key"
          />
        </div>
      </div>
    </div>

    <div class="top-horses">
      <h4 class="top-horses-title">Top Horses in Pool</h4>
      <div class="top-horses-list">
        <TopHorseItem v-for="horse in topHorses" :key="horse.horseId" :horse="horse" />
      </div>
    </div>
  </WidgetBase>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DashboardHorsePoolStats } from '../../types'
import ConditionBar from './ConditionBar.vue'
import TopHorseItem from './TopHorseItem.vue'
import WidgetBase from './WidgetBase.vue'

defineOptions({
  name: 'HorsePoolWidget',
})

interface Props {
  horsePoolStats: DashboardHorsePoolStats | null
}

const props = defineProps<Props>()

// Computed properties to reduce template complexity
const averageCondition = computed(() => props.horsePoolStats?.averageCondition ?? 0)

const topHorses = computed(() => props.horsePoolStats?.topHorses ?? [])

const conditionTypes = computed(() => [
  { key: 'excellent' as const, label: 'Excellent' },
  { key: 'good' as const, label: 'Good' },
  { key: 'fair' as const, label: 'Fair' },
  { key: 'poor' as const, label: 'Poor' },
])

// Helper functions
const getConditionPercentage = (
  condition: keyof DashboardHorsePoolStats['conditionDistribution'],
): number => {
  if (!props.horsePoolStats) return 0

  const total = props.horsePoolStats.totalHorses
  const count = props.horsePoolStats.conditionDistribution[condition]

  return total > 0 ? Math.round((count / total) * 100) : 0
}

const getConditionValue = (
  condition: keyof DashboardHorsePoolStats['conditionDistribution'],
): number => {
  return props.horsePoolStats?.conditionDistribution[condition] ?? 0
}
</script>

<style scoped>
.pool-stats {
  margin-bottom: 16px;
  flex-shrink: 0;
}

.average-condition {
  text-align: center;
  margin-bottom: 16px;
  padding: 16px;
  background: linear-gradient(135deg, var(--muted) 0%, var(--card) 100%);
  border-radius: 12px;
  border: 1px solid var(--border);
}

.condition-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary) 0%, hsl(from var(--primary) h s l / 0.8) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 12px auto;
  box-shadow: 0 4px 12px hsl(from var(--primary) h s l / 0.3);
  border: 3px solid white;
}

.condition-value {
  font-size: 24px;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.condition-label {
  font-size: 14px;
  color: var(--muted-foreground);
  font-weight: 500;
}

.condition-distribution {
  margin-bottom: 16px;
}

.distribution-title {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--foreground);
}

.distribution-bars {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.top-horses {
  flex: 1;
  min-height: 0;
}

.top-horses-title {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--foreground);
}

.top-horses-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
