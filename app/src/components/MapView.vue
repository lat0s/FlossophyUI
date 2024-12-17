<template>
  <BContainer id="container">
    <BModal v-model="modal" title="Clinic Details">
      <p v-if="currentDentistry">Name: {{ currentDentistry.name }}</p>
      <p v-if="currentDentistry">Address: {{ currentDentistry.address }}</p>
      <p v-else>No clinic selected</p>
      <BButton @click="handleBooking">Book an appointment</BButton>
    </BModal>

    <BRow>
      <div class="map-wrap">
        <BButton class="map-button m-2" @click="toggleSidebar">☰</BButton>
        <BOffcanvas
          v-model="show"
          :placement="placement"
          :backdrop="false"
          no-close-on-backdrop
          class="sidebar"
          title="Available Clinics"
        >
          <BFormInput
            v-model="searchTerm"
            placeholder="Search clinics..."
            class="mb-3"
          />
          <ul>
            <li
              v-for="dentistry in filteredDentistryList"
              :key="dentistry.id"
              class="dentistry-item"
              @click="selectDentistry(dentistry)"
            >
              {{ dentistry.name }} - {{ dentistry.address }}
              <div v-if="isLoggedIn" class="distance-text">
                {{ distanceToDentistry(dentistry) }} KM Away
              </div>
            </li>
          </ul>
        </BOffcanvas>
        <div ref="mapContainer" class="map"></div>
      </div>
    </BRow>
  </BContainer>
</template>

<script setup>
  import {
    ref,
    computed,
    onMounted,
    onUnmounted,
    watchEffect,
    shallowRef,
  } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/userStore';
  import axios from 'axios';
  import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
  import '@maptiler/sdk/dist/maptiler-sdk.css';
  import { calculateDistance } from '@/helpers/mapHelper.js';
  import customMarkerIcon from '@/assets/marker.png';

  const router = useRouter();
  const userStore = useUserStore();
  const isLoggedIn = computed(() => userStore.isAuthenticated()); // Use store's method for login state

  const userCoordinates = ref({ lat: 57.70887, lng: 11.97456 }); // Replace with dynamic values
  const dentistryList = ref([]);
  const searchTerm = ref('');
  const show = ref(false);
  const placement = ref('start');
  const modal = ref(false);
  const mapContainer = shallowRef(null);
  const map = shallowRef(null);
  const currentDentistry = ref(null);

  const fetchClinics = async () => {
    try {
      const response = await axios.get('/api/clinic');
      dentistryList.value = (response.data?.clinics || []).map((clinic) => ({
        id: clinic._id,
        name: clinic.name,
        address: clinic.address,
        lat: clinic.lat,
        lng: clinic.lng,
      }));
    } catch (error) {
      console.error('Error fetching clinics:', error);
    }
  };

  const distanceToDentistry = (dentistry) => {
    return calculateDistance(
      userCoordinates.value.lat,
      userCoordinates.value.lng,
      dentistry.lat,
      dentistry.lng
    );
  };

  const filteredDentistryList = computed(() => {
    return dentistryList.value.filter(
      (dentistry) =>
        dentistry.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        dentistry.address.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });

  const selectDentistry = (dentistry) => {
    currentDentistry.value = dentistry;
    zoomToDentistry(dentistry);
  };

  const zoomToDentistry = (dentistry) => {
    if (map.value) {
      map.value.flyTo({
        center: [dentistry.lng, dentistry.lat],
        essential: true,
        zoom: 17,
      });
      currentDentistry.value = dentistry;
      show.value = true;
    }
  };

  const toggleSidebar = () => {
    show.value = !show.value;
  };

  const handleBooking = () => {
    if (!isLoggedIn.value) {
      router.push('/login'); // Redirect to login if not authenticated
    } else {
      router.push({
        name: 'BookingView',
        params: { id: currentDentistry.value.id },
      });
    }
  };

  onMounted(() => {
    config.apiKey = '3El17jYpkRdshALvcdOY';
    map.value = new Map({
      container: mapContainer.value,
      style: MapStyle.STREETS,
      center: [userCoordinates.value.lng, userCoordinates.value.lat],
      zoom: 14,
    });

    fetchClinics();

    watchEffect(() => {
      if (map.value && dentistryList.value.length) {
        dentistryList.value.forEach((dentistry) => {
          const markerWrapper = document.createElement('div');
          const label = document.createElement('div');
          label.className = 'marker-label';
          label.innerText = dentistry.name;

          const markerIcon = document.createElement('img');
          markerIcon.src = customMarkerIcon;
          markerIcon.className = 'custom-marker-icon';
          markerIcon.style.width = '50px';
          markerIcon.style.height = '50px';

          markerWrapper.appendChild(label);
          markerWrapper.appendChild(markerIcon);

          new Marker({ element: markerWrapper, anchor: 'bottom' })
            .setLngLat([dentistry.lng, dentistry.lat])
            .addTo(map.value)
            .getElement()
            .addEventListener('click', () => {
              currentDentistry.value = dentistry;
              modal.value = true;
            });
        });
      }
    });
  });

  onUnmounted(() => {
    map.value?.remove();
  });
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');
  .modal .modal-content {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.7px);
    -webkit-backdrop-filter: blur(7.7px);
    border: 1px solid rgba(255, 255, 255, 0.68);
  }

  .map-wrap {
    position: relative;
    width: 100%;
    height: calc(100vh - 77px);
    margin-top: 1%;
    margin-bottom: 1%;
  }

  .sidebar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 250px;
    z-index: 5;
    background-color: rgba(255, 255, 255, 0.5) !important;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1) !important;
    backdrop-filter: blur(7.7px) !important;
    -webkit-backdrop-filter: blur(7.7px) !important;
    border: 1px solid rgba(255, 255, 255, 0.68) !important;
  }

  .map-button {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.5) !important;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1) !important;
    backdrop-filter: blur(7.7px) !important;
    -webkit-backdrop-filter: blur(7.7px) !important;
    border: 1px solid rgba(255, 255, 255, 0.68) !important;
    color: black !important;
  }
  .marker-label {
    font-family: 'Roboto', sans-serif;
  }
  .sidebar ul {
    list-style: none;
    padding: 0;
  }

  .sidebar ul li {
    cursor: pointer;
    margin-bottom: 10px;
    border-bottom: 1px solid #000;
    padding-bottom: 10px;
  }

  .distance-text {
    color: #bc12ff;
    margin-top: 0px;
    font-size: small;
  }
  .map {
    width: 100%;
    height: 100%;
  }
  .marker-label {
    background-color: white;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid black;
    text-align: center;
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  #container {
    background: rgba(156, 160, 162, 0.33);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8.4px);
    -webkit-backdrop-filter: blur(8.4px);
    border: 1px solid rgba(156, 160, 162, 0.56);
  }

  .custom-marker-icon {
  }
</style>
