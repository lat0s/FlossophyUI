import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Import Vue Router and BootstrapVue3
import { createRouter, createWebHistory } from 'vue-router'
import BootstrapVue3 from 'bootstrap-vue-3'

// Import CSS files
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'bootstrap/dist/css/bootstrap.css'

// Create app instance
const app = createApp(App)

// Install BootstrapVue3
app.use(BootstrapVue3)

// Define your routes here
import Test from './components/Test.vue'
const routes = [
   { path: '/hello', component: Test}
  // { path: '/example', component: ExampleComponent }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

// Install Vue Router
app.use(router)

// Mount the app
app.mount('#app')
