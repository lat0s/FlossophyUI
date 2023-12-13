<template>
  <BNavbar id="navbar" toggleable="lg" variant="primary" sticky="top" v-b-color-mode="'dark'">
    <BNavbarBrand >
      <img src="../assets/logonobg.png" class="brandimage">
      Flossophy
    </BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav>
      <!-- Navbar content for logged-in users -->
      <BNavbarNav class="nav-items-spacing" v-if="authState.isAuthenticated">
        <BNavItem href="/home">Home</BNavItem>
        <BNavItem href="/map">Map</BNavItem>
        <BNavItem href="/booking">Booking</BNavItem>
        <BNavItemDropdown right>
          <template #button-content>
            <em>User</em>
          </template>
          <BDropdownItem @click="handleProfile">Profile</BDropdownItem>
          <BDropdownItem @click="handleSignOut">Sign Out</BDropdownItem>
        </BNavItemDropdown>
      </BNavbarNav>

      <!-- Navbar content for guests -->
      <BNavbarNav class="nav-items-spacing" v-else>
        <BNavItem href="/home">Home</BNavItem>
        <BNavItem href="/contact">Contact</BNavItem>
        <BNavItem href="/login">Login</BNavItem>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>


<script setup lang="ts">
import { authState, logout } from '../authState'; 
import { Ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleSignOut = () => {
  logout();
  router.push('/home');
  
};
const handleProfile = () => {
  router.push('/profile');
};

</script>

<style>

#navbar {
  background: #9ac5fd !important;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1)!important;
  backdrop-filter: blur(11.3px)!important;
  -webkit-backdrop-filter: blur(11.3px)!important;
  border: 1px solid rgba(172, 173, 240, 0.6)!important;
}

.nav-items-spacing > .nav-item:not(.b-nav-item-dropdown){
  margin-right: 100px !important; 
}

.nav-items-spacing > .nav-item:not(.b-nav-item-dropdown):last-child {
  margin-right: 0 !important; 
}
.nav-items-spacing  > .nav-item:not(.b-nav-item-dropdown) a{
  margin-left: 100px!important; 
}

.nav-items-spacing > .nav-item:not(.b-nav-item-dropdown) a{
  display: inline-block;
  padding: 10px 50px; 
  border-radius: 15px; 
  transition: background-color 0.3s ease, padding 0.3s ease; 
}

.nav-items-spacing > .nav-item:not(.b-nav-item-dropdown) a:hover {
  background-color: blue; 
}


.brandimage {
  height: 70px;
  width: 70px;
}

</style>

