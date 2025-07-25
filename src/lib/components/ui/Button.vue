<script setup lang="ts">
import { computed } from 'vue'

// Component name for linting
defineOptions({
  name: 'BaseButton',
})

const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}>()

defineEmits<{
  click: [event: MouseEvent]
}>()

const variantClasses = computed(() => [
  'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  // Size classes
  props.size === 'sm' ? 'px-3 py-1.5 text-sm' : '',
  props.size === 'md' ? 'px-4 py-2 text-sm' : '',
  props.size === 'lg' ? 'px-6 py-3 text-base' : '',
  // Default to md size if not specified
  !props.size ? 'px-4 py-2 text-sm' : '',
  // Variant classes
  props.variant === 'primary'
    ? 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-medium font-semibold'
    : '',
  props.variant === 'secondary'
    ? 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 shadow-sm font-medium'
    : '',
  props.variant === 'danger'
    ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm font-medium'
    : '',
  props.variant === 'success'
    ? 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500 shadow-sm font-medium'
    : '',
  props.variant === 'warning'
    ? 'bg-warning-600 text-white hover:bg-warning-700 focus:ring-warning-500 shadow-sm font-medium'
    : '',
  // Default variant if not specified
  !props.variant
    ? 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-medium font-semibold'
    : '',
])
</script>

<template>
  <button
    :class="variantClasses"
    :disabled="props.disabled || props.loading"
    :type="props.type"
    @click="$emit('click', $event)"
  >
    <div v-if="props.loading" class="spinner mr-2"></div>
    <slot />
  </button>
</template>
