import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from './stores/userStore';
import Login from './components/Login.vue';
import Registration from './components/Registration.vue';
import Profile from './components/Profile.vue';
import NotFound from './components/NotFound.vue';
import Unauthorized from './components/Unauthorized.vue';
import MapView from './components/MapView.vue';
import BookingView from './components/BookingView.vue';
import HomePage from './components/HomePage.vue';

const routes = [
  // Other routes
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: Unauthorized,
  },
  {
    path: '/map',
    name: 'MapView',
    component: MapView,
    meta: { requiresAuth: true },
  },
  {
    path: '/booking/:id',
    name: 'BookingView',
    component: BookingView,
    meta: { requiresAuth: true },
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/login',
    component: Login,
    meta: { guestOnly: true },
  },
  {
    path: '/registration',
    component: Registration,
    meta: { guestOnly: true },
  },
  {
    path: '/profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isAuthenticated = userStore.isAuthenticated(); // Check the user's auth state

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    // If the user is not authenticated and trying to access a protected route
    next({ name: 'Unauthorized' });
  } else if (
    to.matched.some((record) => record.meta.guestOnly) &&
    isAuthenticated
  ) {
    // If the user is authenticated and trying to access a guest-only route (like login or registration)
    next({ name: 'HomePage' });
  } else {
    // Proceed as normal if none of the above conditions are met
    next();
  }
});

export default router;
