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
        :items="completedProcurements"
        :search="search"
      >
        <template v-slot:item.controls="props">
          <!-- <v-btn class="mx-2" small color="primary" @click="openRequisition(props.item)">
                    Requisition
                </v-btn>
                <v-btn :disabled="!props.item.bids" class="mx-2" small :color="props.item.btn" @click="openTecReport(props.item)">
                    TEC-Report
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
    <!-- <v-dialog  v-if="dialog" :procurement="procurement" v-model="dialog" width="600px">
            <v-card>
                
                <v-card-title>
                <span class="headline">Tender Number : {{procurement.procurement_id}}</span>
                </v-card-title>
                <v-card-text>
                <p class="text-h6">
                    {{procurement.category}}
                </p>
                <div class="text--primary">
                    Initialized Date : {{procurement.date}}
                </div>
                <div class="text--primary">
                    Completed Date : {{procurement.completed_date}}
                </div>
                <div class="text--primary">
                    Status : {{procurement.procurement_status}}
                </div>
                <br/>
                <v-divider></v-divider>
                <br/>
                <p class="text-h6 text-decoration-underline text-center">
                    Submitted Bids
                </p>
                <template v-for="(product,key) in Object.values(procurement.bids)">
                    <div :key="product[0].product_id" class="text--primary">
                        Item : {{product[0].product_name}}
                    </div>
                    <v-simple-table :key="key">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">Supplier</th>
                            <th class="text-left">Quantity</th>
                            <th class="text-left">Unit Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="bid in product" :key="bid.supplier_id">
                            <td>{{ bid.supplier_name }}</td>
                            <td>{{ bid.qty }}</td>
                            <td>{{ bid.unit_price }}</td>
                        </tr>
                        </tbody>
                    </template>
                    </v-simple-table>
                    <br :key="product[0].product_name"/>
                </template>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-3" text @click="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
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
    <v-dialog
      v-model="tecReport"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <!-- <v-toolbar dark color="primary">
                <v-btn icon dark @click="tecReport = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>TEC Report</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text @click="tecReport = false">Save</v-btn>
                </v-toolbar-items>
                </v-toolbar> -->
        <TecReport
          v-if="procurement"
          v-bind:procurement="procurement"
          v-bind:requisition="requisition"
          v-bind:tec_team="tec_team"
          v-bind:closeTecReport="closeTecReport"
        />
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";

import TecReport from "./Tec_Report";
import Requisition from "./Requisition";

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
  components: { TecReport, Requisition },

  // Data Variables and Values
  data: () => ({
    //
    tab: null,
    viewRequisition: false,
    tecReport: false,
    procurement: null,
    requisition: null,
    tec_team: null,
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
      { text: "Date Completed", value: "completed_date" },
      { text: "Actions", value: "controls", sortable: false }
    ],
    completedProcurements: []
  }),

  // Custom Methods and Functions
  methods: {
    openProcurement(item) {
      this.$router.push({
        path: `tecteam/procurement/${item.procurement_id.replace(/[/]/g, "")}`,
        query: {
          procurement_id: item.procurement_id,
          tec_team_id: item.tec_team_id,
          requisition_id: item.requisition_id,
          type: item.bid_type,
          unlocked: true
        }
      });
    },

    // openRequisition: function (item) {
    //   this.procurement = item
    //   this.fetchRequisition(this.procurement.requisition_id)
    //   this.viewRequisition = true
    //   console.log(item)
    // },

    // openTecReport: function (item) {
    //   this.procurement = item
    //   this.fetchRequisition(this.procurement.requisition_id)
    //   this.fetchTecTeam(this.procurement.tec_team_id)
    //   this.tecReport = true
    //   console.log(item)
    // },

    // closeTecReport: function () {
    //   this.tecReport = false
    // },

    fetchCompletedProcurements(employee_id) {
      this.$http
        .get("/api/tec_team/get_completed_procurements", {
          params: {
            id: employee_id
          }
        })
        .then(response => {
          console.log(response.data);
          this.completedProcurements = response.data;
          this.completedProcurements.forEach(element => {
            element.bids = JSON.parse(element.bids);
            element.supplier_bids = element.bids.reduce((r, a) => {
              r[a.supplier_id] = [...(r[a.supplier_id] || []), a];
              return r;
            }, {});
            element.bids = element.bids.reduce((r, a) => {
              r[a.product_id] = [...(r[a.product_id] || []), a];
              return r;
            }, {});
            if (element.step == 7) {
              element.btn = "green darken-1";
            } else {
              element.btn = "primary";
            }
          });
          console.log(this.completedProcurements);
          console.log(Object.values(this.completedProcurements[0].bids));
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
    this.fetchCompletedProcurements("emp00005");
    //this.fetchCompletedProcurements(this.$store.getters.user.employee_id)
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
