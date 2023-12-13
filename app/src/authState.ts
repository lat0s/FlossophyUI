
import { reactive } from 'vue';

const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

export const authState = reactive({
  isAuthenticated
});

export function login() {
  authState.isAuthenticated = true;
  localStorage.setItem('isAuthenticated', 'true');
}

export function logout() {
  authState.isAuthenticated = false;
  localStorage.setItem('isAuthenticated', 'false');
}
