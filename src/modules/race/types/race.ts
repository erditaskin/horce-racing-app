import type { Horse } from '@/modules/horse/types/horse'

/**
 * Race Round - represents a single round within a race
 * Each race has exactly 6 rounds with different distances
 */
export interface RaceRound {
  roundNumber: number // 1-6
  distance: number // 1200, 1400, 1600, 1800, 2000, 2200
  status: 'pending' | 'running' | 'completed'
  results?: RoundResult[]
  startTime?: number // When this round started
  endTime?: number // When this round ended
}

/**
 * Round Result - results for a specific round
 */
export interface RoundResult {
  horseId: string
  position: number // 1st, 2nd, 3rd, etc.
  finishTime: number // Time to complete this round (seconds)
  speed: number // km/h for this round
  progress: number // 0-100% progress for animation
}

/**
 * Race - represents a single race with 6 rounds
 * Each race has 10 selected horses that run all 6 rounds
 */
export interface Race {
  id: string
  name: string // "Sir Winston Special Run"
  raceNumber: number // 1, 2, 3, etc.
  startTime: string // "13:00", "13:30", etc.
  rounds: RaceRound[] // Exactly 6 rounds
  selectedHorses: RaceHorse[] // 10 horses for this race
  status: 'pending' | 'running' | 'completed'
  finalResults?: RaceResult[] // Final results from Round 6 only
  startDate?: string
  endDate?: string
}

/**
 * Race Horse - horse participating in a specific race
 */
export interface RaceHorse {
  horseId: string
  horse: Horse
  laneNumber: number
  position: number
  progress: number
  speed: number
}

/**
 * Race Result - final results for a race (from Round 6)
 */
export interface RaceResult {
  horseId: string
  horse: Horse
  position: number // Final position in the race
  finishTime: number // Total time across all 6 rounds
  averageSpeed: number // Average speed across all rounds
  roundResults: RoundResult[] // Results from each round
}

/**
 * Race Day - represents a full day of racing
 * Contains 7-11 races (randomized)
 */
export interface RaceDay {
  date: string // "2025-07-05"
  races: Race[] // 7-11 races for this day
  status: 'pending' | 'generated' | 'running' | 'completed'
  currentRaceIndex: number // Currently running race
  currentRoundIndex: number // Currently running round
}

/**
 * Race Day Generation Options
 */
export interface RaceDayGenerationOptions {
  minRaces?: number // Default: 7
  maxRaces?: number // Default: 11
  startTime?: string // Default: "13:00"
  timeInterval?: number // Minutes between races, default: 30
}

/**
 * Race Execution Options
 */
export interface RaceExecutionOptions {
  animationSpeed?: number // Animation duration in ms
  autoStart?: boolean // Auto-start next race
}

/**
 * Race Day Statistics
 */
export interface RaceDayStats {
  totalRaces: number
  completedRaces: number
  totalHorses: number
  averageRaceTime: number
  fastestHorse: string
  mostWins: string
}
