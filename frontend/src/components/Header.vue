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
          <template v-if="token">
            <RouterLink to="/my-chargers" class="text-gray-600 hover:text-black transition-colors font-medium">My Chargers</RouterLink>
            <RouterLink to="/create-charger" class="text-gray-600 hover:text-black transition-colors font-medium">Create</RouterLink>
          </template>
        </nav>

        <!-- Auth Buttons / Profile -->
        <div class="hidden md:flex items-center space-x-4">
          <template v-if="!token">
            <RouterLink to="/login" class="text-gray-600 hover:text-black transition-colors font-medium">
              Login
            </RouterLink>
            <RouterLink to="/register" class="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all duration-300 transform">
              Register
            </RouterLink>
          </template>
          <template v-else>
            <div class="relative">
              <button 
                @click="toggleProfileMenu" 
                class="flex items-center space-x-2 text-gray-600 hover:text-black transition-all duration-300 group"
              >
                <span class="hidden lg:block text-sm font-medium cursor-pointer">{{ email }}</span>
                <svg class="w-4 h-4 transition-transform duration-300" :class="{ 'rotate-180': isProfileMenuOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <!-- Profile Dropdown -->
              <div 
                v-if="isProfileMenuOpen" 
                class="absolute right-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 transform transition-all duration-300 origin-top-right"
              >
                <div>
                  <RouterLink to="/my-chargers" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    My Chargers
                  </RouterLink>
                </div>
                <div class="border-t border-gray-100">
                  <button 
                    @click="handleLogout" 
                    class="cursor-pointer flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </template>
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
          <template v-if="token">
            <RouterLink to="/my-chargers" class="text-gray-600 hover:text-black transition-colors font-medium">My Chargers</RouterLink>
            <RouterLink to="/create-charger" class="text-gray-600 hover:text-black transition-colors font-medium">Create</RouterLink>
          </template>
          <div class="flex flex-col space-y-2 pt-4 border-t border-gray-100">
            <template v-if="!token">
              <RouterLink to="/login" class="text-gray-600 hover:text-black transition-colors font-medium text-left">
                Login
              </RouterLink>
              <RouterLink to="/register" class="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all duration-300 text-center">
                Register
              </RouterLink>
            </template>
            <template v-else>
              <div class="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                {{ email }}
              </div>
              <button 
                @click="handleLogout" 
                class="text-left text-gray-600 hover:text-black transition-colors font-medium"
              >
                Logout
              </button>
            </template>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const isMobileMenuOpen = ref(false);
const isProfileMenuOpen = ref(false);

// Get token and email from auth store
const token = computed(() => authStore.token);
const email = computed(() => authStore.email || 'User');

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

const handleLogout = () => {
  authStore.logout();
  toast.success('Logged out successfully');
  router.push('/login');
  isProfileMenuOpen.value = false;
};

// Close profile menu when clicking outside
const handleClickOutside = (event) => {
  if (isProfileMenuOpen.value && !event.target.closest('.relative')) {
    isProfileMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script> 