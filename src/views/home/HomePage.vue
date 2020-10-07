<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-row>
              <!-- <div class="cover"></div> -->
              <v-img :src="require('../../assets/ucsc.jpg')" style="height:20%"></v-img>
            </v-row>
        <v-card flat>
          <v-container>
            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row no-gutters>
              <v-spacer />
              <v-btn color="primary" @click="gotoLogin()">Login</v-btn>
            </v-row>
            <!-- <v-row>
              <v-img :src="require('../../assets/ucsc.jpg')" style="height=20%"></v-img>
            </v-row> -->
            <!-- <v-row style="height=20%"></v-row> -->
            <v-row class="justify-space-between">
                <v-col cols="7">
                  <h1 style="text-align:center">UCSC E-Procurement System</h1>
                  <hr/><br/><br/>
                  <p style="text-align:justify">Welcome to the E - Procurement system of University of Colombo School of Computing. Here you will find key information relating to business opportunities with the UCSC. <br/><br/>
                  If you are interested in participating in a specific procurement opportunity, please use this system to register.</p>
                  <br/><br/>
                  <h3 style="text-align:center">Ethics in UCSC Procurement</h3>
                  <br/><br/>
                  <p style="text-align:justify">Ethical behavior is a requirement in UCSC procurement. The UCSC expends public funds and it is committed to ensuring all procurement actions stand-up to public scrutiny. 
                    UCSC staff are responsible for protecting the integrity of the procurement process and maintaining fairness in treatment of all suppliers. 
                    Suppliers must observe and act in accordance with the highest standards of ethics and professional conduct in their dealings with the UCSC. </p>

                  <br/><br/>
                  <h3 style="text-align:center">Important legal notice</h3>
                  <br/><br/>
                  <p style="text-align:justify">The UCSC reserves the right to accept or reject any bid, and to annul, in whole or in part, or to suspend the bidding process and reject all bids at any time prior to contract award, 
                    without thereby incurring any liability to the affected bidder or bidders or any obligation to inform the affected bidder or bidders of the reasons for the UCSC's action.</p>
                </v-col>
                <v-col cols="5">
                  <v-card>
                    <v-card-title class="text-center justify-center py-6">
                        <h4 class="font-weight-bold">Ongoing Procurements</h4>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-col v-if="resultsArray.length == 0" cols="12">
                      <v-alert type="info" outlined border="left">
                        No Any On-going Procurements Available
                      </v-alert>
                    </v-col>
                    <v-col v-else cols="12">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Procurement ID</th>
                                <th>Category</th>
                                <th>Date initialised</th>
                                <th></th>
                            </tr>
                        </thead>  
                        <tbody>
                            <tr v-for="result in resultsArray" :key="result" cols="12">
                                <td>{{result.procurement_id}}</td>
                                <td>{{result.category}}</td>
                                <td>{{result.bid_opening_date}}</td>
                                <td><v-btn color="primary" class="mb-4 mt-4" @click="getOngoingProcurementsData(result.procurement_id)">View</v-btn></td>
                            </tr> 
                        </tbody>           
                    </table>
                    <v-dialog v-model="dialog2" width="300">
                      <v-card>
                        <v-card-title><h4></h4></v-card-title>
                        <v-card-text
                          >There are no bids for this procurement</v-card-text
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" @click="dialog2 = false">OK</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    </v-col>
                  </v-card>
                </v-col>
            </v-row>
            <v-dialog v-model="dialog1" width="750">
                <v-card v-for="result1 in resultsArray1" :key="result1" cols="12">
                    <v-card-title>
                        <span class="headline mt-3"><b>Procurement ID : {{result1.procurement_id}}</b></span>
                    </v-card-title>
                    <v-card-text>
                        <!-- <p class="text-h6">
                            {{result1.name}}
                        </p> -->
                        <div class="text--primary">
                            Bid Opening Date : {{result1.bid_opening_date}}
                        </div>
                        <div class="text--primary">
                            Bid Closing Date : {{result1.expiration_date}}
                        </div>
                        <br/>
                        <v-divider></v-divider>
                        <br/><br/>
                        <p class="text-h6 text-center">
                          <b>Submitted Bids</b>
                        </p>
                    </v-card-text>  
                    <div v-for="bid in result1.bids" :key="bid" cols="12">
                    <b class="ml-6"> Item : {{bid[0].product_name}} </b>    
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Supplier</th>
                                <th>Quantity</th>
                                <th>Unit price</th>
                                <th>total with VAT</th>
                            </tr>
                        </thead>  
                        <tbody>
                                <tr v-for="product in bid" :key="product" cols="12">
                                <td>{{product.supplier_name}}</td>
                                <td>{{product.qty}}</td> 
                                <td>{{product.unit_price}}</td>
                                <td>{{product.total_with_vat}}</td>
                            </tr>          
                        </tbody>           
                    </table>
                    <br/><br/>
                    </div>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="dialog1 = false">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
          </v-container>
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

/* Note: When Declaring Variables, always think about how Form Validation Rules are applied */
export default {
  // Mixins
  // mixins: [validationMixin],

  // Form Validations
  // validations: {},

  // Props Received
  props: [],

  // Imported Components

  // Data Variables and Values
  data: () => ({
      dialog1: false,
      dialog2: false,
      resultsArray: [],
      resultsArray1: []
  }),

  // Custom Methods and Functions
  methods: {
    // go to login page
    gotoLogin() {
      this.$router.push({
        path: `login/`
      });
    },

    // get ongoing procurements
    getOngoingProcurements() {
      this.$http
        .get(
          `/api/home_page`
        )
        .then(response => {
          this.resultsArray = response.data; 
          // this.subTotal = this.resultsArray[0].total;
          // this.grantTotal = this.resultsArray[0].total_with_vat;
          // this.deliveryDate = this.resultsArray[0].delivery_date;
          // this.supplierName = this.resultsArray[0].name;
          // this.supplierAddress = this.resultsArray[0].address;
          console.log("resultsArray",this.resultsArray)
        })
        .catch(err => {
          console.log(err);
        });
    },

    // get ongoing procurements data
    getOngoingProcurementsData(id) {
      console.log("ids", id)
      this.$http
        .get(
          `/api/home_page/details?procurementId=${id}`
        )
        .then(response => {
          console.log("id", id)
          this.resultsArray1 = response.data; 
          console.log("resultsarray1",this.resultsArray1)
          if (this.resultsArray1 == 0) {
            this.dialog2 = true;
          } 
          else {
            this.dialog1 = true;
          }
          this.resultsArray1.forEach(element => {
              if(element.bids) {
                  element.bids = JSON.parse(element.bids)
                  element.bids = element.bids.reduce((r, a) => {
                      console.log("a", a);
                      console.log('r', r);
                      r[a.product_id] = [...r[a.product_id] || [], a];
                      return r;
              }, {})
          }
        });
        })
        .catch(err => {
          console.log(err);
        });
    },

  },
  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getOngoingProcurements();
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
.cover {
  width: 100%;
  height: 30%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("../../assets/ucsc.jpg") no-repeat center center;
  background-size: cover;

  /* transform: scale(1); */
}
</style>
