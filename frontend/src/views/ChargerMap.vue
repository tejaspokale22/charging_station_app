<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">Map View (Dummy)</h2>
      <p>This would show chargers on a map.</p>
      <ul>
        <li v-for="marker in markers" :key="marker.id">
          📍 {{ marker.name }} ({{ marker.lat }}, {{ marker.lng }})
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  const markers = [
    { id: 1, name: 'EV A', lat: 12.97, lng: 77.59 },
    { id: 2, name: 'EV B', lat: 13.01, lng: 77.65 },
  ];
  </script>
  