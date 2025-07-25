/**
 * Settings-related types
 */

export interface UserPreferences {
  autoSave: boolean
  notifications: boolean
  soundEnabled: boolean
  animationSpeed: 'slow' | 'normal' | 'fast'
}
