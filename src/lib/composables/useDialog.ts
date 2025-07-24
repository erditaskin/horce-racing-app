import { inject } from 'vue'

interface DialogAPI {
  modal: {
    open: (options: {
      title?: string
      content?: string
      size?: 'sm' | 'md' | 'lg' | 'xl'
      onConfirm?: () => void
      onCancel?: () => void
      onClose?: () => void
    }) => void
    close: () => void
  }
  confirm: {
    show: (options: {
      title?: string
      message: string
      type?: 'info' | 'warning' | 'error' | 'success'
      confirmText?: string
      cancelText?: string
      showCancel?: boolean
      onConfirm?: () => void
      onCancel?: () => void
    }) => void
    hide: () => void
  }
}

export const useDialog = (): DialogAPI => {
  const dialog = inject<DialogAPI>('dialog')
  
  if (!dialog) {
    throw new Error('useDialog must be used within DialogProvider')
  }
  
  return dialog
}

// Convenience functions for common use cases
export const useConfirm = () => {
  const { confirm } = useDialog()
  
  return {
    // Simple confirmations
    info: (message: string, onConfirm?: () => void) => {
      confirm.show({
        message,
        type: 'info',
        onConfirm
      })
    },
    
    warning: (message: string, onConfirm?: () => void) => {
      confirm.show({
        message,
        type: 'warning',
        onConfirm
      })
    },
    
    error: (message: string, onConfirm?: () => void) => {
      confirm.show({
        message,
        type: 'error',
        onConfirm
      })
    },
    
    success: (message: string, onConfirm?: () => void) => {
      confirm.show({
        message,
        type: 'success',
        onConfirm
      })
    },
    
    // Delete confirmation
    delete: (itemName: string, onConfirm?: () => void) => {
      confirm.show({
        title: 'Delete Confirmation',
        message: `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
        type: 'error',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        onConfirm
      })
    },
    
    // Custom confirmations
    custom: confirm.show
  }
}

export const useModal = () => {
  const { modal } = useDialog()
  
  return {
    // Simple modals
    info: (title: string, content: string, onConfirm?: () => void) => {
      modal.open({
        title,
        content,
        onConfirm
      })
    },
    
    // Large content modals
    large: (title: string, content: string, onConfirm?: () => void) => {
      modal.open({
        title,
        content,
        size: 'lg',
        onConfirm
      })
    },
    
    // Custom modals
    custom: modal.open,
    close: modal.close
  }
} 