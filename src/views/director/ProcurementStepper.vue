<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Procurement</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row class="justify-space-between"> 
                <v-col cols="12">
                    <v-stepper v-model="e6" vertical>
                        <v-stepper-step complete step="1" :editable="true" :edit-icon="'$complete'" :complete-icon="'$edit'">
                            Product Requisition
                        </v-stepper-step>

                        <v-stepper-content step="1">
                            <requisition :requisitionId = 'this.requisitionId'/>
                        </v-stepper-content>

                        <v-stepper-step complete step="2" :editable="true" :edit-icon="'$complete'" :complete-icon="'$edit'">Procurement Method</v-stepper-step>

                        <v-stepper-content step="2">
                            <ProcurementMethod />
                        </v-stepper-content>

                        <v-stepper-step :complete="e6 > 3" step="3" :editable="true">Tech Team</v-stepper-step>

                        <v-stepper-content step="3">
                            <AppointTechTeam />
                        </v-stepper-content>

                        <v-stepper-step step="4" :editable="true">Bid Opening Team</v-stepper-step>
                        <v-stepper-content step="4">
                            <AppointBidOpeningTeam />
                        </v-stepper-content>
                        <v-stepper-step step="5">Request Quotations</v-stepper-step>
                        <v-stepper-content step="5">
                            <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
                            <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
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
    import Requisition from "./Requisition"
    import ProcurementMethod from './ProcurementMethod'
    import AppointTechTeam from './AppointTechTeam'
    import BidOpeningTeam from './AppointBidOpeningTeam'
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
  components: {
      requisition: Requisition,
      AppointTechTeam: AppointTechTeam,
      AppointBidOpeningTeam: BidOpeningTeam,
      ProcurementMethod: ProcurementMethod,
  },

  // Data Variables and Values
  data: () => ({
      e6: 3,
      procurementId: '',
      requisitionId: '',
  }),

  // Custom Methods and Functions
  methods: {
    getRequisition(){
      this.$http
        .get(`/api/director/procurements/${this.procurementId.replace(/[/]/g, '')}?procId=${this.procurementId}`)
        .then(response => {
          console.log(response.data[0].requisition_id);
          this.requisitionId = response.data[0].requisition_id
        })
        .catch(err => {
          console.log(err);
        })
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.procurementId = this.$route.query.proc_id;
    this.getRequisition();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},

  // Computed Properties
  computed: {},

};
</script>

// Custom CSS Rules and Classes
<style scoped></style>


