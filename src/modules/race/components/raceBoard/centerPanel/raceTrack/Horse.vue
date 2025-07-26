<template>
  <div class="horse-container">
    <!-- Horse details section with grayish background -->
    <div class="horse-details">
      <div class="horse-name">{{ raceHorse.horse.name }}</div>
      <div class="horse-lane">Lane {{ raceHorse.laneNumber }}</div>
      <div class="horse-color-indicator" :style="{ backgroundColor: raceHorse.horse.color }"></div>
    </div>

    <!-- Animated horse marker -->
    <div
      class="horse-marker"
      :class="{ 'horse-running': isRunning }"
      :style="{
        left: `${raceHorse.progress}%`,
        color: raceHorse.horse.color,
      }"
    >
      <div class="animated-horse">🐎</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RaceHorse } from '../../../../types/'

defineOptions({
  name: 'RaceHorseMarker',
})

interface Props {
  raceHorse: RaceHorse
  isRunning: boolean
}

defineProps<Props>()
</script>

<style scoped>
@font-face {
  font-family: Muybridge;
  src: url('/fonts/MuybridgeGX.woff2') format('woff2');
}

.horse-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.horse-details {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background-color: #f5f5f5;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  font-size: 12px;
  color: var(--muted-foreground);
}

.horse-name {
  font-weight: 600;
  color: var(--foreground);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.horse-lane {
  font-weight: 500;
  margin: 0 8px;
}

.horse-color-indicator {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  border: 1px solid var(--border);
  flex-shrink: 0;
}

.horse-marker {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.1s ease-out;
  z-index: 10;
}

.animated-horse {
  font-family: Muybridge;
  font-size: 48px;
  line-height: 1;
  animation: none;
}

.horse-running .animated-horse {
  animation: Gallop 0.69s linear infinite;
}

@keyframes Gallop {
  from {
    font-variation-settings: 'TIME' 0;
  }
  to {
    font-variation-settings: 'TIME' 15;
  }
}

/* Fallback for when Muybridge font is not loaded */
@supports not (font-variation-settings: 'TIME' 0) {
  .animated-horse {
    font-family: system-ui, sans-serif;
    animation: none;
  }

  .horse-running .animated-horse {
    animation: SimpleGallop 0.69s linear infinite;
  }

  @keyframes SimpleGallop {
    0%,
    100% {
      transform: translateY(0px);
    }
    25% {
      transform: translateY(-2px);
    }
    50% {
      transform: translateY(0px);
    }
    75% {
      transform: translateY(-1px);
    }
  }
}
</style>
