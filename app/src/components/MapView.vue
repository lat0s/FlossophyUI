<template>
  <BModal v-model="modal" title="Clinic Details"> <!-- Modal -->
    <p v-if="currentDentistry">Name: {{ currentDentistry.name }}</p>
    <p v-if="currentDentistry">Address: {{ currentDentistry.address }}</p>
    <p v-else>No clinic selected</p>
    <BButton>Book an appointment</BButton>
  </BModal>
  <div class="map-wrap"> <!-- Map Wrap -->
    <BButton @click="click" class="map-button m-2">☰</BButton> <!-- Side Bar Button -->
    <BOffcanvas v-model="show" :placement="placement" :backdrop="false" no-close-on-backdrop class="sidebar"> <!-- Side Bar -->
      <p> Test</p>
    </BOffcanvas>
  <div class="map" ref="mapContainer"></div> <!-- Map -->
  </div>
</template>

<script setup>
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
import { shallowRef, onMounted, onUnmounted, ref } from 'vue';
import '@maptiler/sdk/dist/maptiler-sdk.css';

import customMarkerIcon from '@/assets/marker.png';

const mapContainer = shallowRef(null);
const map = shallowRef(null);
const modal = ref(false);

const show = ref(false)
const placement = ref('start')

const click = (place = 'start') => {
  placement.value = place
  show.value = !show.value
}

const currentDentistry = ref(null);



const zoomToDentistry = (dentistry) => {
  if (map.value) {
    map.value.flyTo({
      center: [dentistry.lng, dentistry.lat],
      essential: true,
      zoom: 17
    });
    currentDentistry.value = dentistry;
    modalShow.value = true;
  }
};

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
      modal.value = true; // Open the modal
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

.sidebar {
  position: absolute;
  top: 0; /* Align to the top */
  left: 0; /* Align to the left */
  height: 100%; /* Full height of the map area */
  width: 250px; /* Or whatever width you prefer */
  z-index: 5; /* Below the button but above the map */
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
  z-index: 10; /* Ensure the button is above the sidebar */
}
.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  cursor: pointer;
  margin-bottom: 10px;
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

.custom-marker-icon {
  width: 6  0px; 
  height: 60px; 
}


</style>