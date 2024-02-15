<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios, { AxiosError } from 'axios';
import { login } from '../authState';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const toggleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/login', {
      email: email.value,
      password: password.value
    });

    if (response.status === 200) {
      login();
      router.push('/home');
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

<template>
  <div class="split-screen">
    <div class="left-pane">
      <div class="login-container">
        <h1 class="title">Sign in</h1>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <b-form @submit.prevent="toggleLogin" class="login-form">
          <b-form-input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="Email"
            class="input-field"
          ></b-form-input>

          <b-form-input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="Password"
            class="input-field"
          ></b-form-input>
          <b-button type="submit" variant="primary" class="login-button">
            Login
          </b-button>
        </b-form>
        <div class="register-link">
          <router-link to="/registration">Register</router-link>
        </div>
      </div>
    </div>
    <div class="right-pane">
      <!-- Right pane content -->
    </div>
  </div>
</template>

<style scoped>
.split-screen {
  display: flex;
  min-height: 100vh;
  position: relative;
}

.left-pane {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.login-container {
  max-width: 300px;
  padding: 20px;
  text-align: center;
  background-color:  rgba(255, 255, 255, 0.87); 
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
}

.right-pane {
  flex: 1;
  background-color: #9ac5fd;
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

.success-message {
  color: #28a745; 
  margin-top: 10px;}

.error-message {
  color: #ff0000;
  margin-top: 10px;
}

.register-link {
  margin-top: 20px;
  color: #000;
  cursor: pointer;
}

@media (max-width: 768px) {
  .split-screen {
    flex-direction: column;
  }

  .left-pane,
  .right-pane {
    width: 100%;
  }

  .right-pane {
    height: 50vh;
  }
}
</style>