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

  const roundOptions = computed((): AppOption[] => {
    if (!raceDay.value?.races.length) return []
    return raceDay.value.races.map((race, index) => ({
      value: index,
      label: `Race ${race.raceNumber} - ${race.distance}m`,
    }))
  })

  const canStart = computed(
    () => !!raceDay.value && raceDay.value.status === 'generated' && !isLoading.value,
  )

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
      isLoading.value = true
      error.value = null

      raceDay.value = await ProgramService.generateRaceDay(
        horses.value,
        selectedDate.value,
        options,
      )
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
      // Pause
      isRunning.value = false
      return
    }

    try {
      isLoading.value = true
      isRunning.value = true
      error.value = null

      // Execute all races sequentially
      for (let i = 0; i < raceDay.value!.races.length; i++) {
        if (!isRunning.value) break // Check if paused

        raceDay.value = await ProgramService.executeRace(raceDay.value!, i, {
          animationSpeed: 50, // Faster animation
          autoStart: i < raceDay.value!.races.length - 1,
        })

        // Update selected race to show current progress
        selectedRaceIndex.value = i

        // Small delay between races
        if (i < raceDay.value!.races.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500))
        }
      }

      isRunning.value = false
    } catch (err) {
      isRunning.value = false
      error.value = err instanceof Error ? err.message : 'Failed to execute race day'
      console.error('Start race day error:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Pause race day execution
   */
  const pauseRaceDay = async () => {
    if (!raceDay.value) return

    try {
      isRunning.value = false
      raceDay.value = await ProgramService.pauseRace(raceDay.value)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to pause race day'
      console.error('Pause race day error:', err)
    }
  }

  /**
   * Reset race day program
   */
  const resetRaceDay = async () => {
    if (!raceDay.value) return

    try {
      raceDay.value = await ProgramService.resetProgram(raceDay.value)
      selectedRaceIndex.value = 0
      isRunning.value = false
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to reset race day'
      console.error('Reset race day error:', err)
    }
  }

  /**
   * Set selected race index
   */
  const setSelectedRaceIndex = (index: number) => {
    if (raceDay.value?.races[index]) {
      selectedRaceIndex.value = index
    }
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
    selectedDate,
    isLoading,
    isRunning,
    error,

    // Getters
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
    selectDate,
    initialize,
    clearError,
  }
})
