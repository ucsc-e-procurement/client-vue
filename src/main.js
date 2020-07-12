import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Axios from "axios";

Vue.config.productionTip = false;

// Global Axios Configurations
Vue.prototype.$http = Axios.create({
  baseURL: "http://localhost:5000"
});

// Setting Up Authorization Headers

const token = localStorage.getItem("token");
// console.log("main.js => loactStorage Check: ", token);
if (token) {
  Vue.prototype.$http.defaults.headers.common[
    "authorization"
  ] = `Bearer ${token}`;

  store
    .dispatch("setUserFromToken", token)
    .then(() => {
      console.log("User Set Successfully");
    })
    .catch(err => {
      console.log(err);
    });
}
// console.log(
//   "main.js => Axios Auth Header: ",
//   Vue.prototype.$http.defaults.headers.common["authorization"]
// );

// Event Bus
export const bus = new Vue();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
