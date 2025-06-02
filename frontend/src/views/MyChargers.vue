<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">My Chargers</h2>
      <ul>
        <li v-for="charger in myChargers" :key="charger._id" class="border p-3">
          {{ charger.name }} ({{ charger.status }})
          <button class="ml-2 text-blue-500">Edit</button>
          <button class="ml-2 text-red-500">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  const myChargers = [
    { _id: 'u1', name: 'My EV Charger 1', status: 'Active' },
    { _id: 'u2', name: 'My EV Charger 2', status: 'Inactive' },
  ];
  </script>
  