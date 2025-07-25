<template>
  <div class="controls">
    <div class="controls-header">
      <h3 class="controls-title">Race Controls</h3>
    </div>

    <div class="controls-buttons">
      <Button variant="primary" size="sm" :disabled="!canStart" @click="$emit('start')">
        {{ isRunning ? 'Pause' : 'Start' }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/lib/components/ui/Button.vue'

defineOptions({
  name: 'RaceControls',
})

interface Props {
  canStart: boolean
  isRunning: boolean
}

defineProps<Props>()

defineEmits<{
  start: []
}>()
</script>

<style scoped>
.controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
}

.controls-header {
  flex-shrink: 0;
}

.controls-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--foreground);
}

.controls-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
