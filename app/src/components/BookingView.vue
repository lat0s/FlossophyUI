<template>
  <div class="card-container">
    <div class="card">
      <div class="calendar-container">
        <vue-cal
          :events="appointments"
          :active-view="activeView"
          :disable-views="['years', 'year']"
          @event-click="openModal"
        ></vue-cal>
      </div>
    </div>
    <BModal v-model="showModal" title="Book Appointment">
      <p>Please verify your personal details:</p>
      <p>User ID: {{ userId }}</p>
      <p>User Name: {{ userName }}</p>
      <p>User Email: {{ userEmail }}</p>
      <BButton id="bookButton" @click="bookAppointment"
        >Book the Appointment</BButton
      >
    </BModal>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue';
  import { useUserStore } from '../stores/userStore';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import VueCal from 'vue-cal';
  import 'vue-cal/dist/vuecal.css';

  const userStore = useUserStore();
  const userId = userStore._id;
  const userName = userStore.name;
  const userEmail = userStore.email;

  const route = useRoute();
  const clinicId = ref(route.params.id);

  const appointments = ref([]);
  const activeView = ref('month');
  const showModal = ref(false);
  const selectedAppointmentID = ref(null);
  let pollingInterval = null;

  onMounted(() => {
    fetchAppointments();
    startPolling();
  });

  onUnmounted(() => {
    stopPolling();
  });

  // Watch for changes in the route ID to reactively fetch appointments
  watch(
    () => clinicId.value,
    () => fetchAppointments()
  );

  function startPolling() {
    stopPolling(); // Clear any existing interval
    pollingInterval = setInterval(fetchAppointments, 5000); // Fetch appointments every 5 seconds
  }

  function stopPolling() {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      pollingInterval = null;
    }
  }

  function openModal(selectedEvent) {
    if (selectedEvent.data.status === 'Booked') {
      console.log('This appointment is already booked.');
      return;
    }
    selectedAppointmentID.value = selectedEvent.data._id;
    showModal.value = true;
  }

  async function bookAppointment() {
    if (!selectedAppointmentID.value) {
      console.error('No appointment selected');
      return;
    }

    try {
      // Update the appointment status to 'Booked'
      const { data: updatedAppointment } = await axios.patch(
        `/api/appointment/${selectedAppointmentID.value}`,
        {
          status: 'Booked',
          patient: userId,
        }
      );

      console.log('Appointment booked successfully.');

      // Fetch additional data for sending the email
      const { data: dentist } = await axios.get(
        `/api/dentist/${updatedAppointment.dentist}?fields=name,email`
      );
      const { data: clinic } = await axios.get(
        `/api/clinic/${updatedAppointment.clinic}?fields=name`
      );

      // Send confirmation email
      await axios.post('/api/send-email', {
        patientEmail: userEmail,
        dentistEmail: dentist.email,
        patientName: userName,
        clinicName: clinic.name,
        dentistName: dentist.name,
        date: updatedAppointment.date,
        time: updatedAppointment.time,
        type: 'book',
      });

      console.log('Confirmation email sent successfully.');

      // Close modal and refresh appointments
      showModal.value = false;
      fetchAppointments();
    } catch (error) {
      console.error('Error booking the appointment:', error.response || error);
    }
  }

  async function fetchAppointments() {
    try {
      const { data } = await axios.get('/api/appointment');

      // Filter and map appointments for the current clinic
      appointments.value = data.appointments
        .filter((appt) => appt.clinic._id === clinicId.value)
        .map((appt) => ({
          start: new Date(`${appt.date}T${appt.time}:00`),
          end: new Date(
            new Date(`${appt.date}T${appt.time}:00`).getTime() + 60 * 60000
          ),
          title: appt.status,
          class: appt.status === 'Available' ? 'available' : 'booked',
          data: { _id: appt._id, status: appt.status },
        }));

      console.log('Appointments updated:', appointments.value);
    } catch (error) {
      console.error('Error fetching appointments:', error.response || error);
    }
  }
</script>

<style>
  .vuecal {
    min-height: 100vh;
  }
  .calendar-container {
    align-self: center;
    background: rgba(144, 137, 240, 0.6) !important;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1) !important;
    backdrop-filter: blur(11.3px) !important;
    -webkit-backdrop-filter: blur(11.3px) !important;
    border: 1px solid rgba(172, 173, 240, 0.6) !important;
    min-height: 100vh;
    min-width: 100vh;
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

  #bookButton {
    background-color: green;
    padding: 2px;
  }

  p {
    color: rgb(255, 255, 255);
    font-size: large;
    padding: 2px;
    font-weight: bold;
  }

  .vuecal__event {
    border-radius: 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    height: auto !important;
  }
</style>
