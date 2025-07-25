/**
 * Theme mode constants
 */
export const THEME_MODE_LIGHT = 'light' as const
export const THEME_MODE_DARK = 'dark' as const

/**
 * Theme mode type
 */
export type ThemeMode = typeof THEME_MODE_LIGHT | typeof THEME_MODE_DARK

/**
 * Default theme mode
 */
export const THEME_MODE_DEFAULT = THEME_MODE_LIGHT

/**
 * Theme storage key
 */
export const THEME_STORAGE_KEY = 'theme'

/**
 * Theme CSS custom property names
 */
export const THEME_CSS_VARS = {
  BACKGROUND: '--background',
  FOREGROUND: '--foreground',
  PRIMARY: '--primary',
  SECONDARY: '--secondary',
  MUTED: '--muted',
  MUTED_FOREGROUND: '--muted-foreground',
  BORDER: '--border',
  INPUT: '--input',
  RING: '--ring',
  CARD: '--card',
  CARD_FOREGROUND: '--card-foreground',
  POPOVER: '--popover',
  POPOVER_FOREGROUND: '--popover-foreground',
  TOOLTIP: '--tooltip',
  TOOLTIP_FOREGROUND: '--tooltip-foreground',
  ACCENT: '--accent',
  ACCENT_FOREGROUND: '--accent-foreground',
  DESTRUCTIVE: '--destructive',
  DESTRUCTIVE_FOREGROUND: '--destructive-foreground',
  SUCCESS: '--success',
  SUCCESS_FOREGROUND: '--success-foreground',
  WARNING: '--warning',
  WARNING_FOREGROUND: '--warning-foreground'
} as const
