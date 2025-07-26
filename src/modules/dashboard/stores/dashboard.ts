import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { DashboardService } from '../services/dashboard'
import type {
  DashboardHorsePoolStats,
  DashboardRaceDaySummary,
  DashboardStats,
  TopPerformer,
} from '../types'
import { getInitialDate, updateQueryString } from '../utils/urlHelpers'

export const useDashboardStore = defineStore('dashboard', () => {
  // State
  const selectedDate = ref<string>(getInitialDate())
  const raceDaySummary = ref<DashboardRaceDaySummary | null>(null)
  const statistics = ref<DashboardStats | null>(null)
  const topPerformers = ref<TopPerformer[]>([])
  const horsePoolStats = ref<DashboardHorsePoolStats | null>(null)
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // Computed
  const isDataLoaded = computed(() => {
    return (
      raceDaySummary.value !== null &&
      statistics.value !== null &&
      topPerformers.value.length > 0 &&
      horsePoolStats.value !== null
    )
  })

  const completionRate = computed(() => {
    if (!statistics.value) return 0
    return Math.round((statistics.value.completedRaces / statistics.value.totalRaces) * 100)
  })

  const todayRaces = computed(() => {
    return raceDaySummary.value?.races ?? []
  })

  const completedRaces = computed(() => {
    return todayRaces.value.filter((race) => race.status === 'completed')
  })

  const pendingRaces = computed(() => {
    return todayRaces.value.filter((race) => race.status === 'pending')
  })

  const runningRaces = computed(() => {
    return todayRaces.value.filter((race) => race.status === 'running')
  })

  // Actions
  const initialize = async () => {
    await selectDate(selectedDate.value)
  }

  const selectDate = async (date: string) => {
    try {
      isLoading.value = true
      error.value = null
      selectedDate.value = date

      // Update URL query string
      updateQueryString(date)

      // Fetch all dashboard data
      const data = await DashboardService.getAllDashboardData(date)

      statistics.value = data.stats
      topPerformers.value = data.topPerformers
      raceDaySummary.value = data.raceDaySummary
      horsePoolStats.value = data.horsePoolStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load dashboard data'
      console.error('Dashboard data loading error:', err)
    } finally {
      isLoading.value = false
    }
  }

  const refreshData = async () => {
    if (selectedDate.value) {
      await selectDate(selectedDate.value)
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    selectedDate,
    raceDaySummary,
    statistics,
    topPerformers,
    horsePoolStats,
    isLoading,
    error,

    // Computed
    isDataLoaded,
    completionRate,
    todayRaces,
    completedRaces,
    pendingRaces,
    runningRaces,

    // Actions
    initialize,
    selectDate,
    refreshData,
    clearError,
  }
})
