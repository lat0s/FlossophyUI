<template>
    <div class="not-found-container">
        <h1>Error</h1>
        <img src="@/assets/notfound.png" alt="Not Found Picture">
        <h1>Page Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        
    </div>
</template>

<script setup>
</script>

<style scoped>
.not-found-container {
    text-align: center;
    padding: 50px;
}

.not-found-container h1 {
    font-size: 2em;
    margin-bottom: 20px;
}

.not-found-container img {
    max-width: 100%;
    height: auto;
    max-height: 400px;
}
</style>
