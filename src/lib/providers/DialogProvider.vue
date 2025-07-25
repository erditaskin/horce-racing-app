<script setup lang="ts">
import { provide, reactive } from 'vue'
import Confirm from '../components/dialog/Confirm.vue'
import Modal from '../components/dialog/Modal.vue'
import Button from '../components/ui/Button.vue'

// Modal state
const modalState = reactive({
  isOpen: false,
  title: '',
  size: 'md' as 'sm' | 'md' | 'lg' | 'xl',
  content: '',
  onConfirm: null as (() => void) | null,
  onCancel: null as (() => void) | null,
  onClose: null as (() => void) | null,
})

// Confirm state
const confirmState = reactive({
  isOpen: false,
  title: '',
  message: '',
  type: 'info' as 'info' | 'warning' | 'error' | 'success',
  confirmText: '',
  cancelText: '',
  showCancel: true,
  onConfirm: null as (() => void) | null,
  onCancel: null as (() => void) | null,
})

// Modal methods
const modal = {
  open: (options: {
    title?: string
    content?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    onConfirm?: () => void
    onCancel?: () => void
    onClose?: () => void
  }) => {
    modalState.isOpen = true
    modalState.title = options.title || ''
    modalState.content = options.content || ''
    modalState.size = options.size || 'md'
    modalState.onConfirm = options.onConfirm || null
    modalState.onCancel = options.onCancel || null
    modalState.onClose = options.onClose || null
  },

  close: () => {
    modalState.isOpen = false
    if (modalState.onClose) {
      modalState.onClose()
    }
  },
}

// Confirm methods
const confirm = {
  show: (options: {
    title?: string
    message: string
    type?: 'info' | 'warning' | 'error' | 'success'
    confirmText?: string
    cancelText?: string
    showCancel?: boolean
    onConfirm?: () => void
    onCancel?: () => void
  }) => {
    confirmState.isOpen = true
    confirmState.title = options.title || 'Confirm'
    confirmState.message = options.message
    confirmState.type = options.type || 'info'
    confirmState.confirmText = options.confirmText || 'Confirm'
    confirmState.cancelText = options.cancelText || 'Cancel'
    confirmState.showCancel = options.showCancel !== false
    confirmState.onConfirm = options.onConfirm || null
    confirmState.onCancel = options.onCancel || null
  },

  hide: () => {
    confirmState.isOpen = false
  },
}

// Event handlers
const handleModalConfirm = () => {
  if (modalState.onConfirm) {
    modalState.onConfirm()
  }
  modal.close()
}

const handleModalCancel = () => {
  if (modalState.onCancel) {
    modalState.onCancel()
  }
  modal.close()
}

const handleModalClose = () => {
  modal.close()
}

const handleConfirmConfirm = () => {
  if (confirmState.onConfirm) {
    confirmState.onConfirm()
  }
  confirm.hide()
}

const handleConfirmCancel = () => {
  if (confirmState.onCancel) {
    confirmState.onCancel()
  }
  confirm.hide()
}

// Provide to child components
provide('dialog', {
  modal,
  confirm,
})
</script>

<template>
  <div>
    <!-- Render children -->
    <slot />

    <!-- Global Modal -->
    <Modal
      :is-open="modalState.isOpen"
      :title="modalState.title"
      :size="modalState.size"
      @close="handleModalClose"
      @confirm="handleModalConfirm"
      @cancel="handleModalCancel"
    >
      <div v-html="modalState.content"></div>

      <template #footer>
        <Button v-if="modalState.onCancel" variant="secondary" size="sm" @click="handleModalCancel">
          Cancel
        </Button>
        <Button v-if="modalState.onConfirm" variant="primary" size="sm" @click="handleModalConfirm">
          Confirm
        </Button>
      </template>
    </Modal>

    <!-- Global Confirm -->
    <Confirm
      :is-open="confirmState.isOpen"
      :title="confirmState.title"
      :message="confirmState.message"
      :type="confirmState.type"
      :confirm-text="confirmState.confirmText"
      :cancel-text="confirmState.cancelText"
      :show-cancel="confirmState.showCancel"
      @close="confirm.hide()"
      @confirm="handleConfirmConfirm"
      @cancel="handleConfirmCancel"
    />
  </div>
</template>
