<template>
  <div class="loader-container" :class="containerClass">
    <div class="loader-spinner" :class="spinnerClass"></div>
    <p v-if="text" class="loader-text">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'AppLoader',
})

interface Props {
  text?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'white'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'primary',
})

const containerClass = computed(() => ({
  'loader-sm': props.size === 'sm',
  'loader-md': props.size === 'md',
  'loader-lg': props.size === 'lg',
}))

const spinnerClass = computed(() => ({
  'spinner-primary': props.variant === 'primary',
  'spinner-secondary': props.variant === 'secondary',
  'spinner-white': props.variant === 'white',
}))
</script>

<style scoped>
.loader-container {
  @apply flex flex-col items-center justify-center;
}

.loader-sm {
  @apply gap-2;
}

.loader-md {
  @apply gap-3;
}

.loader-lg {
  @apply gap-4;
}

.loader-spinner {
  @apply animate-spin rounded-full border-b-2;
}

.spinner-primary {
  @apply border-primary-500;
}

.spinner-secondary {
  @apply border-gray-500;
}

.spinner-white {
  @apply border-white;
}

.loader-sm .loader-spinner {
  @apply h-4 w-4;
}

.loader-md .loader-spinner {
  @apply h-8 w-8;
}

.loader-lg .loader-spinner {
  @apply h-12 w-12;
}

.loader-text {
  @apply text-sm text-gray-500 dark:text-gray-400;
}

.loader-sm .loader-text {
  @apply text-xs;
}

.loader-lg .loader-text {
  @apply text-base;
}
</style>
