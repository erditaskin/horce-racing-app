import type { Horse } from '@/modules/horse/types/horse'
import { MOCK_HORSES } from '@/resources/mock/race/horse'
import { RACE_NAMES } from '@/resources/mock/race/raceNames'
import { RACING_VENUES } from '@/resources/mock/race/raceVenues'
import type {
  Race,
  RaceDay,
  RaceDayGenerationOptions,
  RaceDayWeather,
  RaceHorse,
  RacePistStatus,
  RaceRound,
  RaceRoundResult,
  RaceVenue,
  RaceVenuePistType,
} from '../types/'

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

    // Generate venue for this race day
    const venue = MockService.generateVenue()

    // Get unique race names
    const raceNames = MockService.getRandomRaceNames(raceCount)

    // Generate races with balanced pist type assignment
    const races: Race[] = []
    let currentTime = startTime

    // Create balanced pist type distribution
    const pistTypeDistribution = MockService.createBalancedPistDistribution(
      raceCount,
      venue.pistTypes,
    )

    for (let i = 0; i < raceCount; i++) {
      const race = this.generateRace(
        horses,
        i + 1,
        raceNames[i],
        currentTime,
        date,
        pistTypeDistribution[i],
      )
      races.push(race)

      // Calculate next start time
      currentTime = this.addMinutesToTime(currentTime, timeInterval)
    }

    return {
      date,
      weather: MockService.getRandomWeather(),
      venue,
      races,
      status: 'generated',
      currentRaceIndex: -1, // No race is currently running
      currentRoundIndex: 0,
      pistStatus: MockService.getInitialPistStatus(),
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
    // venue: RaceVenue, // Unused parameter
    pistType: RaceVenuePistType,
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
      pistType,
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
  static simulateHorseProgress(horses: RaceHorse[], distance: number): RaceRoundResult[] {
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

  /**
   * Get a random race name
   */
  static getRandomRaceName(): string {
    const randomIndex = Math.floor(Math.random() * RACE_NAMES.length)
    return RACE_NAMES[randomIndex]
  }

  /**
   * Get multiple random race names (unique)
   */
  static getRandomRaceNames(count: number): string[] {
    const shuffled = [...RACE_NAMES].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  /**
   * Get a random weather condition
   */
  static getRandomWeather(): RaceDayWeather {
    const weatherOptions: RaceDayWeather[] = ['sunny', 'foggy', 'rainy', 'snowy', 'cloudy', 'windy']
    const randomIndex = Math.floor(Math.random() * weatherOptions.length)
    return weatherOptions[randomIndex]
  }

  /**
   * Generate a venue for the race day
   */
  private static generateVenue(): RaceVenue {
    const venueName = MockService.getRandomVenue()
    const pistTypes = MockService.getRandomPistTypes()

    return {
      name: venueName,
      location: MockService.getVenueLocation(),
      capacity: Math.floor(Math.random() * 50000) + 10000, // 10k-60k capacity
      pistTypes,
    }
  }

  /**
   * Get random venue name (ensuring uniqueness)
   */
  private static getRandomVenue(): string {
    // For now, just pick a random venue
    // In a real system, we'd track used venues to ensure uniqueness
    const randomIndex = Math.floor(Math.random() * RACING_VENUES.length)
    return RACING_VENUES[randomIndex]
  }

  /**
   * Get venue location based on venue name
   */
  private static getVenueLocation(): string {
    return 'International'
  }

  /**
   * Get random pist types for venue (prefer 2 pist types for better variety)
   */
  private static getRandomPistTypes(): RaceVenuePistType[] {
    const pistTypes: RaceVenuePistType[] = ['grass', 'sand']
    const numPists = Math.random() > 0.3 ? 2 : 1 // 70% chance of having 2 pist types for better variety

    if (numPists === 1) {
      // Randomly select one pist type
      return [pistTypes[Math.floor(Math.random() * 2)]]
    }

    // Return both pist types
    return pistTypes
  }

  /**
   * Create a balanced distribution of pist types for races
   * Ensures at least 20% of each available pist type
   */
  private static createBalancedPistDistribution(
    raceCount: number,
    availablePistTypes: RaceVenuePistType[],
  ): RaceVenuePistType[] {
    const distribution: RaceVenuePistType[] = []

    // If only one pist type available, use it for all races
    if (availablePistTypes.length === 1) {
      return new Array(raceCount).fill(availablePistTypes[0])
    }

    // For multiple pist types, ensure balanced distribution
    const minRacesPerPist = Math.max(1, Math.floor(raceCount * 0.2)) // At least 20% of each pist type, minimum 1
    const remainingRaces = raceCount - minRacesPerPist * availablePistTypes.length

    // First, assign minimum races to each pist type
    availablePistTypes.forEach((pistType) => {
      for (let i = 0; i < minRacesPerPist; i++) {
        distribution.push(pistType)
      }
    })

    // Then distribute remaining races evenly
    for (let i = 0; i < remainingRaces; i++) {
      const pistType = availablePistTypes[i % availablePistTypes.length]
      distribution.push(pistType)
    }

    // Shuffle the distribution to avoid predictable patterns
    return distribution.sort(() => 0.5 - Math.random())
  }

  /**
   * Get initial pist status (both available)
   */
  private static getInitialPistStatus(): RacePistStatus {
    return {
      grass: {
        isAvailable: true,
        currentRaceId: undefined,
      },
      sand: {
        isAvailable: true,
        currentRaceId: undefined,
      },
    }
  }

  // Removed unused assignPistType function
}
