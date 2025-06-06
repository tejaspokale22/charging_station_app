import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "leaflet/dist/leaflet.css";
import axios from "axios";

import "./style.css";

// Configure axios base URL
axios.defaults.baseURL = "https://charging-station-app-4usl.onrender.com";

const app = createApp(App);
const pinia = createPinia();

// Toast configuration
const toastOptions = {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
};

app.use(router);
app.use(pinia);
app.use(Toast, toastOptions);
app.mount("#app");
