<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row class="justify-space-between" no-gutters>
              <h5 class="headline">{{deptName}}</h5>
              <v-col class="text-center" cols="12" sm="2">
                <v-btn to="hod/newproc" outlined color="green">New Request</v-btn>
              </v-col>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->

            <!-- Info Card Row -->
            <v-row class="justify-space-between">
              <v-col cols="6">
                <!--initialized-->
                <v-card height="100" color="warning">
                  <v-card-title>Initialized</v-card-title>
                </v-card>
              </v-col>
              <v-col cols="6">
                <!--approved-->
                <v-card height="100" color="primary">
                  <v-card-title>Approved</v-card-title>
                </v-card>
              </v-col>
              <v-col cols="6">
                <!--completed-->
                <v-card height="100" color="success">
                  <v-card-title>Completed</v-card-title>
                </v-card>
              </v-col>
              <v-col cols="6">
                <!--terminated-->
                <v-card height="100" color="error">
                  <v-card-title>Terminated</v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
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
  name: "HOD Dashboard",

  // Form Validations
  // validations: {},

  // Props Received
  props: [],

  // Imported Components
  components: {},

  // Data Variables and Values
  data() {
    return {
      deptName: "Division Name"
    };
  },
  // Custom Methods and Functions
  methods: {
    greet: function(event) {
      // `this` inside methods points to the Vue instance
      alert("Hello " + this.name + "!");
      // `event` is the native DOM event
      if (event) {
        alert(event.target.tagName);
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
  computed: {}
};
</script>

// Custom CSS Rules and Classes
<style scoped></style>
