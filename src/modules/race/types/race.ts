import type { Horse } from '@/modules/horse/types/horse'

/**
 * Individual horse in a race
 */
export interface RaceHorse {
  horseId: string
  horse: Horse
  laneNumber: number
  position: number
  progress: number
  speed: number
  finishTime?: number
  finishPosition?: number
}

/**
 * Race result for a horse
 */
export interface RaceResult {
  position: number
  horseId: string
  horse: Horse
  finishTime: number
  averageSpeed: number
}

/**
 * Individual race with specific distance and time
 */
export interface Race {
  id: string
  raceNumber: number // 1-6
  distance: number // 1200, 1400, 1600, 1800, 2000, 2200
  startTime: string // "13:00", "13:30", etc.
  status: 'pending' | 'in-progress' | 'completed'
  selectedHorses: RaceHorse[] // 10 horses from pool
  results: RaceResult[]
  startDate?: Date
  endDate?: Date
}

/**
 * Complete race day program
 */
export interface RaceDay {
  id: string
  date: string // YYYY-MM-DD format
  races: Race[] // 6 races for the day
  status: 'generated' | 'running' | 'completed'
  currentRaceIndex: number
  createdAt: Date
  updatedAt: Date
}

/**
 * Options for generating race day
 */
export interface RaceDayGenerationOptions {
  horseCount?: number // Default: 10 horses per race
  raceCount?: number // Default: 6 races
  startTime?: string // Default: "13:00"
  timeInterval?: number // Default: 30 minutes between races
}

/**
 * Options for race execution
 */
export interface RaceExecutionOptions {
  animationSpeed?: number // milliseconds between updates
  autoStart?: boolean // automatically start next race
}

/**
 * Race day statistics
 */
export interface RaceDayStats {
  totalRaces: number
  completedRaces: number
  currentRace: number
  isComplete: boolean
  isRunning: boolean
}
