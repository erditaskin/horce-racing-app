<template>
  <div class="roster">
    <div class="roster-header">
      <h3 class="roster-title">Horse Pool ({{ horses.length }})</h3>
    </div>

    <div class="roster-content">
      <div class="horse-table">
        <div class="table-header">
          <div class="col-name">Name</div>
          <div class="col-condition">Condition</div>
          <div class="col-color">Color</div>
        </div>

        <div class="table-body">
          <RosterItem v-for="horse in horses" :key="horse.id" :horse="horse" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Horse } from '../../../../types/raceHorse'
import RosterItem from './RosterItem.vue'

defineOptions({
  name: 'RaceHorseRoster',
})

interface Props {
  horses: Horse[]
}

defineProps<Props>()
</script>

<style scoped>
.roster {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.roster-header {
  padding: 16px;
  background-color: #e5e7eb;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.roster-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--foreground);
}

.roster-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.horse-table {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 80px 60px;
  gap: 0;
  padding: 12px 8px;
  background-color: var(--muted);
  font-weight: 600;
  font-size: 14px;
  color: var(--foreground);
  border-bottom: 1px solid var(--border);
}

.col-name {
  padding-left: 8px;
}

.col-condition {
  text-align: center;
}

.col-color {
  text-align: center;
}

.table-body {
  max-height: 400px;
  overflow-y: auto;
}
</style>
