<template>
  <div class="container mx-auto px-4 py-14 pt-28">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900 text-center ml-2">Manage Charging Stations</h2>
      <RouterLink 
        to="/create-charger" 
        class="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2 cursor-pointer"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add New Station
      </RouterLink>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <Spinner />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      {{ error }}
    </div>

    <!-- Empty State -->
    <div v-else-if="chargers.length === 0" class="text-center py-12">
      <div class="text-6xl mb-4">🔌</div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">No Charging Stations Yet</h3>
      <p class="text-gray-600 mb-6">Start by adding your first charging station</p>
      <RouterLink 
        to="/create-charger" 
        class="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-2 cursor-pointer"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add New Station
      </RouterLink>
    </div>

    <!-- Grid Layout -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="charger in chargers" :key="charger._id" 
           class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
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
              <a 
                :href="`https://www.google.com/maps?q=${charger.location.latitude},${charger.location.longitude}`"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-600 hover:text-gray-800 hover:underline cursor-pointer"
              >
                View on Google Maps
              </a>
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

          <!-- Action Buttons -->
          <div class="mt-6 flex gap-3">
            <button 
              @click="editCharger(charger)"
              class="flex-1 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              Edit
            </button>
            <button 
              @click="confirmDelete(charger)"
              class="flex-1 bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Confirm Delete</h3>
        <p class="text-gray-600 mb-6">Are you sure you want to delete this charging station? This action cannot be undone.</p>
        <div class="flex justify-end gap-3">
          <button 
            @click="showDeleteModal = false"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button 
            @click="deleteCharger"
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Spinner from '../components/Spinner.vue';
import { useToast } from 'vue-toastification';

export default {
  name: 'MyChargers',
  components: {
    Spinner
  },
  setup() {
    const router = useRouter();
    const toast = useToast();
    const chargers = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const showDeleteModal = ref(false);
    const selectedCharger = ref(null);

    const fetchChargers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await axios.get('/api/chargers/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        chargers.value = response.data;
      } catch (err) {
        error.value = 'Failed to load charging stations. Please try again later.';
        console.error('Error fetching chargers:', err);
        if (err.response?.status === 401) {
          router.push('/login');
        }
      } finally {
        loading.value = false;
      }
    };

    const editCharger = (charger) => {
      router.push(`/edit-charger/${charger._id}`);
    };

    const confirmDelete = (charger) => {
      selectedCharger.value = charger;
      showDeleteModal.value = true;
    };

    const deleteCharger = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/chargers/${selectedCharger.value._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        chargers.value = chargers.value.filter(c => c._id !== selectedCharger.value._id);
        showDeleteModal.value = false;
        selectedCharger.value = null;
        toast.success('Charging station deleted successfully');
      } catch (err) {
        toast.error('Failed to delete charging station');
        console.error('Error deleting charger:', err);
      }
    };

    onMounted(() => {
      fetchChargers();
    });

    return {
      chargers,
      loading,
      error,
      showDeleteModal,
      editCharger,
      confirmDelete,
      deleteCharger
    };
  }
};
</script>
