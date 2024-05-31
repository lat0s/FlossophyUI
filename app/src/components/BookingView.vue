<template>
  <div class="calendar-container">
    <vue-cal :events="appointments" :active-view="activeView" :disable-views="['years', 'year']" @event-click="openModal"></vue-cal>
  </div>
  <BModal v-model="showModal" title="Book Appointment">
    Please verify your personal details
    <p>User ID: {{ userId }}</p>
    <p>User Name: {{ userName }}</p>
    <p>User Email: {{ userEmail }}</p>
    <BButton id="bookButton" @click="bookAppointment">Book the appointment</BButton>
  </BModal>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRoute } from 'vue-router';
import axios from 'axios';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

const userId = useUserStore()._id; 
const userName = useUserStore().name; 
const userEmail = useUserStore().email; 
const route = useRoute();
const clinicId = ref('');
const appointments = ref([]);
const activeView = ref('month');
const showModal = ref(false);
// Define a reactive variable for the selected appointment
var selectedAppointmentID = ref(null);
let intervalId = null;

onMounted(() => {
  console.log(userId);
  clinicId.value = route.params.id;
  fetchAppointments();
  intervalId = setInterval(fetchAppointments, 10000); // Fetch appointments every 10 seconds
});

onUnmounted(() => {
  clearInterval(intervalId); // Clear the interval when the component is destroyed
});

// Modify openModal to set selected appointment data
function openModal(selectedEvent) {
  console.log("Selected event:", selectedEvent);
  if (selectedEvent.data.status === 'Booked') {
    console.log('This appointment is already booked.');
    return; // Exit the function early if the appointment is booked
  }

  selectedAppointmentID = selectedEvent.data._id;
  showModal.value = true;
}

async function bookAppointment() {
  if (!selectedAppointmentID) {
    console.error("No appointment selected");
    return;
  }
  console.log("Booking appointment ID:", selectedAppointmentID);
  const appointmentUrl = `/api/appointment/${selectedAppointmentID}`;
  try {
    const response = await axios.patch(appointmentUrl, {
      status: "Booked",
      patient: userId
    });
    console.log("Appointment booked successfully", response.data);
    showModal.value = false;
    const selectedAppointment = await axios.get(`/api/appointment/${selectedAppointmentID}`);
    const dentistEmail = await axios.get(`/api/dentist/${selectedAppointment.data.dentist}/?fields=email`);
    const dentistName = await axios.get(`/api/dentist/${selectedAppointment.data.dentist}/?fields=name`);
    const clinicName = await axios.get(`/api/clinic/${selectedAppointment.data.clinic}/?fields=name`);
    axios.post(`/api/email`, {
      patientEmail: userEmail,
      dentistEmail: dentistEmail.data.email,
      patient: userName,
      clinic: clinicName.data.name,
      dentist: dentistName.data.name,
      date: selectedAppointment.data.date,
      time: selectedAppointment.data.time,
      type: 'book'
    }).then(() => {
      console.log('Email sent successfully.');
    }).catch((error) => {
      console.error('Failed to send email:', error);
    });
    fetchAppointments();
  } catch (error) {
    console.error("Error booking the appointment:", error.response ? error.response.data : error);
  }
}

async function fetchAppointments() {
  try {
    const { data } = await axios.get('/api/appointment');
    const filteredAppointments = data.filter(appointment => 
      appointment.clinic && appointment.clinic.toString() === clinicId.value
    ).map(appointment => {
        const start = new Date(`${appointment.date}T${appointment.time}:00`);
        const end = new Date(start.getTime() + 60 * 60000);
        return {
          start: start,
          end: end,
          title: `${appointment.status}`,
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

#bookButton{
  background-color: green;
  padding: 2px;

}

p{
  color:red;
  font-size:large;
  padding:2px;
}


.vuecal__event {
  border-radius: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  height: auto!important;
}
</style>
