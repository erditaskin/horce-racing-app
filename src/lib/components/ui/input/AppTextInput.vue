<template>
  <input
    :id="name"
    :value="value"
    @input="handleChange"
    @blur="handleBlur"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="[
      'block w-full px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200',
      'bg-background text-foreground placeholder-muted-foreground',
      errorMessage
        ? 'border-destructive focus:ring-destructive focus:border-destructive'
        : 'border-border focus:ring-ring focus:border-ring hover:border-border/80',
      disabled && 'opacity-50 cursor-not-allowed bg-muted'
    ]"
  />
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

defineOptions({
  name: 'AppTextInput'
})

interface Props {
  name: string
  type?: string
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false
})

const { value, handleChange, handleBlur, errorMessage } = useField(props.name)
</script> 