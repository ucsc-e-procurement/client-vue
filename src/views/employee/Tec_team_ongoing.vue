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
            :headers="ongoingHeaders"
            :items="procurements"
            :search="search"
            >
                <template v-slot:item.controls="props">
                <v-btn class="mx-2" small color="primary" @click="openRequisition(props.item)">
                    Requisition
                </v-btn>
                <v-btn class="mx-2" small :color="props.item.btn" @click="openTecReport(props.item)">
                    TEC-Report
                </v-btn>
                </template>
            </v-data-table>
        </v-card>
        <!-- <v-dialog  v-if="dialog" :procurement="procurement" v-model="dialog" width="650px">
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
                    Status : {{procurement.procurement_status}} 
                </div>
                <br/>
                <v-divider></v-divider>
                <br/>
                <p v-if="procurement.bids" class="text-h6 text-decoration-underline text-center">
                    Submitted Bids
                </p>
                <div v-if="procurement.bids">
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
                </div>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-3" text @click="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
        <v-dialog v-model="viewRequisition" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                <v-btn icon dark @click="viewRequisition = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Requisition</v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>
                <Requisition v-if="procurement" v-bind:requisition="requisition"/>
            </v-card>
        </v-dialog>
        <v-dialog v-model="tecReport" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <!-- <v-app-bar dark color="primary" fixed>
                <v-btn icon dark @click="tecReport = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>TEC Report</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text @click="tecReport = false">Save</v-btn>
                </v-toolbar-items>
                </v-app-bar> -->
                <TecReport v-if="procurement && procurement.bid_type == 'items'" v-bind:procurement="procurement" v-bind:bid_data="bid_data" v-bind:requisition="requisition" v-bind:tec_team="tec_team" v-bind:tec_report_data="tec_report_data" v-bind:closeTecReport="closeTecReport"/>
                <TecReportPackaged v-if="procurement && procurement.bid_type == 'packaged'" v-bind:procurement="procurement" v-bind:bid_data="bid_data" v-bind:requisition="requisition" v-bind:tec_team="tec_team" v-bind:tec_report_data="tec_report_data" v-bind:closeTecReport="closeTecReport"/>
            </v-card>
        </v-dialog>
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
    //
    tab: null,
    // dialog: false,
    viewRequisition: false,
    tecReport: false,
    procurement: null,
    requisition: null,
    tec_team: null,
    bid_data: null,
    tec_report_data: null,
    search: '',
    ongoingHeaders: [
        { text: 'Procurement ID', align: 'start', filterable: true, value: 'procurement_id'},
        { text: 'Category', value: 'category' },
        { text: 'Status', value: 'procurement_status' },
        { text: 'Date Initiated', value: 'date' },
        { text: "Actions", value: "controls", sortable: false }
    ],
    procurements: [],
  }),

  // Custom Methods and Functions
  methods: {
    // openDialog: function (item) {
    //   this.procurement = item
    //   this.dialog = true
    //   console.log(item)
    // },

    openRequisition: function (item) {
      this.procurement = item
      this.fetchRequisition(this.procurement.requisition_id)
      this.viewRequisition = true
      console.log(item)
    },

    openTecReport: function (item) {
      this.procurement = item
      if(this.procurement.bid_type == 'items'){
        this.fetchItemWiseBids(this.procurement.procurement_id)
      }
      else{
        this.fetchPackagedBids(this.procurement.procurement_id)
      }
      this.fetchRequisition(this.procurement.requisition_id)
      this.fetchTecTeam(this.procurement.tec_team_id)
      this.fetchTecReport(this.procurement.procurement_id)
      this.tecReport = true
      console.log(item)
    },

    closeTecReport: function () {
      this.tecReport = false
    },

    fetchUnlockedProcurements(employee_id) {
      this.$http.get('/api/tec_team/get_unlocked_procurements', {
        params: {
          id: employee_id
        }
      })
      .then(response => {
        console.log(response.data);
        this.procurements = response.data
        this.procurements.forEach(element => {
            // if(element.bids) {
            //     element.bids = JSON.parse(element.bids)
            //     element.supplier_bids = element.bids.reduce((r, a) => {
            //         r[a.supplier_id] = [...r[a.supplier_id] || [], a];
            //         return r;
            //     }, {})
            //     element.bids = element.bids.reduce((r, a) => {
            //         console.log("a", a);
            //         console.log('r', r);
            //         r[a.product_id] = [...r[a.product_id] || [], a];
            //         return r;
            //     }, {})
            // }
            if(element.step == 7){
              element.btn = "success"
            }
            else{
              element.btn = "primary"
            }
        });
        console.log(this.procurements)
      })
      .catch(error => {
        console.log(error);
      });
    },

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
        this.tec_report_data = response.data[0]
        this.tec_report_data.rejected_bids = this.tec_report_data.rejected_bids ? JSON.parse(this.tec_report_data.rejected_bids) : []
        this.tec_report_data.recommended_bids = this.tec_report_data.recommended_bids ? JSON.parse(this.tec_report_data.recommended_bids) : []
        this.tec_report_data.tec_recommendation = this.tec_report_data.tec_recommendation ? JSON.parse(this.tec_report_data.tec_recommendation) : []
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
  beforeMount() {},
  mounted() {
      this.fetchUnlockedProcurements('emp00005')
      //this.fetchUnlockedProcurements(this.$store.getters.user.employee_id)
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
