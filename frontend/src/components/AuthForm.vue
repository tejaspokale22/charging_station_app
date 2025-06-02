<template>
  <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">{{ title }}</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="space-y-2">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-0 focus:ring-black"
          placeholder="john@example.com"
        />
      </div>

      <div class="space-y-2">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          v-model="formData.password"
          type="password"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-0 focus:ring-black"
          placeholder="••••••••"
        />
      </div>

      <div v-if="isRegister" class="space-y-2">
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          id="confirmPassword"
          v-model="formData.confirmPassword"
          type="password"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-0 focus:ring-black"
          placeholder="••••••••"
        />
      </div>

      <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
        {{ error }}
      </div>

      <button
        type="submit"
        class="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 cursor-pointer"
        :disabled="loading"
      >
        <span v-if="loading" class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
        <span v-else>{{ submitText }}</span>
      </button>

      <p class="text-center text-sm text-gray-600">
        {{ isRegister ? 'Already have an account?' : "Don't have an account?" }}
        <router-link
          :to="isRegister ? '/login' : '/register'"
          class="text-gray-600 hover:underline font-medium"
        >
          {{ isRegister ? 'Login' : 'Register' }}
        </router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AuthForm',
  props: {
    isRegister: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    title() {
      return this.isRegister ? 'Create Account' : 'Log in'
    },
    submitText() {
      return this.isRegister ? 'Register' : 'Login'
    }
  },
  methods: {
    handleSubmit() {
      if (this.isRegister && this.formData.password !== this.formData.confirmPassword) {
        this.$emit('error', 'Passwords do not match')
        return
      }
      this.$emit('submit', { ...this.formData })
    }
  }
}
</script> 