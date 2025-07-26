<template>
  <div class="w-full max-w-md mx-auto">
    <div class="bg-card text-card-foreground shadow-lg rounded-lg p-8">
      <ForgotPasswordForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import ForgotPasswordForm from '@/modules/auth/components/forgotPassword/ForgotPasswordForm.vue'

defineOptions({
  name: 'ForgotPasswordView',
})
</script>
