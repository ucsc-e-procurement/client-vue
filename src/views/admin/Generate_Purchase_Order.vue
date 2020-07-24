<template>
  <v-container fluid class="px-0 py-0">
   <v-col v-for="(result,index) in resultsArray" :key="index" cols="12">
    <br/>
    <v-card class="scroll">                
      <v-card-title>
      <span class="headline primary pa-2">Purchase Order</span>
      </v-card-title>
      <v-card-text>
          <v-row>
              <v-col cols="2">
                  <div class="text--primary">
                      <b>Deliver From :</b><br/>
                      {{result.name}}<br/>	
                      {{result.address}}<br/>		
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
          <!-- <p class="text--primary">This is reference to the above quotation number dated [DATE]. We wish to inform you that your quotation has been approved.  Please supply the under mentioned items to the University of Colombo School of Computing on or before {{this.deliveryDate}}  together with the original invoice.</p>	 -->
      </v-card-text>
      <br/>					          
      <table class="table table-bordered">
          <thead>
              <tr>
                  <!-- <th class='alignCenter'>S.No</th> -->
                  <!-- <th class='alignCenter'>Description</th> -->
                  <th>Quantity</th>
                  <th>UoM</th>
                  <th>Unit Price(Rs.)</th>
                  <!-- <th>Amount(Rs.)</th> -->
              </tr>
          </thead>
          <tbody>
              <tr>
                  <!-- <td class='alignCenter'>{{ index + 1 }}</td> -->
                  <!-- <td class='alignCenter'>{{result1.product_name }}</td> -->
                  <td>{{result.bids[0].quantity}}</td>
                  <td></td>
                  <td>{{result.bids[0].unit_price}}</td>
                  <!-- <td>{{result1.quantity * result1.unit_price }}</td> -->
              </tr>
              <!-- <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Sub Total</td> --> 
                  <!-- <td>{{this.subTotal}}</td> -->
              <!-- </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Grant Total</td> -->
                  <!-- <td>{{this.grantTotal}}</td> -->
              <!-- </tr> -->
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
  </v-col>
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
  props: [
    "id"
  ],

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
    // get data for the PO
    getData() {
      this.$http
        .get(
          `/api/admin/purchase_orders/details?procurementId=${this.$route.query.id}`
        )
        .then(response => {
          this.resultsArray = response.data; 
          // this.subTotal = this.resultsArray[0].total;
          // this.grantTotal = this.resultsArray[0].total_with_vat;
          // this.deliveryDate = this.resultsArray[0].delivery_date;
          // this.supplierName = this.resultsArray[0].name;
          // this.supplierAddress = this.resultsArray[0].address;
          console.log("hi",this.resultsArray)
        })
        .catch(err => {
          console.log(err);
        });
    },
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
      this.getData();
      // this.bids();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},

  // Computed Properties
  computed: {
  //     bids () {
  //       var results = []
  //       Object.values(this.resultsArray).forEach(result => {
  //         results.push({unit_price: result[0].unit_price})
  //       })
  //       console.log('bids', results)
  //     return results
  //   },
  }
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
