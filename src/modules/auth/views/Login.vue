<template>
  <div class="w-full max-w-md mx-auto">
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
      <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Login to Horse Racing
      </h2>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
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
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your password"
          />
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          :loading="authStore.isLoading"
          :disabled="authStore.isLoading"
          class="w-full"
        >
          {{ authStore.isLoading ? 'Signing in...' : 'Sign In' }}
        </Button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/lib/components/ui/Button.vue'
import { useAuthStore } from '@/lib/stores/auth'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Component name for linting
defineOptions({
  name: 'LoginView'
})

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value)
    
    // Redirect to intended page or dashboard
    const redirectPath = route.query.redirect as string ?? '/dashboard'
    router.push(redirectPath)
  } catch (error) {
    console.error('Login failed:', error)
    // TODO: Show error message to user
  }
}
</script> 