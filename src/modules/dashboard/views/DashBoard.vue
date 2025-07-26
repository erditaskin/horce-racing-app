<script setup lang="ts">
import { useToast } from '@/lib/composables/useToast'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import DashboardToolbar from '../components/DashboardToolbar.vue'
import HorsePoolWidget from '../components/widgets/HorsePoolWidget.vue'
import RaceProgramWidget from '../components/widgets/RaceProgramWidget.vue'
import StatisticsWidget from '../components/widgets/StatisticsWidget.vue'
import TopPerformersWidget from '../components/widgets/TopPerformersWidget.vue'
import { useDashboardStore } from '../stores/dashboard'

defineOptions({
  name: 'DashboardView',
})

const toast = useToast()
const store = useDashboardStore()

// Use storeToRefs to maintain reactivity while destructuring
const {
  selectedDate,
  raceDaySummary,
  statistics,
  topPerformers,
  horsePoolStats,
  isLoading,
  error,
  isDataLoaded,
  completionRate,
  todayRaces,
} = storeToRefs(store)

// Methods
const selectDate = async (date: string) => {
  await store.selectDate(date)
}

const refreshData = async () => {
  await store.refreshData()
}

// Initialize on mount
onMounted(async () => {
  try {
    await store.initialize()
  } catch (err) {
    toast.error('Failed to initialize dashboard')
    console.error('Dashboard initialization error:', err)
  }
})
</script>

<template>
  <div class="dashboard-view">
    <!-- Dashboard Toolbar -->
    <DashboardToolbar
      :selected-date="selectedDate"
      :race-day-summary="raceDaySummary"
      @select-date="selectDate"
    />

    <!-- Main Dashboard Content -->
    <div class="dashboard-content">
      <!-- Loading State -->
      <div v-if="isLoading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <div class="error-icon">⚠️</div>
        <h3>Failed to load dashboard</h3>
        <p>{{ error }}</p>
        <button @click="refreshData" class="retry-button">Retry</button>
      </div>

      <!-- Dashboard Widgets -->
      <div v-else-if="isDataLoaded" class="dashboard-widgets">
        <div class="widget-grid">
          <!-- Statistics Widget -->
          <div class="widget-container">
            <StatisticsWidget :statistics="statistics" :completion-rate="completionRate" />
          </div>

          <!-- Race Program Widget -->
          <div class="widget-container">
            <RaceProgramWidget :today-races="todayRaces" />
          </div>

          <!-- Top Performers Widget -->
          <div class="widget-container">
            <TopPerformersWidget :top-performers="topPerformers" />
          </div>

          <!-- Horse Pool Widget -->
          <div class="widget-container">
            <HorsePoolWidget :horse-pool-stats="horsePoolStats" />
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-icon">📊</div>
        <h3>No dashboard data available</h3>
        <p>Select a date to view dashboard information</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-view {
  height: 100vh;
  width: 100vw;
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dashboard-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: var(--muted-foreground);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-icon,
.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.error-state h3,
.empty-state h3 {
  margin: 0 0 8px 0;
  color: var(--foreground);
  font-size: 18px;
  font-weight: 600;
}

.error-state p,
.empty-state p {
  margin: 0 0 16px 0;
  font-size: 14px;
}

.retry-button {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.retry-button:hover {
  background-color: hsl(from var(--primary) h s l / 0.9);
}

.dashboard-widgets {
  height: 100%;
}

.widget-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  height: 100%;
}

.widget-container {
  min-height: 300px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .widget-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .widget-container {
    min-height: 250px;
  }
}

@media (max-width: 768px) {
  .dashboard-content {
    padding: 12px;
  }

  .widget-grid {
    gap: 8px;
  }

  .widget-container {
    min-height: 200px;
  }
}
</style>
