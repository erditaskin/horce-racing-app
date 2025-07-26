<template>
  <AppForm :validation-schema="loginSchema" @submit="handleFormSubmit" @error="handleFormError">
    <AppFormField
      name="email"
      label="Email"
      fieldType="email"
      placeholder="Enter your email"
      required
    />

    <AppFormField
      name="password"
      label="Password"
      fieldType="password"
      placeholder="Enter your password"
      required
    />

    <Button
      type="submit"
      variant="primary"
      size="lg"
      :loading="isSubmitting"
      :disabled="isSubmitting"
      class="w-full"
    >
      {{ isSubmitting ? 'Signing in...' : 'Sign In' }}
    </Button>

    <div class="text-center text-sm text-muted-foreground">
      <div class="mb-2">
        Don't have an account?
        <RouterLink to="/auth/register" class="font-medium text-primary hover:underline">
          Create one here
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/auth/forgot-password" class="font-medium text-primary hover:underline">
          Forgot your password?
        </RouterLink>
      </div>
    </div>
  </AppForm>
</template>

<script setup lang="ts">
import Button from '@/lib/components/ui/Button.vue'
import AppForm from '@/lib/components/ui/form/AppForm.vue'
import AppFormField from '@/lib/components/ui/form/AppFormField.vue'
import { useAuthStore } from '@/lib/stores/auth'
import { ref } from 'vue'
import * as yup from 'yup'

defineOptions({
  name: 'LoginForm',
})

interface Props {
  onSuccess?: () => void
  onError?: (error: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  onSuccess: () => {},
  onError: () => {},
})

const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .trim(),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .trim(),
})

type LoginFormData = yup.InferType<typeof loginSchema>

const authStore = useAuthStore()
const isSubmitting = ref(false)

const handleFormSubmit = async (values: Record<string, unknown>) => {
  const formData = values as LoginFormData
  try {
    isSubmitting.value = true
    await authStore.login(formData.email, formData.password)
    props.onSuccess()
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Login failed'
    props.onError(errorMessage)
  } finally {
    isSubmitting.value = false
  }
}

const handleFormError = (error: string) => {
  props.onError(error)
}
</script>
