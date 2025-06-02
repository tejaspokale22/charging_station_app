<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-6">
        <div class="max-w-5xl mx-auto text-center">
          <h1 class="text-7xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Charging Station Finder
          </h1>
          <p class="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Find, create, and manage EV charging stations effortlessly. Join the future of sustainable transportation with our comprehensive charging network.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-6">
            <button class="bg-black text-white px-10 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Find Nearby Stations
            </button>
            <button class="bg-white text-black border-2 border-gray-200 px-10 py-4 rounded-xl font-semibold hover:border-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Add Your Station
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-24 bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-20">
          <h2 class="text-4xl font-bold mb-4">Why Choose Us</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Experience the most comprehensive and user-friendly EV charging network management platform.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-12">
          <div class="group p-8 rounded-2xl bg-gray-50 hover:bg-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100">
            <div class="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🔍</div>
            <h3 class="text-2xl font-semibold mb-4">Smart Search</h3>
            <p class="text-gray-600 leading-relaxed">Find the perfect charging station with our intelligent search system and real-time availability updates.</p>
          </div>
          <div class="group p-8 rounded-2xl bg-gray-50 hover:bg-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100">
            <div class="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">➕</div>
            <h3 class="text-2xl font-semibold mb-4">Easy Management</h3>
            <p class="text-gray-600 leading-relaxed">Add and manage your charging stations with our intuitive dashboard and comprehensive analytics.</p>
          </div>
          <div class="group p-8 rounded-2xl bg-gray-50 hover:bg-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100">
            <div class="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">⚡</div>
            <h3 class="text-2xl font-semibold mb-4">Real-time Updates</h3>
            <p class="text-gray-600 leading-relaxed">Stay informed with live status updates, charging progress, and network-wide analytics.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-24 bg-gray-900 text-white">
      <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-3 gap-12 text-center">
          <div class="p-8 border border-gray-800 rounded-2xl hover:bg-gray-800 transition-colors duration-300">
            <div class="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">1000+</div>
            <div class="text-gray-400 text-xl">Active Stations</div>
          </div>
          <div class="p-8 border border-gray-800 rounded-2xl hover:bg-gray-800 transition-colors duration-300">
            <div class="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">50+</div>
            <div class="text-gray-400 text-xl">Cities Covered</div>
          </div>
          <div class="p-8 border border-gray-800 rounded-2xl hover:bg-gray-800 transition-colors duration-300">
            <div class="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">10k+</div>
            <div class="text-gray-400 text-xl">Users</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-white">
      <div class="container mx-auto px-6">
        <div class="bg-gray-900 rounded-3xl p-16 text-center text-white relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-90"></div>
          <div class="relative">
            <h2 class="text-5xl font-bold mb-6">Ready to Power Up?</h2>
            <p class="text-gray-300 text-xl mb-12 max-w-2xl mx-auto">Join thousands of EV owners who trust us for their charging needs. Start your journey today.</p>
            <button class="bg-white text-black px-12 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
  