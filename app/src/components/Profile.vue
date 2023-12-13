<template>
    <BContainer class="profile-container">
      <BRow>
        <BCol>
          <h1>User Profile</h1>
        </BCol>
      </BRow>
      <BRow class="profile-details">
        <BCol>
          <BFormGroup label="Name:" label-for="profileName">
            <BFormInput id="profileName" v-model="name"></BFormInput>
          </BFormGroup>
        </BCol>
        <BCol>
          <BFormGroup label="Email:" label-for="profileEmail">
            <BFormInput id="profileEmail" v-model="email"></BFormInput>
          </BFormGroup>
        </BCol>
       
      </BRow>
    </BContainer>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const name = ref('');
  const email = ref('');
  </script>
  
  <style scoped>
  .profile-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background-color: #f5f5f5 !important;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    min-height: 73vh;
  }
  
  .profile-details {
    margin-top: 20px;
  }
  </style>
  