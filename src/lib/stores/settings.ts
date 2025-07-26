import { THEME_MODE_DARK, THEME_MODE_LIGHT, type ThemeMode } from '@/lib/constants/theme'
import { SettingsService } from '@/lib/services'
import type { UserPreferences } from '@/lib/types'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

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
    SettingsService.applyTheme(themeMode.value)
  }

  const setTheme = (mode: ThemeMode): void => {
    themeMode.value = mode
    SettingsService.applyTheme(mode)
  }

  const updatePreferences = (newPreferences: Partial<UserPreferences>): void => {
    preferences.value = { ...preferences.value, ...newPreferences }
  }

  const initializeSettings = async (): Promise<void> => {
    try {
      // Use SettingsService to initialize settings
      const { themeMode: initialThemeMode, preferences: initialPreferences } =
        SettingsService.initializeSettings()

      themeMode.value = initialThemeMode
      preferences.value = initialPreferences
    } catch (error) {
      console.error('Failed to initialize theme settings:', error)
      throw error
    }
  }

  // Watch for changes and save to localStorage
  watch(themeMode, (newMode) => {
    SettingsService.saveThemeMode(newMode)
  })

  watch(
    preferences,
    (newPreferences) => {
      SettingsService.savePreferences(newPreferences)
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
