/**
 * Race Round - represents a single round within a race
 * Each race has exactly 6 rounds with different distances
 */
export interface RaceRound {
  roundNumber: number // 1-6
  distance: number // 1200, 1400, 1600, 1800, 2000, 2200
  status: 'pending' | 'running' | 'completed'
  results?: RaceRoundResult[]
  startTime?: number // When this round started
  endTime?: number // When this round ended
}

/**
 * Round Result - results for a specific round
 */
export interface RaceRoundResult {
  horseId: string
  position: number // 1st, 2nd, 3rd, etc.
  finishTime: number // Time to complete this round (seconds)
  speed: number // km/h for this round
  progress: number // 0-100% progress for animation
}
