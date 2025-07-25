/**
 * Toast options interface for type safety
 */
export interface ToastOptions {
  timeout?: number
  closeOnClick?: boolean
  pauseOnFocusLoss?: boolean
  pauseOnHover?: boolean
  draggable?: boolean
  draggablePercent?: number
  showCloseButtonOnHover?: boolean
  hideProgressBar?: boolean
  closeButton?: string | boolean
  icon?: string | boolean
  rtl?: boolean
}
