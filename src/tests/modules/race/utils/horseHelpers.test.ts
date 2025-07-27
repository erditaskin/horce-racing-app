import type { Race, RaceResult, RaceRoundResult } from '@/modules/race/types'
import { getHorseColor, getHorseName } from '@/modules/race/utils/horseHelpers'
import { describe, expect, it } from 'vitest'

describe('Horse Helpers', () => {
  const mockRace: Race = {
    id: 'race-1',
    name: 'Test Race',
    raceNumber: 1,
    startTime: '13:00',
    pistType: 'grass',
    status: 'pending',
    selectedHorses: [
      {
        horseId: 'horse-1',
        horse: {
          id: 'horse-1',
          name: 'Thunder',
          color: '#ff0000',
          condition: 85,
          isSelected: false,
        },
        laneNumber: 1,
        progress: 0,
        speed: 0,
        position: 0,
      },
      {
        horseId: 'horse-2',
        horse: {
          id: 'horse-2',
          name: 'Lightning',
          color: '#00ff00',
          condition: 90,
          isSelected: false,
        },
        laneNumber: 2,
        progress: 0,
        speed: 0,
        position: 0,
      },
    ],
    rounds: [],
  }

  describe('getHorseColor', () => {
    it('should return horse color from RaceResult', () => {
      const raceResult: RaceResult = {
        horseId: 'horse-1',
        horse: {
          id: 'horse-1',
          name: 'Thunder',
          color: '#ff0000',
          condition: 85,
          isSelected: false,
        },
        position: 1,
        finishTime: 120.5,
        speed: 9.96,
      }

      expect(getHorseColor(raceResult)).toBe('#ff0000')
    })

    it('should return horse color from RaceRoundResult with selectedRace', () => {
      const roundResult: RaceRoundResult = {
        horseId: 'horse-1',
        position: 1,
        finishTime: 120.5,
        speed: 9.96,
        progress: 100,
      }

      expect(getHorseColor(roundResult, mockRace)).toBe('#ff0000')
    })

    it('should return default color when horse not found in selectedRace', () => {
      const roundResult: RaceRoundResult = {
        horseId: 'invalid-horse',
        position: 1,
        finishTime: 120.5,
        speed: 9.96,
        progress: 100,
      }

      expect(getHorseColor(roundResult, mockRace)).toBe('#ccc')
    })

    it('should return default color when selectedRace is not provided', () => {
      const roundResult: RaceRoundResult = {
        horseId: 'horse-1',
        position: 1,
        finishTime: 120.5,
        speed: 9.96,
        progress: 100,
      }

      expect(getHorseColor(roundResult)).toBe('#ccc')
    })
  })

  describe('getHorseName', () => {
    it('should return horse name from RaceResult', () => {
      const raceResult: RaceResult = {
        horseId: 'horse-1',
        horse: {
          id: 'horse-1',
          name: 'Thunder',
          color: '#ff0000',
          condition: 85,
          isSelected: false,
        },
        position: 1,
        finishTime: 120.5,
        speed: 9.96,
      }

      expect(getHorseName(raceResult)).toBe('Thunder')
    })

    it('should return horse name from RaceRoundResult with selectedRace', () => {
      const roundResult: RaceRoundResult = {
        horseId: 'horse-1',
        position: 1,
        finishTime: 120.5,
        speed: 9.96,
        progress: 100,
      }

      expect(getHorseName(roundResult, mockRace)).toBe('Thunder')
    })

    it('should return "Unknown" when horse not found in selectedRace', () => {
      const roundResult: RaceRoundResult = {
        horseId: 'invalid-horse',
        position: 1,
        finishTime: 120.5,
        speed: 9.96,
        progress: 100,
      }

      expect(getHorseName(roundResult, mockRace)).toBe('Unknown')
    })

    it('should return "Unknown" when selectedRace is not provided', () => {
      const roundResult: RaceRoundResult = {
        horseId: 'horse-1',
        position: 1,
        finishTime: 120.5,
        speed: 9.96,
        progress: 100,
      }

      expect(getHorseName(roundResult)).toBe('Unknown')
    })

    it('should handle case when horse has no name', () => {
      const roundResult: RaceRoundResult = {
        horseId: 'horse-2',
        position: 1,
        finishTime: 120.5,
        speed: 9.96,
        progress: 100,
      }

      // Modify mock race to have horse with no name
      const modifiedRace = {
        ...mockRace,
        selectedHorses: [
          {
            ...mockRace.selectedHorses[1],
            horse: {
              ...mockRace.selectedHorses[1].horse,
              name: '',
            },
          },
        ],
      }

      expect(getHorseName(roundResult, modifiedRace)).toBe('')
    })
  })
})
