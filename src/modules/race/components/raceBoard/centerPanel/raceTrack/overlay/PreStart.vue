<template>
  <div class="overlay-content pre-race" data-testid="race-pending">
    <div class="overlay-message">
      <h2 class="overlay-title">Horses are at the starter's command</h2>
      <p class="overlay-subtitle">Race is waiting to be started</p>
    </div>
    <Button
      @click="$emit('start-race-direct')"
      variant="primary"
      size="lg"
      class="start-button"
      data-testid="start-race"
    >
      Start Race
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '@/lib/components/ui/Button.vue'

defineOptions({
  name: 'PreStart',
})

defineEmits<{
  'start-race': []
  'start-race-direct': []
}>()
</script>

<style scoped>
.overlay-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  max-width: 500px;
  width: 90%;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.overlay-title {
  @apply text-2xl font-bold text-gray-900 mb-2;
}

.overlay-subtitle {
  @apply text-lg text-gray-600 mb-6;
}

.start-button {
  @apply mt-6;
}

/* Dark mode support */
.dark .overlay-content {
  @apply bg-gray-800 text-white;
}

.dark .overlay-title {
  @apply text-white;
}

.dark .overlay-subtitle {
  @apply text-gray-300;
}
</style>
