/**
 * Horse-related types for the Race module
 * Consolidated under RaceHorse to handle all horse-related functionality
 */

// Base Horse interface
export interface Horse {
  id: string
  name: string
  color: string
  condition: number // 0-100
  isSelected: boolean
}

// Horse performance metrics
export interface HorsePerformance {
  horseId: string
  speed: number
  stamina: number
  acceleration: number
  totalScore: number
}

// Horse statistics
export interface HorseStats {
  totalRaces: number
  wins: number
  averageFinishTime: number
  bestFinishTime: number
}

// Race Horse - horse participating in a specific race
export interface RaceHorse {
  horseId: string
  horse: Horse
  laneNumber: number
  progress: number // 0-100
  speed: number
  position: number
}
