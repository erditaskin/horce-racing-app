import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './lib/containers/App.vue'
import router from './lib/router/'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')
