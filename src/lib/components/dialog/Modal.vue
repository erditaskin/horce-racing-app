<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import Button from '../ui/Button.vue'

// Component name for linting
defineOptions({
  name: 'ModalDialog'
})

interface Props {
  isOpen: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  size: 'md',
  closeOnOverlay: true,
  closeOnEscape: true,
  showCloseButton: true
})

const emit = defineEmits<{
  close: []
  confirm: []
  cancel: []
}>()

// Focus management
let previousActiveElement: HTMLElement | null = null
const modalElement = ref<HTMLElement | null>(null)

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }
  return sizes[props.size]
})

const handleOverlayClick = (event: Event) => {
  if (props.closeOnOverlay && event.target === event.currentTarget) {
    emit('close')
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (props.closeOnEscape && event.key === 'Escape') {
    emit('close')
  }
}

const handleClose = () => {
  emit('close')
}

// Focus management
onMounted(async () => {
  if (props.isOpen) {
    // Store current active element
    previousActiveElement = document.activeElement as HTMLElement
    
    // Wait for modal to be rendered
    await nextTick()
    
    // Focus first focusable element in modal
    if (modalElement.value) {
      const focusableElements = modalElement.value.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus()
      }
    }
    
    // Add escape key listener
    document.addEventListener('keydown', handleEscape)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  
  // Restore focus to previous element
  if (previousActiveElement) {
    previousActiveElement.focus()
  }
})
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
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click="handleOverlayClick"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
        
        <!-- Modal -->
        <div class="flex min-h-full items-center justify-center p-4">
          <div
            ref="modalElement"
            :class="[
              'relative w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all',
              sizeClasses
            ]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <!-- Header -->
            <div v-if="title || showCloseButton" class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3
                v-if="title"
                id="modal-title"
                class="text-lg font-medium text-gray-900 dark:text-white"
              >
                {{ title }}
              </h3>
              <div v-else></div>
              
              <Button
                v-if="showCloseButton"
                variant="secondary"
                size="sm"
                @click="handleClose"
                class="p-1"
                aria-label="Close modal"
              >
                <X class="w-4 h-4" />
              </Button>
            </div>
            
            <!-- Content -->
            <div class="p-6">
              <slot />
            </div>
            
            <!-- Footer -->
            <div v-if="$slots.footer" class="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template> 