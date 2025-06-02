<template>
  <div class="container mx-auto px-4 py-14 pt-24">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">
        Update Station Details
      </h2>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <Spinner />
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
      >
        {{ error }}
      </div>

      <!-- Edit Form -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Station Name</label
          >
          <input
            type="text"
            id="name"
            v-model="formData.name"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50 text-lg py-3 px-4"
          />
        </div>

        <!-- Location -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Location</label
          >
          <div class="mt-1 grid grid-cols-2 gap-4">
            <div>
              <label for="latitude" class="block text-xs text-gray-500"
                >Latitude</label
              >
              <input
                type="number"
                id="latitude"
                v-model="formData.location.latitude"
                step="any"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50 text-lg py-3 px-4"
              />
            </div>
            <div>
              <label for="longitude" class="block text-xs text-gray-500"
                >Longitude</label
              >
              <input
                type="number"
                id="longitude"
                v-model="formData.location.longitude"
                step="any"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50 text-lg py-3 px-4"
              />
            </div>
          </div>
        </div>

        <!-- Power Output -->
        <div>
          <label
            for="powerOutput"
            class="block text-sm font-medium text-gray-700"
            >Power Output (kW)</label
          >
          <input
            type="number"
            id="powerOutput"
            v-model="formData.powerOutput"
            min="1"
            step="1"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50 text-lg py-3 px-4"
          />
        </div>

        <!-- Connector Type -->
        <div>
          <label
            for="connectorType"
            class="block text-sm font-medium text-gray-700"
            >Connector Type</label
          >
          <input
            type="text"
            id="connectorType"
            v-model="formData.connectorType"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50 text-lg py-3 px-4"
          />
        </div>

        <!-- Status -->
        <div>
          <label for="status" class="block text-sm font-medium text-gray-700"
            >Status</label
          >
          <select
            id="status"
            v-model="formData.status"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50 text-lg py-3 px-4"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end gap-4">
          <button
            type="button"
            @click="router.back()"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Update Station
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import Spinner from "../components/Spinner.vue";
import { useToast } from "vue-toastification";

export default {
  name: "EditCharger",
  components: {
    Spinner,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const loading = ref(true);
    const error = ref(null);
    const formData = ref({
      name: "",
      location: {
        latitude: "",
        longitude: "",
      },
      powerOutput: "",
      connectorType: "",
      status: "",
    });

    const fetchCharger = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await axios.get(`/api/chargers/${route.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.data) {
          throw new Error("No data received from server");
        }

        // Pre-fill form with existing data
        formData.value = {
          name: response.data.name,
          location: {
            latitude: response.data.location.latitude,
            longitude: response.data.location.longitude,
          },
          powerOutput: response.data.powerOutput.toString(),
          connectorType: response.data.connectorType,
          status: response.data.status,
        };
      } catch (err) {
        console.error("Error fetching charger:", err);
      } finally {
        loading.value = false;
      }
    };

    const handleSubmit = async () => {
      loading.value = true;
      try {
        const token = localStorage.getItem("token");
        await axios.put(`/api/chargers/${route.params.id}`, formData.value, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Charging station updated successfully");
        router.push("/my-chargers");
      } catch (err) {
        console.error("Error updating charger:", err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchCharger();
    });

    return {
      router,
      loading,
      error,
      formData,
      handleSubmit,
    };
  },
};
</script>
