import type { Horse } from '@/modules/horse/types/horse'
import type { RaceDay, RaceDayGenerationOptions } from '../types/'
import { MockService } from './mock'
import { RaceService } from './race'

/**
 * Program Service for Race Operations
 * Handles race day generation and execution
 */
export class ProgramService {
  /**
   * Generate race day program
   */
  static async generateRaceDay(
    horses: Horse[],
    date: string,
    options?: RaceDayGenerationOptions,
  ): Promise<RaceDay> {
    return MockService.generateRaceDayAPI(horses, date, options)
  }

  /**
   * Execute a specific race (all 6 rounds)
   */
  static async executeRace(
    raceDay: RaceDay,
    raceIndex: number,
    shouldCancel?: () => boolean,
  ): Promise<RaceDay> {
    const race = raceDay.races[raceIndex]
    if (!race) {
      throw new Error(`Race at index ${raceIndex} not found`)
    }

    // Pist availability is already checked in the store before calling this service
    // Pist status is managed by the store, not here

    // Update race status
    race.status = 'running'
    raceDay.currentRaceIndex = raceIndex
    // Don't reset currentRoundIndex - keep it for resume functionality

    // Execute rounds starting from current round index
    for (let roundIndex = raceDay.currentRoundIndex; roundIndex < 6; roundIndex++) {
      // Check for cancellation before each round
      if (shouldCancel && shouldCancel()) {
        return raceDay
      }

      const round = race.rounds[roundIndex]

      // Execute single round using RaceService
      await RaceService.executeRound(race, roundIndex, shouldCancel)

      // Check for cancellation after each round
      if (shouldCancel && shouldCancel()) {
        return raceDay
      }

      // Update round status
      round.status = 'completed'
      raceDay.currentRoundIndex = roundIndex + 1

      // No delay between rounds - horses continue immediately
    }

    // Only calculate final results if we actually completed all rounds
    if (raceDay.currentRoundIndex >= 6) {
      // Calculate final results using RaceService
      const finalResults = RaceService.calculateFinalResults(race)
      race.finalResults = finalResults
      race.status = 'completed'
    }

    // Pist status will be managed by the store when race completes
    return raceDay
  }

  /**
   * Pause race execution
   */
  static async pauseRace(raceDay: RaceDay): Promise<RaceDay> {
    // Don't change race status when paused - keep it as 'running'
    // The pause state is managed by the store, not here
    return raceDay
  }

  /**
   * Reset race to initial state
   */
  static async resetRace(raceDay: RaceDay, raceIndex: number): Promise<RaceDay> {
    const race = raceDay.races[raceIndex]
    if (!race) {
      throw new Error(`Race at index ${raceIndex} not found`)
    }

    // Reset race status
    race.status = 'pending'
    race.finalResults = undefined
    race.startDate = undefined

    // Reset all rounds
    race.rounds.forEach((round) => {
      round.status = 'pending'
      round.results = undefined
      round.startTime = undefined
      round.endTime = undefined
    })

    // Reset race horses
    race.selectedHorses.forEach((horse) => {
      horse.progress = 0
      horse.speed = 0
      horse.position = 0
    })

    return raceDay
  }

  /**
   * Get race statistics using RaceService
   */
  static getRaceStats(raceDay: RaceDay): {
    totalRaces: number
    completedRaces: number
    totalHorses: number
    averageRaceTime: number
    fastestHorse: string
    mostWins: string
  } {
    return RaceService.getRaceStats(raceDay)
  }
}
