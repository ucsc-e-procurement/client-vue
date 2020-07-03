<template>
  <v-container class="fill-height" fluid>
    <!-- Page's Background Image -->
    <div class="bg"></div>

    <!-- App Bar -->
    <v-app-bar app color="primary" dark>
      <v-avatar tile>
        <v-img :src="require('../../assets/UCSC_Logo.png')"></v-img>
      </v-avatar>
      <v-toolbar-title class="pl-5">E-Procurement Login</v-toolbar-title>
      <v-spacer />
      <v-btn outlined>Register As a Supplier</v-btn>
    </v-app-bar>

    <!-- Centered Card with Login Form -->
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-card-title>Login Portal</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-5">
            <v-form>
              <v-text-field
                v-model="email"
                label="Email"
                name="login"
                append-icon="mdi-account"
                outlined
                type="text"
              ></v-text-field>

              <v-text-field
                v-model="password"
                id="password"
                label="Password"
                name="password"
                append-icon="mdi-lock"
                outlined
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions class="pl-2">
            <v-btn small text>Forget Password ?</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="login" color="primary">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";

/*

// Validation Library - Vuelidate
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

*/

/* Note: When Declaring Variables, always think about how Form Validation Rules are applied */
export default {
  // Mixins
  // mixins: [validationMixin],

  // Form Validations
  // validations: {},

  // Props Received
  props: [],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    email: "",
    password: ""
  }),

  // Custom Methods and Functions
  methods: {
    getData() {
      // http://localhost:3000/api/get/get_uers
      this.$http
        .get("/api/get_users")
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    },
    login() {
      let username = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { username, password })
        .then(role => {
          console.log("I'm Here");
          // Navigate to the Pages Based on User Role
          switch (role) {
            case "admin":
              this.$router.push("/admin");

              break;

            default:
              break;
          }
        })
        .catch(err => console.log(err));
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},

  // Computed Properties
  computed: {}
};
</script>

// Custom CSS Rules and Classes
<style scoped>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("../../assets/ucsc.jpg") no-repeat center center;
  background-size: cover;

  transform: scale(1);
}
</style>
