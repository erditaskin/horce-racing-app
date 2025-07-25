<template>
  <select
    :id="name"
    :value="value"
    @change="handleChange"
    @blur="handleBlur"
    :disabled="disabled"
    :class="[
      'block w-full px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200',
      'bg-input text-foreground placeholder-muted-foreground',
      errorMessage
        ? 'border-destructive focus:ring-destructive focus:border-destructive'
        : 'border-border focus:ring-ring focus:border-ring hover:border-border/80',
      disabled && 'opacity-50 cursor-not-allowed bg-muted',
    ]"
  >
    <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import type { AppOption } from '@/lib/types'
import { useField } from 'vee-validate'

defineOptions({
  name: 'AppSelectInput',
})

interface Props {
  name: string
  options: AppOption[]
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  disabled: false,
})

const { value, handleChange, handleBlur, errorMessage } = useField(props.name)
</script>
