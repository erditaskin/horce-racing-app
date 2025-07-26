<template>
  <div class="w-full max-w-md mx-auto">
    <div class="bg-card text-card-foreground shadow-lg rounded-lg p-8">
      <h2 class="text-2xl font-bold text-center mb-8">Create Account</h2>

      <RegisterForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import RegisterForm from '@/modules/auth/components/register/RegisterForm.vue'

defineOptions({
  name: 'RegisterView',
})
</script>
