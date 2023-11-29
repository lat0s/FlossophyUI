<template>
  <div class="registration-container">
    <h2>Sign Up</h2>
    <form class="registration-form" @submit.prevent="submitForm">
      <div class="form-group">
        <label for="fullName">Name:</label>
        <input v-model="fullName" type="text" id="fullName" name="fullName" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" name="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" name="password" required />
      </div>

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const fullName = ref('');
const email = ref('');
const password = ref('');

const submitForm = () => {
  // TODO -> add submission logic
  alert(`Registration successful!\nThank you for Signing up.\nName: ${fullName.value}\nEmail: ${email.value}`);
};
</script>

<style scoped>
.registration-container {
  background-color: rgba(255, 255, 255, 0.87); /* Match login form background */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Match login form shadow */
  padding: 20px; /* Adjust padding to match login form */
  border-radius: 4px; /* Match login form border-radius */
  width: 300px; /* Match login form width */
  margin: auto;
  text-align: center;
}

.registration-container h2 {
  font-size: 2em; /* Match login form title size */
  margin-bottom: 20px;
  color: #333; /* Match login form title color */
}

.registration-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group {
  text-align: left;
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  color: #333;
}

input {
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ccc; /* Match login form input border */
  border-radius: 4px; /* Match login form input border-radius */
  background-color: #fff;
  color: #333;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #9ac5fd; /* Match login form button color */
  color: white;
  font-size: 16px;
}

button:hover {
  background-color: #45a049; /* Optional: Match login form button hover effect */
}

@media (max-width: 768px) {
  .registration-container {
    width: 100%; /* Responsive adjustment */
  }
}

</style>
