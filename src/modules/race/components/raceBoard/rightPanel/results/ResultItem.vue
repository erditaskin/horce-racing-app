<template>
  <div class="result-item">
    <div class="col-position">
      <div class="result-position" :class="positionClass">{{ position }}</div>
    </div>

    <div class="col-name">
      <div class="result-horse">
        <div class="horse-color" :style="{ backgroundColor: horseColor }"></div>
        <div class="horse-name">{{ horseName }}</div>
      </div>
    </div>

    <div class="col-time">{{ formatTime(result.finishTime) }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Race, RaceResult, RaceRoundResult } from '../../../../types/'
import { formatTime, getPositionClass } from '../../../../utils/formatters'
import { getHorseColor, getHorseName } from '../../../../utils/horseHelpers'

interface Props {
  result: RaceResult | RaceRoundResult
  position: number
  selectedRace?: Race // To get horse info for RoundResult
}

const props = defineProps<Props>()

// Use shared horse helpers instead of local computed properties
const horseColor = computed(() => getHorseColor(props.result, props.selectedRace))
const horseName = computed(() => getHorseName(props.result, props.selectedRace))

// Use shared formatters instead of local functions
const positionClass = computed(() => getPositionClass(props.position))
</script>

<style scoped>
.result-item {
  display: grid;
  grid-template-columns: 50px 1fr 80px;
  gap: 0;
  padding: 8px 12px;
  align-items: center;
  border-bottom: 1px solid var(--border);
}

.result-item:last-child {
  border-bottom: none;
}

.col-position {
  display: flex;
  justify-content: center;
}

.col-name {
  padding-left: 8px;
}

.col-time {
  text-align: center;
}

.result-position {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary);
  color: white;
  border-radius: 50%;
  font-weight: 600;
  font-size: 10px;
  flex-shrink: 0;
}

.position-first {
  background-color: #ffd700; /* Gold */
  color: #000;
}

.position-second {
  background-color: #c0c0c0; /* Silver */
  color: #000;
}

.position-third {
  background-color: #cd7f32; /* Bronze */
  color: #fff;
}

.position-fourth {
  background-color: #4a90e2; /* Blue */
  color: #fff;
}

.position-other {
  background-color: var(--primary);
  color: white;
}

.result-horse {
  display: flex;
  align-items: center;
  gap: 8px;
}

.horse-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  border: 1px solid var(--border);
  flex-shrink: 0;
}

.horse-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--foreground);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
