<template>
  <v-container fluid class="px-0 py-0" >
    <v-row no-gutters v-if="(this.$route.query.unlocked && this.requisition && this.procurement && this.tec_team && this.bid_data && this.spec_data) || (!this.$route.query.unlocked && this.requisition && this.procurement)">
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">{{ this.$route.query.procurement_id }}</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <br />
            <v-row justify="center">
              <v-expansion-panels accordion>
                <v-expansion-panel>
                  <v-expansion-panel-header class="headline pt-5 pb-5"
                    >Requisition</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <Requisition
                      v-if="procurement"
                      v-bind:requisition="requisition"
                    />
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header class="headline pt-5 pb-5"
                    >Specification</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    Spec
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel v-if="this.$route.query.unlocked">
                  <v-expansion-panel-header class="headline pt-5 pb-5"
                    >Bid Evaluation Report</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <!-- <TecReport
                      v-if="this.$route.query.type == 'items'"
                      v-bind:procurement="procurement"
                      v-bind:bid_data="bid_data"
                      v-bind:requisition="requisition"
                      v-bind:tec_team="tec_team"
                      v-bind:tec_report_data="tec_report_data"
                    />
                    <TecReportPackaged
                      v-if="this.$route.query.type == 'packaged'"
                      v-bind:procurement="procurement"
                      v-bind:bid_data="bid_data"
                      v-bind:requisition="requisition"
                      v-bind:tec_team="tec_team"
                      v-bind:tec_report_data="tec_report_data"
                    /> -->


                    <TecEvaluationItemwise
                      v-if="this.$route.query.type == 'items'"
                      v-bind:procurement="procurement"
                      v-bind:bid_data="bid_data"
                      v-bind:requisition="requisition"
                      v-bind:tec_team="tec_team"
                      v-bind:tec_report_data="tec_report_data"
                      v-bind:spec_data="spec_data"
                    />
                    <TecEvaluationPackaged
                      v-if="this.$route.query.type == 'packaged'"
                      v-bind:procurement="procurement"
                      v-bind:bid_data="bid_data"
                      v-bind:requisition="requisition"
                      v-bind:tec_team="tec_team"
                      v-bind:tec_report_data="tec_report_data"
                      v-bind:spec_data="spec_data"
                    />

                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
            <v-row> </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-col  v-else align="center" justify="center">
    <div class="text-center">
      <v-progress-circular
      :size="70"
      :width="7"
      color="primary"
      indeterminate
    ></v-progress-circular>
    </div> 
    </v-col>
  </v-container>
</template>

<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";

import TecReport from "./Tec_Report";
import TecReportPackaged from "./Tec_Report_Packaged";

import TecEvaluationPackaged from "./Tec_evaluation_packaged";
import TecEvaluationItemwise from "./Tec_evaluation_itemwise";
import Requisition from "./Requisition";

