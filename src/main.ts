import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './lib/containers/App.vue'
import { setupToast } from './lib/plugins/toast'
import router from './lib/router/'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
setupToast(app)

app.mount('#app')
