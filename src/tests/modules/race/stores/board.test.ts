import { HorseService } from '@/modules/race/services/horse'
import { ProgramService } from '@/modules/race/services/program'
import type { useRaceBoardStore } from '@/modules/race/stores/board'
import type { Horse, RaceDay } from '@/modules/race/types'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Mock the services
vi.mocked(HorseService.getHorses).mockResolvedValue([
  { id: '1', name: 'Horse 1', color: 'red', condition: 80, isSelected: false },
])

vi.mocked(ProgramService.generateRaceDay).mockResolvedValue({
  weather: 'sunny',
  date: '2024-01-01',
  venue: {
    name: 'Test Venue',
    location: 'Test City',
    capacity: 1000,
    pistTypes: ['grass', 'sand'],
  },
  races: [],
  status: 'generated',
  currentRaceIndex: 0,
  currentRoundIndex: 0,
  pistStatus: {
    grass: { isAvailable: true },
    sand: { isAvailable: true },
  },
})

// Mock external dependencies
vi.mock('vue-router', () => ({
  useRouter: () => ({
    replace: vi.fn(),
    currentRoute: {
      value: {
        query: {},
      },
    },
  }),
}))

vi.mock('@/modules/race/services/horse')
vi.mock('@/modules/race/services/program', () => ({
  ProgramService: {
    generateRaceDay: vi.fn(),
    executeRace: vi.fn(),
  },
}))

// Mock dayjs
vi.mock('dayjs', () => ({
  default: vi.fn(() => ({
    format: vi.fn(() => '2024-01-01'),
    isValid: vi.fn(() => true),
  })),
}))

// Helper function to create properly typed RaceDay objects
const createMockRaceDay = (overrides: Partial<RaceDay> = {}): RaceDay => ({
  weather: 'sunny',
  date: '2024-01-01',
  venue: {
    name: 'Test Venue',
    location: 'Test City',
    capacity: 1000,
    pistTypes: ['grass', 'sand'],
  },
  races: [],
  status: 'generated',
  currentRaceIndex: 0,
  currentRoundIndex: 0,
  pistStatus: {
    grass: { isAvailable: true },
    sand: { isAvailable: true },
  },
  ...overrides,
})

