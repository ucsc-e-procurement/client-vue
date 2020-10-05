import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import jwtDecode from "jwt-decode";

Vue.use(Vuex);

const baseURL = "http://localhost:5000";

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
    internal: null
  },
  /*
   * Mutators are used to change the state of a vuex store
   */
  mutations: {
    authRequest(state) {
      state.status = "loading";
    },
    authSuccess(state, data) {
      //console.log("State::::::::::::::", state, data);

      state.status = "success";
      state.token = data.token;
      state.user = data.user;
    },
    authError(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
    setInternal(state, internalState) {
      //console.log("Setting Internal State: ", internalState);
      state.internal = internalState;
    }
  },
  /*
   * Actions are used to commit mutations to the vuex store
   */
  actions: {
    // Login Handler
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("authRequest");
        // Sending HTTP request to the server
        axios
          .post(`${baseURL}/api/auth/login`, user)
          .then(res => {
            console.log("Res ", res.data);
            if (res.status === 200) {
              const token = res.data.token;

              // Storing the Token in the Local Storage
              localStorage.setItem("token", token);

              // Setting Axios Request Authorization Header
              axios.defaults.headers.common[
                "authorization"
              ] = `Bearer ${token}`;

              const decodedJWTtoken = jwtDecode(token);
              //console.log("Decoded ::::::::::::", decodedJWTtoken.user);
              commit("authSuccess", { token, user: decodedJWTtoken.user });
              commit(
                "setInternal",
                decodedJWTtoken.user.user_role != "supplier" ? true : false
              );

              resolve(decodedJWTtoken.user.user_role);
            } else {
              commit("authError");
              localStorage.removeItem("token");
              reject(res.data.error_message);
            }
          })
          .catch(err => {
            commit("authError");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },

    // Logout Handler
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["authorization"];
        resolve();
      });
    },

    // Set User from Token
    setUserFromToken({ commit }, token) {
      return new Promise((resolve, reject) => {
        try {
          const decodedJWTtoken = jwtDecode(token);
          commit("authSuccess", { token, user: decodedJWTtoken.user });
          commit(
            "setInternal",
            decodedJWTtoken.user.user_role != "supplier" ? true : false
          );
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    }
  },
  modules: {},

  /*
   * We use getter to get the value of the attributes of vuex state.
   * The role of our getter in the situation is to separate application
   * data from application logic and ensure we do not give away
   * sensitive information.
   */
  getters: {
    // isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    // userRole: state => state.user.user_role,
    // isInternal: state => state.internal,
    userId: state => state.user.user_id,
    employeeId: state => state.user.employee_id,
    user: state => state.user,

    // Development Purposes Only - ByPass Login
    isLoggedIn: () => true,
    isInternal: () => true,
    userRole: () => "AB"
  }
});
