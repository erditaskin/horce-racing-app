<template>
  <slot />
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/lib/stores/settings'
import { onMounted } from 'vue'

defineOptions({
  name: 'ThemeSetup',
})

const settingsStore = useSettingsStore()

const initializeTheme = async () => {
  try {
    // Initialize theme settings from localStorage
    await settingsStore.initializeSettings()
  } catch (error) {
    console.error('Theme initialization failed:', error)
  }
}

onMounted(() => {
  initializeTheme()
})
</script>
