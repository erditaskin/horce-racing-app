<template>
  <div class="left-panel">
    <!-- Controls -->
    <div class="controls-section">
      <Controls :can-start="canStart" :is-running="isRunning" @start="$emit('start')" />
    </div>

    <!-- Horse Roster -->
    <div class="roster-section">
      <Roster :horses="horses" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Horse } from '@/modules/horse/types/horse'
import Controls from './controls/Controls.vue'
import Roster from './roster/Roster.vue'

interface Props {
  horses: Horse[]
  canStart: boolean
  isRunning: boolean
}

defineProps<Props>()

defineEmits<{
  start: []
}>()
</script>

<style scoped>
.left-panel {
  width: 280px;
  background-color: #f3f4f6;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.controls-section {
  flex-shrink: 0;
  padding: 16px;
  background-color: #e5e7eb;
  border-bottom: 1px solid var(--border);
}

.roster-section {
  flex: 1;
  overflow: hidden;
}
</style>
