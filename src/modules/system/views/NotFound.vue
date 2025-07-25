<template>
  <div class="w-full max-w-md mx-auto text-center">
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
      <div class="text-6xl mb-4">🐎</div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Page Not Found
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        The page you're looking for doesn't exist.
      </p>
      
      <div class="space-y-4">
        <Button
          variant="primary"
          @click="goHome"
          class="w-full"
        >
          Go to Dashboard
        </Button>
        
        <Button
          variant="secondary"
          @click="goBack"
          class="w-full"
        >
          Go Back
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/lib/components/ui/Button.vue'
import { useRouter } from 'vue-router'

// Component name for linting
defineOptions({
  name: 'NotFoundView'
})

const router = useRouter()

const goHome = () => {
  router.push('/dashboard')
}

const goBack = () => {
  router.go(-1)
}
</script> 