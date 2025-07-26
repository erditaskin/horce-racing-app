<template>
  <AppForm
    :validation-schema="validationSchema"
    @submit="handleFormSubmit"
    @error="handleFormError"
  >
    <AppFormField
      name="name"
      label="Full Name"
      fieldType="text"
      placeholder="Enter your full name"
      required
    />

    <AppFormField
      name="email"
      label="Email Address"
      fieldType="email"
      placeholder="Enter your email address"
      required
    />

    <AppFormField
      name="password"
      label="Password"
      fieldType="password"
      placeholder="Enter your password"
      required
    />

    <AppFormField
      name="confirmPassword"
      label="Confirm Password"
      fieldType="password"
      placeholder="Confirm your password"
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
      {{ isSubmitting ? 'Creating Account...' : 'Create Account' }}
    </Button>

    <div class="text-center text-sm text-muted-foreground">
      Already have an account?
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
import { RegisterService } from '@/modules/auth/services/register'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'

defineOptions({
  name: 'RegisterForm',
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
  name: yup
    .string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    ),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

type RegisterFormData = yup.InferType<typeof validationSchema>

const handleFormSubmit = async (values: Record<string, unknown>) => {
  const formData = values as RegisterFormData

  try {
    isSubmitting.value = true

    const response = await RegisterService.register(formData)

    if (response.success) {
      toast.success(response.message)
      props.onSuccess()
      router.push('/auth/login')
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Registration failed'
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
