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
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "Login",
  components: {
    AuthForm,
  },
  setup() {
    const toast = useToast();
    return { toast };
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
        const response = await axios.post("/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        if (response) {
          this.toast.success("Login successful!");
          localStorage.setItem("token", response.data.token);
        }

        // Redirect to home page
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
