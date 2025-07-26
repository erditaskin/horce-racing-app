/**
 * Race Program/Arena Details for Display
 */
export interface RaceProgram {
  venueName: string
  pistStatus: RacePistStatus
  totalRaces: number
  completedRaces: number
}

/**
 * Pist Status - Track which pist is available for racing
 */
export interface RacePistStatus {
  grass: {
    isAvailable: boolean
    currentRaceId?: string // ID of race currently using this pist
  }
  sand: {
    isAvailable: boolean
    currentRaceId?: string // ID of race currently using this pist
  }
}
