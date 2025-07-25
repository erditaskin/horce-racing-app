import {
  THEME_MODE_DARK,
  THEME_MODE_LIGHT,
  THEME_STORAGE_KEY,
  type ThemeMode,
} from '@/lib/constants/theme'
import { applyThemeTokens } from '@/lib/theme/default'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export interface UserPreferences {
  autoSave: boolean
  notifications: boolean
  soundEnabled: boolean
  animationSpeed: 'slow' | 'normal' | 'fast'
}

export const useSettingsStore = defineStore('settings', () => {
  // State - only manage mode, colors come from theme tokens
  const themeMode = ref<ThemeMode>(THEME_MODE_LIGHT)

  const preferences = ref<UserPreferences>({
    autoSave: true,
    notifications: true,
    soundEnabled: false,
    animationSpeed: 'normal',
  })

  const isLoading = ref(false)

  // Getters
  const isDarkMode = computed(() => themeMode.value === THEME_MODE_DARK)
  const animationSpeedMultiplier = computed(() => {
    switch (preferences.value.animationSpeed) {
      case 'slow':
        return 1.5
      case 'fast':
        return 0.5
      default:
        return 1
    }
  })

  // Actions
  const toggleTheme = (): void => {
    themeMode.value = themeMode.value === THEME_MODE_LIGHT ? THEME_MODE_DARK : THEME_MODE_LIGHT
    applyThemeTokens(themeMode.value)
  }

  const setTheme = (mode: ThemeMode): void => {
    themeMode.value = mode
    applyThemeTokens(mode)
  }

  const updatePreferences = (newPreferences: Partial<UserPreferences>): void => {
    preferences.value = { ...preferences.value, ...newPreferences }
  }

  const initializeSettings = async (): Promise<void> => {
    try {
      // Load from localStorage
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
      const storedPreferences = localStorage.getItem('preferences')

      if (storedTheme) {
        try {
          const parsedTheme = JSON.parse(storedTheme)
          // Use stored theme mode, fallback to light
          themeMode.value = parsedTheme.mode ?? THEME_MODE_LIGHT
        } catch (error) {
          console.error('Failed to restore theme:', error)
          themeMode.value = THEME_MODE_LIGHT
        }
      } else {
        // No stored theme, default to light mode
        themeMode.value = THEME_MODE_LIGHT
      }

      if (storedPreferences) {
        try {
          preferences.value = { ...preferences.value, ...JSON.parse(storedPreferences) }
        } catch (error) {
          console.error('Failed to restore preferences:', error)
        }
      }

      // Apply theme tokens to DOM
      applyThemeTokens(themeMode.value)

      // Save current theme mode to localStorage to ensure sync
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ mode: themeMode.value }))

      console.log('Theme settings initialized successfully')
    } catch (error) {
      console.error('Failed to initialize theme settings:', error)
      throw error
    }
  }

  // Watch for changes and save to localStorage
  watch(themeMode, (newMode) => {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ mode: newMode }))
  })

  watch(
    preferences,
    (newPreferences) => {
      localStorage.setItem('preferences', JSON.stringify(newPreferences))
    },
    { deep: true },
  )

  return {
    // State
    themeMode,
    preferences,
    isLoading,

    // Getters
    isDarkMode,
    animationSpeedMultiplier,

    // Actions
    toggleTheme,
    setTheme,
    updatePreferences,
    initializeSettings,
  }
})
