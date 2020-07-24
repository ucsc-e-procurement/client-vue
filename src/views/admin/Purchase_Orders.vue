<template>
  <v-container fluid class="px-0 py-0">
    <v-toolbar flat color="primary" class="mt-3">
      <v-toolbar-title>Purchase Orders</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card color="#f2f4f2" class="scroll mt-3"> 
      <v-col v-for="result in resultsArray" :key="result" cols="12">
        <v-card color="white" class="mt-3">
          <div class="d-flex justify-space-between">
            <v-col cols="6" class="ml-4">
              <v-text-field v-text="result.procurement_id"></v-text-field>
              <!-- <v-text-field v-text="result.division"></v-text-field> -->
              <!-- <v-text-field v-text="result.date"></v-text-field> -->
            </v-col>
            <v-col cols="3" class="mr-6">
            <v-btn @click="gotoGeneratePurchaseOrder(result.procurement_id)">Generate Purchase Order</v-btn>
            </v-col>
          </div>
        </v-card>
      </v-col>
    </v-card>
        <!-- <v-dialog  v-if="dialog"  v-model="dialog" width="85%">
         <v-card class="scroll">                
            <v-card-title>
            <span class="headline primary pa-2">Purchase Order</span>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="2">
                        <div class="text--primary">
                            <b>Deliver From :</b><br/>
                            {{supplierName}}<br/>	
                            {{supplierAddress}}<br/>		
                        </div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text--primary">                           
                            <b>Deliver To : </b><br/>
                            University of Colombo School of Computing <br/>	
                            35, Reid Avenue, <br/>		
                            Colombo 07.	<br/>
                            Sri Lanka <br/>
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="text--primary">                           
                            <v-text-field  
                                readonly=""               
                                label="P.O.No"
                                placeholder=" "
                                outlined>
                            </v-text-field>
                            <v-text-field
                                readonly=""
                                label="Quotation No"
                                placeholder=" "
                                outlined>
                            </v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="text--primary">
                            <v-text-field  
                                readonly=""                                                          
                                label="Your Ref. No"
                                placeholder=" "
                                outlined></v-text-field>
                            <v-text-field
                                readonly=""
                                label="P.O.Date"
                                placeholder=" "
                                outlined
                                v-model="date"></v-text-field>
                        </div>
                    </v-col>
                </v-row>
                <p class="text--primary">This is reference to the above quotation number dated [DATE]. We wish to inform you that your quotation has been approved.  Please supply the under mentioned items to the University of Colombo School of Computing on or before {{this.deliveryDate}}  together with the original invoice.</p>	
            </v-card-text>
            <br/>					           -->
            <!-- <v-data-table
                :headers="purchaseOrderHeaders"
                :items="resultsArray"
                :search="search"
            ></v-data-table> -->
            <!-- <table class="table table-bordered">
                <thead>
                    <tr>
                        <th class='alignCenter'>S.No</th>
                        <th class='alignCenter'>Description</th>
                        <th>Quantity</th>
                        <th>UoM</th>
                        <th>Unit Price(Rs.)</th>
                        <th>Amount(Rs.)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(result,index) in resultsArray" :key="index" cols="12">
                        <td class='alignCenter'>{{ index + 1 }}</td>
                        <td class='alignCenter'>{{result.product_name }}</td>
                        <td>{{result.quantity }}</td>
                        <td></td>
                        <td>{{result.unit_price }}</td>
                        <td>{{result.quantity * result.unit_price }}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Sub Total</td>
                        <td>{{this.subTotal}}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Grant Total</td>
                        <td>{{this.grantTotal}}</td>
                    </tr>
                </tbody>               
            </table>
            <v-spacer></v-spacer>
            <br/>
            <div>
            <ul>Terms & Conditions
                <li>Goods which are not conformed to the Specifications given in the quotation /details stated in the order will not be accepted</li>
                <li>No price increase will be considered</li>
                <li>Payment will be made after fully supplying of items as per the Terms and Conditions</li>
                <li>Delivery of Goods should be acknowledged by the receiving officer</li>   
                <li>Stamp Duty is applicable</li>
            </ul>
            </div>	
            <br/><br/>
            <v-card-actions>				
            <v-btn color="primary">Show Preview</v-btn>
            <v-btn color="secondary" @click="dialog = false">Close</v-btn>
            </v-card-actions>            
        </v-card>
    </v-dialog> -->
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
  padding: 8px;
  text-align: right;
  border-bottom: 1px solid #ddd;
}
.alignCenter{
  text-align: center;
}
.text-underline{
  border-bottom: none;
  outline: none;
}
</style>
