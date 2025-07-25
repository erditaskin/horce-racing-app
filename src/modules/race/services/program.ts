import type { Horse } from '@/modules/horse/types/horse'
import type {
  Race,
  RaceDay,
  RaceDayGenerationOptions,
  RaceResult,
  RoundResult,
} from '../types/race'
import { MockService } from './mock'

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
  static async executeRace(raceDay: RaceDay, raceIndex: number): Promise<RaceDay> {
    const race = raceDay.races[raceIndex]

    if (!race) {
      throw new Error(`Race at index ${raceIndex} not found`)
    }

    // Update race status
    race.status = 'running'
    raceDay.currentRaceIndex = raceIndex
    raceDay.currentRoundIndex = 0

    // Execute all 6 rounds with continuous flow
    for (let roundIndex = 0; roundIndex < 6; roundIndex++) {
      const round = race.rounds[roundIndex]

      // Execute single round
      await this.executeRound(race, roundIndex)

      // Update round status
      round.status = 'completed'
      raceDay.currentRoundIndex = roundIndex + 1

      // No delay between rounds - horses continue immediately
    }

    // Calculate final results from Round 6
    race.finalResults = this.calculateFinalResults(race)
    race.status = 'completed'
    race.endDate = new Date().toISOString()

    return raceDay
  }

  /**
   * Execute a single round within a race
   */
  private static async executeRound(race: Race, roundIndex: number): Promise<void> {
    const round = race.rounds[roundIndex]
    round.status = 'running'
    round.startTime = Date.now()

    // Set initial positions based on previous round results (except for Round 1)
    if (roundIndex > 0) {
      const previousRound = race.rounds[roundIndex - 1]
      if (previousRound.results) {
        // Sort horses by their previous round finish position
        const sortedResults = [...previousRound.results].sort((a, b) => a.position - b.position)

        // Update horse positions based on previous round finish order
        sortedResults.forEach((result, index) => {
          const raceHorse = race.selectedHorses.find((h) => h.horseId === result.horseId)
          if (raceHorse) {
            raceHorse.position = index + 1 // 1st, 2nd, 3rd, etc.
            raceHorse.progress = 0 // Start from beginning of track
          }
        })
      }
    } else {
      // Round 1: Reset all horses to starting positions
      race.selectedHorses.forEach((horse, index) => {
        horse.position = index + 1
        horse.progress = 0
      })
    }

    // Simulate horse progress for this round
    const roundResults = MockService.simulateHorseProgress(race.selectedHorses, round.distance)

    // Animate horses based on their performance
    await this.animateRound(race, roundResults)

    // Save round results
    round.results = roundResults
    round.endTime = Date.now()
  }

  /**
   * Animate horses during a round
   */
  private static async animateRound(race: Race, roundResults: RoundResult[]): Promise<void> {
    // Animation duration in milliseconds (3 seconds per round)
    const animationDuration = 3000

    // Calculate animation steps (60fps = 50ms per step)
    const steps = animationDuration / 50 // 60 steps over 3 seconds

    for (let step = 0; step <= steps; step++) {
      const progress = step / steps // 0 to 1

      // Update each horse's progress based on their performance
      for (const result of roundResults) {
        const raceHorse = race.selectedHorses.find((h) => h.horseId === result.horseId)
        if (raceHorse) {
          // Calculate when this horse should finish (0 to 1)
          const maxTime = Math.max(...roundResults.map((r) => r.finishTime))
          const normalizedTime = result.finishTime / maxTime

          // Horse moves continuously until it reaches its finish time
          if (progress >= normalizedTime) {
            raceHorse.progress = 100 // Horse has finished
          } else {
            // Horse is still running - calculate current progress
            raceHorse.progress = (progress / normalizedTime) * 100
          }

          raceHorse.speed = result.speed
          raceHorse.position = result.position
        }
      }

      // Wait for next animation frame
      await new Promise((resolve) => setTimeout(resolve, 50))
    }

    // Ensure all horses reach their final positions
    for (const result of roundResults) {
      const raceHorse = race.selectedHorses.find((h) => h.horseId === result.horseId)
      if (raceHorse) {
        raceHorse.progress = 100 // All horses finish at 100%
        raceHorse.speed = result.speed
        raceHorse.position = result.position
      }
    }
  }

  /**
   * Calculate final results from Round 6
   */
  private static calculateFinalResults(race: Race): RaceResult[] {
    const round6 = race.rounds[5] // Round 6
    if (!round6.results) {
      throw new Error('Round 6 results not available')
    }

    return round6.results
      .map((result) => {
        const raceHorse = race.selectedHorses.find((h) => h.horseId === result.horseId)
        if (!raceHorse) {
          throw new Error(`Horse ${result.horseId} not found in race`)
        }

        return {
          horseId: result.horseId,
          horse: raceHorse.horse,
          position: result.position,
          finishTime: result.finishTime,
          averageSpeed: result.speed,
          roundResults: race.rounds
            .map((round) => round.results?.find((r) => r.horseId === result.horseId))
            .filter(Boolean) as RoundResult[],
        }
      })
      .sort((a, b) => a.position - b.position)
  }

  /**
   * Pause race execution
   */
  static async pauseRace(raceDay: RaceDay): Promise<RaceDay> {
    const currentRace = raceDay.races[raceDay.currentRaceIndex]
    if (currentRace) {
      currentRace.status = 'pending'
    }
    return raceDay
  }

  /**
   * Reset a specific race
   */
  static async resetRace(raceDay: RaceDay, raceIndex: number): Promise<RaceDay> {
    const race = raceDay.races[raceIndex]
    if (!race) {
      throw new Error(`Race at index ${raceIndex} not found`)
    }

    // Reset race status
    race.status = 'pending'
    race.finalResults = undefined
    race.endDate = undefined

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
   * Get race statistics
   */
  static getRaceStats(raceDay: RaceDay): {
    totalRaces: number
    completedRaces: number
    totalHorses: number
    averageRaceTime: number
    fastestHorse: string
    mostWins: string
  } {
    const completedRaces = raceDay.races.filter((race) => race.status === 'completed')

    return {
      totalRaces: raceDay.races.length,
      completedRaces: completedRaces.length,
      totalHorses: raceDay.races.reduce((sum, race) => sum + race.selectedHorses.length, 0),
      averageRaceTime:
        completedRaces.length > 0
          ? completedRaces.reduce((sum, race) => {
              const round6 = race.rounds[5]
              return sum + (round6.results?.[0]?.finishTime || 0)
            }, 0) / completedRaces.length
          : 0,
      fastestHorse: this.getFastestHorse(raceDay),
      mostWins: this.getMostWins(raceDay),
    }
  }

  /**
   * Get fastest horse across all races
   */
  private static getFastestHorse(raceDay: RaceDay): string {
    let fastestHorse = ''
    let fastestTime = Infinity

    raceDay.races.forEach((race) => {
      if (race.finalResults && race.finalResults.length > 0) {
        const winner = race.finalResults[0]
        if (winner.finishTime < fastestTime) {
          fastestTime = winner.finishTime
          fastestHorse = winner.horse.name
        }
      }
    })

    return fastestHorse
  }

  /**
   * Get horse with most wins
   */
  private static getMostWins(raceDay: RaceDay): string {
    const wins: Record<string, number> = {}

    raceDay.races.forEach((race) => {
      if (race.finalResults && race.finalResults.length > 0) {
        const winner = race.finalResults[0]
        wins[winner.horse.name] = (wins[winner.horse.name] || 0) + 1
      }
    })

    let mostWins = ''
    let maxWins = 0

    Object.entries(wins).forEach(([horse, winCount]) => {
      if (winCount > maxWins) {
        maxWins = winCount
        mostWins = horse
      }
    })

    return mostWins
  }
}
