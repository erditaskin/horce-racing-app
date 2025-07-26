import type { Horse } from './raceHorse'

/**
 * Race Result - final results for a race (from Round 6)
 */
export interface RaceResult {
  horseId: string
  horse: Horse
  position: number // Final position in the race
  finishTime: number // Total time across all 6 rounds
  speed: number // Average speed across all rounds
}
