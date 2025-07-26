/**
 * Shared formatters for race module
 * Centralized utility functions to eliminate code duplication
 */

/**
 * Format time in seconds to display format
 * Used in ResultItem.vue and FinalResults.vue
 */
export const formatTime = (time: number): string => {
  return `${time.toFixed(2)}s`
}

/**
 * Get status text for race status
 * Used in ProgramItem.vue
 */
export const getRaceStatusText = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'Pending'
    case 'running':
      return 'Running'
    case 'completed':
      return 'Finished'
    default:
      return status
  }
}

/**
 * Get status text for pist status
 * Used in PistOverview.vue
 */
export const getPistStatusText = (
  pistType: 'grass' | 'sand',
  pistStatus?: {
    grass: { isAvailable: boolean; currentRaceId?: string }
    sand: { isAvailable: boolean; currentRaceId?: string }
  } | null,
): string => {
  if (!pistStatus) return 'Unknown'
  const status = pistStatus[pistType]
  return status.isAvailable ? 'Available' : 'Occupied'
}

/**
 * Get position class for result items
 * Used in ResultItem.vue
 */
export const getPositionClass = (position: number): string => {
  switch (position) {
    case 1:
      return 'position-first'
    case 2:
      return 'position-second'
    case 3:
      return 'position-third'
    case 4:
      return 'position-fourth'
    default:
      return 'position-other'
  }
}
