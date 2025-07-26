<template>
  <div v-if="showOverlay" class="race-overlay" :class="overlayClass">
    <!-- Pre-race state -->
    <PreStart
      v-if="overlayState === 'pre-race'"
      @start-race="handleStartRace"
      @start-race-direct="$emit('start-race-direct')"
    />

    <!-- Post-race state -->
    <FinalResults
      v-if="overlayState === 'post-race'"
      :race-number="raceNumber"
      :race-name="raceName"
      :final-results="finalResults"
      @close-overlay="$emit('close-overlay')"
      @reset-race="$emit('reset-race')"
    />

    <!-- Paused state -->
    <Paused
      v-if="overlayState === 'paused'"
      :race-number="raceNumber"
      :race-name="raceName"
      :pist-type="pistType"
      @resume-race="$emit('resume-race')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RaceResult } from '../../../../../types/'
import FinalResults from './FinalResults.vue'
import Paused from './Paused.vue'
import PreStart from './PreStart.vue'

defineOptions({
  name: 'TrackOverlay',
})

interface Props {
  overlayState: 'pre-race' | 'countdown' | 'running' | 'post-race' | 'paused' | null
  raceNumber?: number
  raceName?: string
  finalResults?: RaceResult[]
  pistType?: 'grass' | 'sand'
}

const props = defineProps<Props>()

// Emits are used in template, so we keep the interface but remove the unused variable
defineEmits<{
  'start-race': []
  'start-race-direct': []
  'close-overlay': []
  'reset-race': []
  'resume-race': []
}>()

// No countdown logic needed

const showOverlay = computed(() => {
  return props.overlayState && props.overlayState !== 'running'
})

const overlayClass = computed(() => ({
  'overlay-pre-race': props.overlayState === 'pre-race',
  'overlay-post-race': props.overlayState === 'post-race',
  'overlay-paused': props.overlayState === 'paused',
}))

const handleStartRace = () => {
  // This should not happen anymore since we're using start-race-direct
}
</script>

<style scoped>
.race-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  backdrop-filter: blur(2px);
  border-radius: 8px;
}

.overlay-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Dark mode support */
.dark .overlay-content {
  @apply bg-gray-800 text-white;
}
</style>
