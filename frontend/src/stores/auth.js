import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    email: localStorage.getItem("email") || null,
    isAuthenticated: !!localStorage.getItem("token"),
  }),

  actions: {
    async login(credentials) {
      try {
        const response = await axios.post("/api/auth/login", credentials);
        this.setAuth(response.data);
        return response;
      } catch (error) {
        throw error;
      }
    },

    setAuth(data) {
      this.token = data.token;
      this.email = data.email;
      this.isAuthenticated = true;
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
    },

    logout() {
      this.token = null;
      this.email = null;
      this.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});
