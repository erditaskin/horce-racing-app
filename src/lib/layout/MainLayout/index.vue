<template>
  <div class="min-h-screen bg-background text-foreground flex flex-col">
    <!-- Header -->
    <MainHeader />

    <!-- Main Content -->
    <main class="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>

    <!-- Footer -->
    <MainFooter />
  </div>
</template>

<script setup lang="ts">
import MainFooter from './Footer.vue'
import MainHeader from './Header.vue'

// Component name for linting
defineOptions({
  name: 'MainLayout',
})
</script>
