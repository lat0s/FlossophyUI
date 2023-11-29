import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import { createRouter, createWebHistory } from 'vue-router';
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap/dist/css/bootstrap.css';


import Login from './components/Login.vue';
import Registration from './components/Registration.vue'; 
import Home from './components/Home.vue'

// Create app instance
const app = createApp(App);

// Install BootstrapVue3
app.use(BootstrapVue3);

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
