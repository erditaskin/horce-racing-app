<script setup lang="ts">
import Button from '@/lib/components/ui/Button.vue'
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
  <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
  <Button @click="testToasts" variant="primary"> Test Vue Toastification </Button>
</template>

<style scoped></style>
