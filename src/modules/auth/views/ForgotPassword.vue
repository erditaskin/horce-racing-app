<template>
  <div class="w-full max-w-md mx-auto">
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
      <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Reset Password
      </h2>
      
      <form @submit.prevent="handleForgotPassword" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your email"
          />
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          :loading="isLoading"
          :disabled="isLoading"
          class="w-full"
        >
          {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
        </Button>
        
        <div class="text-center">
          <router-link
            to="/auth/login"
            class="text-primary-600 dark:text-primary-400 hover:underline"
          >
            Back to Login
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/lib/components/ui/Button.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Component name for linting
defineOptions({
  name: 'ForgotPasswordView'
})

const router = useRouter()

const email = ref('')
const isLoading = ref(false)

const handleForgotPassword = async () => {
  isLoading.value = true
  try {
    // TODO: Implement actual password reset
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For now, just redirect to login
    router.push('/auth/login')
  } catch (error) {
    console.error('Password reset failed:', error)
    // TODO: Show error message to user
  } finally {
    isLoading.value = false
  }
}
</script> 