import { useToast as useVueToast } from 'vue-toastification'
import type { ToastOptions } from '../types'

/**
 * Toast composable wrapper for Vue Toastification
 * Provides a clean API: toast.success(), toast.error(), etc.
 */
export function useToast() {
  const toast = useVueToast()

  return {
    success: (message: string, options?: ToastOptions) => toast.success(message, options),
    error: (message: string, options?: ToastOptions) => toast.error(message, options),
    warning: (message: string, options?: ToastOptions) => toast.warning(message, options),
    info: (message: string, options?: ToastOptions) => toast.info(message, options),
    show: (message: string, options?: ToastOptions) => toast(message, options),
  }
}
