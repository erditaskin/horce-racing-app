<template>
  <div v-if="isInitializing" class="min-h-screen flex items-center justify-center bg-background">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"
      ></div>
      <p class="text-foreground">Initializing authentication...</p>
    </div>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { initializeAxios } from '@/lib/middlewares/axios'
import { useAuthStore } from '@/lib/stores/auth'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'AuthenticationBootstrap',
})

const authStore = useAuthStore()
const isInitializing = ref(true)

const initializeAuthentication = async () => {
  try {
    // Initialize axios interceptors first
    initializeAxios()

    // Initialize auth store (check localStorage, validate token, fetch current user)
    await authStore.initializeAuth()

    // Add a small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 500))
  } catch (error) {
    console.error('Authentication initialization failed:', error)
    // Clear any corrupted auth state
    await authStore.logout()
  } finally {
    isInitializing.value = false
  }
}

onMounted(() => {
  initializeAuthentication()
})
</script>
