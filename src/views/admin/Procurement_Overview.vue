<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">
                Procurement Overview of {{ procurementId }}
              </h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row>
              <v-col cols="12">
                <v-stepper v-model="e6" vertical>
                  <v-stepper-step step="1" editable>
                    Purchase Request Submission by the HoD
                    <small>Summarize if needed</small>
                  </v-stepper-step>

                  <v-stepper-content step="1">
                    <v-card></v-card>
                    <!-- <v-btn color="primary" @click="e6 = 2">Next</v-btn> -->
                  </v-stepper-content>

                  <v-stepper-step step="2" editable>
                    Duputy Bursar's Reccomandation - Approval
                    <small>Summarize if needed</small>
                  </v-stepper-step>

                  <v-stepper-content step="2">
                    <v-card></v-card>
                    <!-- <v-btn color="primary" @click="e6 = 2">Next</v-btn> -->
                  </v-stepper-content>

                  <v-stepper-step step="3">
                    Director’s Approval for Request (TEC Committee and
                    Bid-Opening Members Appointment)
                    <small>Summarize if needed</small>
                  </v-stepper-step>

                  <v-stepper-content step="3">
                    <v-card></v-card>
                    <!-- <v-btn color="primary" @click="e6 = 2">Next</v-btn> -->
                  </v-stepper-content>

                  <v-stepper-step step="4">
                    Procurement Method Selection
                    <small>Summarize if needed</small>
                  </v-stepper-step>

                  <v-stepper-content step="4">
                    <v-card></v-card>
                    <!-- <v-btn color="primary" @click="e6 = 2">Next</v-btn> -->
                  </v-stepper-content>
                </v-stepper>
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

  // Form Validations
  // validations: {},

  // Props Received
  props: ["encodedProcurementId"],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    // Procurement ID
    procurementId: ""
  }),

  // Custom Methods and Functions
  methods: {},

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.procurementId = atob(this.encodedProcurementId);
    console.log("Decoded Procurement ID: ", atob(this.encodedProcurementId));
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
