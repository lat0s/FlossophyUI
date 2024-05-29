<template>
    <BContainer class="profile-container">
      <BRow>
          <h1>User Details</h1>
      </BRow>
      <BRow class="profile-details">
      <h3 class="text">Name: {{ name }}</h3>
      <h3 class="text">Email: {{ email }}</h3>
      <h3 class="text">User ID: {{ id }} </h3>
      </BRow>
      <BRow>
      <BButton variant="primary" @click="showModal = true">Edit Details</BButton>
    </BRow>
    <BModal v-model="showModal" title="Edit User Details">
      <BForm>
        <BFormGroup label="Name:" label-for="editName">
          <BFormInput id="editName" v-model="editName"></BFormInput>
        </BFormGroup>
        <BFormGroup label="Email:" label-for="editEmail">
          <BFormInput id="editEmail" v-model="editEmail"></BFormInput>
        </BFormGroup>
      </BForm>
      <BButton variant="success" @click="submitEdit">Save</BButton>
    </BModal>
    <BRow><span><h1>   </h1></span></BRow>
    <BRow>
      <BButton variant="danger" @click="logoutUser">Logout</BButton>
    </BRow>
    </BContainer>
  </template>
  
<script setup lang="ts">
import { watch } from 'vue';
import { ref } from 'vue';
import axios from 'axios';
import { authState, logout } from '../authState';
import { useRouter } from 'vue-router';

const router = useRouter();
const showModal = ref(false);
const editName = ref('');
const editEmail = ref('');
const editPassword = ref('');

const name = ref(authState.user.name);
const email = ref(authState.user.email);

const id = ref(authState.user.id);

watch(showModal, (newVal) => {
  if (newVal) {
    editName.value = name.value;
    editEmail.value = email.value;

  }
});

const logoutUser = () => {
  logout();
  router.push('/login');
};

const submitEdit = async () => {
  try {
    const response = await axios.patch(`/api/patient/${id.value}`, {
      name: editName.value,
      email: editEmail.value
    });
    // Update authState with new user details
    authState.user.name = editName.value;
    authState.user.email = editEmail.value;
    // Update local state to reflect changes immediately
    name.value = editName.value;
    email.value = editEmail.value;
    // Close modal
    showModal.value = false;
  } catch (error) {
    console.error('Failed to update user details:', error);
  }
};
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
  .text{
    font-size: 20px;
  }
  </style>
  