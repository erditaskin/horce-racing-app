<template>
  <div class="round-selector">
    <div class="selector-header">
      <h3 class="selector-title">Select Race</h3>
    </div>

    <div class="selector-content">
      <AppSelectInput
        name="round-select"
        :model-value="selectedRaceIndex"
        :options="roundOptions"
        placeholder="Choose race"
        @update:model-value="$emit('selectRace', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSelectInput from '@/lib/components/ui/input/AppSelectInput.vue'
import type { AppOption } from '@/lib/types/option'

interface Props {
  selectedRaceIndex: number
  roundOptions: AppOption[]
}

defineProps<Props>()

defineEmits<{
  selectRace: [index: number]
}>()
</script>

<style scoped>
.round-selector {
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
