<template>
  <AuthenticationBootstrap>
    <ThemeSetup>
      <slot />
    </ThemeSetup>
  </AuthenticationBootstrap>
</template>

<script setup lang="ts">
import AuthenticationBootstrap from './Authentication.vue'
import ThemeSetup from './ThemeSetup.vue'

defineOptions({
  name: 'AppBootstrap',
})
</script>
