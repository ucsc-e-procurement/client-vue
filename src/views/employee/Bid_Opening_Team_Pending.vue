<template>
  <v-container>
    <v-card flat>
      <v-card-title>
        <v-text-field
          v-model="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="completedHeaders"
        :items="procurements"
        :search="search"
      >
        <template v-slot:item.controls="props">
          <v-btn
            class="mx-2"
            small
            color="success"
            @click="openDialog(props.item)"
          >
            Open Tender Box
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <!-- <v-dialog v-model="viewBidOpeningSchedule" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                <v-btn icon dark @click="viewBidOpeningSchedule = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Bid Opening Schedule</v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>
                <BidOpeningSchedule v-if="procurement" v-bind:procurement="procurement" v-bind:bid_opening_team="bid_opening_team"/>
            </v-card>
        </v-dialog> -->
  </v-container>
</template>

<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";
import BidOpeningSchedule from "./Opening_Schedule";

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
  components: { BidOpeningSchedule },

  // Data Variables and Values
  data: () => ({
    //
    tab: null,
    dialog: false,
    viewBidOpeningSchedule: false,
    procurement: null,
    bid_opening_team: null,
    search: "",
    completedHeaders: [
      {
        text: "Procurement ID",
        align: "start",
        filterable: true,
        value: "procurement_id"
      },
      { text: "Category", value: "category" },
      { text: "Date Initiated", value: "date" },
      { text: "Bid Opening Date", value: "bid_opening_date" },
      { text: "Actions", value: "controls", sortable: false }
    ],
    procurements: []
  }),

  // Custom Methods and Functions
  methods: {
    openDialog: function(item) {
      this.procurement = item;
      this.dialog = true;
      console.log(item);
    },

    // openBidOpeningSchedule: function (item) {
    //   this.procurement = item
    //   this.fetchBidOpeningTeam(this.procurement.bid_opening_team_id)
    //   this.viewBidOpeningSchedule = true
    //   console.log(item)
    // },

    fetchPendingProcurements(employee_id) {
      this.$http
        .get("/api/bid_opening_team/get_pending_procurements", {
          params: {
            id: employee_id
          }
        })
        .then(response => {
          console.log(response.data);
          this.procurements = response.data;
          console.log(this.procurements);
        })
        .catch(error => {
          console.log(error);
        });
    }

    // fetchBidOpeningTeam(bid_opening_team_id) {
    //   this.$http.get('/api/bid_opening_team/get_bid_opening_team', {
    //     params: {
    //       id: bid_opening_team_id
    //     }
    //   })
    //   .then(response => {
    //     console.log(response.data);
    //     this.bid_opening_team = response.data
    //     //this.bid_opening_team = JSON.parse(this.tec_team.team)
    //     console.log(this.bid_opening_team)
    //     //console.log(Object.values(this.ongoingProcurements[0].bids))
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // },
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.fetchPendingProcurements("emp00005");
    //this.fetchPendingProcurements(this.$store.getters.user.employee_id)
  },
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
