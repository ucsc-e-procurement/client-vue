<template>
  <v-container class="fill-height" fluid>
    <v-app-bar app>sadasd</v-app-bar>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Componenets

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
  data: () => ({}),

  // Custom Methods and Functions
  methods: {},

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.$http
      .get("/api/test/ayubowan")
      .then(res => {
        console.log("Response: ", res.data);
        console.log("Status: ", res.st);
      })
      .catch(err => {
        console.log("Error: ", err);
        console.log("Error Response: ", err.response);
        console.log("Error Response Status: ", err.response.status);
        console.log("Error Response Message: ", err.message);
        console.log("Error Response Message >>: ", err.response.data);
      });
  },
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
<style scoped></style>
