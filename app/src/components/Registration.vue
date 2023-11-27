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
  background-color: #9ac5fd;
  box-shadow: 0 0 10px #2d2ac76f;
  padding: 50px;
  border-radius: 10px;
  width: 400px;
  margin: auto;
}

.registration-container h2 {
  text-align:center;
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
  padding: 10px;
  border: 1px solid #dee0e3;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #fff;
  color: #333;
}

button {
  background-color: #1071e5;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}
</style>
