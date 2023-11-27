<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const toggleLogin = async () => {
 
};
</script> 

<template>
  <div class="split-screen">
    <div class="left-pane">
      <div class="login-container">
       
        <h1 class="title">Sign in</h1>

        <b-form @submit.prevent="toggleLogin" class="login-form">
          <b-form-input
            id="email"
            v-model="email"
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

        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <div class="register-link">
          Register
        </div>
      </div>
    </div>
    <div class="right-pane"></div>
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