<template>
  <div class="program">
    <div class="program-header">
      <h3 class="program-title">Race Program</h3>
    </div>

    <div class="program-content">
      <div v-if="raceDay" class="program-list">
        <ProgramItem
          v-for="(race, index) in raceDay.races"
          :key="race.id"
          :race="race"
          :race-index="index"
          :is-selected="index === selectedRaceIndex"
          :is-current="raceDay.currentRaceIndex >= 0 && index === raceDay.currentRaceIndex"
          @select-race="$emit('selectRace', $event)"
        />
      </div>

      <div v-else class="no-program">
        <p>No program generated</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RaceDay } from '../../../../types/'
import ProgramItem from './ProgramItem.vue'

defineOptions({
  name: 'RaceProgram',
})

interface Props {
  raceDay: RaceDay | null
  selectedRaceIndex: number
}

defineProps<Props>()

defineEmits<{
  selectRace: [index: number]
}>()
</script>

<style scoped>
.program {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.program-header {
  padding: 16px;
  background-color: #e5e7eb;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.program-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--foreground);
}

.program-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.program-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.no-program {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--muted-foreground);
  font-size: 14px;
}
</style>
