<template>
      <BContainer class="login-container">
        <h1 class="title">Log in</h1>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <BForm @submit="doLogin"  class="login-form">
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
import axios, { AxiosError } from 'axios';
import { login } from '../authState';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const doLogin = async () => {
  try {
    console.log("Login Called");
    console.log(email.value, password.value);
    const response = await axios.post('/api/login', {
      email: email.value,
      password: password.value
    });

    if (response.status === 200) {
      console.log("Login Successful", response.data);

      const userDetails = response.data;

      // Extract the necessary details
      const user = {
        id: userDetails._id, 
        name: userDetails.name,
        email: userDetails.email
      };

      // Now call the login function with these details
      login(user); // Update the application state to reflect the user's logged-in status

      router.push('/');

      console.log("User logged in:", user);
    } else {
      // Handle other HTTP statuses or errors
      console.log("Login failed with status:", response.status);
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorData = error.response.data as { Error?: string };
      errorMessage.value = errorData.Error || 'An error occurred during login';

      if (errorData.Error?.includes('Wrong email format') || errorData.Error?.includes('Wrong password format')) {
        alert('Invalid email or password format. Please try again.');
      }
    } else {
      errorMessage.value = 'An unexpected error occurred';
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
  background-color:  rgba(255, 255, 255, 0.87); 
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
  background-color:#9ac5fd;
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