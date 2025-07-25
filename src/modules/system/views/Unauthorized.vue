<template>
  <div class="w-full max-w-md mx-auto text-center">
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
      <div class="text-6xl mb-4">🚫</div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        You don't have permission to access this page.
      </p>

      <div class="space-y-4">
        <Button variant="primary" @click="goBack" class="w-full"> Go Back </Button>

        <Button variant="secondary" @click="goHome" class="w-full"> Go to Dashboard </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/lib/components/ui/Button.vue'
import { useRouter } from 'vue-router'

// Component name for linting
defineOptions({
  name: 'UnauthorizedView',
})

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const goHome = () => {
  router.push('/dashboard')
}
</script>
