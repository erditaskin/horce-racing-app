<template>
  <header class="bg-card text-card-foreground shadow-sm border-b border-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and Navigation -->
        <div class="flex items-center space-x-8">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <h1 class="text-xl font-bold text-primary">🏇 Horse Racing</h1>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex space-x-8">
            <router-link
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              class="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              active-class="text-primary bg-primary/10 active-nav-link"
            >
              {{ item.label }}
            </router-link>
          </nav>
        </div>

        <!-- Right side actions -->
        <div class="flex items-center space-x-4">
          <!-- Theme Toggle -->
          <button
            @click="settingsStore.toggleTheme()"
            class="p-2 text-muted-foreground hover:text-primary rounded-md transition-colors"
            :title="settingsStore.isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <Sun v-if="settingsStore.isDarkMode" class="w-5 h-5" />
            <Moon v-else class="w-5 h-5" />
          </button>

          <!-- User Menu -->
          <div class="relative">
            <button
              @click="isUserMenuOpen = !isUserMenuOpen"
              class="flex items-center space-x-2 text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <User class="w-5 h-5" />
              <span>{{ authStore.fullName }}</span>
              <ChevronDown class="w-4 h-4" />
            </button>

            <!-- User Dropdown -->
            <div
              v-if="isUserMenuOpen"
              class="absolute right-0 mt-2 w-48 bg-card text-card-foreground rounded-md shadow-lg py-1 z-50 border border-border"
            >
              <div class="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                <div class="font-medium text-foreground">{{ authStore.fullName }}</div>
                <div class="text-muted-foreground">{{ authStore.user?.email }}</div>
              </div>
              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/lib/stores/auth'
import { useSettingsStore } from '@/lib/stores/settings'
import { ChevronDown, Moon, Sun, User } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Component name for linting
defineOptions({
  name: 'MainHeader',
})

const router = useRouter()
const authStore = useAuthStore()
const settingsStore = useSettingsStore()

const isUserMenuOpen = ref(false)

// Navigation items array - DRY approach
const navigationItems = [
  {
    path: '/dashboard',
    label: 'Dashboard',
  },
  {
    path: '/horse/list',
    label: 'Horses',
  },
  {
    path: '/race/board',
    label: 'Races',
  },
]

const handleLogout = async () => {
  authStore.clearAuthState()
  router.push('/auth/login')
  isUserMenuOpen.value = false
}
</script>

<style scoped>
.active-nav-link {
  background-color: hsl(from var(--primary) h s l / 0.1);
}
</style>
