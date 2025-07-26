<template>
  <div class="controls">
    <div class="controls-header">
      <h3 class="controls-title">Race Controls</h3>
    </div>

    <!-- Pist Overview -->
    <PistOverview :pist-status="pistStatus" />

    <div class="controls-buttons">
      <Button variant="primary" size="sm" :disabled="!canStartOrPause" @click="handleStart">
        {{ getButtonText() }}
      </Button>

      <Button variant="secondary" size="sm" :disabled="!canReset" @click="handleResetClick">
        Reset
      </Button>
    </div>

    <!-- Pist availability message -->
    <div v-if="!canStartOrPause && selectedRace?.status === 'pending'" class="pist-message">
      <p class="pist-message-text">No pist available at the moment</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/lib/components/ui/Button.vue'
import { useDialog } from '@/lib/composables/useDialog'
import { useToast } from '@/lib/composables/useToast'
import { computed } from 'vue'
import type { Race } from '../../../../types/'
import PistOverview from './PistOverview.vue'

defineOptions({
  name: 'RaceControls',
})

interface Props {
  canStart: boolean
  isRunning: boolean
  isPaused?: boolean
  selectedRace?: Race | null
  pistStatus?: {
    grass: { isAvailable: boolean; currentRaceId?: string }
    sand: { isAvailable: boolean; currentRaceId?: string }
  } | null
  isSelectedRacePaused?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  start: []
  reset: []
}>()

const toast = useToast()
const { confirm } = useDialog()

// Check if pist is available for selected race
const isPistAvailable = computed(() => {
  if (!props.selectedRace || !props.pistStatus) return false
  return props.pistStatus[props.selectedRace.pistType].isAvailable
})

// Computed property to determine if start/pause button should be enabled
const canStartOrPause = computed(() => {
  if (!props.selectedRace) return false

  // If selected race is running, always allow pause/resume
  if (props.selectedRace.status === 'running') {
    return true
  }

  // If selected race is not running, only allow start if pist is available
  return props.canStart && isPistAvailable.value
})

// Check if reset button should be enabled
const canReset = computed(() => {
  return (
    props.selectedRace && props.selectedRace.status === 'running' && !props.isSelectedRacePaused
  )
})

const getButtonText = () => {
  if (!props.selectedRace) return 'Start'

  if (props.selectedRace.status === 'running') {
    const buttonText = props.isSelectedRacePaused ? 'Resume' : 'Pause'
    return buttonText
  }

  return 'Start'
}

const handleStart = async () => {
  // Add a small delay to ensure UI state is updated
  await new Promise((resolve) => setTimeout(resolve, 50))

  // Double-check pist availability before starting
  if (!isPistAvailable.value && props.selectedRace?.status === 'pending') {
    // Show toast notification for better UX
    toast.warning(
      `${props.selectedRace.pistType.charAt(0).toUpperCase() + props.selectedRace.pistType.slice(1)} pist is currently in use. Please wait for the current race to finish.`,
    )
    return
  }

  emit('start')
}

const handleResetClick = () => {
  confirm.show({
    title: 'Reset Race',
    message:
      'Are you sure you want to reset this race? This will clear all progress and return to the pre-race state.',
    type: 'warning',
    confirmText: 'Reset',
    onConfirm: () => {
      emit('reset')
    },
  })
}
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

.pist-message {
  margin-top: 12px;
  padding: 8px 12px;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
}

.pist-message-text {
  margin: 0;
  font-size: 12px;
  color: #dc2626;
  text-align: center;
  font-weight: 500;
}
</style>
