<template>
  <form @submit.prevent="handleFormSubmit" :class="formClass">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import type { Schema } from 'yup'

defineOptions({
  name: 'AppForm',
})

interface Props {
  validationSchema?: Schema
  initialValues?: Record<string, unknown>
  formClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  validationSchema: undefined,
  initialValues: () => ({}),
  formClass: 'space-y-6',
})

// Emits
interface Emits {
  (e: 'submit', values: Record<string, unknown>): void
  (e: 'error', error: string): void
}

const emit = defineEmits<Emits>()

// Form setup
const { handleSubmit, resetForm, setErrors } = useForm({
  validationSchema: props.validationSchema,
  initialValues: props.initialValues,
})

// Expose form methods to parent
defineExpose({
  resetForm,
  setErrors,
})

// Handle form submission
const handleFormSubmit = handleSubmit(
  (values) => {
    emit('submit', values)
  },
  (errors) => {
    const errorMessage = Object.values(errors).join(', ')
    emit('error', errorMessage)
  },
)
</script>
