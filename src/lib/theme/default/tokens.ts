import { THEME_CSS_VARS, THEME_MODE_DARK, THEME_MODE_LIGHT } from '@/lib/constants/theme'

/**
 * Default theme tokens using Tailwind CSS custom properties
 * This demonstrates a scalable theme system that can be extended
 * for future themes (e.g., 'racing', 'classic', 'modern')
 */
export const DEFAULT_THEME_TOKENS = {
  [THEME_MODE_LIGHT]: {
    [THEME_CSS_VARS.BACKGROUND]: 'hsl(0 0% 100%)', // white
    [THEME_CSS_VARS.FOREGROUND]: 'hsl(222.2 84% 4.9%)', // slate-950
    [THEME_CSS_VARS.PRIMARY]: 'hsl(221.2 83.2% 53.3%)', // blue-600
    [THEME_CSS_VARS.SECONDARY]: 'hsl(210 40% 96%)', // slate-100
    [THEME_CSS_VARS.MUTED]: 'hsl(210 40% 96%)', // slate-100
    [THEME_CSS_VARS.MUTED_FOREGROUND]: 'hsl(215.4 16.3% 46.9%)', // slate-500
    [THEME_CSS_VARS.BORDER]: 'hsl(214.3 31.8% 91.4%)', // slate-200
    [THEME_CSS_VARS.INPUT]: 'hsl(214.3 31.8% 91.4%)', // slate-200
    [THEME_CSS_VARS.RING]: 'hsl(221.2 83.2% 53.3%)', // blue-600
    [THEME_CSS_VARS.CARD]: 'hsl(0 0% 100%)', // white
    [THEME_CSS_VARS.CARD_FOREGROUND]: 'hsl(222.2 84% 4.9%)', // slate-950
    [THEME_CSS_VARS.POPOVER]: 'hsl(0 0% 100%)', // white
    [THEME_CSS_VARS.POPOVER_FOREGROUND]: 'hsl(222.2 84% 4.9%)', // slate-950
    [THEME_CSS_VARS.TOOLTIP]: 'hsl(222.2 84% 4.9%)', // slate-950
    [THEME_CSS_VARS.TOOLTIP_FOREGROUND]: 'hsl(210 40% 98%)', // slate-50
    [THEME_CSS_VARS.ACCENT]: 'hsl(210 40% 96%)', // slate-100
    [THEME_CSS_VARS.ACCENT_FOREGROUND]: 'hsl(222.2 47.4% 11.2%)', // slate-900
    [THEME_CSS_VARS.DESTRUCTIVE]: 'hsl(0 84.2% 60.2%)', // red-500
    [THEME_CSS_VARS.DESTRUCTIVE_FOREGROUND]: 'hsl(210 40% 98%)', // slate-50
    [THEME_CSS_VARS.SUCCESS]: 'hsl(142.1 76.2% 36.3%)', // green-600
    [THEME_CSS_VARS.SUCCESS_FOREGROUND]: 'hsl(210 40% 98%)', // slate-50
    [THEME_CSS_VARS.WARNING]: 'hsl(38 92% 50%)', // amber-500
    [THEME_CSS_VARS.WARNING_FOREGROUND]: 'hsl(222.2 84% 4.9%)', // slate-950
  },
  [THEME_MODE_DARK]: {
    [THEME_CSS_VARS.BACKGROUND]: 'hsl(222.2 84% 4.9%)', // slate-950
    [THEME_CSS_VARS.FOREGROUND]: 'hsl(210 40% 98%)', // slate-50
    [THEME_CSS_VARS.PRIMARY]: 'hsl(217.2 91.2% 59.8%)', // blue-500
    [THEME_CSS_VARS.SECONDARY]: 'hsl(217.2 32.6% 17.5%)', // slate-800
    [THEME_CSS_VARS.MUTED]: 'hsl(217.2 32.6% 17.5%)', // slate-800
    [THEME_CSS_VARS.MUTED_FOREGROUND]: 'hsl(215 20.2% 65.1%)', // slate-400
    [THEME_CSS_VARS.BORDER]: 'hsl(217.2 32.6% 17.5%)', // slate-800
    [THEME_CSS_VARS.INPUT]: 'hsl(217.2 32.6% 17.5%)', // slate-800
    [THEME_CSS_VARS.RING]: 'hsl(224.3 76.3% 94.1%)', // blue-400
    [THEME_CSS_VARS.CARD]: 'hsl(222.2 84% 4.9%)', // slate-950
    [THEME_CSS_VARS.CARD_FOREGROUND]: 'hsl(210 40% 98%)', // slate-50
    [THEME_CSS_VARS.POPOVER]: 'hsl(222.2 84% 4.9%)', // slate-950
    [THEME_CSS_VARS.POPOVER_FOREGROUND]: 'hsl(210 40% 98%)', // slate-50
    [THEME_CSS_VARS.TOOLTIP]: 'hsl(210 40% 98%)', // slate-50
    [THEME_CSS_VARS.TOOLTIP_FOREGROUND]: 'hsl(222.2 84% 4.9%)', // slate-950
    [THEME_CSS_VARS.ACCENT]: 'hsl(217.2 32.6% 17.5%)', // slate-800
    [THEME_CSS_VARS.ACCENT_FOREGROUND]: 'hsl(210 40% 98%)', // slate-50
    [THEME_CSS_VARS.DESTRUCTIVE]: 'hsl(0 62.8% 30.6%)', // red-900
    [THEME_CSS_VARS.DESTRUCTIVE_FOREGROUND]: 'hsl(210 40% 98%)', // slate-50
    [THEME_CSS_VARS.SUCCESS]: 'hsl(142.1 70.6% 45.3%)', // green-500
    [THEME_CSS_VARS.SUCCESS_FOREGROUND]: 'hsl(222.2 84% 4.9%)', // slate-950
    [THEME_CSS_VARS.WARNING]: 'hsl(48 96% 53%)', // amber-400
    [THEME_CSS_VARS.WARNING_FOREGROUND]: 'hsl(222.2 84% 4.9%)', // slate-950
  },
} as const

/**
 * Get theme tokens for a specific mode
 */
export const getThemeTokens = (mode: 'light' | 'dark') => {
  return DEFAULT_THEME_TOKENS[mode]
}

/**
 * Apply theme tokens to DOM
 */
export const applyThemeTokens = (mode: 'light' | 'dark'): void => {
  const root = document.documentElement
  const tokens = getThemeTokens(mode)

  // Set data-theme attribute
  root.setAttribute('data-theme', mode)

  // Apply all CSS custom properties
  Object.entries(tokens).forEach(([property, value]) => {
    root.style.setProperty(property, value)
  })
}
