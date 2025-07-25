import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { HorseService } from '../services/horse'
import type { Horse } from '../types/horse'

export const useHorseStore = defineStore('horse', () => {
  // State
  const horses = ref<Horse[]>([])
  const selectedHorses = ref<Horse[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const totalHorses = computed(() => horses.value.length)
  const selectedHorseIds = computed(() => selectedHorses.value.map((horse: Horse) => horse.id))
  const availableHorses = computed(() => horses.value.filter((horse: Horse) => !horse.isSelected))

  // Actions
  const fetchHorses = async (): Promise<void> => {
    isLoading.value = true
    error.value = null
    
    try {
      // Use HorseService instead of direct mock
      const fetchedHorses = await HorseService.fetchHorses()
      horses.value = fetchedHorses
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch horses'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const selectHorse = (horseId: string): void => {
    const horse = horses.value.find((h: Horse) => h.id === horseId)
    if (horse && !horse.isSelected && selectedHorses.value.length < 10) {
      horse.isSelected = true
      selectedHorses.value.push(horse)
    }
  }

  const deselectHorse = (horseId: string): void => {
    const horse = horses.value.find((h: Horse) => h.id === horseId)
    if (horse && horse.isSelected) {
      horse.isSelected = false
      selectedHorses.value = selectedHorses.value.filter((h: Horse) => h.id !== horseId)
    }
  }

  const clearSelection = (): void => {
    horses.value.forEach((horse: Horse) => {
      horse.isSelected = false
    })
    selectedHorses.value = []
  }

  const selectRandomHorses = (count: number = 10): void => {
    clearSelection()
    const available = [...horses.value]
    const selectedCount = Math.min(count, available.length)
    
    for (let i = 0; i < selectedCount; i++) {
      const randomIndex = Math.floor(Math.random() * available.length)
      const horse = available.splice(randomIndex, 1)[0]
      selectHorse(horse.id)
    }
  }

  const updateHorseCondition = async (horseId: string, condition: number): Promise<void> => {
    try {
      // Use HorseService to update condition
      const updatedHorse = await HorseService.updateHorseCondition(horseId, condition)
      
      // Update local state
      const horse = horses.value.find((h: Horse) => h.id === horseId)
      if (horse) {
        horse.condition = updatedHorse.condition
      }
    } catch (error) {
      console.error('Failed to update horse condition:', error)
      throw error
    }
  }

  return {
    // State
    horses,
    selectedHorses,
    isLoading,
    error,
    
    // Getters
    totalHorses,
    selectedHorseIds,
    availableHorses,
    
    // Actions
    fetchHorses,
    selectHorse,
    deselectHorse,
    clearSelection,
    selectRandomHorses,
    updateHorseCondition
  }
}) 