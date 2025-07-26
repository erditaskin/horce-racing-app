/**
 * Race Venue/Arena Information
 */
export interface RaceVenue {
  name: string // Venue name from RACING_VENUES
  location: string // City/Country
  capacity: number // Venue capacity
  pistTypes: RaceVenuePistType[] // Available pist types
}

/**
 * Pist Type (Track Surface)
 */
export type RaceVenuePistType = 'grass' | 'sand'
