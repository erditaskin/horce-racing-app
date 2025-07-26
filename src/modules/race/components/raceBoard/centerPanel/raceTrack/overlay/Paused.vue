<template>
  <div class="paused-overlay">
    <!-- Backdrop -->
    <div class="paused-backdrop"></div>

    <!-- Dialog -->
    <div class="paused-dialog">
      <!-- Header -->
      <div class="paused-header">
        <div class="paused-icon">⏸️</div>
        <h2 class="paused-title">Race Paused</h2>
      </div>

      <!-- Content -->
      <div class="paused-content">
        <p class="paused-description">
          Race {{ raceNumber }} - {{ raceName }} is currently paused.
        </p>
        <div class="pist-indicator" :class="pistTypeClass">
          <span class="pist-name">{{ pistTypeDisplay }} Pist</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="paused-actions">
        <Button variant="primary" size="lg" @click="$emit('resume-race')"> Resume Race </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/lib/components/ui/Button.vue'
import { computed } from 'vue'

defineOptions({
  name: 'PausedOverlay',
})

interface Props {
  raceNumber?: number
  raceName?: string
  pistType?: 'grass' | 'sand'
}

const props = defineProps<Props>()

defineEmits<{
  'resume-race': []
}>()

// Computed properties for pist type display
const pistTypeClass = computed(() => {
  if (!props.pistType) return ''
  return props.pistType === 'grass' ? 'pist-grass' : 'pist-sand'
})

const pistTypeDisplay = computed(() => {
  if (!props.pistType) return ''
  return props.pistType.charAt(0).toUpperCase() + props.pistType.slice(1)
})
</script>

<style scoped>
.paused-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.paused-backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.paused-dialog {
  background-color: var(--card);
  color: var(--card-foreground);
  border-radius: 0.5rem;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 100%;
  transform: scale-100;
  transition: all 0.3s ease-out;
}

.paused-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.5rem 1.5rem 0 1.5rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 1rem;
}

.paused-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.paused-title {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--foreground);
  margin: 0;
}

.paused-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.paused-description {
  color: var(--muted-foreground);
  margin: 0;
  line-height: 1.5;
  text-align: center;
  font-size: 0.875rem;
}

.pist-indicator {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
}

.pist-indicator.pist-grass {
  background-color: hsl(142 76% 36% / 0.1);
  color: #16a34a;
  border: 1px solid #16a34a;
}

.pist-indicator.pist-sand {
  background-color: hsl(35 85% 65% / 0.1);
  color: #d97706;
  border: 1px solid #d97706;
}

.paused-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem 1.5rem 1.5rem;
  border-top: 1px solid var(--border);
  padding-top: 1rem;
}

/* Dark mode support */
.dark .paused-dialog {
  background-color: var(--card);
  border: 1px solid var(--border);
}
</style>
