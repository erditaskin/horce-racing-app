<template>
  <div class="condition-bar">
    <div class="bar-label">{{ label }}</div>
    <div class="bar-container">
      <div class="bar-fill" :class="type" :style="{ width: percentage + '%' }"></div>
    </div>
    <div class="bar-value">{{ value }}</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ConditionBar',
})

interface Props {
  label: string
  percentage: number
  value: number
  type: 'excellent' | 'good' | 'fair' | 'poor'
}

defineProps<Props>()
</script>

<style scoped>
.condition-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.bar-label {
  width: 60px;
  color: var(--muted-foreground);
  font-weight: 500;
}

.bar-container {
  flex: 1;
  height: 8px;
  background-color: var(--muted);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.bar-fill.excellent {
  background: linear-gradient(90deg, var(--success) 0%, hsl(from var(--success) h s l / 0.8) 100%);
}

.bar-fill.good {
  background: linear-gradient(90deg, var(--primary) 0%, hsl(from var(--primary) h s l / 0.8) 100%);
}

.bar-fill.fair {
  background: linear-gradient(90deg, var(--warning) 0%, hsl(from var(--warning) h s l / 0.8) 100%);
}

.bar-fill.poor {
  background: linear-gradient(
    90deg,
    var(--destructive) 0%,
    hsl(from var(--destructive) h s l / 0.8) 100%
  );
}

.bar-value {
  width: 30px;
  text-align: right;
  font-weight: 600;
  color: var(--foreground);
}
</style>
