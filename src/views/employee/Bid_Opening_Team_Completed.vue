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
                <v-btn class="mx-2" small color="primary" @click="openBidOpeningSchedule(props.item)">
                    Bid Opening Schedule
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
        <v-dialog v-model="viewBidOpeningSchedule" fullscreen hide-overlay transition="dialog-bottom-transition">
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
        </v-dialog>
  </v-container>
</template>

<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";
import BidOpeningSchedule from "./Opening_Schedule"

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
  components: {BidOpeningSchedule},

  // Data Variables and Values
  data: () => ({
    //
    tab: null,
    dialog: false,
    viewBidOpeningSchedule: false,
    procurement: null,
    bid_opening_team: null,
    search: '',
    completedHeaders: [
        { text: 'Procurement ID', align: 'start', filterable: true, value: 'procurement_id'},
        { text: 'Category', value: 'category' },
        { text: 'Date Initiated', value: 'date' },
        { text: 'Date Completed', value: 'completed_date' },
        { text: "Actions", value: "controls", sortable: false }
    ],
    completedProcurements: [],
  }),

  // Custom Methods and Functions
  methods: {
    // openDialog: function (item) {
    //   this.procurement = item
    //   this.dialog = true
    //   console.log(item)
    // },

    openBidOpeningSchedule: function (item) {
      this.procurement = item
      this.fetchBidOpeningTeam(this.procurement.bid_opening_team_id)
      this.viewBidOpeningSchedule = true
      console.log(item)
    },

    fetchCompletedProcurements(employee_id) {
      this.$http.get('/api/bid_opening_team/get_completed_procurements', {
        params: {
          id: employee_id
        }
      })
      .then(response => {
        console.log(response.data);
        this.completedProcurements = response.data
        this.completedProcurements.forEach(element => {
            element.bids = JSON.parse(element.bids)
            element.bids = element.bids.reduce((r, a) => {
                console.log("a", a);
                console.log('r', r);
                r[a.product_id] = [...r[a.product_id] || [], a];
                return r;
            }, {})
        });
        console.log(this.completedProcurements)
        console.log(Object.values(this.completedProcurements[0].bids))
      })
      .catch(error => {
        console.log(error);
      });
    },

    fetchBidOpeningTeam(bid_opening_team_id) {
      this.$http.get('/api/bid_opening_team/get_bid_opening_team', {
        params: {
          id: bid_opening_team_id
        }
      })
      .then(response => {
        console.log(response.data);
        this.bid_opening_team = response.data
        //this.bid_opening_team = JSON.parse(this.tec_team.team)
        console.log(this.bid_opening_team)
        //console.log(Object.values(this.ongoingProcurements[0].bids))
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
      this.fetchCompletedProcurements('emp00005')
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
