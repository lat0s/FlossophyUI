<template>
  <div class="home-container">
    <BContainer>
      <BRow class="justify-content-md-center">
        <BCol md="8">
          <h1>Welcome to the Home Page</h1>
          <p>This is the main hub of our application. Explore and enjoy!</p>
        </BCol>
      </BRow>
    </BContainer>
  </div>
</template>

<script setup lang="ts">

import { BContainer, BRow, BCol } from 'bootstrap-vue-next';
</script>
<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 73vh;
  text-align: center;
  background-color: #f5f5f5; 
  padding: 20px;
}

h1 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px; 
}

p {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 20px; 
}

</style>

