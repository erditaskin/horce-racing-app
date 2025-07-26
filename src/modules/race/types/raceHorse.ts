import type { Horse } from '@/modules/horse/types/horse'

/**
 * Race Horse - horse participating in a specific race
 */
export interface RaceHorse {
  horseId: string
  horse: Horse
  laneNumber: number
  position: number
  progress: number
  speed: number
}
