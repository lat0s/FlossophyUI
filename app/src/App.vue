<template>
  <div>
    <!-- Render Navbar only if not on login or registration pages -->
    <Navbar v-if="!isLoginOrRegistration" />

    <RouterView />

    <Footer v-if="!isLoginOrRegistration" />

    
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
const route = useRoute();

const isLoginOrRegistration = computed(() => {
  return route.path === '/login' || route.path === '/registration';
});
</script>