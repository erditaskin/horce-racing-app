<script setup lang="ts">
import { useToast } from '@/lib/composables/useToast'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import RaceBoard from '../components/raceBoard/index.vue'
import { useRaceBoardStore } from '../stores/board'

const toast = useToast()
// Removed unused confirm variable
const store = useRaceBoardStore()

// Use storeToRefs to maintain reactivity while destructuring
const {
  horses,
  raceDay,
  selectedRaceIndex,
  currentRoundIndex,
  selectedRace,
  selectedDate,
  isRunning,
  canStart,
  isPaused,
  currentOverlayState,
  finalResults,
  pistStatus,
  isSelectedRacePaused,
} = storeToRefs(store)

// Methods
const startRaceDay = async () => {
  await store.startRaceDay()
}

const resetRace = async () => {
  await store.resetRaceDay()
}

const setSelectedRaceIndex = (index: number) => {
  store.setSelectedRaceIndex(index)
}

const selectDate = async (date: string) => {
  await store.selectDate(date)
}

const generateRaceDay = async () => {
  await store.generateRaceDay()
}

const handleStartRace = () => {
  // Prevent multiple race starts
  if (isRunning.value && !isPaused.value) {
    return
  }

  if (currentOverlayState.value === 'pre-race') {
    // Start the race immediately
    store.startRaceDay()
  }
}

const handleStartRaceDirect = async () => {
  // Add a small delay to ensure UI state is updated
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Check if pist is available before starting
  if (selectedRace.value && !store.isPistAvailable(selectedRace.value.pistType)) {
    toast.warning(
      `${selectedRace.value.pistType.charAt(0).toUpperCase() + selectedRace.value.pistType.slice(1)} pist is currently in use. Please wait for the current race to finish.`,
    )
    return
  }

  // Start the race directly from the overlay
  await store.startRaceDay()
}

const handleCloseOverlay = () => {
  // No longer needed - overlay state is managed by race status
}

const handleResetRace = async () => {
  await store.resetRaceDay()
}

const handleResumeRace = async () => {
  await store.startRaceDay()
}

// Initialize on mount
onMounted(async () => {
  try {
    await store.initialize()
  } catch (err) {
    toast.error('Failed to initialize race board')
    console.error('Initialization error:', err)
  }
})
</script>

<template>
  <div class="race-board-view">
    <RaceBoard
      :horses="horses"
      :race-day="raceDay"
      :selected-race-index="selectedRaceIndex"
      :current-round-index="currentRoundIndex"
      :selected-race="selectedRace"
      :selected-date="selectedDate"
      :is-running="isRunning"
      :can-start="canStart"
      :is-paused="isPaused"
      :overlay-state="currentOverlayState"
      :final-results="finalResults"
      :pist-status="pistStatus"
      :is-selected-race-paused="isSelectedRacePaused"
      @start="startRaceDay"
      @reset="resetRace"
      @select-race="setSelectedRaceIndex"
      @select-date="selectDate"
      @generate-race-day="generateRaceDay"
      @start-race="handleStartRace"
      @start-race-direct="handleStartRaceDirect"
      @close-overlay="handleCloseOverlay"
      @reset-race="handleResetRace"
      @resume-race="handleResumeRace"
    />
  </div>
</template>

<style scoped>
.race-board-view {
  height: 100vh;
  width: 100vw;
  background-color: var(--background);
  overflow: hidden;
}
</style>
