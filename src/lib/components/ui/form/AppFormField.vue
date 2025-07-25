<template>
  <div class="form-field">
    <label :for="name" class="block text-sm font-semibold text-foreground mb-2">
      {{ label }}
      <span v-if="required" class="text-destructive ml-1">*</span>
    </label>

    <!-- Dynamic input rendering based on fieldType -->
    <component
      :is="inputComponent"
      :name="name"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :options="options"
      v-bind="$attrs"
    />

    <ErrorMessage :name="name" v-slot="{ message }">
      <div class="mt-2 text-sm font-bold text-destructive">
        {{ message }}
      </div>
    </ErrorMessage>

    <p v-if="helpText" class="mt-2 text-sm text-muted-foreground">
      {{ helpText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { AppOption } from '@/lib/types'
import { ErrorMessage, useField } from 'vee-validate'
import { computed } from 'vue'
import AppSelectInput from '../input/AppSelectInput.vue'
import AppTextInput from '../input/AppTextInput.vue'

defineOptions({
  name: 'AppFormField',
})

interface Props {
  name: string
  label: string
  fieldType?: 'text' | 'email' | 'password' | 'select'
  inputType?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  helpText?: string
  options?: AppOption[]
}

const props = withDefaults(defineProps<Props>(), {
  fieldType: 'text',
  inputType: 'text',
  placeholder: '',
  required: false,
  disabled: false,
  helpText: '',
})

// Field context is used by ErrorMessage component
useField(props.name)

// Dynamic component selection based on fieldType
const inputComponent = computed(() => {
  switch (props.fieldType) {
    case 'select':
      return AppSelectInput
    case 'text':
    case 'email':
    case 'password':
    default:
      return AppTextInput
  }
})

// Dynamic input type for text inputs
const inputType = computed(() => {
  if (props.fieldType === 'select') return undefined
  return props.fieldType === 'text' ? props.inputType : props.fieldType
})
</script>

<style scoped>
.form-field {
  @apply w-full;
}
</style>
