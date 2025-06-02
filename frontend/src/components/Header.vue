<template>
  <header class="fixed w-full bg-white/90 backdrop-blur-md border-b border-gray-300 z-50">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <RouterLink to="/" class="text-2xl font-bold text-black">
            CSF
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <RouterLink to="/" class="text-gray-600 hover:text-black transition-colors font-medium">Home</RouterLink>
          <RouterLink to="/chargers" class="text-gray-600 hover:text-black transition-colors font-medium">Chargers</RouterLink>
          <RouterLink to="/map" class="text-gray-600 hover:text-black transition-colors font-medium">Map</RouterLink>
          <RouterLink to="/my-chargers" class="text-gray-600 hover:text-black transition-colors font-medium">My Chargers</RouterLink>
          <RouterLink to="/create-charger" class="text-gray-600 hover:text-black transition-colors font-medium">Create</RouterLink>
        </nav>

        <!-- Auth Buttons -->
        <div class="hidden md:flex items-center space-x-4">
          <RouterLink to="/login" class="text-gray-600 hover:text-black transition-colors font-medium">
            Login
          </RouterLink>
          <RouterLink to="/register" class="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all duration-300 transform">
            Register
          </RouterLink>
        </div>

        <!-- Mobile Menu Button -->
        <button class="md:hidden text-gray-600 hover:text-black transition-colors" @click="toggleMobileMenu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden mt-4 py-4 border-t border-gray-100">
        <nav class="flex flex-col space-y-4">
          <RouterLink to="/" class="text-gray-600 hover:text-black transition-colors font-medium">Home</RouterLink>
          <RouterLink to="/chargers" class="text-gray-600 hover:text-black transition-colors font-medium">Chargers</RouterLink>
          <RouterLink to="/map" class="text-gray-600 hover:text-black transition-colors font-medium">Map</RouterLink>
          <RouterLink to="/my-chargers" class="text-gray-600 hover:text-black transition-colors font-medium">My Chargers</RouterLink>
          <RouterLink to="/create-charger" class="text-gray-600 hover:text-black transition-colors font-medium">Create</RouterLink>
          <div class="flex flex-col space-y-2 pt-4 border-t border-gray-100">
            <RouterLink to="/login" class="text-gray-600 hover:text-black transition-colors font-medium text-left">
              Login
            </RouterLink>
            <RouterLink to="/register" class="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all duration-300 text-center">
              Register
            </RouterLink>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script> 