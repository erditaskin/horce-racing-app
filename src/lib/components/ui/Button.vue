<script setup lang="ts">
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
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      // Size classes
      props.size === 'sm' ? 'px-3 py-1.5 text-sm' : '',
      props.size === 'md' ? 'px-4 py-2 text-sm' : '',
      props.size === 'lg' ? 'px-6 py-3 text-base' : '',
      // Variant classes
      props.variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm' : '',
      props.variant === 'secondary' ? 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-sm' : '',
      props.variant === 'danger' ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm' : '',
      props.variant === 'success' ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm' : '',
      props.variant === 'warning' ? 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500 shadow-sm' : ''
    ]"
    :disabled="props.disabled || props.loading"
    :type="props.type"
    @click="$emit('click', $event)"
  >
    <div v-if="props.loading" class="spinner mr-2"></div>
    <slot />
  </button>
</template> 