import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import './registerServiceWorker'

const app = createApp(App);
app.provide('$axios', axios);
app.mount('#app');