<script setup lang="ts">
import { useToast } from '@/lib/composables/useToast'

defineOptions({
  name: 'DashboardView',
})

const toast = useToast()

const testToasts = () => {
  toast.success('Success message!')
  setTimeout(() => toast.error('Error message!'), 500)
  setTimeout(() => toast.warning('Warning message!'), 1000)
  setTimeout(() => toast.info('Info message!'), 1500)
}
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
    <Button @click="testToasts" variant="primary"> Test Vue Toastification </Button>
  </div>
</template>

<style scoped></style>
