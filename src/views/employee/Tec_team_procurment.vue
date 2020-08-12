<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">{{this.$route.query.procurement.procurement_id}}</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row justify="center">
              <v-expansion-panels accordion>
                <v-expansion-panel>
                  <v-expansion-panel-header>Requisition</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <Requisition v-if="procurement" v-bind:requisition="requisition"/>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header>Specification</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Spec
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header>Tec Report</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <TecReport v-if="procurement && procurement.bid_type == 'items'" v-bind:procurement="procurement" v-bind:bid_data="bid_data" v-bind:requisition="requisition" v-bind:tec_team="tec_team" v-bind:tec_report_data="tec_report_data"/>
                    <TecReportPackaged v-if="procurement && procurement.bid_type == 'packaged'" v-bind:procurement="procurement" v-bind:bid_data="bid_data" v-bind:requisition="requisition" v-bind:tec_team="tec_team" v-bind:tec_report_data="tec_report_data"/>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
            <v-row> </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";

import TecReport from "./Tec_Report"
import TecReportPackaged from "./Tec_Report_Packaged"
import Requisition from "./Requisition"

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
  components: { TecReport, Requisition, TecReportPackaged },

  // Data Variables and Values
  data: () => ({
    procurement: null,
    requisition: null,
    tec_team: null,
    bid_data: null,
    tec_report_data: null,
  }),

  // Custom Methods and Functions
  methods: {
    fetchItemWiseBids(procurement_id) {
      this.$http.get('/api/tec_team/get_itemwise_bids', {
        params: {
          id: procurement_id
        }
      })
      .then(response => {
        console.log('item-wise bids', response.data);
        this.bid_data = response.data
        this.bid_data.forEach(item => {
          item.bids = JSON.parse(item.bids)
        })
        console.log(this.bid_data)
        //console.log(Object.values(this.procurements[0].bids))
      })
      .catch(error => {
        console.log(error);
      });
    },

    fetchPackagedBids(procurement_id) {
      this.$http.get('/api/tec_team/get_packaged_bids', {
        params: {
          id: procurement_id
        }
      })
      .then(response => {
        console.log('packaged bids', response.data);
        this.bid_data = response.data
        this.bid_data.forEach(item => {
          item.bids = JSON.parse(item.bids)
        })
        console.log(this.bid_data)
        //console.log(Object.values(this.procurements[0].bids))
      })
      .catch(error => {
        console.log(error);
      });
    },

    fetchRequisition(requisition_id) {
      this.$http.get('/api/tec_team/get_requisition', {
        params: {
          id: requisition_id
        }
      })
      .then(response => {
        console.log('requisition', response.data);
        this.requisition = response.data[0]
        this.requisition.products = JSON.parse(this.requisition.products)
        console.log(this.requisition)
        //console.log(Object.values(this.procurements[0].bids))
      })
      .catch(error => {
        console.log(error);
      });
    },

    fetchTecTeam(tec_team_id) {
      this.$http.get('/api/tec_team/get_tec_team', {
        params: {
          id: tec_team_id
        }
      })
      .then(response => {
        console.log(response.data);
        this.tec_team = response.data[0]
        this.tec_team = JSON.parse(this.tec_team.team)
        console.log(this.tec_team)
        //console.log(Object.values(this.procurements[0].bids))
      })
      .catch(error => {
        console.log(error);
      });
    },

    fetchTecReport(procurement_id) {
      this.$http.get('/api/tec_team/get_tec_report', {
        params: {
          id: procurement_id
        }
      })
      .then(response => {
        console.log(response.data);
        if(response.data[0]){
          this.tec_report_data = response.data[0]
          this.tec_report_data.rejected_bids = this.tec_report_data.rejected_bids ? JSON.parse(this.tec_report_data.rejected_bids) : []
          this.tec_report_data.recommended_bids = this.tec_report_data.recommended_bids ? JSON.parse(this.tec_report_data.recommended_bids) : []
          this.tec_report_data.tec_recommendation = this.tec_report_data.tec_recommendation ? JSON.parse(this.tec_report_data.tec_recommendation) : []
        }
        console.log('tec report data',this.tec_report_data)
      })
      .catch(error => {
        console.log(error);
      });
    },
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {},
  beforeMount() {
    this.procurement = this.$route.query.procurement
    this.fetchRequisition(this.$route.query.procurement.requisition_id)
    this.fetchTecTeam(this.$route.query.procurement.tec_team_id)
    this.fetchTecReport(this.$route.query.procurement.procurement_id)
    if(this.$route.query.procurement.bid_type == 'items'){
      this.fetchItemWiseBids(this.$route.query.procurement.procurement_id)
    }
    else{
      this.fetchPackagedBids(this.$route.query.procurement.procurement_id)
    }
  },
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
