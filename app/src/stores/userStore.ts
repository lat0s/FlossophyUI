// src/stores/userStore.ts
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

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
    },
    resetUser() {
      console.log('Resetting user');
      this.name = '';
      this.email = '';
      this._id = '';
    },
    isAuthenticated() {
      return !!this._id;
    }
  },
  persist: true,
});