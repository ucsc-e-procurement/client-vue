<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row class="justify-space-between" no-gutters>
              <h5 class="headline">{{ deptName }}</h5>
              <v-col class="text-center" cols="12" sm="2">
                <v-btn to="hod/newproc" outlined color="green"
                  >New Request</v-btn
                >
              </v-col>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->

            <!-- Info Card Row -->
            <v-row class="justify-space-between">
              <v-col cols="6">
                <!--initialized-->
                <InitReq />
              </v-col>
              <v-col cols="6">
                <!--approved-->
                <ApprReq />
              </v-col>
              <v-col cols="6">
                <!--completed-->
                <CompReq />
              </v-col>
              <v-col cols="6">
                <!--terminated-->
                <TermReq />
              </v-col>
              <!-- <v-col cols="6">
                <v-card flat>
                  <Spec />
                </v-card>
              </v-col> -->
            </v-row>
            <v-row class="justify-space-between"></v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Componenets
import InitReq from "./InitReq";
import ApprReq from "./ApprReq";
import CompReq from "./CompReq";
import TermReq from "./TermReq";
// import Spec from "../employee/Spec_Sheet_View";
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
  components: { InitReq, ApprReq, CompReq, TermReq},

  // Data Variables and Values
  data() {
    return {
      deptName: "Engineering Division" //needs to be retrieved from store
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
  created() {
    console.log(window.location.host);
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
