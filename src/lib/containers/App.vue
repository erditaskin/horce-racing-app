<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import modules from '@/modules'

console.log('modules',modules)
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/dashboard/">Dashboard</RouterLink>
        <RouterLink to="/horse/list">Horses</RouterLink>
        <RouterLink to="/race/board">Race Board</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
