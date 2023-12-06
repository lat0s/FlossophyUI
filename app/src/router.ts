import { createRouter, createWebHistory } from 'vue-router';
import NotFound from './components/NotFound.vue';
import Unauthorized from './components/Unauthorized.vue';
import MapView from './components/MapView.vue';

const routes = [
//Other routes
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: Unauthorized
  },
  {
    path: '/map',
    name: 'MapView',
    component: MapView
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound 
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

// // Navigation guard !!! IMPLEMENT AUTHENTICATION!!!!!
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     const isAuthenticated = !HERE!
//     if (!isAuthenticated) {
//       next({ name: 'Login' });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
