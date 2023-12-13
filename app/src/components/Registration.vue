<template>
  <div class="split-screen">
    <div class="left-pane">
      
      
    </div>
    <div class="right-pane"><div class="registration-container">
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
  </div></div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import axios, { AxiosError } from 'axios';

const fullName = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const submitForm = async () => {
  try {
    const response = await axios.post('http://localhost:3000/patient', {
      name: fullName.value,
      email: email.value,
      password: password.value
    });

    if (response.status === 201) {
      alert('Registration successful! Thank you for signing up.');
    } else {
      errorMessage.value = 'Registration failed. Please try again.';
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError;
      if (serverError.response) {
        const errorData = serverError.response.data as { Error?: string };
        errorMessage.value = errorData.Error || 'An error occurred during registration';
      } else {
        errorMessage.value = 'An error occurred during registration';
      }
    } else {
      errorMessage.value = 'An unexpected error occurred';
    }
  }
};
</script>




<style scoped>

.split-screen {
  display: flex !important;
  min-height: 100vh !important;
  position: relative !important;
}

.left-pane {
  width: 50% !important;
  background-color: #9ac5fd !important; 
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  padding: 20px !important;
}

.right-pane {
  flex: 1 !important;
}

.registration-container {
  background-color: rgba(255, 255, 255, 0.87); 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  padding: 20px;
  border-radius: 4px; 
  width: 300px; 
  margin: auto;
  margin-top: 2cm;
  text-align: center;
}

.registration-container h2 {
  font-size: 2em; 
  margin-bottom: 20px;
  color: #333; 
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
  border: 1px solid #ccc; 
  border-radius: 4px; 
  background-color: #fff;
  color: #333;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #9ac5fd; 
  color: white;
  font-size: 16px;
}

button:hover {
  background-color: #45a049; 
}

@media (max-width: 768px) {
  .registration-container {
    width: 100%; 
  }
}

</style>
