import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import naive from "naive-ui";
import "./assets/main.css";
import "./assets/tailwind.css";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store";

const app = createApp(App);
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
app.use(router);
app.use(naive);
app.use(store);
app.use(VueAxios, { $http: axios });

app.provide("$http", app.config.globalProperties.$http);

app.mount("#app");
