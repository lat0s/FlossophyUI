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
    <BModal v-model="showModal" centered title="Registration Successful">
      User successfully registered, with the following details: 
      <p>Name: {{ fullName }}</p>
      <p>Email: {{ email }}</p>
      <p>Password: {{ password }}</p>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios, { AxiosError } from 'axios';

const showModal = ref(false);
const fullName = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const submitForm = async () => {
  try {
    const response = await axios.post('/api/patient', {
      name: fullName.value,
      email: email.value,
      password: password.value,
    });
    if (response.status === 201) {
      showModal.value = true;

      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  } catch (error) {
    console.error('Registration failed', error);
  }
};
</script>

<style scoped>
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

p {
  color: #fafafa;
  font-size: medium;
  font-style: normal;
}
</style>
