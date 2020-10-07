<template>
  <v-container>
    <v-card flat v-if="ongoingProcurements">
      <template v-for="(item, key) in ongoingProcurements">
        <v-card :key="item.tenderNo" class="mx-auto" max-width="800" flat>
          <br v-if="item.bid_status === 'approved' && item.step === 9" />
          <P v-if="item.bid_status === 'approved' && item.step === 9">
            <v-icon left color="green darken-3">mdi-check-circle</v-icon>
            APPROVED
          </P>
          <!-- <v-badge
                    v-if="item.status==='Bid Approved'"
                    inline
                    left
                    color="green darken-3"
                    icon="mdi-check-circle"
                    >
                    APPROVED
                    </v-badge> -->
          <v-card-text>
            <div>Tender Number : {{ item.procurement_id }}</div>
            <p class="text-h6">
              {{ item.category }}
            </p>
            <!-- <div class="text--primary">Status : {{ item.bid_status }}</div> -->
            <div class="text--primary">
              Bid Opening Date : {{ ('0' + new Date(item.bid_opening_date).getDate()).slice(-2) + ' - ' + ('0' + (new Date(item.bid_opening_date).getMonth()+1)).slice(-2) + ' - ' + new Date(item.bid_opening_date).getFullYear() }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="blue darken-3" @click="openDialog(key)">
              View
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-divider
          :key="key"
          v-if="key != ongoingProcurements.length - 1"
        ></v-divider>
      </template>
    </v-card>
    <v-dialog
      v-if="dialog"
      :procurement="procurement"
      v-model="dialog"
      width="650px"
    >
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
          <span class="headline"
            >Tender Number :
            {{ ongoingProcurements[procurement].procurement_id }}</span
          >
        </v-card-title>
        <v-card-text>
          <p class="text-h6">
            {{ ongoingProcurements[procurement].category }}
          </p>
          <div class="text--primary">
            Published Date : {{ ('0' + new Date(ongoingProcurements[procurement].date).getDate()).slice(-2) + ' - ' + ('0' + (new Date(ongoingProcurements[procurement].date).getMonth()+1)).slice(-2) + ' - ' + new Date(ongoingProcurements[procurement].date).getFullYear() }}
          </div>
          <div class="text--primary">
            Bid opening Date :
            {{ ('0' + new Date(ongoingProcurements[procurement].bid_opening_date).getDate()).slice(-2) + ' - ' + ('0' + (new Date(ongoingProcurements[procurement].bid_opening_date).getMonth()+1)).slice(-2) + ' - ' + new Date(ongoingProcurements[procurement].bid_opening_date).getFullYear() }}
          </div>
          <div class="text--primary">
            Status : {{ ongoingProcurements[procurement].bid_status }}
          </div>
          <p class="text--primary text-decoration-underline text-center">
            Submitted Bid
          </p>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Item</th>
                  <th class="text-left">Quantity</th>
                  <th class="text-left">Unit Price</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in JSON.parse(
                    ongoingProcurements[procurement].bids
                  )"
                  :key="item.name"
                >
                  <td>{{ item.product_name }}</td>
                  <td>{{ item.qty }}</td>
                  <td>{{ item.unit_price }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <p class="text--primary text-center">
            Total with VAT(LKR):
            {{ ongoingProcurements[procurement].total_with_vat }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <!-- <v-btn v-if="ongoingProcurements[procurement].bid_status == 'approved'" color="green darken-3" text @click="dialog = false">View Purchase Order</v-btn> -->

          <v-btn color="blue darken-3" text @click="dialog = false"
            >Close</v-btn
          >
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
    user:null,
    tab: null,
    dialog: false,
    procurement: null,
    tabs: ["New Requests", "On-Going", "Completed"],
    ongoingProcurements: null
  }),

  // Custom Methods and Functions
  methods: {
    openDialog: function(key) {
      this.procurement = key;
      this.dialog = true;
      console.log(key);
    },
    fetchOngoingProcurements(supplier_id) {
      this.$http
        .get("/api/supplier/get_ongoing_procurements", {
          params: {
            id: supplier_id
          }
        })
        .then(response => {
          console.log(response.data);
          this.ongoingProcurements = response.data;
          console.log("fetched", JSON.parse(this.ongoingProcurements[0].bids));
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    // this.fetchOngoingProcurements("s000001");
    this.user = this.$store.getters.user.supplier_id
    console.log('sup id', this.$store.getters.user.supplier_id)
    this.fetchOngoingProcurements(this.user)
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
