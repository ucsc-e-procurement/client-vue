import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Axios from "axios";

Vue.config.productionTip = false;

// Global Axios Configurations
Vue.prototype.$http = Axios.create({
  baseURL: "http://localhost:5001",
});

// Event Bus
export const bus = new Vue();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
