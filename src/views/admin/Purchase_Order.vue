<template>
  <v-container fluid class="px-0 py-0">
    <v-btn @click="dialog = true">Generate Purchase Order</v-btn>
    <v-dialog v-if="dialog" v-model="dialog" width="1200px">
      <v-card class="scroll">
        <v-card-title>
          <span class="headline primary pa-2">Purchase Order</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <div class="text--primary">
                <b>Purchase From : </b><br />
                Sachini Nayanathara <br />
                35, Reid Avenue, <br />
                Colombo 07. <br />
                Sri Lanka <br />
              </div>
            </v-col>
            <v-col cols="4">
              <div class="text--primary">
                <b>Deliver To : </b><br />
                University of Colombo School of Computing <br />
                35, Reid Avenue, <br />
                Colombo 07. <br />
                Sri Lanka <br />
              </div>
            </v-col>
            <v-col cols="2">
              <div class="text--primary">
                <v-text-field
                  readonly=""
                  label="P.O.No"
                  placeholder=" "
                  outlined
                ></v-text-field>
                <v-text-field
                  readonly=""
                  label="Quotation No"
                  placeholder=" "
                  outlined
                ></v-text-field>
              </div>
            </v-col>
            <v-col cols="2">
              <div class="text--primary">
                <v-text-field
                  readonly=""
                  label="Your Ref. No"
                  placeholder=" "
                  outlined
                ></v-text-field>
                <v-text-field
                  readonly=""
                  label="P.O.Date"
                  placeholder=" "
                  outlined
                  v-model="date"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>
          <p>
            This is reference to the above quotation number dated [DATE]. We
            wish to inform you that your quotation has been approved. Please
            supply the under mentioned items to the University of Colombo School
            of Computing on or before [DELIVERY DATE] together with the original
            invoice.
          </p>
        </v-card-text>
        <br />
        <!-- <v-data-table
                :headers="purchaseOrderHeaders"
                :items="resultsArray"
                :search="search"
            ></v-data-table> -->
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in resultsArray" :key="result" cols="12">
              <td>{{ result.make }}</td>
              <td>{{ result.quantity }}</td>
              <td>{{ result.unit_price }}</td>
              <td>{{ result.quantity * result.unit_price }}</td>
            </tr>
          </tbody>
        </table>
        <v-spacer></v-spacer>
        <br />
        <div>
          <ul>
            Terms & Conditions
            <li>
              Goods which are not conformed to the Specifications given in the
              quotation /details stated in the order will not be accepted
            </li>
            <li>No price increase will be considered</li>
            <li>
              Payment will be made after fully supplying of items as per the
              Terms and Conditions
            </li>
            <li>
              Delivery of Goods should be acknowledged by the receiving officer
            </li>
            <li>Stamp Duty is applicable</li>
          </ul>
        </div>
        <br />
        <v-card-actions>
          <v-btn color="primary">Send</v-btn>
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

// const gradients = [
//   ["#222"],
//   ["#42b3f4"],
//   ["red", "orange", "yellow"],
//   ["purple", "violet"],
//   ["#00c6ff", "#F0F", "#FF0"],
//   ["#f72047", "#ffd200", "#1feaea"]
// ];

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
    // Dummy Data
    dialog: false,
    resultsArray: [],
    // purchaseOrderHeaders: [
    // { text: 'S.No', align: 'start', value: 's.no'},
    // { text: 'Description', value: 'description' },
    // { text: 'Quantity', align: 'start', value: 'quantity'},
    // { text: 'UoM', value: 'uom' },
    // { text: 'Unit Price(Rs.)', value: 'unit_price' },
    // { text: "Amount(Rs.)", value: 'amount' }
    // ],
    date: new Date().toISOString().substr(0, 10)
  }),

  // Custom Methods and Functions
  methods: {
    // get data for the PO
    getData() {
      this.$http
        .get(`/api/admin/purchase_order`)
        .then(response => {
          this.resultsArray = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getData();
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
<style scoped>
.scroll {
  height: 900px;
}
table {
  border-collapse: collapse;
  width: 100%;
  margin: 25px;
}
th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>
