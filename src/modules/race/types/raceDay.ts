import type { Race } from '.'
import type { RacePistStatus } from './raceProgram'
import type { RaceVenue } from './raceVenue'

/**
 * Race Day - represents a full day of racing
 * Contains 7-11 races (randomized) at a specific venue
 */
export interface RaceDay {
  weather: RaceDayWeather
  date: string // "2025-07-05"
  venue: RaceVenue // Venue/arena information
  races: Race[] // 7-11 races for this day
  status: 'pending' | 'generated' | 'running' | 'completed'
  currentRaceIndex: number // Currently running race
  currentRoundIndex: number // Currently running round
  pistStatus: RacePistStatus // Track pist availability
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

export type RaceDayWeather = 'sunny' | 'foggy' | 'rainy' | 'snowy' | 'cloudy' | 'windy'

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
