import type { AppOption } from '@/lib/types/option'
import type { Horse } from '@/modules/horse/types/horse'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { HorseService } from '../services/horse'
import { ProgramService } from '../services/program'
import type { RaceDay, RaceDayGenerationOptions } from '../types/race'

/**
 * Race Board Store
 * Manages race board state and operations
 * Demonstrates enterprise-level state management patterns
 */
export const useRaceBoardStore = defineStore('raceBoard', () => {
  const router = useRouter()

  // State
  const horses = ref<Horse[]>([])
  const raceDay = ref<RaceDay | null>(null)
  const selectedRaceIndex = ref(0)
  const selectedRoundIndex = ref(0)
  const selectedDate = ref(getInitialDate())
  const isLoading = ref(false)
  const isRunning = ref(false)
  const error = ref<string | null>(null)

  // Helper functions for URL synchronization
  function getInitialDate(): string {
    const urlParams = new URLSearchParams(window.location.search)
    const dayParam = urlParams.get('day')

    if (dayParam) {
      // Validate date format
      const parsedDate = dayjs(dayParam, 'YYYY-MM-DD', true)
      if (parsedDate.isValid()) {
        return dayParam
      }
    }

    return dayjs().format('YYYY-MM-DD')
  }

  function updateQueryString(date: string) {
    const url = new URL(window.location.href)
    url.searchParams.set('day', date)

    // Use router to update URL without page reload
    router.replace({ query: { ...router.currentRoute.value.query, day: date } })
  }

  // Getters
  const selectedRace = computed(() => {
    if (!raceDay.value?.races.length) return null
    return raceDay.value.races[selectedRaceIndex.value] ?? null
  })

  // Auto-track current round from race day state
  const currentRoundIndex = computed(() => {
    if (!raceDay.value) return 0
    return raceDay.value.currentRoundIndex
  })

  const roundOptions = computed((): AppOption[] => {
    if (!raceDay.value?.races.length) return []
    const race = raceDay.value.races[selectedRaceIndex.value]
    if (!race) return []
    return race.rounds.map((round, idx) => ({
      value: idx,
      label: `Round ${round.roundNumber} - ${round.distance}m`,
    }))
  })

  const canStart = computed(() => {
    const hasRaceDay = !!raceDay.value
    const isGenerated = raceDay.value?.status === 'generated'
    const notLoading = !isLoading.value

    return hasRaceDay && isGenerated && notLoading
  })

  // Actions
  /**
   * Load horses from API
   */
  const loadHorses = async () => {
    try {
      isLoading.value = true
      error.value = null

      horses.value = await HorseService.getHorses()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load horses'
      console.error('Load horses error:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Generate race day program
   */
  const generateRaceDay = async (options?: RaceDayGenerationOptions) => {
    try {
      console.log('generateRaceDay called')
      isLoading.value = true
      error.value = null

      raceDay.value = await ProgramService.generateRaceDay(
        horses.value,
        selectedDate.value,
        options,
      )
      console.log('Race day generated:', raceDay.value)
      console.log('Race day status:', raceDay.value?.status)
      selectedRaceIndex.value = 0
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to generate race day'
      console.error('Generate race day error:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Start race day execution
   */
  const startRaceDay = async () => {
    if (!raceDay.value) return

    if (isRunning.value) {
      console.log('Race is already running, pausing...')
      // Pause
      isRunning.value = false
      return
    }

    try {
      console.log('Starting race execution...')
      isLoading.value = true
      isRunning.value = true
      error.value = null

      // Execute only the selected race
      console.log(`Executing selected race ${selectedRaceIndex.value + 1}`)
      raceDay.value = await ProgramService.executeRace(raceDay.value!, selectedRaceIndex.value)
      console.log(`Race ${selectedRaceIndex.value + 1} completed`)

      isRunning.value = false
      console.log('Selected race completed')
    } catch (err) {
      console.error('Error in startRaceDay:', err)
      isRunning.value = false
      error.value = err instanceof Error ? err.message : 'Failed to execute race'
      console.error('Start race error:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Pause selected race
   */
  const pauseRaceDay = async () => {
    if (!raceDay.value) return

    try {
      console.log(`Pausing selected race ${selectedRaceIndex.value + 1}`)
      isRunning.value = false
      raceDay.value = await ProgramService.pauseRace(raceDay.value)
      console.log(`Race ${selectedRaceIndex.value + 1} paused`)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to pause race'
      console.error('Pause race error:', err)
    }
  }

  /**
   * Reset selected race
   */
  const resetRaceDay = async () => {
    if (!raceDay.value) return

    try {
      console.log(`Resetting selected race ${selectedRaceIndex.value + 1}`)
      raceDay.value = await ProgramService.resetRace(raceDay.value, selectedRaceIndex.value)
      isRunning.value = false
      selectedRoundIndex.value = 0 // Reset manual round selection
      console.log(`Race ${selectedRaceIndex.value + 1} reset`)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to reset race'
      console.error('Reset race error:', err)
    }
  }

  /**
   * Set selected race index
   */
  const setSelectedRaceIndex = (index: number) => {
    if (raceDay.value?.races[index]) {
      selectedRaceIndex.value = index
      selectedRoundIndex.value = 0 // Reset round to first when race changes
    }
  }

  const setSelectedRoundIndex = (index: number) => {
    selectedRoundIndex.value = index
  }

  /**
   * Select date for race day
   */
  const selectDate = async (date: string) => {
    selectedDate.value = date
    raceDay.value = null // Clear current race day
    selectedRaceIndex.value = 0

    // Update query string
    updateQueryString(date)

    // Generate new race day for selected date
    if (horses.value.length > 0) {
      await generateRaceDay()
    }
  }

  /**
   * Initialize store
   * Load horses and generate race day if needed
   */
  const initialize = async () => {
    // Load horses if not already loaded
    if (horses.value.length === 0) {
      await loadHorses()
    }

    // Generate race day if not exists
    if (!raceDay.value && horses.value.length > 0) {
      await generateRaceDay()
    }

    // Ensure query string is in sync
    updateQueryString(selectedDate.value)
  }

  /**
   * Clear error
   */
  const clearError = () => {
    error.value = null
  }

  return {
    // State
    horses,
    raceDay,
    selectedRaceIndex,
    selectedRoundIndex,
    currentRoundIndex,
    selectedDate,
    isRunning,
    isLoading,
    error,

    // Computed
    selectedRace,
    roundOptions,
    canStart,

    // Actions
    loadHorses,
    generateRaceDay,
    startRaceDay,
    pauseRaceDay,
    resetRaceDay,
    setSelectedRaceIndex,
    setSelectedRoundIndex,
    selectDate,
    initialize,
    clearError,
  }
})
