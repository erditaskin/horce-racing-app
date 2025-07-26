import type { RaceHorse, RaceResult } from '.'
import type { RaceRound } from './raceRound'
import type { RaceVenuePistType } from './raceVenue'

/**
 * Race - represents a single race with 6 rounds
 * Each race has 10 selected horses that run all 6 rounds
 */
export interface Race {
  id: string
  name: string // "Sir Winston Special Run"
  raceNumber: number // 1, 2, 3, etc.
  startTime: string // "13:00", "13:30", etc.
  pistType: RaceVenuePistType // 'grass' or 'sand' - which pist this race uses
  rounds: RaceRound[] // Exactly 6 rounds
  selectedHorses: RaceHorse[] // 10 horses for this race
  status: 'pending' | 'countdown' | 'running' | 'completed'
  finalResults?: RaceResult[] // Final results from Round 6 only
  startDate?: string
  endDate?: string
}

/**
 * Race Execution Options
 */
export interface RaceExecutionOptions {
  animationSpeed?: number // Animation duration in ms
  autoStart?: boolean // Auto-start next race
}
