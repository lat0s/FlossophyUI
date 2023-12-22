<template>
    <BContainer class="containermain">
      <h1 class="title">Appointment Management</h1>
      <BButton variant="success" @click="openModal()">Add Appointment</BButton>
  
      <!-- Appointment Cards -->
      <div class="d-flex flex-wrap">
        <BCard v-for="appointment in appointments" :key="appointment._id" class="m-2" style="width: 18rem;">
          <h5 class="card-title">Date & Time: {{ appointment.datetime }}</h5>
          <p class="card-text">Status: {{ appointment.status }}</p>
          <p class="card-text">Dentist ID: {{ appointment.dentist }}</p>
          <p class="card-text">Clinic ID: {{ appointment.clinic }}</p>
          <p class="card-text">Patient ID: {{ appointment.patient }}</p>
          <BButton size="sm" variant="primary" @click="openModal(appointment)">Edit</BButton>
          <BButton size="sm" variant="danger" @click="appointment._id ? deleteAppointment(appointment._id) : null">Delete</BButton>
        </BCard>
      </div>
  
      <!-- Appointment Edit/Create Modal -->
      <BModal v-model="showModal" title="Appointment Details" hide-footer>
        <BForm @submit.prevent="saveAppointment">
          <BFormGroup label="Date & Time:" label-for="input-datetime">
            <BFormInput id="input-datetime" type="datetime-local" v-model="currentAppointment.datetime" required></BFormInput>
          </BFormGroup>
          <BFormGroup label="Status:" label-for="input-status">
            <BFormSelect id="input-status" v-model="currentAppointment.status" :options="['Available', 'Booked']" required></BFormSelect>
          </BFormGroup>
          <BFormGroup label="Dentist ID:" label-for="input-dentist">
            <BFormInput id="input-dentist" v-model="currentAppointment.dentist" required></BFormInput>
          </BFormGroup>
          <BFormGroup label="Clinic ID:" label-for="input-clinic">
            <BFormInput id="input-clinic" v-model="currentAppointment.clinic" required></BFormInput>
          </BFormGroup>
          <BFormGroup label="Patient ID (optional):" label-for="input-patient">
            <BFormInput id="input-patient" v-model="currentAppointment.patient"></BFormInput>
          </BFormGroup>
          <BButton type="submit" variant="primary">Save</BButton>
        </BForm>
      </BModal>
    </BContainer>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, Ref } from 'vue';
  import axios from 'axios';
  
  interface Appointment {
    _id?: string;
    datetime: string;
    status: string;
    dentist: string;
    clinic: string;
    patient: string;
  }
  
  const appointments: Ref<Appointment[]> = ref([]);
  const showModal = ref(false);
  const currentAppointment: Ref<Appointment> = ref({ datetime: '', status: 'Available', dentist: '', clinic: '', patient: '' });
  
  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/appointment');
      appointments.value = response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };
  
  const openModal = (appointment: Appointment = { datetime: '', status: 'Available', dentist: '', clinic: '', patient: '' }) => {
    currentAppointment.value = appointment;
    showModal.value = true;
  };
  
  const saveAppointment = async () => {
    const method = currentAppointment.value._id ? 'patch' : 'post';
    const url = currentAppointment.value._id ? `/api/appointment/${currentAppointment.value._id}` : '/api/appointment';
  
    try {
      await axios[method](url, currentAppointment.value);
      showModal.value = false;
      fetchAppointments();
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };
  
  const deleteAppointment = async (appointmentId: string) => {
    try {
      await axios.delete(`/api/appointment/${appointmentId}`);
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };
  
  fetchAppointments();
  </script>
  
  <style scoped>
  .title {
    text-align: center;
  }
  .containermain {
    display: flex!important;
    flex-direction: column!important;
    flex-wrap: wrap!important;
    align-content: space-around!important;
  }
  .m-2 {
    background: rgba(3, 3, 3, 0.32)!important;
    border-radius: 16px!important;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1)!important;
    backdrop-filter: blur(10.9px)!important;
    -webkit-backdrop-filter: blur(10.9px)!important;
    border: 1px solid rgba(145, 244, 173, 0.3)!important;
  }
  </style>
  