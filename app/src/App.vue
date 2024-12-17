<template>
  <Navbar />
  <router-view />
  <Footer />
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';
  const route = useRoute();
</script>
