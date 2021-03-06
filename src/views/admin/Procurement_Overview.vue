<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Procurement Overview</h5>
              <v-spacer />

              <h5 class="headline">{{ procurementId }}</h5>

              <v-chip v-if="isLoaded" color="primary" outlined class="ml-5">{{
                procurement.procurement_method === "DIM"
                  ? "Direct Method"
                  : "Shopping Method"
              }}</v-chip>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row v-if="procurement.procurement_method === 'DIM'">
              <procurement-overview-direct-method />
            </v-row>
            <v-row v-else>
              <v-col cols="12">
                <v-stepper v-model="e6" vertical>
                  <v-stepper-step :complete="e6 > 1" step="1">
                    Product Requisition
                    <small>Summarize if needed</small>
                  </v-stepper-step>

                  <v-stepper-content step="1">
                    <product-requisition
                      v-if="isLoaded"
                      :requisitionId="procurement.requisition_id"
                    />
                    <v-btn color="primary" class="ml-3 my-2" @click="e6 = 2"
                      >Next</v-btn
                    >
                  </v-stepper-content>

                  <v-stepper-step :complete="e6 > 2" step="2"
                    >Procurement Initialization</v-stepper-step
                  >

                  <v-stepper-content step="2">
                    <procurement-initialization
                      :procurementId="procurementId"
                    />
                    <v-btn class="ml-3 my-2" color="primary" @click="e6 = 3"
                      >Next</v-btn
                    >
                  </v-stepper-content>

                  <v-stepper-step :complete="e6 > 3" step="3"
                    >Tech Team</v-stepper-step
                  >

                  <v-stepper-content step="3">
                    <tech-team
                      :techTeamId="procurement.tec_team_id"
                      v-if="isLoaded"
                    />
                    <v-btn class="ml-3 my-2" color="primary" @click="e6 = 4"
                      >Next</v-btn
                    >
                  </v-stepper-content>

                  <v-stepper-step step="4">Tec Specification</v-stepper-step>
                  <v-stepper-content step="4">
                    <v-card
                      color="grey lighten-1"
                      class="mb-12"
                      height="200px"
                    ></v-card>
                    <v-btn color="primary" @click="e6 = 5">Next</v-btn>
                    <v-btn text>Cancel</v-btn>
                  </v-stepper-content>

                  <v-stepper-step step="5"
                    >Request for Quotation</v-stepper-step
                  >
                  <v-stepper-content step="5">
                    <v-card
                      color="grey lighten-1"
                      class="mb-12"
                      height="200px"
                    ></v-card>
                    <v-btn color="primary" @click="e6 = 6">Next</v-btn>
                    <v-btn text>Cancel</v-btn>
                  </v-stepper-content>

                  <v-stepper-step step="6"
                    >Tec Evaluation Report</v-stepper-step
                  >
                  <v-stepper-content step="6">
                    <TecEvaluation
                      :procurement_id="procurementId"
                      :tec_team_id="procurement.tec_team_id"
                      :requisition_id="procurement.requisition_id"
                      :type="procurement.bid_type"
                    />
                    <v-btn color="primary" @click="e6 = 1">Next</v-btn>
                  </v-stepper-content>

                  <v-stepper-step step="7">Recommendation</v-stepper-step>
                  <v-stepper-content step="7">
                    <v-card
                      color="grey lighten-1"
                      class="mb-12"
                      height="200px"
                    ></v-card>
                    <v-btn color="primary" @click="e6 = 1">Next</v-btn>
                    <v-btn text>Cancel</v-btn>
                  </v-stepper-content>

                  <v-stepper-step step="8">Director Approval</v-stepper-step>
                  <v-stepper-content step="8">
                    <v-card
                      color="grey lighten-1"
                      class="mb-12"
                      height="200px"
                    ></v-card>
                    <v-btn color="primary" @click="e6 = 1">Next</v-btn>
                    <v-btn text>Cancel</v-btn>
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

import ProductRequisition from "./components/ProcurementOverview_Product_Requisition";
import ProcurementInitialization from "./components/ProcurementOverview_Initialization";
import ProcurementTechTeam from "./components/ProcurementOverview_TechTeam";

import TecEvaluation from "./TecEvaluation";

// Import from Tharinda
import ProcurementOverview_DirecMethod from "../director/ProcurementStepperDirect__linked_to_admin";

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
  components: {
    "product-requisition": ProductRequisition,
    "procurement-initialization": ProcurementInitialization,
    "tech-team": ProcurementTechTeam,
    TecEvaluation: TecEvaluation,
    // Tharinda's Component
    "procurement-overview-direct-method": ProcurementOverview_DirecMethod
  },

  // Data Variables and Values
  data: () => ({
    procurementId: "",
    e6: 1,
    procurement: null,
    isLoaded: false
  }),

  // Custom Methods and Functions
  methods: {
    getProcurement(procurementId) {
      return new Promise((resolve, reject) => {
        this.$http
          .get(`/api/admin/procurement?id=${procurementId}`)
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.procurementId = atob(this.encodedProcurementId);

    this.getProcurement(this.procurementId)
      .then(res => {
        console.log(">>>>>>>>>>>>>>>>>>>> ", this.procurementId, res);
        this.procurement = res;
        this.isLoaded = true;
      })
      .catch(err => {
        console.log(err);
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
<style scoped>
.v-stepper {
  box-shadow: none;
}
</style>
