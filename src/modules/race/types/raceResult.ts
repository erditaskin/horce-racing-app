import type { Horse } from '@/modules/horse/types/horse'
import type { RaceRoundResult } from './raceRound'

/**
 * Race Result - final results for a race (from Round 6)
 */
export interface RaceResult {
  horseId: string
  horse: Horse
  position: number // Final position in the race
  finishTime: number // Total time across all 6 rounds
  averageSpeed: number // Average speed across all rounds
  roundResults: RaceRoundResult[] // Results from each round
}
