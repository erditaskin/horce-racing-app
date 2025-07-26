import type { Race, RaceResult, RaceRoundResult } from '../types/'

/**
 * Shared horse data helpers for race module
 * Centralized horse data access logic to eliminate duplication
 */

/**
 * Get horse color from result (works for both RaceResult and RaceRoundResult)
 * Used in ResultItem.vue
 */
export const getHorseColor = (
  result: RaceResult | RaceRoundResult,
  selectedRace?: Race,
): string => {
  if ('horse' in result) {
    return result.horse.color
  }
  // For RoundResult, find horse in selectedRace
  if (selectedRace) {
    const horse = selectedRace.selectedHorses.find((h) => h.horseId === result.horseId)
    return horse?.horse.color ?? '#ccc'
  }
  return '#ccc'
}

/**
 * Get horse name from result (works for both RaceResult and RaceRoundResult)
 * Used in ResultItem.vue
 */
export const getHorseName = (result: RaceResult | RaceRoundResult, selectedRace?: Race): string => {
  if ('horse' in result) {
    return result.horse.name
  }
  // For RoundResult, find horse in selectedRace
  if (selectedRace) {
    const horse = selectedRace.selectedHorses.find((h) => h.horseId === result.horseId)
    return horse?.horse.name ?? 'Unknown'
  }
  return 'Unknown'
}
