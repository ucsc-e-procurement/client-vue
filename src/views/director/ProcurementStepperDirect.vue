<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Procurement {{this.procurementId}}</h5>
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
                            <ProcurementMethod :requisitionData = 'this.requisitionData' />
                        </v-stepper-content>

                        <v-stepper-step :complete="procurementState >= 3" step="3" :editable="true" :edit-icon="procurementState > 3 ? '$complete' : '$edit' "  :complete-icon="procurementState > 3 ? '$edit' : '$edit' ">Tech Team</v-stepper-step>
                        <v-stepper-content step="3">
                            <AppointTechTeam :requisitionData = 'this.requisitionData' :stepper = 3 @tecTeamUpdated="childUpdated" v-if="isMounted && this.requisitionData.tec_team_id == null" />
                            <TechTeam :requisitionData = 'this.requisitionData' v-if="isMounted && this.requisitionData.tec_team_id != null"/>
                        </v-stepper-content>

                        <v-stepper-step :complete="procurementState > 4" step="4" :editable="procurementState > 4 ? true : false" :edit-icon="procurementState > 4 ? '$complete' : '$edit' "  :complete-icon="procurementState > 4 ? '$edit' : '$edit' ">Technical Specification</v-stepper-step>
                        <v-stepper-content step="5">
                            
                        </v-stepper-content>

                        <v-stepper-step :complete="procurementState > 5" step="5" :editable="procurementState > 5 ? true : false" :edit-icon="procurementState > 5 ? '$complete' : '$edit' "  :complete-icon="procurementState > 5 ? '$edit' : '$edit' ">Request For Quotations</v-stepper-step>
                        <v-stepper-content step="5">
                            <RFQ :rfqData = 'this.rfqData' v-if="rfqMounted" />
                        </v-stepper-content>

                        <v-stepper-step :complete="procurementState > 6" step="6" :editable="procurementState > 6 ? true : false" :edit-icon="procurementState > 6 ? '$complete' : '$edit' "  :complete-icon="procurementState > 6 ? '$edit' : '$edit' ">Quotation Evaluation</v-stepper-step>
                        <v-stepper-content step="6">
            
                        </v-stepper-content>

                        <v-stepper-step :complete="procurementState > 7" :editable="procurementState > 7 ? true : false" step="7" :edit-icon="procurementState > 7 ? '$complete' : '$edit' "  :complete-icon="procurementState > 7 ? '$edit' : '$edit' ">Head Of Department Recommendation</v-stepper-step>
                        <v-stepper-content step="7">
                            <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
                            <v-btn color="primary" @click="stepperValue = 1">Continue</v-btn>
                            <v-btn text>Cancel</v-btn>
                        </v-stepper-content>

                        <v-stepper-step :complete="procurementState > 8" :editable="procurementState > 8 ? true : false" step="8" :edit-icon="procurementState > 8 ? '$complete' : '$edit' "  :complete-icon="procurementState > 8 ? '$edit' : '$edit' ">Deputy Bursar Recommendation</v-stepper-step>
                        <v-stepper-content step="8">
                            <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
                            <v-btn color="primary" @click="stepperValue = 1">Continue</v-btn>
                            <v-btn text>Cancel</v-btn>
                        </v-stepper-content>

                        <v-stepper-step :complete="procurementState > 9" :editable="procurementState > 9 ? true : false" step="9" :edit-icon="procurementState > 9 ? '$complete' : '$edit' "  :complete-icon="procurementState > 9 ? '$edit' : '$edit' ">Director Approval</v-stepper-step>
                        <v-stepper-content step="9">
                            <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
                            <v-btn color="primary" @click="stepperValue = 1">Continue</v-btn>
                            <v-btn text>Cancel</v-btn>
                        </v-stepper-content>

                        <v-stepper-step :complete="procurementState > 10" :editable="procurementState > 10 ? true : false" step="10" :edit-icon="procurementState > 10 ? '$complete' : '$edit' "  :complete-icon="procurementState > 10 ? '$edit' : '$edit' ">Purchase Order</v-stepper-step>
                        <v-stepper-content step="10">
                            <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
                            <v-btn color="primary" @click="stepperValue = 1">Continue</v-btn>
                            <v-btn text>Cancel</v-btn>
                        </v-stepper-content>

                        <v-stepper-step :complete="procurementState > 11" :editable="procurementState > 11 ? true : false" step="11" :edit-icon="procurementState > 11 ? '$complete' : '$edit' "  :complete-icon="procurementState > 11 ? '$edit' : '$edit' ">Product Acquisition</v-stepper-step>
                        <v-stepper-content step="11">
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
    import Rfq from "./Rfq"
    import AppointTechTeam from "./AppointTechTeam";
    import TechTeam from "./TechTeam";

/* Note: When Declaring Variables, always think about how Form Validation Rules are applied */
export default {

  props: [],

  // Imported Components
  components: {
      requisition: Requisition,
      ProcurementMethod: ProcurementMethod,
      RFQ: Rfq,
      TechTeam: TechTeam,
      AppointTechTeam: AppointTechTeam,
  },

  // Data Variables and Values
  data: () => ({
      stepperValue: 1,
      procurementState: '',
      procurementId: '',
      requisitionData: '',
      rfqData: [],
      isMounted: false,
      rfqMounted: false,
      test: 0,
  }),

  // Custom Methods and Functions
  methods: {
    getRequisition(){
      this.$http
        .get(`/api/director/procurements/${this.$route.query.proc_id.replace(/[/]/g, '')}?procId=${this.$route.query.proc_id}`)
        .then(response => {
          this.requisitionData = response.data[0];
          this.procurementState = response.data[0].step;
          this.stepperValue = 12;
          this.isMounted = true;
          if(response.data[0].step == 3){
            this.stepperValue = response.data[0].step;
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    editIcon(event) {
      console.log(event)
    },
    childUpdated(stepVal){
      this.test = stepVal;
      this.isMounted = false;
      this.getRequisition();
    },
    getRfq(){
      this.$http
        .get(`/api/director/get_rfq_details?procId=${this.$route.query.proc_id}`)
        .then(response => {
          this.rfqData = response.data
          this.rfqMounted = true;
          console.log(this.rfq);
        })
        .catch(err => {
          console.log(err);
        })
    },
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.procurementId = this.$route.query.proc_id;
    this.procurementState = this.$route.query.stepper;
    this.stepperValue = this.$route.query.stepper;
    this.getRequisition();
    this.getRfq();
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