import firebase from "firebase";


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
    TecReport,
    Requisition,
    TecReportPackaged,
    TecEvaluationPackaged,
    TecEvaluationItemwise
  },

  // Data Variables and Values
  data: () => ({
    procurement: null,
    requisition: null,
    tec_team: null,
    bid_data: null,

    tec_report_data: null,
    spec_data: null

  }),

  // Custom Methods and Functions
  methods: {
    async getBidData() {
      let ref = firebase.firestore().collection("ScheduleOfRequirements");
      console.log("ref", ref);
      let doc_id;
      this.spec_data = {
        data: await ref
          .where("InvitationNo", "==", "UCSC/SP/ADMTC/2019/099")
          .get()
          .then(function(querySnapshot) {
            let doc;
            console.log("snapshot", querySnapshot);
            querySnapshot.forEach(function(document) {
              doc = document.data();
              doc_id = document.id;
            });
            console.log("doc", doc_id);
            return doc;
          }),
        items: await ref
          .doc(doc_id)
          .collection("Items")
          .get()
          .then(function(querySnapshot) {
            let items = [];
            //let i = 0;

            querySnapshot.forEach(function(doc) {
              items.push(doc.data());
              // items[i].bidderResponse = [];
              // for(const index in doc.data().Features) {
              //   items[i].bidderResponse.push("No");
              // }
              // console.log(items[i]);
              // i++;
            });
            console.log("items", items);
            return items;
          })
      };
      console.log("spec_data", this.spec_data);
    },

    fetchItemWiseBids(procurement_id) {
      this.$http
        .get("/api/tec_team/get_itemwise_bids", {
          params: {
            id: procurement_id
          }

        })
        .then(response => {
          console.log("item-wise bids", response.data);
          this.bid_data = response.data;
          this.bid_data.forEach(item => {
            item.bids = JSON.parse(item.bids);
          });
          console.log(this.bid_data);
          //console.log(Object.values(this.procurements[0].bids))
        })

        .catch(error => {
          console.log(error);
        });
    },

    fetchPackagedBids(procurement_id) {
      this.$http
        .get("/api/tec_team/get_packaged_bids", {
          params: {
            id: procurement_id
          }
        })
        .then(response => {
          console.log("packaged bids", response.data);
          this.bid_data = response.data;
          this.bid_data.forEach(item => {
            item.bids = JSON.parse(item.bids);
          });
          console.log(this.bid_data);
          //console.log(Object.values(this.procurements[0].bids))
        })
        .catch(error => {
          console.log(error);
        });
    },

    fetchProcurement(procurement_id) {
      this.$http
        .get("/api/tec_team/get_procurement", {
          params: {
            id: procurement_id
          }
        })
        .then(response => {
          console.log("procurement", response.data);
          this.procurement = response.data[0];
          console.log(this.procurement);
          //console.log(Object.values(this.procurements[0].bids))
        })
        .catch(error => {
          console.log(error);
        });
    },

    fetchRequisition(requisition_id) {
      this.$http
        .get("/api/tec_team/get_requisition", {
          params: {
            id: requisition_id
          }
        })
        .then(response => {
          console.log("requisition", response.data);
          this.requisition = response.data[0];
          this.requisition.products = JSON.parse(this.requisition.products);
          console.log(this.requisition);
          //console.log(Object.values(this.procurements[0].bids))
        })
        .catch(error => {
          console.log(error);
        });
    },

    fetchTecTeam(tec_team_id) {
      this.$http
        .get("/api/tec_team/get_tec_team", {
          params: {
            id: tec_team_id
          }
        })
        .then(response => {
          console.log(response.data);
          this.tec_team = response.data[0];
          this.tec_team = JSON.parse(this.tec_team.team);
          console.log(this.tec_team);
          //console.log(Object.values(this.procurements[0].bids))
        })
        .catch(error => {
          console.log(error);
        });
    },

    fetchTecReport(procurement_id) {
      this.$http
        .get("/api/tec_team/get_tec_report", {
          params: {
            id: procurement_id
          }
        })
        .then(response => {
          console.log(response.data);
          if (response.data[0]) {
            this.tec_report_data = response.data[0];
            this.tec_report_data.rejected_bids = this.tec_report_data
              .rejected_bids
              ? JSON.parse(this.tec_report_data.rejected_bids)
              : [];
            this.tec_report_data.recommended_bids = this.tec_report_data
              .recommended_bids
              ? JSON.parse(this.tec_report_data.recommended_bids)
              : [];
            this.tec_report_data.tec_recommendation = this.tec_report_data
              .tec_recommendation
              ? JSON.parse(this.tec_report_data.tec_recommendation)
              : [];
          }
          console.log("tec report data", this.tec_report_data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.fetchProcurement(this.$route.query.procurement_id);
    this.fetchRequisition(this.$route.query.requisition_id);
    this.fetchTecTeam(this.$route.query.tec_team_id);
    this.fetchTecReport(this.$route.query.procurement_id);

    this.getBidData();

    if (this.$route.query.type == "items") {
      this.fetchItemWiseBids(this.$route.query.procurement_id);
    } else {
      this.fetchPackagedBids(this.$route.query.procurement_id);
    }
    console.log(
      "created",
      this.$route.query.procurement_id,
      this.$route.query.requisition_id,
      this.$route.query.tec_team_id
    );
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
