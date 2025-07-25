<template>
  <div class="w-full max-w-md mx-auto">
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
      <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Create Account
      </h2>
      
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            First Name
          </label>
          <input
            id="firstName"
            v-model="firstName"
            type="text"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your first name"
          />
        </div>
        
        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Last Name
          </label>
          <input
            id="lastName"
            v-model="lastName"
            type="text"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your last name"
          />
        </div>
        
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
          :loading="isLoading"
          :disabled="isLoading"
          class="w-full"
        >
          {{ isLoading ? 'Creating Account...' : 'Create Account' }}
        </Button>
        
        <div class="text-center">
          <router-link
            to="/auth/login"
            class="text-primary-600 dark:text-primary-400 hover:underline"
          >
            Already have an account? Sign in
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
  name: 'RegisterView'
})

const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleRegister = async () => {
  isLoading.value = true
  try {
    // TODO: Implement actual registration
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For now, just redirect to login
    router.push('/auth/login')
  } catch (error) {
    console.error('Registration failed:', error)
    // TODO: Show error message to user
  } finally {
    isLoading.value = false
  }
}
</script> 