<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  import NavBar from './components/NavBar.vue'
  import Footer from './components/Footer.vue'
</script>

<template>
  <NavBar/>
  <router-view/>
  <Footer/>
</template>

<style scoped>
</style>
