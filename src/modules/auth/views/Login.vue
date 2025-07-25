<template>
  <div class="w-full max-w-md mx-auto">
    <div class="bg-white dark:bg-gray-800 shadow-strong rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
      <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Login to Horse Racing
      </h2>
      <LoginForm @success="handleLoginSuccess" @error="handleLoginError" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/modules/auth/components/login/LoginForm.vue'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'LoginView'
})

const router = useRouter()
const route = useRoute()

const handleLoginSuccess = () => {
  const redirectPath = route.query.redirect as string ?? '/dashboard'
  router.push(redirectPath)
}

const handleLoginError = (error: string) => {
  console.error('Login failed:', error)
  // TODO: Show error message to user (e.g., with a toaster)
}
</script> 