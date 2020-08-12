import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Axios from "axios";

Vue.config.productionTip = false;

// -------------------------------------------------------------
// Global Axios Configurations
// -------------------------------------------------------------
Vue.prototype.$http = Axios.create({
  baseURL: "http://localhost:5000"
});
// #############################################################

// -------------------------------------------------------------
//                    Firebase Integration
// -------------------------------------------------------------
import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyCViZT2qSV1pHClsEv2BHTX7nBDMT9nAfA",
  authDomain: "ucsc-e-procurement.firebaseapp.com",
  databaseURL: "https://ucsc-e-procurement.firebaseio.com",
  projectId: "ucsc-e-procurement",
  storageBucket: "ucsc-e-procurement.appspot.com",
  messagingSenderId: "710042048062",
  appId: "1:710042048062:web:b7221e3573419bc0e3636f",
  measurementId: "G-SBWWXYS0V5"
};
// ##############################################################

// --------------------------------------------------------------
// Setting Up Authorization Headers
// --------------------------------------------------------------
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
// ##############################################################

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
  render: h => h(App),
  created() {
    firebase.initializeApp(firebaseConfig);
    console.log("main firebase: ", firebase);
  }
}).$mount("#app");
