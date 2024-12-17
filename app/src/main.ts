// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import router from './router';
import { createPinia } from 'pinia';
import { useUserStore } from './stores/userStore';
import axios from 'axios';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia);
app.use(router);

const userStore = useUserStore();
userStore.$subscribe(() => {
  if (userStore.isAuthenticated()) {
    // Fetch user data if authenticated
    fetchUserData();
  }
});
app.mount('#app');
async function fetchUserData() {
  try {
    const response = await axios.get(`/api/patient/${userStore._id}`);
    const user = response.data;
    userStore.setUser(user);
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
}
