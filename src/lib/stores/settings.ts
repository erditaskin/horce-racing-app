import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export interface Theme {
  mode: 'light' | 'dark'
  primary: string
  secondary: string
  background: string
  foreground: string
}

export interface UserPreferences {
  autoSave: boolean
  notifications: boolean
  soundEnabled: boolean
  animationSpeed: 'slow' | 'normal' | 'fast'
}

export const useSettingsStore = defineStore('settings', () => {
  // State
  const theme = ref<Theme>({
    mode: 'light',
    primary: '#2563eb',
    secondary: '#dc2626',
    background: '#ffffff',
    foreground: '#0f172a'
  })
  
  const preferences = ref<UserPreferences>({
    autoSave: true,
    notifications: true,
    soundEnabled: false,
    animationSpeed: 'normal'
  })

  const isLoading = ref(false)

  // Getters
  const isDarkMode = computed(() => theme.value.mode === 'dark')
  const animationSpeedMultiplier = computed(() => {
    switch (preferences.value.animationSpeed) {
      case 'slow': return 1.5
      case 'fast': return 0.5
      default: return 1
    }
  })

  // Actions
  const toggleTheme = (): void => {
    theme.value.mode = theme.value.mode === 'light' ? 'dark' : 'light'
    updateThemeColors()
    applyThemeToDOM()
  }

  const setTheme = (mode: 'light' | 'dark'): void => {
    theme.value.mode = mode
    updateThemeColors()
    applyThemeToDOM()
  }

  const updateThemeColors = (): void => {
    if (theme.value.mode === 'dark') {
      theme.value.background = '#0f172a'
      theme.value.foreground = '#f8fafc'
    } else {
      theme.value.background = '#ffffff'
      theme.value.foreground = '#0f172a'
    }
  }

  const applyThemeToDOM = (): void => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme.value.mode)
    root.style.setProperty('--background', theme.value.background)
    root.style.setProperty('--foreground', theme.value.foreground)
    root.style.setProperty('--primary', theme.value.primary)
    root.style.setProperty('--secondary', theme.value.secondary)
  }

  const updatePreferences = (newPreferences: Partial<UserPreferences>): void => {
    preferences.value = { ...preferences.value, ...newPreferences }
  }

  const initializeSettings = (): void => {
    // Load from localStorage
    const storedTheme = localStorage.getItem('theme')
    const storedPreferences = localStorage.getItem('preferences')
    
    if (storedTheme) {
      try {
        theme.value = { ...theme.value, ...JSON.parse(storedTheme) }
      } catch (error) {
        console.error('Failed to restore theme:', error)
      }
    }
    
    if (storedPreferences) {
      try {
        preferences.value = { ...preferences.value, ...JSON.parse(storedPreferences) }
      } catch (error) {
        console.error('Failed to restore preferences:', error)
      }
    }
    
    // Apply theme to DOM
    updateThemeColors()
    applyThemeToDOM()
    
    // Detect system preference if no stored theme
    if (!storedTheme) {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(systemPrefersDark ? 'dark' : 'light')
    }
  }

  // Watch for changes and save to localStorage
  watch(theme, (newTheme) => {
    localStorage.setItem('theme', JSON.stringify(newTheme))
  }, { deep: true })

  watch(preferences, (newPreferences) => {
    localStorage.setItem('preferences', JSON.stringify(newPreferences))
  }, { deep: true })

  return {
    // State
    theme,
    preferences,
    isLoading,
    
    // Getters
    isDarkMode,
    animationSpeedMultiplier,
    
    // Actions
    toggleTheme,
    setTheme,
    updatePreferences,
    initializeSettings
  }
})
