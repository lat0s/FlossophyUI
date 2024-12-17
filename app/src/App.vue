<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';
  const route = useRoute();
</script>

<style>
  #app {
    background: rgba(180, 77, 248, 0.38);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10.2px);
    -webkit-backdrop-filter: blur(10.2px);
    min-height: 100vh; /* Ensure the background covers the full height */
    display: flex;
    flex-direction: column;
  }
</style>
