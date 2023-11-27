<template>
  <div class="map-wrap">
    <div class="map" ref="mapContainer"></div>
    <b-modal v-model="modalShow" title="Clinic Details">
      <!-- Modal content -->
      <div class="px-3 py-2">
        <p v-if="currentDentistry"><strong>Clinic:</strong> {{ currentDentistry.name }}</p>

      </div>
    </b-modal>
  </div>
</template>

<script setup>
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
import { shallowRef, onMounted, onUnmounted, ref } from 'vue';
import '@maptiler/sdk/dist/maptiler-sdk.css';

const mapContainer = shallowRef(null);
const map = shallowRef(null);
const modalShow = ref(false);
const currentDentistry = ref(null);

// TEST
const dentistryTestData = [
  {
    id: 1,
    name: "Dentistry A",
    lng: 11.974560 + Math.random() * 0.01,
    lat: 57.708870 + Math.random() * 0.01
  },
  {
    id: 2,
    name: "Dentistry B",
    lng: 11.974560 + Math.random() * 0.01,
    lat: 57.708870 + Math.random() * 0.01
  },
  {
    id: 3,
    name: "Dentistry C",
    lng: 11.974560 + Math.random() * 0.01,
    lat: 57.708870 + Math.random() * 0.01
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
    const marker = new Marker()
      .setLngLat([dentistry.lng, dentistry.lat])
      .addTo(map.value);
    
    marker.getElement().addEventListener('click', () => {
      currentDentistry.value = dentistry;
      modalShow.value = true; // Open the modal
    });
  });
}),

onUnmounted(() => {
  map.value?.remove();
})
</script>

<style scoped>
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
</style>