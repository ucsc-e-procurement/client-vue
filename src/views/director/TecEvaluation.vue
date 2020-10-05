<template>
  <v-col>
    <TecEvaluationItemwise
        v-if="this.type == 'items'"
        v-bind:procurement="procurement"
        v-bind:bid_data="bid_data"
        v-bind:requisition="requisition"
        v-bind:tec_team="tec_team"
        v-bind:tec_report_data="tec_report_data"
        v-bind:spec_data="spec_data"
    />
    <TecEvaluationPackaged
        v-if="this.type == 'packaged'"
        v-bind:procurement="procurement"
        v-bind:bid_data="bid_data"
        v-bind:requisition="requisition"
        v-bind:tec_team="tec_team"
        v-bind:tec_report_data="tec_report_data"
        v-bind:spec_data="spec_data"
    />
  </v-col>
</template>

<script>
// Componenets

import TecEvaluationPackaged from "../employee/Tec_evaluation_packaged";
import TecEvaluationItemwise from "../employee/Tec_evaluation_itemwise";

import firebase from "firebase";

/* Note: When Declaring Variables, always think about how Form Validation Rules are applied */
export default {

  props: ["procurement_id", "tec_team_id", "requisition_id", "type"],

  // Imported Components
  components: {
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
    this.fetchProcurement(this.procurement_id);
    this.fetchRequisition(this.requisition_id);
    this.fetchTecTeam(this.tec_team_id);
    this.fetchTecReport(this.procurement_id);

    this.getBidData();

    if (this.type == "items") {
      this.fetchItemWiseBids(this.procurement_id);
    } else {
      this.fetchPackagedBids(this.procurement_id);
    }
    console.log(
      "created",
      this.procurement_id,
      this.requisition_id,
      this.tec_team_id
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
