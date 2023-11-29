<template>
  <div class="map-wrap">
    <div class="map" ref="mapContainer"></div>
    <b-modal class="modal" v-model="modalShow" title="Clinic Details">
      <!-- Modal content -->
      <div class="px-3 py-2">
        <p v-if="currentDentistry"><strong>Name:</strong> {{ currentDentistry.name }}</p>
        <p v-if="currentDentistry"><strong>Address:</strong> {{ currentDentistry.address }}</p>
        <b-button class="booking-button">{{currentDentistry.name}}'s booking page. </b-button>

      </div>
    </b-modal>
  </div>
</template>

<script setup>
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
import { shallowRef, onMounted, onUnmounted, ref } from 'vue';
import '@maptiler/sdk/dist/maptiler-sdk.css';

import customMarkerIcon from '@/assets/marker.png';


const mapContainer = shallowRef(null);
const map = shallowRef(null);
const modalShow = ref(false);
const currentDentistry = ref(null);

// TEST
const dentistryTestData = [
  {
    id: 1,
    name: "Dentistry A",
    lng: 11.964560 + Math.random() * 0.01,
    lat: 57.708870 + Math.random() * 0.01,
    address: "Postgatan 9, 41616 Göteborg"
  },
  {
    id: 2,
    name: "Dentistry B",
    lng: 11.984560 + Math.random() * 0.01,
    lat: 57.708870 + Math.random() * 0.01,
    address: "Burgrevegatan 12, 41616 Göteborg"
  },
  {
    id: 3,
    name: "Dentistry C",
    lng: 11.974560 + Math.random() * 0.01,
    lat: 57.708870 + Math.random() * 0.01,
    address: "Mejerigatan 20, 41616 Göteborg"
  }
];







onMounted(() => {
  config.apiKey = '3El17jYpkRdshALvcdOY';
  const initialState = { lng: 11.974560, lat: 57.708870, zoom: 14 };

  map.value = new Map({
    container: mapContainer.value,
    style: MapStyle.STREETS,
    center: [initialState.lng, initialState.lat],
    zoom: initialState.zoom
  });

  dentistryTestData.forEach(dentistry => {
    // Create a wrapper element for the marker
    const markerWrapper = document.createElement('div');

    // Create a label element
    const label = document.createElement('div');
    label.className = 'marker-label';
    label.innerText = dentistry.name;

    // Create a custom marker element using the imported image
    const markerIcon = document.createElement('img');
    markerIcon.src = customMarkerIcon;
    markerIcon.className = 'custom-marker-icon';

    // Append label and custom marker icon to the wrapper
    markerWrapper.appendChild(label);
    markerWrapper.appendChild(markerIcon);

    const marker = new Marker({ element: markerWrapper })
      .setLngLat([dentistry.lng, dentistry.lat])
      .addTo(map.value);

    marker.getElement().addEventListener('click', () => {
      currentDentistry.value = dentistry;
      modalShow.value = true; // Open the modal
    });
  });
});


onUnmounted(() => {
  map.value?.remove();
})
</script>

<style>
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
}

.map {
  position: absolute;
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
  top: -25px; /* Adjust as necessary */
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.custom-marker-icon {
  width: 80px; /* Adjust size as necessary */
  height: 80px; /* Adjust size as necessary */
}


</style>