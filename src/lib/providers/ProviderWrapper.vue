<template>
  <DialogProvider>
    <slot />
  </DialogProvider>
</template>

<script setup lang="ts">
import DialogProvider from './DialogProvider.vue'

defineOptions({
  name: 'ProviderWrapper',
})
</script>
