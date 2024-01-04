<template>
  <div class="calendar-container">
    <vue-cal :events="appointments" :active-view="month" :disable-views="['years', 'year']" :on-event-click="openModal"></vue-cal>
  </div>
  <BModal  v-model="showModal" title="Book Appointment"> Please verify your personal details
  </BModal>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

const route = useRoute();
const dentistryId = ref(null);
const appointments = ref([]);
const activeView = ref('month');
const showModal = ref(false);

onMounted(() => {
  dentistryId.value = route.params.id;
  fetchAppointments();
});
function openModal() {
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}
function fetchAppointments() {
  axios.get('/api/appointment')
    .then(response => {
      const filteredAppointments = response.data
        .filter(appointment => appointment.clinic && appointment.clinic.toString() === dentistryId.value)
        .map(appointment => {
          const start = new Date(appointment.datetime || appointment.time[0]);
          return {
            start: start,
            end: new Date(start.getTime() + 60 * 60000), // assuming 60 minutes duration
            title: appointment.status,
            class: appointment.status === 'Available' ? 'available' : 'booked'
          };
        });
      appointments.value = filteredAppointments;
    })
    .catch(error => {
      console.error('Error fetching appointments:', error);
    });
}
</script>

<style>
.calendar-container {
  background: rgba(144, 137, 240, 0.6)!important;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1)!important;
  backdrop-filter: blur(11.3px)!important;
  -webkit-backdrop-filter: blur(11.3px)!important;
  border: 1px solid rgba(172, 173, 240, 0.6)!important;
}

.vuecal--default-theme .vuecal__head {
  background-color: rgba(128, 0, 128, 0.8); /* Darker purple for header */
  color: white;
}

.vuecal__event.booked {
  background-color: red;
  color: white;
  padding: 5px;
  height: auto;

}

.vuecal__event.available {
  background-color: green;
  color: white;
  padding: 5px;
  height: auto;

}

.vuecal__event {
  border-radius: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  height: auto!important;
}
</style>
