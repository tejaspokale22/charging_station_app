<template>
  <div class="w-full mx-auto px-4 py-14 pt-24">
    <h2 class="text-3xl font-bold mb-8 text-gray-900 text-center">Charging Stations</h2>
    
    <!-- Filter Bar -->
    <div class="flex flex-wrap gap-4 mb-8 justify-center">
      <!-- Status Filter -->
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium text-gray-700">Status:</label>
        <select 
          v-model="filters.status" 
          class="rounded-md border-gray-300 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
          @change="applyFilters"
        >
          <option value="">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <!-- Power Output Filter -->
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium text-gray-700">Power Output:</label>
        <select 
          v-model="filters.powerOutput" 
          class="rounded-md border-gray-300 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
          @change="applyFilters"
        >
          <option value="">All</option>
          <option value="7">7 kW</option>
          <option value="11">11 kW</option>
          <option value="22">22 kW</option>
          <option value="50">50 kW</option>
          <option value="150">150 kW</option>
        </select>
      </div>

      <!-- Connector Type Filter -->
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium text-gray-700">Connector:</label>
        <select 
          v-model="filters.connectorType" 
          class="rounded-md border-gray-300 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
          @change="applyFilters"
        >
          <option value="">All</option>
          <option value="Type 2">Type 2</option>
          <option value="CCS">CCS</option>
          <option value="CHAdeMO">CHAdeMO</option>
          <option value="Tesla">Tesla</option>
        </select>
      </div>

      <!-- Reset Filters Button -->
      <button 
        @click="resetFilters"
        class="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        Reset Filters
      </button>
    </div>
    
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <Spinner/>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      {{ error }}
    </div>  

    <!-- Grid Layout -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="charger in filteredChargers" :key="charger._id" 
           class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <div class="p-8">
          <div class="flex justify-between items-start mb-6">
            <h3 class="text-2xl font-semibold text-gray-900">{{ charger.name }}</h3>
            <span :class="[
              'px-4 py-1.5 rounded-full text-sm font-medium',
              charger.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            ]">
              {{ charger.status }}
            </span>
          </div>
          
          <div class="space-y-4">
            <div class="flex items-center text-gray-700">
              <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <a 
                :href="`https://www.google.com/maps?q=${charger.location.latitude},${charger.location.longitude}`"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-600 hover:text-gray-800 hover:underline cursor-pointer text-lg"
              >
                View on Google Maps
              </a>
            </div>
            
            <div class="flex items-center text-gray-700">
              <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <span class="text-lg">{{ charger.powerOutput }} kW</span>
            </div>
            
            <div class="flex items-center text-gray-700">
              <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
              </svg>
              <span class="text-lg">{{ charger.connectorType }}</span>
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
      allChargers: [], // Store all chargers
      loading: true,
      error: null,
      filters: {
        status: '',
        powerOutput: '',
        connectorType: ''
      }
    };
  },
  computed: {
    filteredChargers() {
      return this.chargers.filter(charger => {
        const statusMatch = !this.filters.status || charger.status === this.filters.status;
        const powerMatch = !this.filters.powerOutput || charger.powerOutput === parseInt(this.filters.powerOutput);
        const connectorMatch = !this.filters.connectorType || charger.connectorType === this.filters.connectorType;
        
        return statusMatch && powerMatch && connectorMatch;
      });
    }
  },
  async created() {
    try {
      const response = await axios.get('/api/chargers');
      this.allChargers = response.data;
      this.chargers = response.data;
    } catch (err) {
      this.error = 'Failed to load charging stations. Please try again later.';
      console.error('Error fetching chargers:', err);
    } finally {
      this.loading = false; 
    }
  },
  methods: {
    applyFilters() {
      // The filtering is handled by the computed property
    },
    resetFilters() {
      this.filters = {
        status: '',
        powerOutput: '',
        connectorType: ''
      };
    }
  }
};
</script>

<style scoped>
select {
  min-width: 120px;
  background-color: white;
  cursor: pointer;
}
</style>

  