import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Registration from './components/Registration.vue';
import { authState } from './authState'; 
import Profile from './components/Profile.vue'
import Booking from './components/Booking.vue'

const routes = [
  { path: '/', redirect: '/home' }, 
  { path: '/login', component: Login, meta: { guestOnly: true } },
  { path: '/registration', component: Registration, meta: { guestOnly: true } },
  { path: '/home', component: Home },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } }, 
  { path: '/map', component: Map, meta: { requiresAuth: true } }, 
  { path: '/booking', component: Booking, meta: { requiresAuth: true } } 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuth = authState.isAuthenticated;
  if (to.matched.some(record => record.meta.guestOnly) && isAuth) {
    next('/home');
  } else if (to.matched.some(record => record.meta.requiresAuth) && !isAuth) {
    next('/login');
  } else {
    next();
  }
});

export default router;
