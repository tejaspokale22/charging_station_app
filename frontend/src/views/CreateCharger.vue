<template>
  <div class="min-h-screen flex justify-center items-center bg-gray-50 py-6 px-4 pt-24">
    <div class="bg-white p-6 rounded-md w-full max-w-lg border border-gray-300">
      <h1 class="text-xl font-bold text-gray-800 mb-10 text-center">Create Charging Station</h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-1.5">
          <label for="name" class="block text-sm font-medium text-gray-700">Charging Station Name</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            required
            placeholder="Enter station name"
            class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-sm font-medium text-gray-700">Location Coordinates</label>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                step="any"
                v-model="formData.location.latitude"
                required
                placeholder="Latitude"
                class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
              />
            </div>
            <div>
              <input
                type="number"
                step="any"
                v-model="formData.location.longitude"
                required
                placeholder="Longitude"
                class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
              />
            </div>
          </div>
          <p class="text-sm text-gray-500 mt-2">
            To get coordinates: 
            1. Open Google Maps
            2. Right-click on your location
            3. Copy the coordinates from the URL (numbers after @ symbol)
            4. Paste them here
          </p>
        </div>

        <div class="space-y-1.5">
          <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            v-model="formData.status"
            required
            class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors [&>option]:bg-black [&>option]:text-white [&>option]:hover:bg-gray-800 [&>option]:focus:bg-black [&>option]:active:bg-black"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div class="space-y-1.5">
          <label for="powerOutput" class="block text-sm font-medium text-gray-700">Power Output (kW)</label>
          <input
            type="number"
            id="powerOutput"
            v-model="formData.powerOutput"
            required
            min="1"
            placeholder="Enter power output in kW"
            class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
          />
        </div>

        <div class="space-y-1.5">
          <label for="connectorType" class="block text-sm font-medium text-gray-700">Connector Type</label>
          <input
            type="text"
            id="connectorType"
            v-model="formData.connectorType"
            required
            placeholder="Enter connector type"
            class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-gray-800 text-white py-2.5 px-4 rounded-md font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors cursor-pointer"
        >
          Create Charging Station
        </button>
      </form>
    </div>
    <!-- Toast Notification -->
    <div
      v-if="showToast"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg transition-opacity duration-300"
      :class="{ 'opacity-0': !showToast }"
    >
      Charging station created successfully!
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'CreateCharger',
  setup() {
    const router = useRouter();
    const showToast = ref(false);
    const formData = ref({
      name: '',
      location: {
        latitude: null,
        longitude: null
      },
      status: 'Active',
      powerOutput: null,
      connectorType: ''
    });

    const handleSubmit = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await axios.post('/api/chargers', formData.value, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.data) {
          showToast.value = true;
          setTimeout(() => {
            showToast.value = false;
            router.push('/my-chargers');
          }, 2000);
        }
      } catch (error) {
        console.error('Error creating charger:', error);
        if (error.response?.status === 401) {
          router.push('/login');
        }
      }
    };

    return {
      formData,
      showToast,
      handleSubmit
    };
  }
};
</script>
