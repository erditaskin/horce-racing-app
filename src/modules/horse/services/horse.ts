import type { Horse } from '../types/horse'
import { HorseMockService } from './mock'

/**
 * Horse service for horse-related operations
 * Uses mock service for development, can be replaced with real API calls
 */
export class HorseService {
  /**
   * Fetch all horses
   * Uses mock service for development
   */
  static async fetchHorses(): Promise<Horse[]> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Use mock service to generate horses
      const horses = HorseMockService.generateHorses(100)

      // Simulate API call (in real app, this would be: return Api.get('/horses'))
      return horses
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch horses'
      throw new Error(errorMessage)
    }
  }

  /**
   * Update horse condition
   * Mock implementation that simulates API call
   */
  static async updateHorseCondition(horseId: string, condition: number): Promise<Horse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // Generate mock response using mock service
      const mockHorse = HorseMockService.generateRandomHorseData()
      mockHorse.id = horseId
      mockHorse.condition = Math.max(0, Math.min(100, condition))

      // Simulate API call (in real app, this would be: return Api.patch(`/horses/${horseId}`, { condition }))
      return mockHorse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update horse condition'
      throw new Error(errorMessage)
    }
  }

  /**
   * Get horse by ID
   * Mock implementation
   */
  static async getHorseById(horseId: string): Promise<Horse | null> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))

      // Generate mock horse
      const mockHorse = HorseMockService.generateRandomHorseData()
      mockHorse.id = horseId

      // Simulate API call (in real app, this would be: return Api.get(`/horses/${horseId}`))
      return mockHorse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch horse'
      throw new Error(errorMessage)
    }
  }
} 