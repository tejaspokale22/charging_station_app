<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">Create Charger</h2>
      <form class="space-y-3">
        <input type="text" placeholder="Name" class="input" />
        <input type="number" placeholder="Power Output (kW)" class="input" />
        <input type="text" placeholder="Connector Type" class="input" />
        <input type="text" placeholder="Latitude" class="input" />
        <input type="text" placeholder="Longitude" class="input" />
        <select class="input">
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  </template>
  