<template>
  <BNavbar
    id="navbar"
    v-b-color-mode="'dark'"
    toggleable="lg"
    variant="primary"
  >
    <BNavbarBrand href="/">
      <img src="../assets/logonobg.png" class="brandimage" />
      Flossophy
    </BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav
        v-if="userStore.isAuthenticated()"
        class="justify-content-center"
      >
        <BNavItem href="/map" class="map-link">Map</BNavItem>
      </BNavbarNav>
      <BNavbarNav
        v-if="!userStore.isAuthenticated()"
        class="ms-auto mb-2 mb-lg-0"
      >
        <BNavItem href="/registration">Register</BNavItem>
        <BNavItem href="/login">Login</BNavItem>
      </BNavbarNav>
      <BNavbarNav
        v-if="userStore.isAuthenticated()"
        class="ms-auto mb-2 mb-lg-0"
      >
        <BNavItem href="/profile">Profile</BNavItem>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>

<script setup>
  import { useUserStore } from '../stores/userStore';

  const userStore = useUserStore();
</script>

<style>
  #navbar {
    background: rgba(172, 173, 240, 0.6) !important;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1) !important;
    backdrop-filter: blur(11.3px) !important;
    -webkit-backdrop-filter: blur(11.3px) !important;
    border: 1px solid rgba(172, 173, 240, 0.6) !important;
  }

  .brandimage {
    height: 70px;
    width: 70px;
  }
  .map-link {
    color: white;
    font-weight: bold;
    font-size: large;
    align-items: center !important;
  }
</style>
