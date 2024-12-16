<template>
  <BContainer class="login-container">
    <h1 class="title">Log in</h1>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <BForm @submit="doLogin" class="login-form">
      <BFormInput
        id="email"
        v-model="email"
        type="email"
        required
        placeholder="Email"
        class="input-field"
      ></BFormInput>

      <BFormInput
        id="password"
        v-model="password"
        type="password"
        required
        placeholder="Password"
        class="input-field"
      ></BFormInput>
      <BButton type="submit" variant="primary" class="login-button">
        Login
      </BButton>
    </BForm>
    <div class="register-link">
      <router-link to="/registration">Register</router-link>
    </div>
  </BContainer>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useUserStore } from '../stores/userStore';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const userStore = useUserStore();

const doLogin = async () => {
  try {
    console.log('Login Called');
    console.log('Credentials:', email.value, password.value);

    // Make the login request
    const response = await axios.post('/api/patient/login', {
      email: email.value,
      password: password.value,
    });

    // Handle successful login
    if (response.status === 200) {
      console.log('Login Successful', response.data);

      // Extract user details from the response
      const userDetails = response.data.patient;

      if (!userDetails) {
        throw new Error('Invalid response structure: missing patient object');
      }

      const user = {
        _id: userDetails.id, // Assuming 'id' is the unique identifier
        name: userDetails.name,
        email: userDetails.email,
      };

      // Update the application state with the user details
      userStore.setUser(user);
      console.log('User logged in:', user);

      // Redirect to the home page
      await router.push('/');
    } else {
      console.log('Login failed with status:', response.status);
      errorMessage.value = `Unexpected status: ${response.status}`;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      if (error.response) {
        const errorData = error.response.data;
        console.log(
          'Login failed with error:',
          errorData?.Error || 'An error occurred during login'
        );

        // Show specific error messages or fallback to generic
        errorMessage.value =
          errorData?.Error || 'An error occurred during login';
      } else {
        console.error('Login failed: No response from the server', error);
        errorMessage.value = 'No response from the server. Please try again.';
      }
    } else {
      // Handle unexpected errors
      console.error('Unexpected error:', error);
      errorMessage.value = 'An unexpected error occurred. Please try again.';
    }
  }
};
</script>

<style scoped>
  .login-container {
    top: 100px;
    position: relative;
    max-width: 300px;
    padding: 20px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.87);
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .title {
    font-size: 2em;
    margin-bottom: 20px;
    color: #333;
  }

  .input-field {
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .login-button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #9ac5fd;
    color: white;
  }

  .error-message {
    color: #ff0000;
    margin-top: 10px;
  }

  .register-link {
    margin-top: 20px;
    color: #000;
    cursor: pointer;
  }
</style>
