import {
  THEME_MODE_DARK,
  THEME_MODE_LIGHT,
  THEME_STORAGE_KEY,
  type ThemeMode,
} from '@/lib/constants/theme'
import { applyThemeTokens } from '@/lib/theme/default'
import type { UserPreferences } from '@/lib/types/settings'

/**
 * Global settings service
 * This service handles all settings-related operations
 * and can be used by any module or store
 */
export class SettingsService {
  /**
   * Load theme mode from localStorage
   */
  static loadThemeMode(): ThemeMode {
    try {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
      if (storedTheme) {
        const parsedTheme = JSON.parse(storedTheme)
        return parsedTheme.mode ?? THEME_MODE_LIGHT
      }
    } catch (error) {
      console.error('Failed to load theme mode:', error)
    }
    return THEME_MODE_LIGHT
  }

  /**
   * Save theme mode to localStorage
   */
  static saveThemeMode(mode: ThemeMode): void {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ mode }))
    } catch (error) {
      console.error('Failed to save theme mode:', error)
    }
  }

  /**
   * Load user preferences from localStorage
   */
  static loadPreferences(): UserPreferences {
    const defaultPreferences: UserPreferences = {
      autoSave: true,
      notifications: true,
      soundEnabled: false,
      animationSpeed: 'normal',
    }

    try {
      const storedPreferences = localStorage.getItem('preferences')
      if (storedPreferences) {
        return { ...defaultPreferences, ...JSON.parse(storedPreferences) }
      }
    } catch (error) {
      console.error('Failed to load preferences:', error)
    }
    return defaultPreferences
  }

  /**
   * Save user preferences to localStorage
   */
  static savePreferences(preferences: UserPreferences): void {
    try {
      localStorage.setItem('preferences', JSON.stringify(preferences))
    } catch (error) {
      console.error('Failed to save preferences:', error)
    }
  }

  /**
   * Apply theme tokens to DOM
   */
  static applyTheme(mode: ThemeMode): void {
    applyThemeTokens(mode)
  }

  /**
   * Get system theme preference
   */
  static getSystemThemePreference(): ThemeMode {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? THEME_MODE_DARK
        : THEME_MODE_LIGHT
    }
    return THEME_MODE_LIGHT
  }

  /**
   * Initialize settings from localStorage
   */
  static initializeSettings(): {
    themeMode: ThemeMode
    preferences: UserPreferences
  } {
    const themeMode = this.loadThemeMode()
    const preferences = this.loadPreferences()

    // Apply theme to DOM
    this.applyTheme(themeMode)

    return { themeMode, preferences }
  }
}
