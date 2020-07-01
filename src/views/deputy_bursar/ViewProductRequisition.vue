<template>
  <v-container>
    <v-form>
      <v-card class="overflow-hidden" color="white">
        <v-toolbar flat color="blue">
          <v-toolbar-title>Product Requisition Form</v-toolbar-title>
        </v-toolbar>
        <v-card-text style="margin-top:50px">
            <v-col cols="12">
              <v-text-field :readonly="true" label="Procurement Name" placeholder=" " outlined></v-text-field>
            </v-col>
            <v-row>
              <v-col cols="6">
                <v-text-field :readonly="true" label="Date" placeholder=" " outlined v-model="date"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field :readonly="true" label="Procurement Type" placeholder=" " outlined v-model="procurement_type"></v-text-field>
              </v-col>
            </v-row>
            <v-col cols="12">
              <v-textarea :readonly="true" label="Procurement Description" placeholder=" " outlined v-model="description" height="500"></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="selectedFundType"
                :items="FundType"
                :filter="customFilter"
                item-text="fund"
                label="Enter the Type of Fund"
                required
                outlined>
              </v-autocomplete>
            </v-col>    
        </v-card-text>
        <v-row justify="center" class="mb-10">
          <v-btn color="primary" width="30%" @click="dialog1 = true" :disabled="denied">Approve</v-btn>
          <v-btn color="secondary" class="ml-5" width="30%" @click.once="dialog2 = true" :disabled="submitted" >Deny</v-btn>
        </v-row>
        <v-dialog v-model="dialog1" width="500">
        <v-card>
          <v-card-title><h4> Request Approval</h4></v-card-title>
          <v-card-text>Do you want to approve the request?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" 
              @click.once="approveRequisition();
              dialog1 = false;
              alert1 = true;
              submitted=true">Yes
            </v-btn>
            <v-btn color="secondary" @click="dialog1 = false">No</v-btn>
          </v-card-actions>
        </v-card>
        </v-dialog>
        <v-alert type="success" v-model="alert1" class="text-md-center"> Thank You! Your response has been submitted successfully.</v-alert>
        <v-dialog v-model="dialog2" width="500">
          <v-card>
            <v-card-title><h4 class="ml-6"> Reasons for denial</h4></v-card-title>
              <v-textarea v-model= "remarks" solo></v-textarea> 
              <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" 
                @click="denyRequisition();
                dialog2 = false; 
                alert1 = true;              
                denied=true"
                :disabled="isDisabled">Submit
              </v-btn>
              <v-btn color="secondary" @click="dialog2 = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>        
      </v-card>
    </v-form>
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
  props: ["id"],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    dialog1:false,
    dialog2:false,
    alert1:false,
    description: "",
    procurement_type: "",
    date: "",
    selectedFundType:null,
    denial_reasons:null,
    FundType: [
     {fund: "Recurrent  Grant", abbr:"R", id:1},
     {fund: "Capital Grant", abbr:"C", id:2},
     {fund: "Research Fund", abbr:"R", id:3},
     {fund: " MSC Fund", abbr:"M", id:4},
     {fund: "EDC Fund", abbr:"E", id:5},
     {fund: "UGC Research allocation ", abbr:"U", id:6},     
    ],
    submitted:false,
    denied:false,
    remarks:""
  }),

  // Custom Methods and Functions
  methods: {
    // get product requisition list
    getList(){
      this.$http
        .get(`/api/deputy_bursar/product_requisition`)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // get product requisition form
    getData(){
      this.$http
        .get(`/api/deputy_bursar/product_requisition/details?requisitionId=${this.id}`)
        .then(response => {
          let resultsArray = response.data;
          this.description = resultsArray[0].description;
          this.date = resultsArray[0].date;
          this.procurement_type = resultsArray[0].procurement_type;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // approve the product requisition
    approveRequisition(){
      this.$http
        .post(`/api/deputy_bursar/product_requisition/approve?requisitionId=${this.id}&selectedFundType=${this.selectedFundType}`)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    },

    // deny the product requisition
    denyRequisition(){
      this.$http
        .post(`/api/deputy_bursar/product_requisition/deny?requisitionId=${this.id}&remarks=${this.remarks}`)
        .then(response => {
          console.log(response,this.remarks);
        })
        .catch(err => {
          console.log(err);
        });
        this.remarks = " "
    },
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getData()
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},

  // Computed Properties
  computed: {
    isDisabled: function(){
    	return !this.remarks;
    }
  }
};
</script>

// Custom CSS Rules and Classes
<style scoped></style>
