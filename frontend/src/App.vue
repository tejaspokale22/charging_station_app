<template>
  <!-- Header -->
  <Header />
  <RouterView class="min-h-screen pt-16 bg-white"/>
  <!-- Footer -->
  <Footer />
</template>

<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

