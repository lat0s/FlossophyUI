<template>
    <BContainer class="containermain">
      <h1 class="title">Dentist Management</h1>
      <BButton variant="success" @click="openModal()">Add Dentist</BButton>
  
      <!-- Dentist Cards -->
      <div class="d-flex flex-wrap">
        <BCard v-for="dentist in dentists" :key="dentist._id" class="m-2" style="width: 18rem;">
          <h5 class="card-title">Name: {{ dentist.name }}</h5>
          <p class="card-text">Position: {{ dentist.position }}</p>
          <p class="card-text">Email: {{ dentist.email }}</p>
          <!-- Include other details you want to display -->
          <BButton size="sm" variant="primary" @click="openModal(dentist)">Edit</BButton>
          <BButton size="sm" variant="danger" @click="dentist._id ? deleteDentist(dentist._id) : null">Delete</BButton>
        </BCard>
      </div>
  
      <!-- Dentist Edit/Create Modal -->
      <BModal v-model="showModal" title="Dentist Details" hide-footer>
        <BForm @submit.prevent="saveDentist">
          <BFormGroup label="Name:" label-for="input-name">
            <BFormInput id="input-name" v-model="currentDentist.name" required></BFormInput>
          </BFormGroup>
          <BFormGroup label="Position:" label-for="input-position">
            <BFormInput id="input-position" v-model="currentDentist.position" required></BFormInput>
          </BFormGroup>
          <BFormGroup label="Email:" label-for="input-email">
            <BFormInput type="email" id="input-email" v-model="currentDentist.email" required></BFormInput>
          </BFormGroup>
          <BFormGroup label="Password:" label-for="input-password">
            <BFormInput type="password" id="input-password" v-model="currentDentist.password" required></BFormInput>
          </BFormGroup>
          <BButton type="submit" variant="primary">Save</BButton>
        </BForm>
      </BModal>
    </BContainer>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, Ref } from 'vue';
  import axios from 'axios';
  
  interface Dentist {
    _id?: string;
    name: string;
    position: string;
    email: string;
    password: string;
    clinic: Array<{ _id: string }>;
    timeslots: Array<{ _id: string }>;
  }
  
  const dentists: Ref<Dentist[]> = ref([]);
  const showModal = ref(false);
  const currentDentist: Ref<Dentist> = ref({ name: '', position: '', email: '', password: '', clinic: [], timeslots: [] });
  
  const fetchDentists = async () => {
    try {
      const response = await axios.get('/api/dentist');
      dentists.value = response.data;
    } catch (error) {
      console.error('Error fetching dentists:', error);
    }
  };
  
  const openModal = (dentist: Dentist = { name: '', position: '', email: '', password: '', clinic: [], timeslots: [] }) => {
    currentDentist.value = dentist;
    showModal.value = true;
  };
  
  const saveDentist = async () => {
    const method = currentDentist.value._id ? 'patch' : 'post';
    const url = currentDentist.value._id ? `/api/dentist/${currentDentist.value._id}` : '/api/dentist';
  
    try {
      await axios[method](url, currentDentist.value);
      showModal.value = false;
      fetchDentists();
    } catch (error) {
      console.error('Error saving dentist:', error);
    }
  };
  
  const deleteDentist = async (dentistId: string) => {
    try {
      await axios.delete(`/api/dentist/${dentistId}`);
      fetchDentists();
    } catch (error) {
      console.error('Error deleting dentist:', error);
    }
  };
  
  fetchDentists();
  </script>
  
<style scoped>
.title{
  text-align: center;
}
.containermain{
  display: flex!important;
    flex-direction: column!important;
    flex-wrap: wrap!important;
    align-content: space-around!important;
}
.m-2{
  background: rgba(3, 3, 3, 0.32)!important;
border-radius: 16px!important;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1)!important;
backdrop-filter: blur(10.9px)!important;
-webkit-backdrop-filter: blur(10.9px)!important;
border: 1px solid rgba(145, 244, 173, 0.3)!important;
}

</style>