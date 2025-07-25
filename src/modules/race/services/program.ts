import type { Horse } from '@/modules/horse/types/horse'
import type {
  RaceDay,
  RaceDayGenerationOptions,
  RaceExecutionOptions,
  RaceHorse,
} from '../types/race'
import { MockService } from './mock'

/**
 * Program service for race day operations
 * Demonstrates enterprise-level service patterns with API simulation
 */
export class ProgramService {
  /**
   * Generate a new race day
   */
  static async generateRaceDay(
    horses: Horse[],
    date: string,
    options?: RaceDayGenerationOptions,
  ): Promise<RaceDay> {
    return MockService.generateRaceDayAPI(horses, date, options)
  }

  /**
   * Execute race simulation with animation
   */
  static async executeRace(
    raceDay: RaceDay,
    raceIndex: number,
    options: RaceExecutionOptions = { animationSpeed: 100, autoStart: false },
  ): Promise<RaceDay> {
    const { animationSpeed, autoStart } = options
    const updatedRaceDay = { ...raceDay }
    const race = updatedRaceDay.races[raceIndex]

    if (!race) {
      throw new Error(`Race ${raceIndex} not found`)
    }

    // Start the race
    race.status = 'in-progress'
    race.startDate = new Date()

    // Simulate race progress
    const finishedHorses: RaceHorse[] = []
    let raceComplete = false

    while (!raceComplete) {
      // Update each horse's progress
      for (const raceHorse of race.selectedHorses) {
        if (raceHorse.finishTime) continue // Already finished

        const simulation = MockService.simulateHorseProgress(
          raceHorse.horse,
          race.distance,
          raceHorse.progress,
          raceHorse.speed,
        )

        raceHorse.progress = simulation.progress

        if (simulation.finished && !raceHorse.finishTime) {
          raceHorse.finishTime = MockService.calculateFinishTime(race.distance, raceHorse.speed)
          finishedHorses.push(raceHorse)
        }
      }

      // Check if all horses finished
      if (finishedHorses.length === race.selectedHorses.length) {
        raceComplete = true
      } else {
        // Wait for next animation frame
        await new Promise((resolve) => setTimeout(resolve, animationSpeed))
      }
    }

    // Calculate final positions and results
    const sortedHorses = finishedHorses.sort((a, b) => (a.finishTime ?? 0) - (b.finishTime ?? 0))

    race.results = sortedHorses.map((raceHorse, index) => ({
      position: index + 1,
      horseId: raceHorse.horseId,
      horse: raceHorse.horse,
      finishTime: raceHorse.finishTime ?? 0,
      averageSpeed: MockService.calculateAverageSpeed(race.distance, raceHorse.finishTime ?? 0),
    }))

    // Update race status
    race.status = 'completed'
    race.endDate = new Date()

    // Update race day status
    if (raceIndex === updatedRaceDay.races.length - 1) {
      updatedRaceDay.status = 'completed'
    } else if (autoStart) {
      updatedRaceDay.currentRaceIndex = raceIndex + 1
    }

    updatedRaceDay.updatedAt = new Date()

    return updatedRaceDay
  }

  /**
   * Pause the current race
   */
  static async pauseRace(raceDay: RaceDay): Promise<RaceDay> {
    const updatedRaceDay = { ...raceDay }
    const currentRace = updatedRaceDay.races[updatedRaceDay.currentRaceIndex]

    if (currentRace && currentRace.status === 'in-progress') {
      currentRace.status = 'pending'
    }

    updatedRaceDay.status = 'generated'
    updatedRaceDay.updatedAt = new Date()

    return updatedRaceDay
  }

  /**
   * Reset the race day
   */
  static async resetProgram(raceDay: RaceDay): Promise<RaceDay> {
    const updatedRaceDay = { ...raceDay }

    // Reset all races
    updatedRaceDay.races.forEach((race) => {
      race.status = 'pending'
      race.startDate = undefined
      race.endDate = undefined
      race.results = []
      race.selectedHorses.forEach((raceHorse) => {
        raceHorse.progress = 0
        raceHorse.position = 0
        raceHorse.finishTime = undefined
        raceHorse.finishPosition = undefined
      })
    })

    updatedRaceDay.status = 'generated'
    updatedRaceDay.currentRaceIndex = 0
    updatedRaceDay.updatedAt = new Date()

    return updatedRaceDay
  }

  /**
   * Get current race day statistics
   */
  static getRaceStats(raceDay: RaceDay) {
    const completedRaces = raceDay.races.filter((race) => race.status === 'completed')
    const totalRaces = raceDay.races.length

    return {
      totalRaces,
      completedRaces: completedRaces.length,
      currentRace: raceDay.currentRaceIndex + 1,
      isComplete: raceDay.status === 'completed',
      isRunning: raceDay.status === 'running',
    }
  }
}
