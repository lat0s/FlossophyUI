<template>
  <BContainer class="containermain">
    <h1 class="title">Clinic Management</h1>
    <BButton variant="success" @click="openModal()">Add Clinic</BButton>

   <!-- Clinic Cards -->
   <div class="d-flex flex-wrap">
    <BCard v-for="clinic in clinics" :key="clinic._id" class="m-2" style="width: 18rem;">
      <h5 class="card-title">Name: {{ clinic.name }}</h5>
      <p class="card-text">Address: {{ clinic.address }}</p>
      <p class="card-text">ID: {{ clinic._id }}</p>
      <BButton size="sm" variant="primary" @click="openModal(clinic)">Edit</BButton>
  <BButton size="sm" variant="danger" @click="clinic._id ? deleteClinic(clinic._id) : null">Delete</BButton>
    </BCard>
  </div>
  

  <!-- Clinic Edit/Create Modal -->
  <BModal v-model="showModal" title="Clinic Details" hide-footer>
    <BForm @submit.prevent="saveClinic">
      <BFormGroup label="Name:" label-for="input-name">
        <BFormInput id="input-name" v-model="currentClinic.name" required></BFormInput>
      </BFormGroup>
      <BFormGroup label="Address:" label-for="input-address">
        <BFormInput id="input-address" v-model="currentClinic.address" required></BFormInput>
      </BFormGroup>
      <BFormGroup label="Lng:" label-for="input-lng">
        <BFormInput id="input-lng" v-model="currentClinic.lng" required></BFormInput>
      </BFormGroup>
      <BFormGroup label="Lat:" label-for="input-lat">
        <BFormInput id="input-lat" v-model="currentClinic.lat" required></BFormInput>
      </BFormGroup>
      <!-- Opening Hours -->
      <div v-for="day in openingDays" :key="day">
        <BFormGroup :label="day + ':'" :label-for="'input-' + day">
          <BFormInput :id="'input-' + day" v-model="currentClinic.openinghours[day]"></BFormInput>
        </BFormGroup>
      </div>
      <!-- Dentists -->
      <BFormGroup label="Dentists (comma-separated IDs):" label-for="input-dentists">
        <BFormInput id="input-dentists" v-model="dentistIds" placeholder="e.g., 123,456,789"></BFormInput>
      </BFormGroup>
      <BButton type="submit" variant="primary">Save</BButton>
    </BForm>
  </BModal>
</BContainer>
</template>

<script setup lang="ts">
import { ref, watch, Ref } from 'vue';
import axios from 'axios';

interface Clinic {
  _id?: string;
  name: string;
  address: string;
  lng: number;
  lat: number;
  openinghours: Record<string, string>;
  dentists: Array<{ _id: string }>;
}

const clinics: Ref<Clinic[]> = ref([]);
const showModal = ref(false);
const defaultOpeningHours = { monday: '', tuesday: '', wednesday: '', thursday: '', friday: '' };
const currentClinic: Ref<Clinic> = ref({ name: '', address: '', lng: 0, lat: 0, openinghours: defaultOpeningHours, dentists: [] });
const dentistIds = ref('');
const fields = ['name', 'address', 'lng', 'lat', 'openinghours', 'dentists'];
const openingDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

const fetchClinics = async () => {
  try {
    const response = await axios.get('/api/clinic');
    clinics.value = response.data;
  } catch (error) {
    console.error('Error fetching clinics:', error);
  }
};

const openModal = (clinic: Clinic = { name: '', address: '', lng: 0, lat: 0, openinghours: defaultOpeningHours, dentists: [] }) => {
  currentClinic.value = { ...clinic, openinghours: clinic.openinghours || defaultOpeningHours };
  dentistIds.value = clinic.dentists?.map(d => d._id).join(',') || '';
  showModal.value = true;
};

watch(dentistIds, (newVal) => {
  currentClinic.value.dentists = newVal.split(',').map(id => ({ _id: id.trim() })).filter(id => id._id);
});

const saveClinic = async () => {
  const method = currentClinic.value._id ? 'patch' : 'post';
  const url = currentClinic.value._id ? `/api/clinic/${currentClinic.value._id}` : '/api/clinic';

  try {
    await axios[method](url, currentClinic.value);
    showModal.value = false;
    fetchClinics();
  } catch (error) {
    console.error('Error saving clinic:', error);
  }
};

const deleteClinic = async (clinicId: string) => {
  try {
    await axios.delete(`/api/clinic/${clinicId}`);
    fetchClinics();
  } catch (error) {
    console.error('Error deleting clinic:', error);
  }
};

fetchClinics();
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