<template>
  <v-container>
        <v-card flat>
            <template v-for="(item,key) in ongoingProcurements">
                <v-card :key="item.tenderNo"
                  class="mx-auto"
                  max-width="800"
                  flat
                >
                    <br v-if="item.status==='Bid Approved'">                
                    <v-badge
                    v-if="item.status==='Bid Approved'"
                    inline
                    large
                    left
                    color="green darken-3"
                    icon="mdi-check-circle"
                    >
                    APPROVED
                    </v-badge>
                    <v-card-text>
                      <div>Tender Number : {{item.tenderNo}}</div>
                      <p class="text-h6">
                        {{item.category}}
                      </p>
                      <div class="text--primary">
                        Published Date : {{item.publishedDate}}
                      </div>
                      <div class="text--primary">
                        Status : {{item.status}}
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        text
                        color="blue darken-3"
                        @click="openDialog(key)"
                      >
                        View
                      </v-btn>
                    </v-card-actions>
                </v-card>
                <v-divider :key="key" v-if="key != ongoingProcurements.length - 1"></v-divider>
            </template>
        </v-card>
        <v-dialog  v-if="dialog" :procurement="procurement" v-model="dialog" width="600px">
            <!-- <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                >
                Open Dialog
                </v-btn>
            </template> -->
            <v-card>
                
                <v-card-title>
                <span class="headline">Tender Number : {{ongoingProcurements[procurement].tenderNo}}</span>
                </v-card-title>
                <v-card-text>
                <p class="text-h6">
                    {{ongoingProcurements[procurement].category}}
                </p>
                <div class="text--primary">
                    Published Date : {{ongoingProcurements[procurement].publishedDate}}
                </div>
                <div class="text--primary">
                    Bid opening Date : {{ongoingProcurements[procurement].bidOpeningDate}}
                </div>
                <div class="text--primary">
                    Status : {{ongoingProcurements[procurement].status}}
                </div>
                <div class="text--primary">
                    [submitted price schedule]
                </div>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="ongoingProcurements[procurement].status == 'Bid Approved'" color="green darken-3" text @click="dialog = false">View Purchase Order</v-btn>
                <v-btn color="blue darken-3" text @click="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
  </v-container>
</template>

<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";

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
  components: {},

  // Data Variables and Values
  data: () => ({
    //
    tab: null,
    dialog: false,
    procurement: null,
    tabs: [
      'New Requests', 'On-Going', 'Completed'
    ],
    ongoingProcurements: [
      {tenderNo: 'UCSC/DIM/G/ENG/2020/0004', publishedDate: '05-06-2020', category: 'Stationeries and Office Consumables', status: 'Quotations Sent', bidOpeningDate: '30-06-2020'},
      {tenderNo: 'UCSC/DIM/G/ENG/2020/0005', publishedDate: '05-06-2020', category: 'Stationeries and Office Consumables', status: 'Bid Approved', bidOpeningDate: '30-06-2020'},
    ],
  }),

  // Custom Methods and Functions
  methods: {
    openDialog: function (key) {
      this.procurement = key
      this.dialog = true
      console.log(key)
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {},
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
