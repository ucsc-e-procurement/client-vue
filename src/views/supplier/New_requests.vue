<template>
  <v-container>
        <v-card flat>
            <template v-for="(item,key) in newRequests">
                <v-card :key="item.tenderNo"
                  class="mx-auto"
                  max-width="800"
                  flat
                >
                    <v-card-text>
                      <div>Tender Number : {{item.tenderNo}}</div>
                      <p class="text-h6">
                        {{item.category}}
                      </p>
                      <div class="text--primary">
                        Published Date : {{item.publishedDate}}
                      </div>
                      <div class="text--primary">
                        Expiry Date : {{item.expiryDate}}
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
                <v-divider :key="key" v-if="key != newRequests.length - 1"></v-divider>
            </template>
        </v-card>
        <v-dialog  v-if="dialog" :procurement="procurement" v-model="dialog" width="710px">
            <v-card>
                <v-card-title>
                <span class="headline">INVITATION OF QUOTATIONS : {{newRequests[procurement].tenderNo}}</span>
                </v-card-title>
                <v-card-text>
                <!-- <p class="text-h6">
                    {{newRequests[procurement].category}}
                </p>
                <div class="text--primary">
                    Published Date : {{newRequests[procurement].publishedDate}}
                </div>
                <div class="text--primary">
                    Completed Date : {{newRequests[procurement].completedDate}}
                </div>
                <div class="text--primary">
                    --- other details ---
                </div> -->
                <p class="text--primary">
                    {{newRequests[procurement].publishedDate}}
                </p>
                <p class="text--primary">
                    Quotation No: {{newRequests[procurement].tenderNo}}
                </p>
                <p class="text--primary">
                    The Manager, <br/>
                    [Company Name] <br/>
                    [Address] 
                </p>
                <p class="text--primary">
                    Dear Sir,
                </p> 
                <p class="text--primary text-decoration-underline">
                    INVITATION OF QUOTATIONS FOR – {{newRequests[procurement].tenderNo}} ({{newRequests[procurement].category}}).
                </p> 
                <p class="text--primary">
                    The University of Colombo School of Computing hereby requests sealed quotations for Supply & Delivery of {{newRequests[procurement].category}} & Quantity.
                </p> 

                [[Items & Quantity]]
                
                <p class="text--primary">
                    [[The duly completed quotation should be sent by under registered post or dropped into the tender Box at the Finance Branch 4th floor of the University of Colombo School of Computing No 35, Reid Avenue, Colombo 00700. on or before 2.30 PM Closing Date. 
                    It is required to mention as “Tender Name & Tender Number. in the top left hand corner of the envelope.]] <br/>
                    The duly completed quotation should be submitted through the website on or before 2.30 PM {{newRequests[procurement].expiryDate}}
                </p> 
                <p class="text--primary">
                    NOTE: PLEASE QUOTE MOST COMPETITIVE ITEM AND OPTIONS ARE NOT ALLOWED. <br/>
                    Please attach authorized certificate with the quotation.                
                </p> 
                <p class="text--primary">
                    Thank you <br/>
                    Yours faithfully, <br/>
                    Assistant Bursar/Procurement <br/>
                    UCSC.                
                </p> 

                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-3" text @click="dialog = false">Submit Bid</v-btn>
                <v-btn color="grey darken-3" text @click="dialog = false">Not Interested</v-btn>
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
    newRequests: [
      {tenderNo: 'UCSC/DIM/G/ENG/2020/0006', publishedDate: '18-06-2020', category: 'Sports Goods', expiryDate: '01-07-2020'},
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
