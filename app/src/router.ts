import { createRouter, createWebHistory } from 'vue-router';
import NotFound from './components/NotFound.vue';
import Unauthorized from './components/Unauthorized.vue';
import ClinicManagement from './components/ClinicManagement.vue';
import DentistManagement from './components/DentistManagement.vue';
import AppointmentManagement from './components/AppointmentManagement.vue';
import MapView from './components/MapView.vue';
import BookingView from './components/BookingView.vue';

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
    path: '/booking/:id',
    name: 'BookingView',
    component: BookingView
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound 
  },
  {
    path: '/clinics',
    name: 'ClinicManagement',
    component: ClinicManagement 
  },
  {
    path: '/dentists',
    name: 'DentistManagement',
    component: DentistManagement 
  },
  {
    path: '/appointments',
    name: 'AppointmentManagement',
    component: AppointmentManagement
  }
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
