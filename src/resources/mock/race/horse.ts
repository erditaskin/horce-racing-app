import type { Horse } from '@/modules/horse/types/horse'

/**
 * Mock horse data for the race module
 * Demonstrates enterprise-level mock data organization
 */
export const MOCK_HORSES: Horse[] = [
  { id: '1', name: 'Haberbatur', color: '#ef4444', condition: 85, isSelected: false },
  { id: '2', name: 'Turbo', color: '#3b82f6', condition: 72, isSelected: false },
  { id: '3', name: 'Sergen', color: '#f59e0b', condition: 91, isSelected: false },
  { id: '4', name: 'Kafkaslı', color: '#10b981', condition: 68, isSelected: false },
  { id: '5', name: 'Kartal', color: '#8b5cf6', condition: 83, isSelected: false },
  { id: '6', name: 'Thunder Strike', color: '#f97316', condition: 79, isSelected: false },
  { id: '7', name: 'Bold Pilot', color: '#06b6d4', condition: 88, isSelected: false },
  { id: '8', name: 'Royal Flame', color: '#84cc16', condition: 74, isSelected: false },
  { id: '9', name: 'Silver Storm', color: '#ec4899', condition: 92, isSelected: false },
  { id: '10', name: 'Ayabakan', color: '#22c55e', condition: 67, isSelected: false },
  { id: '11', name: 'Wind Walker', color: '#6366f1', condition: 86, isSelected: false },
  { id: '12', name: 'Fire Spirit', color: '#14b8a6', condition: 71, isSelected: false },
  { id: '13', name: 'Sufi', color: '#fbbf24', condition: 95, isSelected: false },
  { id: '14', name: 'Night Rider', color: '#a855f7', condition: 78, isSelected: false },
  { id: '15', name: 'Star Gazer', color: '#64748b', condition: 84, isSelected: false },
  { id: '16', name: 'Moon Shadow', color: '#e2e8f0', condition: 69, isSelected: false },
  { id: '17', name: 'Desert Eagle', color: '#475569', condition: 87, isSelected: false },
  { id: '18', name: 'Karayel', color: '#cbd5e1', condition: 73, isSelected: false },
  { id: '19', name: 'Inspector', color: '#dc2626', condition: 90, isSelected: false },
  { id: '20', name: 'Caprice', color: '#1e40af', condition: 76, isSelected: false },
]

/**
 * Mock API service for horse data
 * Simulates real API calls with delays and error handling
 */
export class MockHorseService {
  /**
   * Get all horses (simulates API call)
   */
  static async getHorses(): Promise<Horse[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Simulate potential API error (1% chance)
    if (Math.random() < 0.01) {
      throw new Error('Failed to fetch horses from API')
    }

    return [...MOCK_HORSES]
  }

  /**
   * Get horse by ID (simulates API call)
   */
  static async getHorseById(id: string): Promise<Horse | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    return MOCK_HORSES.find((horse) => horse.id === id) ?? null
  }

  /**
   * Update horse condition (simulates API call)
   */
  static async updateHorseCondition(id: string, condition: number): Promise<Horse> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const horse = MOCK_HORSES.find((h) => h.id === id)
    if (!horse) {
      throw new Error(`Horse with ID ${id} not found`)
    }

    return { ...horse, condition }
  }
}
