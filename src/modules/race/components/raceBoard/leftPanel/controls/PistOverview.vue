<template>
  <div class="pist-overview">
    <h4 class="pist-overview-title">Pist Status</h4>
    <div class="pist-list">
      <div class="pist-item" :class="pistStatusClass('grass')">
        <div class="pist-indicator pist-grass"></div>
        <span class="pist-name">Grass Pist</span>
        <span class="pist-status" :class="statusClass('grass')">
          {{ getStatusText('grass') }}
        </span>
      </div>
      <div class="pist-item" :class="pistStatusClass('sand')">
        <div class="pist-indicator pist-sand"></div>
        <span class="pist-name">Sand Pist</span>
        <span class="pist-status" :class="statusClass('sand')">
          {{ getStatusText('sand') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RaceVenuePistType } from '../../../../types/raceVenue'
import { getPistStatusText } from '../../../../utils/formatters'

interface Props {
  pistStatus?: {
    grass: { isAvailable: boolean; currentRaceId?: string }
    sand: { isAvailable: boolean; currentRaceId?: string }
  } | null
}

const props = defineProps<Props>()

const pistStatusClass = (pistType: RaceVenuePistType) => {
  if (!props.pistStatus) return ''
  const status = props.pistStatus[pistType]
  return {
    'pist-available': status.isAvailable,
    'pist-occupied': !status.isAvailable,
  }
}

const statusClass = (pistType: RaceVenuePistType) => {
  if (!props.pistStatus) return ''
  const status = props.pistStatus[pistType]
  return {
    'status-available': status.isAvailable,
    'status-occupied': !status.isAvailable,
  }
}

// Use shared formatter instead of local function
const getStatusText = (pistType: RaceVenuePistType): string => {
  return getPistStatusText(pistType, props.pistStatus)
}
</script>

<style scoped>
.pist-overview {
  background-color: var(--muted);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
}

.pist-overview-title {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--foreground);
}

.pist-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pist-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 4px;
  background-color: white;
  border: 1px solid var(--border);
}

.pist-indicator {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  flex-shrink: 0;
}

.pist-indicator.pist-grass {
  background-color: #16a34a;
}

.pist-indicator.pist-sand {
  background-color: #d97706;
}

.pist-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--foreground);
  flex: 1;
}

.pist-status {
  font-size: 11px;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 3px;
}

.status-available {
  background-color: #dcfce7;
  color: #166534;
}

.status-occupied {
  background-color: #fef2f2;
  color: #dc2626;
}
</style>
