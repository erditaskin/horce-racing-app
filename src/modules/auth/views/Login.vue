<template>
  <div class="w-full max-w-lg mx-auto">
    <div class="bg-card text-card-foreground shadow-strong rounded-2xl p-8 border border-border">
      <h2 class="text-3xl font-bold text-center mb-8">Login to Horse Racing</h2>
      <LoginForm @success="handleLoginSuccess" @error="handleLoginError" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/lib/composables/useToast'
import LoginForm from '@/modules/auth/components/login/LoginForm.vue'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'LoginView',
})

const router = useRouter()
const route = useRoute()
const toast = useToast()

const handleLoginSuccess = () => {
  const redirectPath = (route.query.redirect as string) ?? '/dashboard'
  router.push(redirectPath)
}

const handleLoginError = (error: string) => {
  console.error('Login failed:', error)
  toast.error(error)
}
</script>
