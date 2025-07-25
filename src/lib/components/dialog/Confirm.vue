<script setup lang="ts">
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-vue-next'
import Button from '../ui/Button.vue'

// Component name for linting
defineOptions({
  name: 'ConfirmDialog',
})

interface Props {
  isOpen: boolean
  title?: string
  message: string
  type?: 'info' | 'warning' | 'error' | 'success'
  confirmText?: string
  cancelText?: string
  showCancel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Confirm',
  type: 'info',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  showCancel: true,
})

const emit = defineEmits<{
  confirm: []
  cancel: []
  close: []
}>()

const typeConfig = {
  info: {
    icon: Info,
    iconClass: 'text-primary',
    confirmVariant: 'primary' as const,
  },
  warning: {
    icon: AlertTriangle,
    iconClass: 'text-warning',
    confirmVariant: 'warning' as const,
  },
  error: {
    icon: XCircle,
    iconClass: 'text-destructive',
    confirmVariant: 'danger' as const,
  },
  success: {
    icon: CheckCircle,
    iconClass: 'text-success',
    confirmVariant: 'success' as const,
  },
}

const config = typeConfig[props.type]
const IconComponent = config.icon

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-[100] overflow-y-auto" @click="handleClose">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

        <!-- Confirm Dialog -->
        <div class="flex min-h-full items-center justify-center p-4">
          <div
            class="confirm-dialog relative w-full max-w-md rounded-lg shadow-xl transform transition-all"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            @click.stop
          >
            <!-- Header -->
            <div class="flex items-center p-6 border-b border-border">
              <div class="flex-shrink-0">
                <IconComponent :class="['w-6 h-6', config.iconClass]" />
              </div>
              <div class="ml-3">
                <h3 id="confirm-title" class="text-lg font-medium text-foreground">
                  {{ title }}
                </h3>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <p class="text-sm text-muted-foreground">
                {{ message }}
              </p>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-end space-x-3 p-6 border-t border-border">
              <Button v-if="showCancel" variant="secondary" size="sm" @click="handleCancel">
                {{ cancelText }}
              </Button>
              <Button :variant="config.confirmVariant" size="sm" @click="handleConfirm">
                {{ confirmText }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.confirm-dialog {
  background-color: white;
  color: #1f2937;
  border: 1px solid #e5e7eb;
}

/* Dark mode support */
.dark .confirm-dialog {
  background-color: #374151;
  color: #f9fafb;
  border: 1px solid #4b5563;
}
</style>
