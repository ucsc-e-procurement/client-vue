<template>
  <v-container fluid class="px-0 py-0">
    <v-row class="justify-space-between">
      <v-col cols="12">
        <v-card>
            <v-card-title class="text-center justify-center py-6">
                <h4 class="font-weight-bold ">Purchase Orders</h4>
            </v-card-title>
            <v-divider></v-divider>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Procurement ID</th>
                        <th>Category</th>
                        <th></th>
                    </tr>
                </thead>  
                <tbody>
                    <tr v-for="result in resultsArray" :key="result" cols="12">
                        <td>{{result.procurement_id}}</td>
                        <td>{{result.category}}</td>
                        <td><v-btn color="primary" class="mb-4 mt-4" @click="gotoGeneratePurchaseOrder(result.procurement_id)">Generate Purchase Order</v-btn></td>
                    </tr> 
                </tbody>           
            </table>
        </v-card>
      </v-col>
    </v-row>
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
    date: new Date().toISOString().substr(0, 10),

  }),

  // Custom Methods and Functions
  methods: {
    gotoGeneratePurchaseOrder(id){
      console.log("test",id)
      this.$router
      .push({ query: {id: id}, path: `purchase_orders/${id.replace(/[/]/g, '')}`})
    },

    // get data for the PO
    getList() {
      this.$http
        .get(
          `/api/admin/purchase_orders`
        )
        .then(response => {
          this.resultsArray = response.data; 
        })
        .catch(err => {
          console.log(err);
        });
    },
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
      this.getList();
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
  overflow: scroll;
}
table {
  border-collapse: collapse;
  width: 95%;
  margin: 25px;
}
th, td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
</style>
