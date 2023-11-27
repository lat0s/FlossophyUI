import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import VueRouter from 'vue-router'

import BootstrapVue3 from 'bootstrap-vue-3'

import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'bootstrap/dist/css/bootstrap.css'
const app = createApp(App)
app.use(BootstrapVue3,VueRouter)
app.mount('#app')
