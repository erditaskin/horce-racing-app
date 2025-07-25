/**
 * Shared Option interface for select inputs and other option-based components
 */
export interface AppOption {
  value: string | number
  label: string
}

/**
 * Type alias for backward compatibility
 */
export type Option = AppOption
