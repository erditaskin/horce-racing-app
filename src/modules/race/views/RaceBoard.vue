<script setup lang="ts">
import { useToast } from '@/lib/composables/useToast'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import RaceBoard from '../components/raceBoard/index.vue'
import { useRaceBoardStore } from '../stores/board'

const toast = useToast()
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
      @start="startRaceDay"
      @reset="resetRace"
      @select-race="setSelectedRaceIndex"
      @select-date="selectDate"
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
