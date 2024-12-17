<template>
  <BContainer class="profile-container">
    <BRow>
      <h1>User Details</h1>
    </BRow>
    <BRow class="profile-details">
      <h3 class="text">Name: {{ userStore.name }}</h3>
      <h3 class="text">Email: {{ userStore.email }}</h3>
      <h3 class="text">User ID: {{ userStore._id }}</h3>
    </BRow>
    <BRow>
      <BButton variant="primary" @click="showModal = true"
        >Edit Details</BButton
      >
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
    <BRow>
      <span><h1></h1></span>
    </BRow>
    <BRow>
      <BButton variant="danger" @click="logoutUser">Logout</BButton>
    </BRow>
    <BRow>
      <h2>Appointments</h2>
      <ul>
        <li v-for="appointment in filteredAppointments" :key="appointment._id">
          {{ appointment.date }} - {{ appointment.time }} with Dentist:
          {{ appointment.dentistName }} at Clinic: {{ appointment.clinicName }}
          <BButton variant="danger" @click="confirmCancel(appointment)"
            >Cancel</BButton
          >
        </li>
      </ul>
    </BRow>
    <BModal v-model="showCancelModal" title="Cancel Appointment">
      <p>Are you sure you want to cancel the following appointment?</p>
      <p>
        {{ selectedAppointment?.date }} - {{ selectedAppointment?.time }} with
        Dentist: {{ selectedAppointment?.dentistName }} at Clinic:
        {{ selectedAppointment?.clinicName }}
      </p>
      <BButton variant="danger" @click="cancelAppointment">Yes, Cancel</BButton>
      <BButton variant="secondary" @click="showCancelModal = false"
        >No, Go Back</BButton
      >
    </BModal>
  </BContainer>
</template>

<script setup lang="ts">
  import { watch, ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '../stores/userStore';

  interface Appointment {
    _id: string;
    date: string;
    time: string;
    status: 'Available' | 'Booked';
    dentist: string;
    clinic: string;
    patient: string | null;
    dentistName?: string;
    dentistEmail?: string;
    clinicName?: string;
  }

  const router = useRouter();
  const showModal = ref(false);
  const showCancelModal = ref(false);
  const editName = ref('');
  const editEmail = ref('');
  const selectedAppointment = ref<Appointment | null>(null);

  const userStore = useUserStore();

  const appointments = ref<Appointment[]>([]);
  const filteredAppointments = ref<Appointment[]>([]);

  const cache = new Map();

  const fetchWithCache = async (url: string) => {
    if (cache.has(url)) {
      return cache.get(url);
    }
    const response = await axios.get(url);
    cache.set(url, response.data);
    return response.data;
  };

  const fetchAppointments = async () => {
    try {
      console.log('Fetching appointments...');
      const response = await axios.get('/api/appointment');

      // Ensure response contains an array
      if (Array.isArray(response.data.appointments)) {
        appointments.value = response.data.appointments;
      } else {
        appointments.value = [];
        console.warn(
          'API response is not an array. Setting appointments to []'
        );
      }

      console.log('Appointments fetched:', appointments.value);
      await fetchAdditionalDetails();
      filterAppointments();
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      appointments.value = []; // Ensure it is reset to an empty array on failure
    }
  };

  const fetchAdditionalDetails = async () => {
    try {
      if (!Array.isArray(appointments.value)) {
        console.error('Appointments is not an array.');
        return;
      }

      const detailsPromises = appointments.value.map(async (appointment) => {
        const dentistId = appointment.dentist?._id || appointment.dentist; // Extract ID safely
        const clinicId = appointment.clinic?._id || appointment.clinic;

        const dentistUrl = `/api/dentist/${dentistId}?fields=name,email`;
        const clinicUrl = `/api/clinic/${clinicId}?fields=name`;

        const [dentistData, clinicData] = await Promise.all([
          fetchWithCache(dentistUrl),
          fetchWithCache(clinicUrl),
        ]);

        // Assign fetched data back to appointment
        appointment.dentistName = dentistData?.name || 'Unknown Dentist';
        appointment.dentistEmail = dentistData?.email || 'No Email';
        appointment.clinicName = clinicData?.name || 'Unknown Clinic';
      });

      await Promise.all(detailsPromises);
      console.log('Additional details fetched for all appointments');
    } catch (error) {
      console.error('Failed to fetch additional details:', error);
    }
  };

  const filterAppointments = () => {
    if (!Array.isArray(appointments.value)) {
      console.error('Appointments is not an array.');
      filteredAppointments.value = [];
      return;
    }

    filteredAppointments.value = appointments.value.filter(
      (appointment) => appointment.patient?._id === userStore._id
    );

    console.log('Filtered appointments:', filteredAppointments.value);
  };

  const fetchUserData = async () => {
    try {
      console.log('Fetching user data...');
      const response = await axios.get(`/api/patient/${userStore._id}`);
      const user = response.data;
      userStore.setUser(user);
      console.log('User data fetched:', user);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  onMounted(async () => {
    await Promise.all([fetchAppointments(), fetchUserData()]);
    console.log('User ID:', userStore._id);
  });

  watch(showModal, (newVal) => {
    if (newVal) {
      editName.value = userStore.name;
      editEmail.value = userStore.email;
      console.log('Edit modal opened, pre-filled values:', {
        name: editName.value,
        email: editEmail.value,
      });
    }
  });

  const logoutUser = () => {
    console.log('Logging out user...');
    userStore.resetUser();
    router.push('/login');
    console.log('User logged out and redirected to login page.');
  };

  const submitEdit = async () => {
    try {
      console.log('Updating user details:', {
        id: userStore._id,
        name: editName.value,
        email: editEmail.value,
      });
      const response = await axios.patch(`/api/patient/${userStore._id}`, {
        name: editName.value,
        email: editEmail.value,
      });
      userStore.setUser({
        name: editName.value,
        email: editEmail.value,
        _id: userStore._id,
      });
      showModal.value = false;
      console.log('User details updated successfully.');
    } catch (error) {
      console.error('Failed to update user details:', error);
    }
  };

  const confirmCancel = (appointment: Appointment) => {
    selectedAppointment.value = appointment;
    showCancelModal.value = true;
    console.log(
      'Cancel confirmation modal opened for appointment:',
      appointment._id
    );
  };

  const cancelAppointment = async () => {
    if (!selectedAppointment.value) return;
    try {
      console.log('Cancelling appointment:', selectedAppointment.value._id);
      await axios.patch(`/api/appointment/${selectedAppointment.value._id}`, {
        status: 'Available',
        patient: null,
      });

      // Send email without awaiting the response
      axios
        .post(`/api/send-email`, {
          patientEmail: userStore.email,
          dentistEmail: selectedAppointment.value.dentistEmail,
          patient: userStore.name,
          clinic: selectedAppointment.value.clinicName,
          dentist: selectedAppointment.value.dentistName,
          date: selectedAppointment.value.date,
          time: selectedAppointment.value.time,
          type: 'cancel',
        })
        .then(() => {
          console.log('Email sent successfully.');
        })
        .catch((error) => {
          console.error('Failed to send email:', error);
        });

      await fetchAppointments();
      showCancelModal.value = false;
      console.log('Appointment cancelled successfully.');
    } catch (error) {
      console.error('Failed to cancel appointment:', error);
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

  .text {
    font-size: 20px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    background-color: #fff;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  li p {
    margin: 0;
  }
</style>
