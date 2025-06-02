<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <AuthForm :loading="loading" :error="error" @submit="handleLogin" />
    </div>
  </div>
</template>

<script>
import AuthForm from "../components/AuthForm.vue";
import { useToast } from "vue-toastification";
import { useAuthStore } from '../stores/auth';

export default {
  name: "Login",
  components: {
    AuthForm,
  },
  setup() {
    const toast = useToast();
    const authStore = useAuthStore();
    return { toast, authStore };
  },
  data() {
    return {
      loading: false,
      error: "",
    };
  },
  methods: {
    async handleLogin(formData) {
      this.loading = true;
      this.error = "";

      try {
        await this.authStore.login({
          email: formData.email,
          password: formData.password,
        });
        
        this.toast.success("Login successful!");
        this.$router.push("/");
      } catch (err) {
        this.error =
          err.response?.data?.message || "Failed to login. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
