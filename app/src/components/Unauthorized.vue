<template>
  <div class="no-access-container">
    <h1>Error</h1>
    <img class="image401" src="@/assets/stop.png" alt="Not Found Picture" />
    <h1>Unauthorized</h1>
    <p>The page you're looking for is only available to authorized users.</p>
    <p>Please try again after logging in.</p>
  </div>
</template>

<script setup></script>

<style scoped>
  .image401 {
    margin-right: 48px;
  }
  .no-access-container {
    text-align: center;
    padding: 50px;
  }

  .no-access-container h1 {
    font-size: 2em;
    margin-bottom: 20px;
  }

  .no-access-container img {
    max-width: 100%;
    height: auto;
    max-height: 400px;
  }
</style>
