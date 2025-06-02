<template>
  <div class="container mx-auto px-4 py-8 pt-24">
    <div class="bg-white rounded-md p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Charging Stations Map View</h2>
      <div id="map" class="h-[400px] w-full rounded-lg"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'ChargerMap',
  data() {
    return {
      map: null,
      chargers: []
    };
  },
  async mounted() {
    try {
      const response = await axios.get('/api/chargers');
      console.log('Chargers data:', response.data);
      this.chargers = response.data;
      this.initMap();
      this.addMarkers();
    } catch (error) {
      console.error('Error fetching chargers:', error);
    }
  },
  methods: {
    initMap() {
      // Center the map (default to Bengaluru)
      this.map = L.map('map').setView([12.9716, 77.5946], 12);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);
    },
    addMarkers() {
      this.chargers.forEach(charger => {
        // Check if location data exists and has valid coordinates
        if (charger.location && charger.location.latitude && charger.location.longitude) {
          const marker = L.marker([charger.location.latitude, charger.location.longitude]).addTo(this.map);

          const popupContent = `
            <div class="p-2">
              <strong class="text-lg">${charger.name}</strong><br>
              <div class="mt-2">
                <b>Status:</b> ${charger.status}<br>
                <b>Power:</b> ${charger.powerOutput} kW<br>
                <b>Connector:</b> ${charger.connectorType}<br>
                <a href="https://www.google.com/maps?q=${charger.location.latitude},${charger.location.longitude}" 
                   target="_blank" 
                   class="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                  Open in Google Maps
                </a>
              </div>
            </div>
          `;
          marker.bindPopup(popupContent);
        } else {
          console.warn('Invalid location data for charger:', charger);
        }
      });

      // Fit map bounds to show all markers if there are any
      if (this.chargers.length > 0) {
        const markers = this.chargers
          .filter(charger => charger.location && charger.location.latitude && charger.location.longitude)
          .map(charger => [charger.location.latitude, charger.location.longitude]);
        
        if (markers.length > 0) {
          const bounds = L.latLngBounds(markers);
          this.map.fitBounds(bounds, { padding: [50, 50] });
        }
      }
    }
  }
};
</script>

<style scoped>
#map {
  height: 500px;
  width: 100%;
}

:deep(.leaflet-popup-content-wrapper) {
  border-radius: 0.5rem;
  padding: 0;
}

:deep(.leaflet-popup-content) {
  margin: 0;
}

:deep(.leaflet-popup-tip) {
  background: white;
}
</style>
