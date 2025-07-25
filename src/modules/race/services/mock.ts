import type { Horse } from '@/modules/horse/types/horse'
import { MOCK_HORSES } from '@/resources/mock/race/horse'
import { getRandomRaceNames } from '@/resources/mock/race/names'
import type {
  Race,
  RaceDay,
  RaceDayGenerationOptions,
  RaceHorse,
  RaceRound,
  RoundResult,
} from '../types/race'

/**
 * Mock Service for Race Data
 * Simulates API calls for race-related operations
 */
export class MockService {
  /**
   * Get horses from mock data
   */
  static getHorses(): Horse[] {
    return MOCK_HORSES
  }

  /**
   * Generate race day with 7-11 races, each with 6 rounds
   */
  static generateRaceDay(
    horses: Horse[],
    date: string,
    options: RaceDayGenerationOptions = {},
  ): RaceDay {
    const { minRaces = 7, maxRaces = 11, startTime = '13:00', timeInterval = 30 } = options

    // Generate random number of races (7-11)
    const raceCount = Math.floor(Math.random() * (maxRaces - minRaces + 1)) + minRaces

    // Get unique race names
    const raceNames = getRandomRaceNames(raceCount)

    // Generate races
    const races: Race[] = []
    let currentTime = startTime

    for (let i = 0; i < raceCount; i++) {
      const race = this.generateRace(horses, i + 1, raceNames[i], currentTime, date)
      races.push(race)

      // Calculate next start time
      currentTime = this.addMinutesToTime(currentTime, timeInterval)
    }

    return {
      date,
      races,
      status: 'generated',
      currentRaceIndex: 0,
      currentRoundIndex: 0,
    }
  }

  /**
   * Generate a single race with 6 rounds
   */
  private static generateRace(
    horses: Horse[],
    raceNumber: number,
    raceName: string,
    startTime: string,
    date: string,
  ): Race {
    // Select 10 random horses for this race
    const selectedHorses = this.selectRandomHorses(horses, 10)

    // Generate 6 rounds with different distances
    const rounds: RaceRound[] = [
      { roundNumber: 1, distance: 1200, status: 'pending' },
      { roundNumber: 2, distance: 1400, status: 'pending' },
      { roundNumber: 3, distance: 1600, status: 'pending' },
      { roundNumber: 4, distance: 1800, status: 'pending' },
      { roundNumber: 5, distance: 2000, status: 'pending' },
      { roundNumber: 6, distance: 2200, status: 'pending' },
    ]

    // Create race horses with lane assignments
    const raceHorses: RaceHorse[] = selectedHorses.map((horse, index) => ({
      horseId: horse.id,
      horse,
      laneNumber: index + 1,
      position: 0,
      progress: 0,
      speed: 0,
    }))

    return {
      id: `race-${date}-${raceNumber}`,
      name: raceName,
      raceNumber,
      startTime,
      rounds,
      selectedHorses: raceHorses,
      status: 'pending',
      startDate: date,
    }
  }

  /**
   * Select random horses from the pool
   */
  private static selectRandomHorses(horses: Horse[], count: number): Horse[] {
    const shuffled = [...horses].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  /**
   * Add minutes to time string (HH:MM format)
   */
  private static addMinutesToTime(time: string, minutes: number): string {
    const [hours, mins] = time.split(':').map(Number)
    const totalMinutes = hours * 60 + mins + minutes
    const newHours = Math.floor(totalMinutes / 60)
    const newMins = totalMinutes % 60
    return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`
  }

  /**
   * Simulate horse progress for a round
   */
  static simulateHorseProgress(horses: RaceHorse[], distance: number): RoundResult[] {
    const results = horses
      .map((raceHorse) => {
        // Calculate horse performance based on condition and distance
        const baseSpeed = 50 + raceHorse.horse.condition / 2 // 50-100 km/h
        const distanceFactor = distance / 1200
        const speed = baseSpeed * (1 - (distanceFactor - 1) * 0.1) // 10% slower per distance increase

        // Calculate finish time in seconds
        const finishTime = distance / 1000 / (speed / 3600)

        // Add some randomness to make it more interesting
        const randomFactor = 0.9 + Math.random() * 0.2 // ±10% variation
        const finalTime = finishTime * randomFactor

        return {
          horseId: raceHorse.horseId,
          position: 0, // Will be set after sorting
          finishTime: finalTime,
          speed: speed * randomFactor,
          progress: 100,
        }
      })
      .sort((a, b) => a.finishTime - b.finishTime)
      .map((result, index) => ({
        ...result,
        position: index + 1,
      }))

    return results
  }

  /**
   * Simulate API call for race day generation
   */
  static generateRaceDayAPI(
    horses: Horse[],
    date: string,
    options?: RaceDayGenerationOptions,
  ): Promise<RaceDay> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.generateRaceDay(horses, date, options))
      }, 500) // Simulate API delay
    })
  }
}
