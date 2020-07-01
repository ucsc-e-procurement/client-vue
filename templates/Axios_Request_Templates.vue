<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- See Methods Section For Template Codes -->
      </v-col>
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
  data: () => ({
    //
  }),

  // Custom Methods and Functions
  methods: {
    //   Sample GET request - Basic
    basicGETrequest_basic() {
      this.$http
        .get("/api/test")
        .then(response => {
          // response.data object has all the data in the response sent by the server
          console.log("Response Data: ", response.data);
        })
        .catch(error => {
          console.log("This is the Request Error: ", error);
        });
    },
    //   Sample GET request - Basic
    basicGETrequest_withURLparams() {
      let yourParameter = "iamaparameter";
      this.$http
        .get(`/api/test?parameter1=${yourParameter}`)
        .then(response => {
          // response.data object has all the data in the response sent by the server
          console.log("Response Data: ", response.data);
        })
        .catch(error => {
          console.log("This is the Request Error: ", error);
        });
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
<style scoped></style>
