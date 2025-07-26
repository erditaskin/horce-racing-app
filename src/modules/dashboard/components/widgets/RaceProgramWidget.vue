<template>
  <WidgetBase title="Today's Races" :badge="`${todayRaces.length} races`" scrollable>
    <div class="races-list">
      <RaceItem v-for="race in todayRaces" :key="race.raceId" :race="race" />
    </div>
  </WidgetBase>
</template>

<script setup lang="ts">
import type { DashboardRaceSummary } from '../../types'
import RaceItem from './RaceItem.vue'
import WidgetBase from './WidgetBase.vue'

defineOptions({
  name: 'RaceProgramWidget',
})

interface Props {
  todayRaces: DashboardRaceSummary[]
}

defineProps<Props>()
</script>

<style scoped>
.races-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
