
<template>
    <v-container>
        <v-card flat>
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
                        <td><v-btn color="primary" class="mb-4 mt-4" @click="getSupplierList(result.procurement_id)">Select Supplier</v-btn></td>
                    </tr> 
                </tbody>           
            </table>
        </v-card>
        <v-dialog v-model="dialog1" width="350">
            <v-card>
                <v-card-title>
                    <span class="headline mt-3">Suppliers List</span>
                </v-card-title>
                <v-container class="ml-3">
                <div v-for="result1 in resultsArray1" :key="result1" cols="12">    
                    <input type="radio" id="result1.supplier_id" :value="result1.supplier_id" v-model="picked">
                    <label for="result1.supplier_id"> {{result1.name}}</label>
                    <br><br>
                </div>
                <br/>
                <v-text-field
                  class="deadline"
                  label="Deadline"
                  placeholder="yyyy/mm/dd"
                  outlined
                  v-model="deadline"
                ></v-text-field>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-row class="mb-3">
                    <v-btn color="primary" width="30%" @click="sendRFQDirectOngoingProcurements(picked), dialog1 = false">Send</v-btn>
                    <v-btn color="primary" width="30%" class="ml-3" @click="dialog1 = false, picked= '', deadline= ''">Close</v-btn>
                  </v-row>
                </v-card-actions>
                </v-container>
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
    search: '',
    dialog1: false,
    resultsArray: [],
    resultsArray1: [],
    picked: '',
    procurementId: '',
    date: new Date().toISOString().substr(0, 10),

  }),

  // Custom Methods and Functions
  methods: {
    // get direct ongoing procurements
    getDirectOngoingProcurements() {
      this.$http
        .get(
          `/api/admin/direct_ongoing_procurements`
        )
        .then(response => {
          this.resultsArray = response.data; 
          console.log("resultsArray",this.resultsArray)
        })
        .catch(err => {
          console.log(err);
        });
    },

    // get list of suppliers
    getSupplierList(procurementId) {
      this.procurementId = procurementId
      this.dialog1 = true
      this.$http
        .get(
          `/api/admin/direct_ongoing_procurements/suppliers`
        )
        .then(response => {
          this.resultsArray1 = response.data; 
          console.log("resultsArray1",this.resultsArray1)
        })
        .catch(err => {
          console.log(err);
        });
    },

    
    // send rfq
    sendRFQDirectOngoingProcurements(supplierId) {
      console.log("procurement_id",this.procurementId,this.deadline)
      console.log("supplier_id",supplierId)
      this.$http
        .post(
          `/api/admin/direct_ongoing_procurements/suppliers/send_rfq?supplierId=${supplierId}&procurementId=${this.procurementId}&date=${this.date}&deadline=${this.deadline}`
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  // Life Cycle Hooks
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.getDirectOngoingProcurements();
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
  .deadline {
    width: 70%;
  }
</style>
