import type { Horse } from '@/modules/horse/types/horse'

/**
 * Mock horse data for the race module
 * Demonstrates enterprise-level mock data organization
 */
export const MOCK_HORSES: Horse[] = [
  { id: '1', name: 'Ada Lovelace', color: '#ef4444', condition: 80, isSelected: false },
  { id: '2', name: 'Grace Hopper', color: '#3b82f6', condition: 45, isSelected: false },
  { id: '3', name: 'Margaret Hamilton', color: '#f59e0b', condition: 60, isSelected: false },
  { id: '4', name: 'Joan Clarke', color: '#10b981', condition: 95, isSelected: false },
  { id: '5', name: 'Katherine Johnson', color: '#8b5cf6', condition: 88, isSelected: false },
  { id: '6', name: 'Dorothy Vaughan', color: '#f97316', condition: 72, isSelected: false },
  { id: '7', name: 'Mary Jackson', color: '#06b6d4', condition: 83, isSelected: false },
  { id: '8', name: 'Annie Easley', color: '#84cc16', condition: 67, isSelected: false },
  { id: '9', name: 'Frances Spence', color: '#ec4899', condition: 91, isSelected: false },
  { id: '10', name: 'Betty Holberton', color: '#22c55e', condition: 78, isSelected: false },
  { id: '11', name: 'Jean Bartik', color: '#6366f1', condition: 85, isSelected: false },
  { id: '12', name: 'Marlyn Meltzer', color: '#14b8a6', condition: 69, isSelected: false },
  { id: '13', name: 'Ruth Teitelbaum', color: '#fbbf24', condition: 94, isSelected: false },
  { id: '14', name: 'Kay McNulty', color: '#a855f7', condition: 76, isSelected: false },
  { id: '15', name: 'Frances Bilas', color: '#64748b', condition: 82, isSelected: false },
  { id: '16', name: 'Betty Jean Jennings', color: '#e2e8f0', condition: 87, isSelected: false },
  { id: '17', name: 'Ruth Lichterman', color: '#475569', condition: 73, isSelected: false },
  { id: '18', name: 'Elaine Spielman', color: '#cbd5e1', condition: 89, isSelected: false },
  { id: '19', name: 'Marlyn Wescoff', color: '#dc2626', condition: 77, isSelected: false },
  { id: '20', name: 'Doris Polsky', color: '#1e40af', condition: 81, isSelected: false },
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
