<template>
  <footer class="bg-black text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="space-y-4">
          <h3 class="text-xl font-bold">Charging Station Finder</h3>
          <p class="text-gray-400">Empowering the future of sustainable transportation through accessible charging solutions.</p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Find Stations</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Add Station</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">About Us</a></li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Support</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Stay Updated</h4>
          <p class="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
          <div class="flex">
            <input type="email" placeholder="Enter your email" class="px-4 py-2 w-full bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-white">
            <button class="bg-white text-black px-4 py-2 rounded-r-lg hover:bg-gray-200 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400">© 2025 Charging Station Finder. All rights reserved.</p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-gray-400 hover:text-white transition-colors">
            <span class="sr-only">Twitter</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition-colors">
            <span class="sr-only">LinkedIn</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Component logic can be added here if needed
</script> 