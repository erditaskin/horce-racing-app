import {
  formatTime,
  getPistStatusText,
  getPositionClass,
  getRaceStatusText,
} from '@/modules/race/utils/formatters'
import { describe, expect, it } from 'vitest'

describe('Formatters', () => {
  describe('formatTime', () => {
    it('should format time correctly', () => {
      expect(formatTime(120.5)).toBe('120.50s')
      expect(formatTime(0)).toBe('0.00s')
      expect(formatTime(1.234)).toBe('1.23s')
      expect(formatTime(999.999)).toBe('1000.00s')
    })
  })

  describe('getRaceStatusText', () => {
    it('should return correct status text for each status', () => {
      expect(getRaceStatusText('pending')).toBe('Pending')
      expect(getRaceStatusText('running')).toBe('Running')
      expect(getRaceStatusText('completed')).toBe('Finished')
    })

    it('should return status as-is for unknown status', () => {
      expect(getRaceStatusText('unknown')).toBe('unknown')
      expect(getRaceStatusText('')).toBe('')
    })
  })

  describe('getPistStatusText', () => {
    const mockPistStatus = {
      grass: { isAvailable: true },
      sand: { isAvailable: false },
    }

    it('should return "Available" for available pist', () => {
      expect(getPistStatusText('grass', mockPistStatus)).toBe('Available')
    })

    it('should return "Occupied" for unavailable pist', () => {
      expect(getPistStatusText('sand', mockPistStatus)).toBe('Occupied')
    })

    it('should return "Unknown" when pist status is null', () => {
      expect(getPistStatusText('grass', null)).toBe('Unknown')
    })

    it('should return "Unknown" when pist status is undefined', () => {
      expect(getPistStatusText('grass', undefined)).toBe('Unknown')
    })
  })

  describe('getPositionClass', () => {
    it('should return correct position classes', () => {
      expect(getPositionClass(1)).toBe('position-first')
      expect(getPositionClass(2)).toBe('position-second')
      expect(getPositionClass(3)).toBe('position-third')
      expect(getPositionClass(4)).toBe('position-fourth')
    })

    it('should return "position-other" for other positions', () => {
      expect(getPositionClass(5)).toBe('position-other')
      expect(getPositionClass(10)).toBe('position-other')
      expect(getPositionClass(0)).toBe('position-other')
      expect(getPositionClass(-1)).toBe('position-other')
    })
  })
})
