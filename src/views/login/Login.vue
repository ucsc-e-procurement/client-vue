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
      <v-btn @click="$router.push('/registration')" outlined
        >Register As a Supplier</v-btn
      >
    </v-app-bar>

    <!-- Centered Card with Login Form -->
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-progress-linear
            v-show="loaderLogin"
            indeterminate
            color="primary"
            rounded
          ></v-progress-linear>
          <v-card-title>Login Portal</v-card-title>
          <v-divider></v-divider>
          <v-row no-gutters class="px-4 pt-5">
            <v-col cols="12">
              <v-alert v-if="isLoginError" type="error" outlined border="left"
                >Invalid Email or Passwrod</v-alert
              >
            </v-col>
          </v-row>
          <v-card-text class="mt-5">
            <v-form>
              <v-text-field
                v-model="email"
                label="Email"
                name="login"
                append-icon="mdi-account"
                outlined
                type="text"
                :error-messages="emailErrors"
                @blur="$v.email.$touch()"
                @input="$v.email.$touch()"
              ></v-text-field>

              <v-text-field
                v-model="password"
                id="password"
                label="Password"
                name="password"
                append-icon="mdi-lock"
                outlined
                type="password"
                :error-messages="passwordErrors"
                @blur="$v.password.$touch()"
                @input="$v.password.$touch()"
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

// Validation Library - Vuelidate
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

/* Note: When Declaring Variables, always think about how Form Validation Rules are applied */
export default {
  // Mixins
  mixins: [validationMixin],

  // Form Validations
  validations: {
    email: { required, email },
    password: { required }
  },

  // Props Received
  props: [],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    email: "",
    password: "",
    loaderLogin: false,
    isLoginError: false
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
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loaderLogin = true;
        let email = this.email;
        let password = this.password;
        this.$store
          .dispatch("login", { email, password })
          .then(role => {
            // Navigate to the Pages Based on User Role
            switch (role) {
              case "AB":
                this.$router.push("/admin");
                break;
              case "HOD":
                this.$router.push("/hod");
                break;
              case "DB":
                this.$router.push("/deputy_bursar");
                break;
              case "DIR":
                this.$router.push("/director");
                break;
              case "SUP":
                this.$router.push("/supplier/procurements");
                break;
              case "EMP":
                this.$router.push("/employee");
                break;

              default:
                break;
            }
            this.loaderLogin = false;

            console.log(
              "###################################",
              this.$store.getters.user
            );
          })
          .catch(err => {
            console.log(err);
            this.loaderLogin = false;
            this.isLoginError = true;
          });
      }
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
  computed: {
    // Validations
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("Email is required.");
      !this.$v.email.email && errors.push("Please Enter a Valid Email.");

      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");

      return errors;
    }
  }
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
