import type { Horse } from '@/modules/horse/types/horse'
import { MOCK_HORSES } from '@/resources/mock/race/horse'
import { getRandomRaceNames } from '@/resources/mock/race/names'
import dayjs from 'dayjs'
import type { Race, RaceDay, RaceDayGenerationOptions, RaceHorse, RaceRound } from './types/race'

/**
 * Mock service for race data generation
 * Demonstrates enterprise-level data generation patterns
 */
export class MockService {
  private static readonly RACE_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200]
  private static readonly START_TIME = '13:00'
  private static readonly TIME_INTERVAL = 30 // minutes

  /**
   * Get horses from mock API
   */
  static async getHorses(): Promise<Horse[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Simulate potential API error (1% chance)
    if (Math.random() < 0.01) {
      throw new Error('Failed to fetch horses from API')
    }

    return [...MOCK_HORSES]
  }

  /**
   * Generate a complete race day with 6 races
   */
  static generateRaceDay(
    horses: Horse[],
    date: string,
    options: RaceDayGenerationOptions = {},
  ): RaceDay {
    const {
      minRaces = 7,
      maxRaces = 11,
      startTime = this.START_TIME,
      timeInterval = this.TIME_INTERVAL,
    } = options

    const raceCount = Math.floor(Math.random() * (maxRaces - minRaces + 1)) + minRaces
    const raceNames = getRandomRaceNames(raceCount)
    const races: Race[] = []

    for (let i = 0; i < raceCount; i++) {
      // Generate 6 rounds for each race
      const rounds: RaceRound[] = this.RACE_DISTANCES.map((distance, roundIndex) => ({
        roundNumber: roundIndex + 1,
        distance,
        status: 'pending' as const,
      }))

      // Select 10 random horses for this race
      const selectedHorses = this.selectRandomHorses(horses, 10)
      const raceHorses: RaceHorse[] = selectedHorses.map((horse, index) => ({
        horseId: horse.id,
        horse,
        laneNumber: index + 1,
        position: 0,
        progress: 0,
        speed: 0,
      }))

      const race: Race = {
        id: `race-${date}-${i + 1}`,
        name: raceNames[i],
        raceNumber: i + 1,
        startTime: this.calculateStartTime(startTime, i, timeInterval),
        rounds,
        selectedHorses: raceHorses,
        status: 'pending',
      }

      races.push(race)
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
   * Generate race day via API simulation
   */
  static async generateRaceDayAPI(
    horses: Horse[],
    date: string,
    options?: RaceDayGenerationOptions,
  ): Promise<RaceDay> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Simulate potential API error (2% chance)
    if (Math.random() < 0.02) {
      throw new Error('Failed to generate race day from API')
    }

    return this.generateRaceDay(horses, date, options)
  }

  /**
   * Calculate start time for a race
   */
  private static calculateStartTime(baseTime: string, raceIndex: number, interval: number): string {
    const base = dayjs(`2000-01-01 ${baseTime}`)
    const raceTime = base.add(raceIndex * interval, 'minute')
    return raceTime.format('HH:mm')
  }

  /**
   * Select random horses from the available pool
   */
  private static selectRandomHorses(horses: Horse[], count: number): Horse[] {
    const shuffled = [...horses].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  /**
   * Simulate race progress for a horse
   */
  static simulateHorseProgress(
    _horse: Horse,
    _distance: number,
    currentProgress: number,
    speed: number,
  ): { progress: number; finished: boolean } {
    // Calculate progress increment based on speed and distance
    // Speed is in m/s, we want to move a percentage of the track
    const progressIncrement = (speed / 10) * 0.5 // Adjust for smoother animation
    const newProgress = Math.min(currentProgress + progressIncrement, 100)

    return {
      progress: newProgress,
      finished: newProgress >= 100,
    }
  }

  /**
   * Calculate finish time for a horse
   */
  static calculateFinishTime(distance: number, speed: number): number {
    return (distance / speed) * 1000 // Convert to milliseconds
  }

  /**
   * Calculate average speed for a horse
   */
  static calculateAverageSpeed(distance: number, finishTime: number): number {
    return distance / (finishTime / 1000) // Convert back to m/s
  }
}
