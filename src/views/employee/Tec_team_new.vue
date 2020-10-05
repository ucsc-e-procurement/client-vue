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
      <v-data-table :headers="headers" :items="procurements" :search="search">
        <template v-slot:item.controls="props">
          <!-- <v-btn class="mx-2" small color="primary" @click="openRequisition(props.item)">
                    Requisition
                </v-btn> -->
          <v-btn
            class="mx-2"
            small
            color="primary"
            @click="openProcurement(props.item)"
          >
            View
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog
      v-model="viewRequisition"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="viewRequisition = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Requisition</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <Requisition v-if="procurement" v-bind:requisition="requisition" />
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";
import Requisition from "./Requisition.vue";

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
  components: { Requisition },

  // Data Variables and Values
  data: () => ({
    //
    tab: null,
    // dialog: false,
    viewRequisition: false,
    procurement: null,
    requisition: null,
    tec_team: null,
    search: "",
    headers: [
      {
        text: "Procurement ID",
        align: "start",
        filterable: true,
        value: "procurement_id"
      },
      { text: "Category", value: "category" },
      { text: "Status", value: "procurement_status" },
      { text: "Date Initiated", value: "date" },
      { text: "Actions", value: "controls", sortable: false }
    ],
    procurements: []
  }),

  // Custom Methods and Functions
  methods: {
    // openDialog: function (item) {
    //   this.procurement = item
    //   this.dialog = true
    //   console.log(item)
    // },

    openProcurement(item) {
      this.$router.push({
        path: `tecteam/procurement/${item.procurement_id.replace(/[/]/g, "")}`,
        query: {
          procurement_id: item.procurement_id,
          tec_team_id: item.tec_team_id,
          requisition_id: item.requisition_id,
          type: item.bid_type,
          unlocked: false
        }
      });
    },

    // openRequisition: function (item) {
    //   this.procurement = item
    //   this.fetchRequisition(this.procurement.requisition_id)
    //   this.viewRequisition = true
    //   console.log(item)
    // },

    fetchLockedProcurements(employee_id) {
      this.$http
        .get("/api/tec_team/get_locked_procurements", {
          params: {
            id: employee_id
          }
        })
        .then(response => {
          console.log(response.data);
          this.procurements = response.data;
          console.log(this.procurements);
          //console.log(Object.values(this.ongoingProcurements[0].bids))
        })
        .catch(error => {
          console.log(error);
        });
    }

    // fetchRequisition(requisition_id) {
    //   this.$http.get('/api/tec_team/get_requisition', {
    //     params: {
    //       id: requisition_id
    //     }
    //   })
    //   .then(response => {
    //     console.log('requisition', response.data);
    //     this.requisition = response.data[0]
    //     this.requisition.products = JSON.parse(this.requisition.products)
    //     console.log(this.requisition)
    //     //console.log(Object.values(this.ongoingProcurements[0].bids))
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // },

    // fetchTecTeam(tec_team_id) {
    //   this.$http.get('/api/tec_team/get_tec_team', {
    //     params: {
    //       id: tec_team_id
    //     }
    //   })
    //   .then(response => {
    //     console.log(response.data);
    //     this.tec_team = response.data[0]
    //     this.tec_team = JSON.parse(this.tec_team.team)
    //     console.log(this.tec_team)
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

      // this.fetchLockedProcurements('emp00005')
      this.fetchLockedProcurements(this.$store.getters.user.employee_id)

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
