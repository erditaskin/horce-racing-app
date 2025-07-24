<script setup lang="ts">
import { LAYOUT_BASE, LAYOUT_MAIN } from '@/lib/constants/layout'
import BaseLayout from '@/lib/layout/BaseLayout.vue'
import MainLayout from '@/lib/layout/MainLayout/index.vue'
import DialogProvider from '@/lib/providers/DialogProvider.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Component name for linting
defineOptions({
  name: 'AppContainer'
})

const route = useRoute()

// Determine layout based on route (type-safe, only use meta)
const currentLayout = computed(() => {
  return (route.meta?.layout as string | undefined) ?? LAYOUT_MAIN
})

const showMainLayout = computed(() => currentLayout.value === LAYOUT_MAIN)
const showBaseLayout = computed(() => currentLayout.value === LAYOUT_BASE)
</script>

<template>
  <DialogProvider>
    <!-- Main Layout for authenticated pages -->
    <MainLayout v-if="showMainLayout">
      <RouterView />
    </MainLayout>
    
    <!-- Base Layout for public/auth pages -->
    <BaseLayout v-else-if="showBaseLayout">
      <RouterView />
    </BaseLayout>
    
    <!-- Fallback for no layout -->
    <div v-else class="min-h-screen bg-background text-foreground">
      <RouterView />
    </div>
  </DialogProvider>
</template>

<style scoped>
/* Additional styles if needed */
</style>
