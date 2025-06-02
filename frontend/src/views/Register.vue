<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <AuthForm :is-register="true" :loading="loading" :error="error" @submit="handleRegister" />
    </div>
  </div>
</template>

<script>
import AuthForm from '../components/AuthForm.vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export default {
  name: 'Register',
  components: {
    AuthForm
  },
  setup() {
    const toast = useToast()
    return { toast }
  },
  data() {
    return {
      loading: false,
      error: ''
    }
  },
  methods: {
    async handleRegister(formData) {
      this.loading = true
      this.error = ''

      try {
        const response = await axios.post('/api/auth/register', {
          email: formData.email,
          password: formData.password
        })

        if (response) {
          this.toast.success("Registration successful!")
        }

        // Redirect to home page
        this.$router.push('/')
      } catch (err) {
        this.error = 'Failed to register. Please try again.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>