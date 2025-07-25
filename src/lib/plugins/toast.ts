import type { App } from 'vue'
import Toast, { type PluginOptions, POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

/**
 * Vue Toastification plugin configuration
 * Uses default Vue Toastification styling with our theme colors
 */
export const toastConfig: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 4000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  // Custom icons
  toastDefaults: {
    // Success toast
    success: {
      icon: 'check-circle',
    },
    // Error toast
    error: {
      icon: 'x-circle',
    },
    // Warning toast
    warning: {
      icon: 'alert-triangle',
    },
    // Info toast
    info: {
      icon: 'info',
    },
  },
}

export function setupToast(app: App) {
  app.use(Toast, toastConfig)
}
