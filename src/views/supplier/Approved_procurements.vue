<template>
  <v-container v-if="allCompletedProcurements">
    <v-card flat>
      <template v-for="(item, key) in completedProcurements">
        <v-card :key="item.tenderNo" class="mx-auto" max-width="800" flat>
          <v-card-text>
            <div>Tender Number : {{ item.procurement_id }}</div>
            <p class="text-h6">
              {{ item.category }}
            </p>
            <div class="text--primary">Published Date : {{ ('0' + new Date(item.date).getDate()).slice(-2) + ' - ' + ('0' + (new Date(item.date).getMonth()+1)).slice(-2) + ' - ' + new Date(item.date).getFullYear() }}}</div>
            <div class="text--primary">
              Completed Date : {{ ('0' + new Date(item.completed_date).getDate()).slice(-2) + ' - ' + ('0' + (new Date(item.completed_date).getMonth()+1)).slice(-2) + ' - ' + new Date(item.completed_date).getFullYear() }}
            </div>
            <div class="text--primary">
              Status : {{ item.procurement_status }}
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
          v-if="key != allCompletedProcurements.length - 1"
        ></v-divider>
      </template>
    </v-card>
    <template>
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="Math.ceil(allCompletedProcurements.length / perPage)"
          circle
        ></v-pagination>
      </div>
    </template>
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
            {{ completedProcurements[procurement].procurement_id }}</span
          >
        </v-card-title>
        <v-card-text>
          <p class="text-h6">
            {{ completedProcurements[procurement].category }}
          </p>
          <div class="text--primary">
            Published Date : {{ ('0' + new Date(completedProcurements[procurement].date).getDate()).slice(-2) + ' - ' + ('0' + (new Date(completedProcurements[procurement].date).getMonth()+1)).slice(-2) + ' - ' + new Date(completedProcurements[procurement].date).getFullYear() }}
          </div>
          <div class="text--primary">
            Bid Opened Date :
            {{ ('0' + new Date(completedProcurements[procurement].bid_opening_date).getDate()).slice(-2) + ' - ' + ('0' + (new Date(completedProcurements[procurement].bid_opening_date).getMonth()+1)).slice(-2) + ' - ' + new Date(completedProcurements[procurement].bid_opening_date).getFullYear() }}
          </div>
          <div class="text--primary">
            Completed Date :
            {{ ('0' + new Date(completedProcurements[procurement].completed_date).getDate()).slice(-2) + ' - ' + ('0' + (new Date(completedProcurements[procurement].completed_date).getMonth()+1)).slice(-2) + ' - ' + new Date(completedProcurements[procurement].completed_date).getFullYear() }}
          </div>
          <div class="text--primary">
            Status : {{ completedProcurements[procurement].procurement_status }}
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
                    completedProcurements[procurement].bids
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
            {{ completedProcurements[procurement].total_with_vat }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <!-- <v-btn color="green darken-3" text @click="dialog = false">View Purchase Order</v-btn> -->

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
    user: null,
    tab: null,
    dialog: false,
    procurement: null,
    page: 1,
    perPage: 10,
    allCompletedProcurements: null
  }),

  // Custom Methods and Functions
  methods: {
    openDialog: function(key) {
      this.procurement = key;
      this.dialog = true;
      console.log(key);
    },

    fetchCompletedProcurements(supplier_id) {
      this.$http
        .get("/api/supplier/get_completed_procurements", {
          params: {
            id: supplier_id
          }
        })
        .then(response => {
          console.log(response.data);
          this.allCompletedProcurements = response.data;
          console.log(
            "fetched",
            JSON.parse(this.allCompletedProcurements[0].bids)
          );
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
    // this.fetchCompletedProcurements("s000001");
    this.user = this.$store.getters.user.supplier_id
    this.fetchCompletedProcurements(this.user)
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},

  // Computed Properties
  computed: {
    completedProcurements() {
      return this.allCompletedProcurements.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    }
  }
};
</script>

// Custom CSS Rules and Classes
<style scoped></style>
