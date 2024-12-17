// src/stores/userStore.ts
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import axios from 'axios';

interface User {
  name: string;
  email: string;
  _id: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    name: useLocalStorage('name', ''),
    email: useLocalStorage('email', ''),
    _id: useLocalStorage('_id', ''),
  }),
  actions: {
    setUser(user: User) {
      console.log('Setting user:', user);
      this.name = user.name;
      this.email = user.email;
      this._id = user._id;

      // Assume cookies are set by the server, no need for explicit tokens
    },
    resetUser() {
      console.log('Resetting user');
      this.name = '';
      this.email = '';
      this._id = '';

      // No need to clear headers as cookies are managed by the browser
    },
    isAuthenticated() {
      return !!this._id; // User is authenticated if ID exists
    },
    async checkAuth() {
      try {
        // Verify authentication via an API call
        const response = await axios.get('/api/auth/check');
        if (response.status === 200 && response.data?.user) {
          const user = response.data.user;
          this.setUser(user); // Refresh user state
        } else {
          this.resetUser();
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        this.resetUser();
      }
    },
  },
  persist: true,
});
