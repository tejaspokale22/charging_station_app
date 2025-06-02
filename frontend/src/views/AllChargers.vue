<template>
  <div class="container mx-auto px-4 py-14">
    <h2 class="text-3xl font-bold mb-8 text-gray-900 text-center">Charging Stations</h2>
    
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <Spinner :overlay="true" />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      {{ error }}
    </div>

    <!-- Grid Layout -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="charger in chargers" :key="charger._id" 
           class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <div class="h-48 overflow-hidden">
          <img 
            src="/chargingStation.jpeg"
            :alt="charger.name"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-xl font-semibold text-gray-900">{{ charger.name }}</h3>
            <span :class="[
              'px-3 py-1 rounded-full text-sm font-medium',
              charger.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            ]">
              {{ charger.status }}
            </span>
          </div>
          
          <div class="space-y-3">
            <div class="flex items-center text-gray-700">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>{{ charger.location.latitude.toFixed(4) }}, {{ charger.location.longitude.toFixed(4) }}</span>
            </div>
            
            <div class="flex items-center text-gray-700">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <span>{{ charger.powerOutput }} kW</span>
            </div>
            
            <div class="flex items-center text-gray-700">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
              </svg>
              <span>{{ charger.connectorType }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Spinner from '../components/Spinner.vue';

export default {
  name: 'AllChargers',
  components: {
    Spinner
  },
  data() {
    return {
      chargers: [],
      loading: true,
      error: null
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5000/api/chargers');
      this.chargers = response.data;
    } catch (err) {
      this.error = 'Failed to load charging stations. Please try again later.';
      console.error('Error fetching chargers:', err);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1280px;
}
</style>
  