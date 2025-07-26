<template>
  <AppForm
    :validation-schema="validationSchema"
    @submit="handleFormSubmit"
    @error="handleFormError"
  >
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-foreground mb-2">Reset Password</h2>
      <p class="text-muted-foreground">
        Enter your email address and we'll send you a link to reset your password.
      </p>
    </div>

    <AppFormField
      name="email"
      label="Email Address"
      fieldType="email"
      placeholder="Enter your email address"
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
      {{ isSubmitting ? 'Sending Reset Link...' : 'Send Reset Link' }}
    </Button>

    <div class="text-center text-sm text-muted-foreground">
      Remember your password?
      <RouterLink to="/auth/login" class="font-medium text-primary hover:underline">
        Sign in here
      </RouterLink>
    </div>
  </AppForm>
</template>

<script setup lang="ts">
import Button from '@/lib/components/ui/Button.vue'
import AppForm from '@/lib/components/ui/form/AppForm.vue'
import AppFormField from '@/lib/components/ui/form/AppFormField.vue'
import { useToast } from '@/lib/composables/useToast'
import { ForgotPasswordService } from '@/modules/auth/services/forgotPassword'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'

defineOptions({
  name: 'ForgotPasswordForm',
})

interface Props {
  onSuccess?: () => void
  onError?: (error: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  onSuccess: () => {},
  onError: () => {},
})

const router = useRouter()
const toast = useToast()
const isSubmitting = ref(false)

const validationSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .trim(),
})

type ForgotPasswordFormData = yup.InferType<typeof validationSchema>

const handleFormSubmit = async (values: Record<string, unknown>) => {
  const formData = values as ForgotPasswordFormData

  try {
    isSubmitting.value = true

    const response = await ForgotPasswordService.requestReset(formData)

    if (response.success) {
      toast.success(response.message)
      props.onSuccess()
      router.push('/auth/login')
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to send reset email'
    toast.error(errorMessage)
    props.onError(errorMessage)
  } finally {
    isSubmitting.value = false
  }
}

const handleFormError = (error: string) => {
  props.onError(error)
}
</script>
