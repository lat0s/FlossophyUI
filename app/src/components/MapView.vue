<template>
  <BContainer id="container">
  <BModal v-model="modal" title="Clinic Details"> <!-- Modal -->
    <p v-if="currentDentistry">Name: {{ currentDentistry.name }}</p>
    <p v-if="currentDentistry">Address: {{ currentDentistry.address }}</p>
    <p v-else>No clinic selected</p>
    <BButton @click="navigateToBooking(currentDentistry.id)">Book an appointment</BButton>

  </BModal>
  <BRow>
  <div class="map-wrap"> <!-- Map Wrap -->
    <BButton @click="click" class="map-button m-2">☰</BButton> <!-- Side Bar Button -->
    <BOffcanvas v-model="show" :placement="placement" :backdrop="false" no-close-on-backdrop class="sidebar" title="Available Clinics">
    <!-- Search Input -->
    <BFormInput v-model="searchTerm" placeholder="Search clinics..." class="mb-3"/>
    <!-- List of dentistry clinics -->
    <ul>
      <li v-for="dentistry in filteredDentistryList" :key="dentistry.id" @click="selectDentistry(dentistry)" class="dentistry-item">
        {{ dentistry.name }} - {{ dentistry.address }}
        <div v-if="isLoggedIn" class="distance-text">{{ distanceToDentistry(dentistry) }} KM Away</div>
      </li>
    </ul>
  </BOffcanvas>
  <div class="map" ref="mapContainer"></div> <!-- Map -->
  </div>
  </BRow>
</BContainer>
</template>

<script setup>
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
import { shallowRef, onMounted, onUnmounted, ref, computed, watchEffect } from 'vue';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { calculateDistance } from '@/helpers/mapHelper.js';
import axios from 'axios';

import customMarkerIcon from '@/assets/marker.png';

const isLoggedIn = true; // testing

const mapContainer = shallowRef(null);
const map = shallowRef(null);
const modal = ref(false);

const show = ref(false)
const placement = ref('start')
const searchTerm = ref('');

const userCoordinates = { lat: 57.708870, lng: 11.974560 }; // REPLACE WITH REST VALUES!!!!!

const distanceToDentistry = (dentistry) => {
  return calculateDistance(userCoordinates.lat, userCoordinates.lng, dentistry.lat, dentistry.lng);
};

const click = (place = 'start') => {
  placement.value = place
  show.value = !show.value
}

const currentDentistry = ref(null);

const dentistryList = ref([]); // Holds the list of clinics fetched from the API

const fetchClinics = async () => {
  try {
    const response = await axios.get('/api/clinic'); 
    dentistryList.value = response.data;
  } catch (error) {
    console.error('Error fetching clinics:', error);
  }
};

const filteredDentistryList = computed(() => {
  return dentistryList.value.filter((dentistry) =>
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
      zoom: 17
    });
    currentDentistry.value = dentistry;
    show.value = true;
  }
};

watchEffect(() => {
  if (map.value && dentistryList.value.length) {
    dentistryList.value.forEach(dentistry => {
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
        .getElement().addEventListener('click', () => {
          currentDentistry.value = dentistry;
          modal.value = true;
        });
    });
  }
});

onMounted(() => {
  config.apiKey = '3El17jYpkRdshALvcdOY';
  const initialState = { lng: 11.974560, lat: 57.708870, zoom: 14 };  

  map.value = new Map({
    container: mapContainer.value,
    style: MapStyle.STREETS,
    center: [initialState.lng, initialState.lat],
    zoom: initialState.zoom
  });

  fetchClinics(); // Fetch clinics when the component is mounted
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
  background-color: rgba(255, 255, 255, 0.5)!important;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1)!important;
  backdrop-filter: blur(7.7px)!important;
  -webkit-backdrop-filter: blur(7.7px)!important;
  border: 1px solid rgba(255, 255, 255, 0.68)!important;
}

.map-button {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10; 
  background-color: rgba(255, 255, 255, 0.5)!important;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1)!important;
  backdrop-filter: blur(7.7px)!important;
  -webkit-backdrop-filter: blur(7.7px)!important;
  border: 1px solid rgba(255, 255, 255, 0.68)!important;
  color: black!important;
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

#container{
background: rgba(156, 160, 162, 0.33);
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(8.4px);
-webkit-backdrop-filter: blur(8.4px);
border: 1px solid rgba(156, 160, 162, 0.56);
}

.custom-marker-icon {
}


</style>