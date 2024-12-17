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
      <BButton id="bookButton" @click="bookAppointment">
        Book the Appointment
      </BButton>
    </BModal>

    <!-- Appointments Sidebar Button -->
    <BButton class="appointments-button" @click="toggleAppointmentsSidebar">
      View Available Appointments
    </BButton>

    <!-- Appointments Sidebar -->
    <BOffcanvas
      v-model="showAppointmentsSidebar"
      placement="end"
      backdrop="false"
      no-close-on-backdrop
      class="appointments-sidebar"
      title="Available Appointments"
    >
      <BFormInput
        v-model="appointmentSearchTerm"
        placeholder="Search appointments..."
        class="mb-3"
      />
      <ul>
        <li
          v-for="appointment in filteredAppointments"
          :key="appointment._id"
          class="appointment-item"
          :class="{ available: appointment.status === 'Available' }"
          @click="
            appointment.status === 'Available' && selectAppointment(appointment)
          "
        >
          {{ formatDate(appointment.date) }} - {{ appointment.time }}
        </li>
      </ul>
    </BOffcanvas>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
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
  const showAppointmentsSidebar = ref(false);
  const appointmentSearchTerm = ref('');
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
      await axios.patch(`/api/appointment/${selectedAppointmentID.value}`, {
        status: 'Booked',
        patient: userId,
      });

      // Fetch the fully populated appointment
      const { data: updatedAppointment } = await axios.get(
        `/api/appointment/${selectedAppointmentID.value}`
      );

      console.log('Updated Appointment:', updatedAppointment);

      if (!updatedAppointment.dentist) {
        throw new Error(
          'Dentist information is missing in the updated appointment.'
        );
      }

      // Fetch additional data for sending the email
      const { data: dentist } = await axios.get(
        `/api/dentist/${updatedAppointment.dentist._id}?fields=name,email`
      );
      const { data: clinic } = await axios.get(
        `/api/clinic/${updatedAppointment.clinic._id}?fields=name`
      );

      // Send confirmation email
      await axios.post('/api/send-email', {
        patientEmail: userEmail, // Use correct email variable
        dentistEmail: dentist.email,
        patientName: userName,
        clinicName: clinic.name,
        dentistName: dentist.name,
        date: updatedAppointment.date,
        time: updatedAppointment.time,
        type: 'book',
      });
      console.log(userEmail);

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
      const { data } = await axios.get(
        `/api/appointment?clinic=${clinicId.value}`
      );

      // Filter and map appointments for the current clinic
      appointments.value = data.appointments
        .filter((appt) => appt.clinic._id === clinicId.value)
        .map((appt) => ({
          _id: appt._id, // Include _id for easy access
          start: new Date(`${appt.date}T${appt.time}:00`),
          end: new Date(
            new Date(`${appt.date}T${appt.time}:00`).getTime() + 60 * 60000
          ),
          title: appt.status,
          class: appt.status === 'Available' ? 'available' : 'booked',
          data: { _id: appt._id, status: appt.status },
          date: appt.date, // Add date
          time: appt.time, // Add time
          status: appt.status, // Add status
        }));

      console.log('Appointments updated:', appointments.value);
    } catch (error) {
      console.error('Error fetching appointments:', error.response || error);
    }
  }

  // Sidebar functionality
  const toggleAppointmentsSidebar = () => {
    showAppointmentsSidebar.value = !showAppointmentsSidebar.value;
  };

  const filteredAppointments = computed(() => {
    return appointments.value.filter(
      (appointment) =>
        appointment.status === 'Available' &&
        (appointment.date.includes(appointmentSearchTerm.value) ||
          appointment.time.includes(appointmentSearchTerm.value))
    );
  });

  const selectAppointment = (appointment) => {
    selectedAppointmentID.value = appointment._id;
    showAppointmentsSidebar.value = false;
    showModal.value = true;
  };

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };
</script>

<style>
  .vuecal {
    min-height: 100vh;
  }

  /* .card {
    border: 1px solid rgba(172, 173, 240, 0.6);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(11.3px);
    -webkit-backdrop-filter: blur(11.3px);
    border-radius: 16px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.8);
  } */

  .calendar-container {
    background: rgba(144, 137, 240, 0.6);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(11.3px);
    -webkit-backdrop-filter: blur(11.3px);
    border: 1px solid rgba(172, 173, 240, 0.6);
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

  /* Appointments Sidebar Button Styles */
  .appointments-button {
    position: fixed;
    top: 102px;
    left: 0px;
    z-index: 10;
    background: green !important;
  }

  /* Appointments Sidebar Styles */
  .appointments-sidebar {
    width: 300px;
  }

  /* Appointment Item Styles */
  .appointment-item {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
  }

  .appointment-item.available {
    background-color: green;
    color: white;
  }

  .appointment-item:hover {
    background-color: #f0f0f0;
  }
</style>
