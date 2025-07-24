import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './lib/containers/App.vue'
import router from './lib/router/'
import { useAuthStore } from './lib/stores/auth'
import { useSettingsStore } from './lib/stores/settings'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize stores
const authStore = useAuthStore()
const settingsStore = useSettingsStore()

// Initialize settings and auth
settingsStore.initializeSettings()
authStore.initializeAuth()

app.mount('#app')
