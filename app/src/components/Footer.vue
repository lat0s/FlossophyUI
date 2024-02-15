<template>
    <BContainer fluid id="footer" class="text-center py-3">
        <p class="footer-text">Flossophy</p>
        <p>A distributed systems project, made by Group 5</p>
        <div class="links">
            
            <img src="../assets/gitlab.png" href="https://git.chalmers.se/courses/dit355/2023/student-teams/dit356-2023-05" class="gitlab">
        </div>
    </BContainer>
</template>


<script setup>
import { ref } from 'vue';
</script>


<style>
#footer {
    background: rgb(172, 173, 240)!important;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1)!important;
    backdrop-filter: blur(11.3px)!important;
    -webkit-backdrop-filter: blur(11.3px)!important;
    border: 1px solid rgba(172, 173, 240, 0.6)!important;
    color: #fff; 
    position: relative;
    top: 59vh;
}

.footer-text {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.image {
    height: 60px;
    width: 60px;
}
.gitlab {
    height: 20px;
    width: 20px;
}
.links a {
    color: #fff; /* Adjust link color as needed */
    text-decoration: none;
}

.links a:hover {
    text-decoration: underline;
}

    
</style>