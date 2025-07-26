import type { Race, RaceDay, RaceResult, RaceRoundResult } from '../types/'
import { AnimationService } from './animation'
import { MockService } from './mock'

/**
 * Race Service for Core Race Operations
 * Handles race execution, round management, and result calculations
 */
export class RaceService {
  /**
   * Execute a single round within a race
   */
  static async executeRound(
    race: Race,
    roundIndex: number,
    shouldCancel?: () => boolean,
  ): Promise<void> {
    const round = race.rounds[roundIndex]
    round.status = 'running'
    round.startTime = Date.now()

    // Set initial positions based on previous round results (except for Round 1)
    if (roundIndex > 0) {
      const previousRound = race.rounds[roundIndex - 1]
      if (previousRound.results) {
        // Reset horse progress for new round but maintain relative performance
        race.selectedHorses.forEach((raceHorse) => {
          raceHorse.progress = 0
        })
      }
    }

    // Simulate horse progress for this round
    const roundResults = MockService.simulateHorseProgress(race.selectedHorses, round.distance)
    round.results = roundResults
    round.endTime = Date.now()

    // Animate the round
    await AnimationService.animateRound(race, roundResults, shouldCancel)
  }

  /**
   * Calculate final results from the last completed round
   */
  static calculateFinalResults(race: Race): RaceResult[] {
    // Find the last completed round with results
    let lastCompletedRound = null
    for (let i = race.rounds.length - 1; i >= 0; i--) {
      const round = race.rounds[i]
      if (round.results && round.status === 'completed') {
        lastCompletedRound = round
        break
      }
    }

    if (!lastCompletedRound || !lastCompletedRound.results) {
      throw new Error('No completed round results available for final results calculation')
    }

    return lastCompletedRound.results
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
          speed: result.speed,
          roundResults: race.rounds
            .map((round) => round.results?.find((r) => r.horseId === result.horseId))
            .filter(Boolean) as RaceRoundResult[],
        }
      })
      .sort((a, b) => a.position - b.position)
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
    const totalHorses = raceDay.races.reduce((total, race) => total + race.selectedHorses.length, 0)

    // Calculate average race time
    const totalTime = completedRaces.reduce((total, race) => {
      if (race.finalResults && race.finalResults.length > 0) {
        return total + race.finalResults[0].finishTime
      }
      return total
    }, 0)
    const averageRaceTime = completedRaces.length > 0 ? totalTime / completedRaces.length : 0

    return {
      totalRaces: raceDay.races.length,
      completedRaces: completedRaces.length,
      totalHorses,
      averageRaceTime,
      fastestHorse: this.getFastestHorse(raceDay),
      mostWins: this.getMostWins(raceDay),
    }
  }

  /**
   * Get the fastest horse across all races
   */
  private static getFastestHorse(raceDay: RaceDay): string {
    let fastestHorse = ''
    let fastestTime = Infinity

    raceDay.races.forEach((race) => {
      if (race.finalResults) {
        race.finalResults.forEach((result) => {
          if (result.finishTime < fastestTime) {
            fastestTime = result.finishTime
            fastestHorse = result.horse.name
          }
        })
      }
    })

    return fastestHorse || 'No data'
  }

  /**
   * Get the horse with most wins
   */
  private static getMostWins(raceDay: RaceDay): string {
    const horseWins = new Map<string, number>()

    raceDay.races.forEach((race) => {
      if (race.finalResults && race.finalResults.length > 0) {
        const winner = race.finalResults[0]
        const currentWins = horseWins.get(winner.horse.name) || 0
        horseWins.set(winner.horse.name, currentWins + 1)
      }
    })

    let mostWinsHorse = ''
    let maxWins = 0

    horseWins.forEach((wins, horseName) => {
      if (wins > maxWins) {
        maxWins = wins
        mostWinsHorse = horseName
      }
    })

    return mostWinsHorse || 'No data'
  }
}
