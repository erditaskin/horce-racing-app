<script setup lang="ts">
import { computed } from 'vue';

// Component name for linting
defineOptions({
  name: 'BaseButton'
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
  // Variant classes
  props.variant === 'primary' ? 'bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-medium font-semibold' : '',
  props.variant === 'secondary' ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary shadow-sm font-medium' : '',
  props.variant === 'danger' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive shadow-sm font-medium' : '',
  props.variant === 'success' ? 'bg-success text-success-foreground hover:bg-success/90 focus:ring-success shadow-sm font-medium' : '',
  props.variant === 'warning' ? 'bg-warning text-warning-foreground hover:bg-warning/90 focus:ring-warning shadow-sm font-medium' : ''
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