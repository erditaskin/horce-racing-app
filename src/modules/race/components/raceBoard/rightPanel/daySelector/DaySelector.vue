<template>
  <div class="day-selector">
    <div class="selector-header">
      <h3 class="selector-title">Select Race Day</h3>
    </div>

    <div class="selector-content">
      <AppDatePicker
        name="race-day"
        :model-value="selectedDate"
        placeholder="Choose date"
        @update:model-value="$emit('selectDate', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppDatePicker from '@/lib/components/ui/input/AppDatePicker.vue'

interface Props {
  selectedDate: string
}

defineProps<Props>()

defineEmits<{
  selectDate: [date: string]
}>()
</script>

<style scoped>
.day-selector {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
}

.selector-header {
  flex-shrink: 0;
}

.selector-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--foreground);
}

.selector-content {
  flex: 1;
}
</style>
