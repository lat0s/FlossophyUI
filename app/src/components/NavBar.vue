<template>
<BNavbar id="navbar" toggleable="lg" variant="primary" sticky="top" v-b-color-mode="'dark'">
  <BNavbarBrand href="/">
    <img src="../assets/logonobg.png" class="brandimage">
    Flossophy
  </BNavbarBrand>
  <BNavbarToggle target="nav-collapse" />
  <BCollapse id="nav-collapse" is-nav>
    <BNavbarNav class="w-100 justify-content-center" v-if="isLoggedIn">
      <BNavItem href="/map">Map</BNavItem>
    </BNavbarNav>
    <!-- Right aligned nav items -->
    <BNavbarNav class="ms-auto mb-2 mb-lg-0">
      <BNavItem href="#">Register</BNavItem>
      <BNavItem href="#">Login</BNavItem>
    </BNavbarNav>
  </BCollapse>
</BNavbar>


</template>
  


<script setup>
import { ref } from 'vue';

const isLoggedIn = ref(true); //Test ! Fix sometime !
</script>



<style>

#navbar {
  background: rgba(172, 173, 240, 0.6)!important;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1)!important;
  backdrop-filter: blur(11.3px)!important;
  -webkit-backdrop-filter: blur(11.3px)!important;
  border: 1px solid rgba(172, 173, 240, 0.6)!important;
}

.brandimage {
  height: 70px;
  width: 70px;
}


</style>