import { reactive } from 'vue';

interface UserDetails {
  id: string; 
  name: string;
  email: string;
}

// Update login function to accept user details with a specific type
export function login(userDetails: UserDetails) {
  authState.isAuthenticated = true;
  authState.user = userDetails;
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('user', JSON.stringify(userDetails));
}

// Extend authState to include user details
export const authState = reactive({
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  // Ensure the default value is a valid JSON string that represents an empty object
  user: JSON.parse(localStorage.getItem('user') || '{}')
});

export function logout() {
  authState.isAuthenticated = false;
  authState.user = {};
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('user');
}
