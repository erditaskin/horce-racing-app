import type { AppOption } from '@/lib/types/option'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { HorseService } from '../services/horse'
import { ProgramService } from '../services/program'
import type { RaceDay, RaceDayGenerationOptions } from '../types'
import type { Horse } from '../types/raceHorse'

/**
 * Race Board Store
 * Manages race board state and operations
 * Demonstrates enterprise-level state management patterns
 */
export const useRaceBoardStore = defineStore('raceBoard', () => {
  const router = useRouter()

  // Helper functions for URL synchronization
  const getInitialDate = (): string => {
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

  const getInitialRaceNumber = (): string | null => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('race')
  }

  const updateQueryString = (date: string, raceNumber?: string) => {
    const query: Record<string, string> = { day: date }
    if (raceNumber) {
      query.race = raceNumber
    }

    // Use router to update URL without page reload
    router.replace({ query: { ...router.currentRoute.value.query, ...query } })
  }

  // State
  const horses = ref<Horse[]>([])
  const raceDay = ref<RaceDay | null>(null)
  const selectedRaceIndex = ref(0)
  const selectedRoundIndex = ref(0)
  const selectedDate = ref(getInitialDate())
  const isRunning = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isPaused = ref(false)
  const shouldCancelRace = ref(false)

  // Pist-specific state tracking
  const runningPists = ref<Set<'grass' | 'sand'>>(new Set())
  const loadingPists = ref<Set<'grass' | 'sand'>>(new Set())
  const pausedPists = ref<Set<'grass' | 'sand'>>(new Set())

  // Track paused round index for each pist type
  const pausedRoundIndex = ref<Map<'grass' | 'sand', number>>(new Map())

  // Persistence helpers
  const STORAGE_KEY = 'raceBoard_persistedDays'
  const MAX_STORED_DAYS = 30 // Keep last 30 days

  const saveRaceDayToStorage = (date: string, raceDay: RaceDay): void => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const persistedDays: Record<string, RaceDay> = stored ? JSON.parse(stored) : {}

      // Save the race day
      persistedDays[date] = raceDay

      // Clean up old entries if we exceed max stored days
      const dates = Object.keys(persistedDays)
      if (dates.length > MAX_STORED_DAYS) {
        // Sort by date and remove oldest
        dates.sort()
        const datesToRemove = dates.slice(0, dates.length - MAX_STORED_DAYS)
        datesToRemove.forEach((dateToRemove) => delete persistedDays[dateToRemove])
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedDays))
    } catch (error) {
      console.error('Failed to save race day to storage:', error)
    }
  }

  const loadRaceDayFromStorage = (date: string): RaceDay | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return null

      const persistedDays: Record<string, RaceDay> = JSON.parse(stored)
      return persistedDays[date] ?? null
    } catch (error) {
      console.error('Failed to load race day from storage:', error)
      return null
    }
  }

  const clearRaceDayFromStorage = (date: string): void => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return

      const persistedDays: Record<string, RaceDay> = JSON.parse(stored)
      delete persistedDays[date]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedDays))
    } catch (error) {
      console.error('Failed to clear race day from storage:', error)
    }
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
    const pistAvailable = selectedRace.value ? isPistAvailable(selectedRace.value.pistType) : false

    // Check if the specific pist is not running/loading
    const pistNotRunning = selectedRace.value
      ? !runningPists.value.has(selectedRace.value.pistType) &&
        !loadingPists.value.has(selectedRace.value.pistType)
      : true

    return hasRaceDay && isGenerated && pistAvailable && pistNotRunning
  })

  /**
   * Check if pist is available for the selected race
   */
  const isPistAvailable = (pistType: 'grass' | 'sand'): boolean => {
    if (!raceDay.value) return false

    const pistStatus = raceDay.value.pistStatus[pistType]
    return pistStatus.isAvailable
  }

  /**
   * Get pist status for display
   */
  const pistStatus = computed(() => {
    if (!raceDay.value) return null

    return raceDay.value.pistStatus
  })

  // Overlay computed properties - now based on race status
  const currentOverlayState = computed(
    (): 'pre-race' | 'countdown' | 'running' | 'post-race' | 'paused' | null => {
      if (!selectedRace.value) return null

      const race = selectedRace.value

      // If race is completed, show post-race overlay
      if (race.status === 'completed') {
        return 'post-race'
      }

      // If race is running, check if it's paused
      if (race.status === 'running') {
        // Check if this specific race's pist is paused
        if (pausedPists.value.has(race.pistType)) {
          return 'paused'
        }
        return 'running'
      }

      // If race is pending, show pre-race overlay
      if (race.status === 'pending') {
        return 'pre-race'
      }

      return null
    },
  )

  const finalResults = computed(() => {
    if (!selectedRace.value?.finalResults) return []
    return selectedRace.value.finalResults
  })

  /**
   * Check if the selected race's pist is paused
   */
  const isSelectedRacePaused = computed(() => {
    if (!selectedRace.value) return false
    const isPaused = pausedPists.value.has(selectedRace.value.pistType)
    return isPaused
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
      isLoading.value = true
      error.value = null

      raceDay.value = await ProgramService.generateRaceDay(
        horses.value,
        selectedDate.value,
        options,
      )
      selectedRaceIndex.value = 0

      // Save the generated race day to storage
      if (raceDay.value) {
        saveRaceDayToStorage(selectedDate.value, raceDay.value)
      }
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
    if (!raceDay.value || !selectedRace.value) return

    try {
      const pistType = selectedRace.value.pistType

      // Check if race is already running (for pause/resume functionality)
      if (selectedRace.value.status === 'running') {
        if (pausedPists.value.has(pistType)) {
          // Resume race - remove from paused set and restart execution
          const pausedRound = pausedRoundIndex.value.get(pistType) ?? 0
          pausedRoundIndex.value.delete(pistType)

          pausedPists.value.delete(pistType)
          shouldCancelRace.value = false

          // Set the current round index to where it was paused
          if (raceDay.value) {
            raceDay.value.currentRoundIndex = pausedRound
          }

          // Restart race execution
          await executeRaceAfterCountdown()
          return
        } else {
          // Pause race
          await pauseRaceDay()
        }
        return
      }

      // Starting a NEW race - reset currentRoundIndex to 0
      if (raceDay.value) {
        raceDay.value.currentRoundIndex = 0
      }

      // Check if this specific pist is already running or loading
      if (runningPists.value.has(pistType) || loadingPists.value.has(pistType)) {
        return
      }

      // Check pist availability
      if (!isPistAvailable(pistType)) {
        return
      }

      // Mark pist as unavailable
      if (raceDay.value) {
        raceDay.value.pistStatus[pistType].isAvailable = false
        raceDay.value.pistStatus[pistType].currentRaceId = selectedRace.value.id
      }

      // Set race status to running
      selectedRace.value.status = 'running'

      // Add to running and loading sets
      runningPists.value.add(pistType)
      loadingPists.value.add(pistType)

      // Start race execution
      await executeRaceAfterCountdown()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to start race'
      console.error('Start race error:', err)
    }
  }

  /**
   * Execute race after countdown completes
   */
  const executeRaceAfterCountdown = async () => {
    if (!raceDay.value) return

    try {
      isLoading.value = true
      isRunning.value = true
      error.value = null

      // Set race status to running
      if (selectedRace.value) {
        selectedRace.value.status = 'running'
      }

      // Execute only the selected race with cancellation support
      // Create a race-specific cancellation function
      const raceIndex = selectedRaceIndex.value
      const racePistType = selectedRace.value?.pistType

      raceDay.value = await ProgramService.executeRace(raceDay.value!, raceIndex, () => {
        // Check if THIS SPECIFIC RACE's pist is paused or cancelled
        // Use the race index and pist type from when execution started
        return (
          shouldCancelRace.value || (racePistType ? pausedPists.value.has(racePistType) : false)
        )
      })

      // Check if race was cancelled or paused
      const pistType = selectedRace.value?.pistType
      const isPaused = pistType ? pausedPists.value.has(pistType) : false

      if (shouldCancelRace.value || isPaused) {
        if (shouldCancelRace.value) {
          // Reset pist status if race was cancelled
          if (selectedRace.value) {
            const pistType = selectedRace.value.pistType
            raceDay.value.pistStatus[pistType].isAvailable = true
            raceDay.value.pistStatus[pistType].currentRaceId = undefined
            runningPists.value.delete(pistType)
            loadingPists.value.delete(pistType)
            pausedPists.value.delete(pistType)
          }
          shouldCancelRace.value = false

          // Only call fixPistStatus if no races are running at all
          const anyRunningRaces =
            raceDay.value?.races.some((race) => race.status === 'running') ?? false
          if (!anyRunningRaces) {
            fixPistStatus()
          }
        }

        // If paused, keep pist occupied but stop execution
        // Don't call fixPistStatus() when paused - keep pist occupied
        isRunning.value = false
        return
      }

      // Race completed - mark pist as available again
      if (selectedRace.value && selectedRace.value.status === 'completed') {
        const pistType = selectedRace.value.pistType
        raceDay.value.pistStatus[pistType].isAvailable = true
        raceDay.value.pistStatus[pistType].currentRaceId = undefined
        runningPists.value.delete(pistType)
        loadingPists.value.delete(pistType)
      }

      // Fix pist status to ensure consistency
      fixPistStatus()

      isRunning.value = false
    } catch (err) {
      console.error('Error in executeRaceAfterCountdown:', err)
      isRunning.value = false
      error.value = err instanceof Error ? err.message : 'Failed to execute race'
      console.error('Start race error:', err)

      // Reset pist state on error
      if (selectedRace.value) {
        const pistType = selectedRace.value.pistType
        runningPists.value.delete(pistType)
        loadingPists.value.delete(pistType)
      }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Pause selected race
   */
  const pauseRaceDay = async () => {
    if (!raceDay.value || !selectedRace.value) return

    try {
      const pistType = selectedRace.value.pistType
      const currentRound = raceDay.value.currentRoundIndex

      // Mark this specific pist as paused
      pausedPists.value.add(pistType)

      // Store the current round index for this pist
      pausedRoundIndex.value.set(pistType, currentRound)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to pause race'
      console.error('Pause race error:', err)
    }
  }

  /**
   * Reset selected race
   */
  const resetRaceDay = async () => {
    if (!raceDay.value || !selectedRace.value) {
      return
    }

    try {
      const pistType = selectedRace.value.pistType

      // Cancel any ongoing race execution for this specific pist
      shouldCancelRace.value = true

      // Wait a bit to ensure cancellation is processed
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Reset the specific race
      selectedRace.value.status = 'pending'
      selectedRace.value.finalResults = undefined
      selectedRace.value.endDate = undefined

      // Reset all rounds for this race
      selectedRace.value.rounds.forEach((round) => {
        round.status = 'pending'
        round.results = undefined
        round.startTime = undefined
        round.endTime = undefined
      })

      // Reset race horses
      selectedRace.value.selectedHorses.forEach((horse) => {
        horse.progress = 0
        horse.speed = 0
        horse.position = 0
      })

      // Clear pist status for this specific race
      if (raceDay.value) {
        raceDay.value.pistStatus[pistType].isAvailable = true
        raceDay.value.pistStatus[pistType].currentRaceId = undefined
      }

      // Remove from running/loading/paused sets
      runningPists.value.delete(pistType)
      loadingPists.value.delete(pistType)
      pausedPists.value.delete(pistType)
      pausedRoundIndex.value.delete(pistType)

      // Reset cancellation flag after reset
      shouldCancelRace.value = false

      // Clear persisted data for this date since we're resetting
      clearRaceDayFromStorage(selectedDate.value)
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

      // Update query string with race number (not full ID since we have date in day param)
      const race = raceDay.value.races[index]
      updateQueryString(selectedDate.value, race.raceNumber.toString())
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
    selectedRaceIndex.value = 0

    // Update query string (clear race ID when date changes)
    updateQueryString(date)

    // Try to load from storage first
    const persistedRaceDay = loadRaceDayFromStorage(date)

    if (persistedRaceDay) {
      // Use persisted race day
      raceDay.value = persistedRaceDay
    } else {
      // Clear current race day and generate new one
      raceDay.value = null
      if (horses.value.length > 0) {
        await generateRaceDay()
      }
    }
  }

  /**
   * Initialize the store
   */
  const initialize = async () => {
    try {
      isLoading.value = true
      error.value = null

      // Load horses if not already loaded
      if (horses.value.length === 0) {
        await loadHorses()
      }

      // Generate race day if not exists
      if (!raceDay.value && horses.value.length > 0) {
        await generateRaceDay()
      }

      // Fix any inconsistent pist status
      if (raceDay.value) {
        fixPistStatus()
      }

      // Handle race selection from query string or default to first race
      await handleRaceSelection()

      // Ensure query string is in sync (add race param if missing)
      const urlParams = new URLSearchParams(window.location.search)
      if (!urlParams.get('race') && raceDay.value?.races[selectedRaceIndex.value]) {
        updateQueryString(
          selectedDate.value,
          raceDay.value.races[selectedRaceIndex.value].raceNumber.toString(),
        )
      }

      // Watch for race status changes to update pist status and save to storage
      if (raceDay.value) {
        watch(
          () => raceDay.value?.races.map((race) => race.status),
          () => {
            fixPistStatus()
            // Save updated race day to storage
            if (raceDay.value) {
              saveRaceDayToStorage(selectedDate.value, raceDay.value)
            }
          },
          { deep: true },
        )

        // Also watch for other race day changes to save to storage
        watch(
          raceDay,
          (newRaceDay) => {
            if (newRaceDay) {
              saveRaceDayToStorage(selectedDate.value, newRaceDay)
            }
          },
          { deep: true },
        )
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to initialize'
      console.error('Initialization error:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fix any inconsistent pist status
   * If no race is running, all pist should be available
   */
  const fixPistStatus = () => {
    if (!raceDay.value) return

    const runningRaces = raceDay.value.races.filter((race) => race.status === 'running')

    if (runningRaces.length === 0) {
      // No races running, set all pist to available
      raceDay.value.pistStatus.grass.isAvailable = true
      raceDay.value.pistStatus.grass.currentRaceId = undefined
      raceDay.value.pistStatus.sand.isAvailable = true
      raceDay.value.pistStatus.sand.currentRaceId = undefined

      // Clear all sets
      runningPists.value.clear()
      loadingPists.value.clear()
      pausedPists.value.clear()
      pausedRoundIndex.value.clear()
    } else {
      // There are running races, update pist status accordingly

      // Clear all sets first, then add only the running races
      runningPists.value.clear()
      loadingPists.value.clear()
      // Don't clear pausedPists - maintain pause state

      runningRaces.forEach((runningRace) => {
        if (raceDay.value) {
          raceDay.value.pistStatus[runningRace.pistType].isAvailable = false
          raceDay.value.pistStatus[runningRace.pistType].currentRaceId = runningRace.id
        }

        // Add to running pist set
        runningPists.value.add(runningRace.pistType)

        // Only add to loading if not paused
        if (!pausedPists.value.has(runningRace.pistType)) {
          loadingPists.value.add(runningRace.pistType)
        }
      })

      // Set current race index to the first running race
      if (raceDay.value && runningRaces.length > 0) {
        const firstRunningRaceIndex = raceDay.value.races.findIndex(
          (race) => race.id === runningRaces[0].id,
        )
        if (firstRunningRaceIndex >= 0) {
          raceDay.value.currentRaceIndex = firstRunningRaceIndex
        }
      }
    }
  }

  /**
   * Handle race selection from query string or default to first race
   */
  const handleRaceSelection = async () => {
    if (!raceDay.value?.races.length) return

    const raceNumberFromQuery = getInitialRaceNumber()

    if (raceNumberFromQuery) {
      // Try to find race by race number from query string
      const raceIndex = raceDay.value.races.findIndex(
        (race) => race.raceNumber.toString() === raceNumberFromQuery,
      )
      if (raceIndex >= 0) {
        selectedRaceIndex.value = raceIndex
        return
      }
    }

    // Default to first race if no valid race number in query string
    selectedRaceIndex.value = 0
    const firstRace = raceDay.value.races[0]
    updateQueryString(selectedDate.value, firstRace.raceNumber.toString())
  }

  /**
   * Clear error
   */
  const clearError = () => {
    error.value = null
  }

  const clearAllPersistedData = (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Failed to clear persisted data:', error)
    }
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
    isPaused,

    // Computed
    selectedRace,
    roundOptions,
    canStart,
    currentOverlayState,
    finalResults,
    pistStatus,
    isSelectedRacePaused,

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
    clearAllPersistedData,
    isPistAvailable,
  }
})
