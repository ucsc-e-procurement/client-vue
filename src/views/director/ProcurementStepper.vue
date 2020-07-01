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
                    <v-stepper v-model="stepperValue" vertical>
                        <v-stepper-step complete step="1" :editable="true" :edit-icon="'$complete'" :complete-icon="'$edit'">
                            Product Requisition
                        </v-stepper-step>

                        <v-stepper-content step="1">
                            <requisition :requisitionData = 'this.requisitionData' v-if="isMounted"/>
                        </v-stepper-content>

                        <v-stepper-step complete step="2" :editable="true" :edit-icon="'$complete'" :complete-icon="'$edit'">Procurement Initialization</v-stepper-step>

                        <v-stepper-content step="2">
                            <ProcurementMethod />
                        </v-stepper-content>

                        <v-stepper-step :complete="procurementState >= 3" step="3" :editable="true" :edit-icon="procurementState > 3 ? '$complete' : '$edit' "  :complete-icon="procurementState > 3 ? '$edit' : '$edit' ">Tech Team</v-stepper-step>

                        <v-stepper-content step="3">
                            <AppointTechTeam :requisitionData = 'this.requisitionData' :stepper = 3 @update="techTeamAppointed" v-if="isMounted && this.requisitionData.tec_team_id == null" />
                            <TechTeam :requisitionData = 'this.requisitionData' v-if="isMounted && this.requisitionData.tec_team_id != null"/>
                        </v-stepper-content>

                        <v-stepper-step :complete="procurementState >= 4" step="4" :editable="procurementState > 3 ? true : false" :edit-icon="procurementState > 4 ? '$complete' : '$edit' "  :complete-icon="procurementState > 4 ? '$edit' : '$edit' ">Bid Opening Team</v-stepper-step>
                        <v-stepper-content step="4">
                            <AppointBidOpeningTeam :requisitionData = 'this.requisitionData' :stepper = 3 v-if="isMounted && this.requisitionData.bid_opening_team_id == null"/>
                        </v-stepper-content>
                        <v-stepper-step step="5">Request Quotations</v-stepper-step>
                        <v-stepper-content step="5">
                            <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
                            <v-btn color="primary" @click="stepperValue = 1">Continue</v-btn>
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
    import TechTeam from './TechTeam'
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
      TechTeam: TechTeam,
  },

  // Data Variables and Values
  data: () => ({
      stepperValue: 1,
      procurementState: '',
      procurementId: '',
      requisitionData: '',
      isMounted: false,
      test: 0,
  }),

  // Custom Methods and Functions
  methods: {
    getRequisition(){
      this.$http
        .get(`/api/director/procurements/${this.$route.query.proc_id.replace(/[/]/g, '')}?procId=${this.$route.query.proc_id}`)
        .then(response => {
          this.requisitionData = response.data[0];
          this.procurementState = response.data[0].stepper;
          this.stepperValue = response.data[0].stepper;
          this.isMounted = true;
        })
        .catch(err => {
          console.log(err);
        })
    },
    editIcon(event) {
      console.log(event)
    },
    techTeamAppointed(stepVal){
      this.test = stepVal;
      this.isMounted = false;
      this.getRequisition();
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.procurementId = this.$route.query.proc_id;
    this.procurementState = this.$route.query.stepper;
    this.stepperValue = this.$route.query.stepper;
    this.getRequisition();
  },
  beforeMount() {},
  mounted() {
    // this.procurementId = this.$route.query.proc_id;
    // this.getRequisition();
    // console.log('daaaam mnt', this.$route.query.proc_id)
  },
  beforeUpdate() {},
  updated() {

  },
  beforeDestroy() {},
  destroyed() {},

  // Computed Properties
  computed: {},

};
</script>

// Custom CSS Rules and Classes
<style scoped></style>


