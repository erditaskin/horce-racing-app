<template>
  <div class="widget-base" :class="{ scrollable }">
    <div class="widget-header">
      <h3 class="widget-title">{{ title }}</h3>
      <div v-if="badge" class="widget-badge">{{ badge }}</div>
    </div>
    <div class="widget-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'WidgetBase',
})

interface Props {
  title: string
  badge?: string
  scrollable?: boolean
}

defineProps<Props>()
</script>

<style scoped>
.widget-base {
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.widget-base.scrollable {
  overflow-y: auto;
}

.widget-base.scrollable::-webkit-scrollbar {
  width: 6px;
}

.widget-base.scrollable::-webkit-scrollbar-track {
  background: var(--muted);
  border-radius: 3px;
}

.widget-base.scrollable::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}

.widget-base.scrollable::-webkit-scrollbar-thumb:hover {
  background: var(--muted-foreground);
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.widget-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--foreground);
}

.widget-badge {
  font-size: 12px;
  color: var(--muted-foreground);
  background-color: var(--muted);
  padding: 4px 8px;
  border-radius: 4px;
}

.widget-content {
  flex: 1;
  min-height: 0;
}
</style>
