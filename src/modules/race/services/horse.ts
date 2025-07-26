import type { Horse } from '../types/raceHorse'
import { MockService } from './mock'

/**
 * Horse service for horse-related operations
 * Uses mock service for development, can be replaced with real API calls
 */
export class HorseService {
  /**
   * Get all horses from API
   */
  static async getHorses(): Promise<Horse[]> {
    return MockService.getHorses()
  }

  /**
   * Get horse by ID from API
   */
  static async getHorseById(id: string): Promise<Horse | null> {
    const horses = await MockService.getHorses()
    return horses.find((horse) => horse.id === id) ?? null
  }

  /**
   * Update horse condition via API
   */
  static async updateHorseCondition(id: string, condition: number): Promise<Horse> {
    const horses = await MockService.getHorses()
    const horse = horses.find((h) => h.id === id)

    if (!horse) {
      throw new Error(`Horse with ID ${id} not found`)
    }

    return { ...horse, condition }
  }

  /**
   * Get horses for race selection
   */
  static async getHorsesForRace(): Promise<Horse[]> {
    const horses = await this.getHorses()
    return horses.map((horse) => ({ ...horse, isSelected: false }))
  }
}