describe('Race Board Store', () => {
  let store: ReturnType<typeof useRaceBoardStore>

  beforeEach(async () => {
    // Reset all mocks
    vi.clearAllMocks()

    // Suppress console.error for expected error tests
    vi.spyOn(console, 'error').mockImplementation(() => {})

    // Mock URLSearchParams before importing store
    global.URLSearchParams = vi.fn().mockImplementation(() => ({
      get: vi.fn().mockReturnValue(null),
      set: vi.fn(),
      has: vi.fn().mockReturnValue(false),
      delete: vi.fn(),
      append: vi.fn(),
      toString: vi.fn().mockReturnValue(''),
      forEach: vi.fn(),
      entries: vi.fn(),
      keys: vi.fn(),
      values: vi.fn(),
    }))

    // Mock window.location
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href: 'http://localhost:3000',
        origin: 'http://localhost:3000',
        protocol: 'http:',
        host: 'localhost:3000',
        hostname: 'localhost',
        port: '3000',
        pathname: '/',
        search: '',
        hash: '',
        assign: vi.fn(),
        replace: vi.fn(),
        reload: vi.fn(),
      },
    })

    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    }
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    })

    // Set up Pinia
    setActivePinia(createPinia())

    // Import and create store after all mocks are set up
    const { useRaceBoardStore } = await import('@/modules/race/stores/board')
    store = useRaceBoardStore()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('State Management', () => {
    it('should initialize with default state', () => {
      expect(store.horses).toEqual([])
      expect(store.raceDay).toBeNull()
      expect(store.selectedRaceIndex).toBe(0)
      expect(store.selectedRoundIndex).toBe(0)
      expect(store.isRunning).toBe(false)
      expect(store.isLoading).toBe(false)
      expect(store.error).toBeNull()
      expect(store.isPaused).toBe(false)
    })

    it('should track pist-specific state correctly', () => {
      expect(store.isRunning).toBe(false)
      expect(store.isPaused).toBe(false)
    })
  })

  describe('Computed Properties', () => {
    it('should return null selectedRace when no race day exists', () => {
      expect(store.selectedRace).toBeNull()
    })

    it('should return correct selectedRace when race day exists', () => {
      const mockRaceDay = createMockRaceDay({
        races: [
          {
            id: 'race-1',
            name: 'Test Race',
            raceNumber: 1,
            startTime: '10:00',
            pistType: 'grass',
            rounds: [],
            selectedHorses: [],
            status: 'pending',
            finalResults: undefined,
          },
        ],
      })

      store.raceDay = mockRaceDay
      expect(store.selectedRace).toEqual(mockRaceDay.races[0])
    })

    it('should calculate canStart correctly', () => {
      // Should be false when no race day exists
      expect(store.canStart).toBe(false)

      // Should be false when no horses loaded
      store.raceDay = createMockRaceDay()
      expect(store.canStart).toBe(false)

      // Should be true when race day and horses exist
      store.horses = [{ id: '1', name: 'Horse 1', color: 'red', condition: 80, isSelected: false }]
      store.raceDay = createMockRaceDay({
        races: [
          {
            id: 'race-1',
            name: 'Test Race',
            raceNumber: 1,
            startTime: '10:00',
            pistType: 'grass',
            rounds: [],
            selectedHorses: [],
            status: 'pending',
            finalResults: undefined,
          },
        ],
      })
      expect(store.canStart).toBe(true)
    })

    it('should return correct round options', () => {
      // When no race day exists, should return empty array
      expect(store.roundOptions).toEqual([])

      // When race day exists with rounds, should return round options
      const mockRaceDay = createMockRaceDay({
        races: [
          {
            id: 'race-1',
            name: 'Test Race',
            raceNumber: 1,
            startTime: '10:00',
            pistType: 'grass',
            rounds: [
              { roundNumber: 1, distance: 1200, status: 'pending' },
              { roundNumber: 2, distance: 1400, status: 'pending' },
              { roundNumber: 3, distance: 1600, status: 'pending' },
              { roundNumber: 4, distance: 1800, status: 'pending' },
              { roundNumber: 5, distance: 2000, status: 'pending' },
              { roundNumber: 6, distance: 2200, status: 'pending' },
            ],
            selectedHorses: [],
            status: 'pending',
            finalResults: undefined,
          },
        ],
      })
      store.raceDay = mockRaceDay

      expect(store.roundOptions).toEqual([
        { value: 0, label: 'Round 1 - 1200m' },
        { value: 1, label: 'Round 2 - 1400m' },
        { value: 2, label: 'Round 3 - 1600m' },
        { value: 3, label: 'Round 4 - 1800m' },
        { value: 4, label: 'Round 5 - 2000m' },
        { value: 5, label: 'Round 6 - 2200m' },
      ])
    })
  })

  describe('Actions', () => {
    describe('loadHorses', () => {
      it('should load horses successfully', async () => {
        const mockHorses: Horse[] = [
          { id: '1', name: 'Horse 1', color: 'red', condition: 80, isSelected: false },
          { id: '2', name: 'Horse 2', color: 'blue', condition: 90, isSelected: false },
        ]

        vi.mocked(HorseService.getHorses).mockResolvedValue(mockHorses)

        await store.loadHorses()

        expect(store.horses).toEqual(mockHorses)
        expect(store.isLoading).toBe(false)
        expect(store.error).toBeNull()
      })

      it('should handle horse loading error', async () => {
        const errorMessage = 'Failed to load horses'
        vi.mocked(HorseService.getHorses).mockRejectedValue(new Error(errorMessage))

        await store.loadHorses()

        expect(store.horses).toEqual([])
        expect(store.isLoading).toBe(false)
        expect(store.error).toBe(errorMessage)
      })
    })

    describe('generateRaceDay', () => {
      it('should generate race day successfully', async () => {
        const mockRaceDay = createMockRaceDay()

        vi.mocked(ProgramService.generateRaceDay).mockResolvedValue(mockRaceDay)

        await store.generateRaceDay()

        expect(store.raceDay).toEqual(mockRaceDay)
        expect(store.isLoading).toBe(false)
        expect(store.error).toBeNull()
      })

      it('should handle race day generation error', async () => {
        const errorMessage = 'Failed to generate race day'
        vi.mocked(ProgramService.generateRaceDay).mockRejectedValue(new Error(errorMessage))

        await store.generateRaceDay()

        expect(store.raceDay).toBeNull()
        expect(store.isLoading).toBe(false)
        expect(store.error).toBe(errorMessage)
      })
    })

    describe('startRaceDay', () => {
      it('should start race successfully', async () => {
        const mockRaceDay = createMockRaceDay({
          races: [
            {
              id: 'race-1',
              name: 'Test Race',
              raceNumber: 1,
              startTime: '10:00',
              pistType: 'grass',
              rounds: [],
              selectedHorses: [],
              status: 'pending',
              finalResults: undefined,
            },
          ],
        })

        store.raceDay = mockRaceDay
        store.horses = [
          { id: '1', name: 'Horse 1', color: 'red', condition: 80, isSelected: false },
        ]
        store.selectedRaceIndex = 0

        // Mock executeRace to return the same race day
        vi.mocked(ProgramService.executeRace).mockResolvedValue(mockRaceDay)

        // Verify we have a selected race before starting
        expect(store.selectedRace).toBeTruthy()
        expect(store.selectedRace?.id).toBe('race-1')

        await store.startRaceDay()

        // The race should be marked as running
        expect(store.selectedRace?.status).toBe('running')
        // Pist should be marked as unavailable
        expect(store.raceDay?.pistStatus.grass.isAvailable).toBe(false)
      })

      it('should not start race if no selected race', async () => {
        const mockRaceDay = createMockRaceDay({
          races: [
            {
              id: 'race-1',
              name: 'Test Race',
              raceNumber: 1,
              startTime: '10:00',
              pistType: 'grass',
              rounds: [],
              selectedHorses: [],
              status: 'pending',
              finalResults: undefined,
            },
          ],
        })

        store.raceDay = mockRaceDay
        store.horses = [
          { id: '1', name: 'Horse 1', color: 'red', condition: 80, isSelected: false },
        ]

        // Set selectedRaceIndex to a non-existent race
        store.selectedRaceIndex = 999

        // Verify we don't have a selected race
        expect(store.selectedRace).toBeNull()

        await store.startRaceDay()

        // The race should not be started (status should remain pending)
        expect(mockRaceDay.races[0].status).toBe('pending')
      })

      it('should not start race if pist is not available', async () => {
        store.raceDay = null

        await store.startRaceDay()

        expect(store.isRunning).toBe(false)
      })
    })

    describe('pauseRaceDay', () => {
      it('should pause race correctly', async () => {
        // Set up a running race
        store.raceDay = createMockRaceDay({
          races: [
            {
              id: 'race-1',
              name: 'Test Race',
              raceNumber: 1,
              startTime: '10:00',
              pistType: 'grass',
              rounds: [],
              selectedHorses: [],
              status: 'running',
              finalResults: undefined,
            },
          ],
        })

        await store.pauseRaceDay()

        // The pist should be marked as paused
        expect(store.isSelectedRacePaused).toBe(true)
      })
    })

    describe('resetRaceDay', () => {
      it('should reset race day correctly', async () => {
        store.raceDay = createMockRaceDay({
          races: [
            {
              id: 'race-1',
              name: 'Test Race',
              raceNumber: 1,
              startTime: '10:00',
              pistType: 'grass',
              rounds: [],
              selectedHorses: [],
              status: 'running',
              finalResults: undefined,
            },
          ],
        })

        await store.resetRaceDay()

        // The selected race should be reset to pending
        expect(store.selectedRace?.status).toBe('pending')
        // Pist should be available again
        expect(store.raceDay?.pistStatus.grass.isAvailable).toBe(true)
      })
    })

    describe('selectDate', () => {
      it('should load persisted race day if available', async () => {
        const mockRaceDay = createMockRaceDay()

        // Mock localStorage to return persisted data
        const localStorageMock = {
          getItem: vi.fn().mockReturnValue(JSON.stringify({ '2024-01-01': mockRaceDay })),
          setItem: vi.fn(),
          removeItem: vi.fn(),
          clear: vi.fn(),
        }
        Object.defineProperty(window, 'localStorage', {
          value: localStorageMock,
          writable: true,
        })

        await store.selectDate('2024-01-01')

        expect(store.raceDay).toEqual(mockRaceDay)
      })

      it('should generate new race day if not persisted', async () => {
        const mockRaceDay = createMockRaceDay()

        // Mock horses to be loaded so generateRaceDay will be called
        store.horses = [
          { id: '1', name: 'Horse 1', color: 'red', condition: 80, isSelected: false },
        ]
        vi.mocked(ProgramService.generateRaceDay).mockResolvedValue(mockRaceDay)

        await store.selectDate('2024-01-01')

        // The race day should be set
        expect(store.raceDay).toEqual(mockRaceDay)
        expect(ProgramService.generateRaceDay).toHaveBeenCalled()
      })
    })

    describe('setSelectedRaceIndex', () => {
      it('should update selected race index correctly', () => {
        // Set up race day with multiple races
        store.raceDay = createMockRaceDay({
          races: [
            {
              id: 'race-1',
              name: 'Race 1',
              raceNumber: 1,
              startTime: '10:00',
              pistType: 'grass',
              rounds: [],
              selectedHorses: [],
              status: 'pending',
              finalResults: undefined,
            },
            {
              id: 'race-2',
              name: 'Race 2',
              raceNumber: 2,
              startTime: '10:30',
              pistType: 'sand',
              rounds: [],
              selectedHorses: [],
              status: 'pending',
              finalResults: undefined,
            },
          ],
        })

        store.setSelectedRaceIndex(1)
        expect(store.selectedRaceIndex).toBe(1)
        expect(store.selectedRace?.id).toBe('race-2')
      })
    })
  })

  describe('Persistence', () => {
    it('should handle persistence through selectDate', async () => {
      const mockRaceDay = createMockRaceDay()

      // Mock localStorage to return persisted data
      const localStorageMock = {
        getItem: vi.fn().mockReturnValue(JSON.stringify({ '2024-01-01': mockRaceDay })),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      }
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true,
      })

      await store.selectDate('2024-01-01')

      // Should load from storage
      expect(store.raceDay).toBeTruthy()
      expect(localStorageMock.getItem).toHaveBeenCalled()
    })

    it('should handle storage errors gracefully', async () => {
      const localStorageMock = {
        getItem: vi.fn().mockImplementation(() => {
          throw new Error('Storage error')
        }),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      }
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true,
      })

      // Should not crash when storage fails
      await store.selectDate('2024-01-01')
      expect(store.error).toBeNull()
    })
  })

  describe('Error Handling', () => {
    it('should clear error correctly', () => {
      store.error = 'Test error'
      store.clearError()
      expect(store.error).toBeNull()
    })

    it('should clear all persisted data', () => {
      store.clearAllPersistedData()
      expect(window.localStorage.removeItem).toHaveBeenCalled()
    })
  })
})
