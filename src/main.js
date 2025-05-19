import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fontsource/merriweather"; // version normale (400)
import "@fontsource/poetsen-one";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");
