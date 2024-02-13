<template>
  <div class="calendar-container">
    <vue-cal :events="appointments" :active-view="activeView" :disable-views="['years', 'year']" @event-click="openModal"></vue-cal>
  </div>
  <BModal v-model="showModal" title="Book Appointment">Please verify your personal details</BModal>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

const route = useRoute();
const clinicId = ref('');
const appointments = ref([]);
const activeView = ref('month');
const showModal = ref(false);

onMounted(() => {
  clinicId.value = route.params.id;
  fetchAppointments();
});

function openModal(event) {
  console.log("Event clicked:", event);
  showModal.value = true;
}

async function fetchAppointments() {
  try {
    const { data } = await axios.get('/api/appointment');

    const filteredAppointments = data.filter(appointment => 
      appointment.clinic && appointment.clinic.toString() === clinicId.value
    ).map(appointment => {
        // Create a date object directly without UTC conversion
        const start = new Date(`${appointment.date}T${appointment.time}:00`);
        // Assume each appointment lasts 1 hour for calendar display purposes
        const end = new Date(start.getTime() + 60 * 60000); // Add 60 minutes

        return {
          start: start,
          end: end,
          title: `${appointment.status}`, // Use dentist's name
          class: appointment.status === 'Available' ? 'available' : 'booked',
          data: appointment
        };
    });

    appointments.value = filteredAppointments;
  } catch (error) {
    console.error('Error fetching appointments:', error);
  }
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
  background-color: rgba(128, 0, 128, 0.8);
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
