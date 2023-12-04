import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import { createRouter, createWebHistory } from 'vue-router';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'


import Login from './components/Login.vue';
import Registration from './components/Registration.vue'; 
import Home from './components/Home.vue'

// Create app instance
const app = createApp(App);

// Define your routes here
const routes = [
  { path: '/', redirect: '/login' }, 
  { path: '/login', component: Login },
  { path: '/registration', component: Registration },
  { path: '/home', component: Home },
]
// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Install Vue Router
app.use(router);

// Mount the app
app.mount('#app');
