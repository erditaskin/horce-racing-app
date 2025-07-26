<template>
  <div class="overlay-content post-race">
    <div class="overlay-header">
      <h2 class="overlay-title">Race {{ raceNumber }} - Final Results</h2>
      <p class="overlay-subtitle">{{ raceName }}</p>
    </div>

    <div class="final-results">
      <div class="results-header">
        <span class="header-pos">Pos</span>
        <span class="header-name">Name</span>
        <span class="header-time">Total Time</span>
      </div>

      <div class="results-list">
        <div
          v-for="(result, index) in finalResults"
          :key="result.horseId"
          class="result-item"
          :class="{ winner: index === 0 }"
        >
          <span class="result-pos">{{ index + 1 }}</span>
          <span class="result-name">{{ result.horse.name }}</span>
          <span class="result-time">{{ formatTime(result.finishTime) }}</span>
        </div>
      </div>
    </div>

    <div class="overlay-actions">
      <Button @click="handleResetClick" variant="secondary" size="md"> Reset </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/lib/components/ui/Button.vue'
import { useDialog } from '@/lib/composables/useDialog'
import type { RaceResult } from '../../../../../types/'

defineOptions({
  name: 'FinalResults',
})

interface Props {
  raceNumber?: number
  raceName?: string
  finalResults?: RaceResult[]
}

// Props are used in template, so we keep the interface but remove the unused variable
defineProps<Props>()

const emit = defineEmits<{
  'close-overlay': []
  'reset-race': []
}>()

const { confirm } = useDialog()

const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = (timeInSeconds % 60).toFixed(2)
  return `${minutes}:${seconds.padStart(5, '0')}`
}

const handleResetClick = () => {
  confirm.show({
    title: 'Reset Race',
    message:
      'Are you sure you want to clear this race? This will clear all results and return to the pre-race state.',
    type: 'warning',
    confirmText: 'Reset',
    onConfirm: () => {
      emit('reset-race')
    },
  })
}
</script>

<style scoped>
.overlay-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  max-width: 500px;
  width: 90%;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.overlay-header {
  @apply mb-6;
}

.overlay-title {
  @apply text-2xl font-bold text-gray-900 mb-2;
}

.overlay-subtitle {
  @apply text-lg text-gray-600 mb-6;
}

.final-results {
  @apply bg-gray-50 rounded-lg p-4 mb-6;
}

.results-header {
  @apply flex font-semibold text-gray-700 pb-2 border-b border-gray-200;
}

.header-pos {
  @apply w-12 text-center;
}

.header-name {
  @apply flex-1 text-left;
}

.header-time {
  @apply w-24 text-right;
}

.results-list {
  @apply space-y-2;
}

.result-item {
  @apply flex items-center py-2 px-2 rounded;
  transition: background-color 0.2s ease;
}

.result-item:hover {
  @apply bg-gray-100;
}

.result-item.winner {
  @apply bg-yellow-50 border border-yellow-200;
}

.result-pos {
  @apply w-12 text-center font-semibold;
}

.result-name {
  @apply flex-1 text-left;
}

.result-time {
  @apply w-24 text-right font-mono;
}

.overlay-actions {
  @apply flex justify-center;
}

/* Dark mode support */
.dark .overlay-content {
  @apply bg-gray-800 text-white;
}

.dark .overlay-title {
  @apply text-white;
}

.dark .overlay-subtitle {
  @apply text-gray-300;
}

.dark .final-results {
  @apply bg-gray-700;
}

.dark .results-header {
  @apply text-gray-300 border-gray-600;
}

.dark .result-item:hover {
  @apply bg-gray-600;
}

.dark .result-item.winner {
  @apply bg-yellow-900 border-yellow-700;
}
</style>
