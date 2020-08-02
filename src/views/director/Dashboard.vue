<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">THIS YEAR</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->

            <!-- Info Card Row -->
            <v-row class="justify-space-between">
              <v-col cols="3">
                <v-card
                  color="#1976d2"
                  dark
                >
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title class="headline font-weight-bold" style="padding-top: 40px;">
                        <div style="font-size: 50px;">
                          60
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn text>Registered Suppliers</v-btn>
                      </v-card-actions>
                    </div>
                    <v-avatar
                    class="ma-3"
                    slot="icon"
                    color="blue darken-4"
                    size="125"
                  >
                    <v-icon
                      icon="mdi-lock"
                      color="white"
                    >
                      mdi-lock
                    </v-icon>
                  </v-avatar>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card
                  color="#1976d2"
                  dark
                >
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title class="headline font-weight-bold" style="padding-top: 40px;">
                        <div style="font-size: 50px;">
                          20
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn text>Total Requisitions</v-btn>
                      </v-card-actions>
                    </div>
                    <v-avatar
                    class="ma-3"
                    slot="icon"
                    color="yellow darken-3"
                    size="125"
                  >
                    <v-icon
                      icon="mdi-lock"
                      color="white"
                    >
                      mdi-lock
                    </v-icon>
                  </v-avatar>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card
                  color="#1976d2"
                  dark
                >
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title class="headline font-weight-bold" style="padding-top: 40px;">
                        <div style="font-size: 50px;">
                          70%
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn text>Completed</v-btn>
                      </v-card-actions>
                    </div>
                    <v-avatar
                    class="ma-3"
                    slot="icon"
                    color="green lighten-1"
                    size="125"
                  >
                    <v-icon
                      icon="mdi-lock"
                      color="white"
                    >
                      mdi-lock
                    </v-icon>
                  </v-avatar>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card
                  color="#1976d2"
                  dark
                >
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title class="headline font-weight-bold" style="padding-top: 40px;">
                        <div style="font-size: 50px;">
                          30%
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn text>Rejected</v-btn>
                      </v-card-actions>
                    </div>
                    <v-avatar
                    class="ma-3"
                    slot="icon"
                    color="red lighten-1"
                    size="125"
                  >
                    <v-icon
                      icon="mdi-lock"
                      color="white"
                    >
                      mdi-lock
                    </v-icon>
                  </v-avatar>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-row></v-row>
            <v-row>
              <v-col cols="8">
                <v-card>
                  <!-- <v-card-title class="headline">Recently Purchased Products</v-card-title> -->
                  <v-card-title class="text-center justify-center py-6">
                    <h4 class="font-weight-bold ">Recent Purchases</h4>
                    <!-- <v-text-field
                      v-model="search"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field> -->
                  </v-card-title>
                  <v-data-table
                    :headers="headers"
                    :items="recentPurchases"
                    :search="search"
                    :items-per-page=5
                    v-if="isMounted"
                  >
                  </v-data-table>
                </v-card>
              </v-col>
              <v-col cols="4">              
                <v-row v-if="approvedRequisitions.length > 0">
                  <v-card>
                    <v-card-title class="text-center justify-center py-6" height="50%" color="blue lighten-2">
                        <h4 class="font-weight-bold ">Approved Requisitions</h4>
                    </v-card-title>
                    <v-card-text>
                      <v-banner two-line :key="item.requisition_id" v-for="item in this.approvedRequisitions">
                        <v-avatar
                          slot="icon"
                          color="deep-purple accent-4"
                          size="40"
                        >
                          <v-icon
                            icon="mdi-lock"
                            color="white"
                          >
                            mdi-lock
                          </v-icon>
                        </v-avatar>
                          Description: {{item.description}} <br/>
                          Department: {{item.department}} <br/>
                          Date Requested: {{new Date(item.date).getDate() + '/' + new Date(item.date).getMonth() + '/' + new Date(item.date).getFullYear()}}
                        <template v-slot:actions>
                          <v-btn text color="deep-purple accent-4" @click="OpenApprovedRequisitionsDialog(item)">View</v-btn>
                        </template>
                      </v-banner>
                    </v-card-text>
                  </v-card>
                  <v-dialog
                    v-model="approvedRequisitionsDialog"
                    max-width="800px"
                  >
                    <v-card>
                      <v-card-title class="headline">Product Requisition</v-card-title>

                      <v-card-text>
                        <requisition :requisitionData = 'this.approvedRequisition' v-if="isMounted"/>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          color="blue darken-1"
                          text
                          @click="approvedRequisitionsDialog = false"
                        >
                          Close
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
                <v-col v-if="approvedRequisitions.length > 0"></v-col>
                <v-row>
                  <v-card>
                    <v-card-title class="text-center justify-center">
                        <h4 class="font-weight-bold ">This Month</h4>
                    </v-card-title>
                    <v-card-text>
                      <v-col cols="12">
                        <v-row>
                          <v-col cols="6">
                            <v-card height="150" color="deep-purple lighten-3">
                              <v-card-title class="headline font-weight-bold" style="justify-content: center;">
                                <div style="font-size: 50px; padding-top: 10px">
                                  {{this.requisitionCount}}
                                </div>
                              </v-card-title>
                              <v-card-text class="headline " style="text-align: left;">
                                  Purchase Requisitions
                              </v-card-text>
                            </v-card>
                          </v-col>
                          <v-col cols="6">
                            <v-card height="150" color="orange lighten-3">
                              <v-card-title class="headline font-weight-bold" style="justify-content: center;">
                                <div style="font-size: 50px; padding-top: 10px">
                                  {{ongoingProcurementCount}}
                                </div>
                              </v-card-title>
                              <v-card-text class="headline " style="text-align: left;">
                                Ongoing Procurements  
                              </v-card-text>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12">
                        <v-row>
                          <v-col cols="6">
                            <v-card height="150" color="green lighten-3">
                              <v-card-title class="headline font-weight-bold" style="justify-content: center;">
                                <div style="font-size: 50px; padding-top: 10px">
                                  {{completedProcurementCount}}
                                </div>
                              </v-card-title>
                              <v-card-text class="headline " style="text-align: left;">
                                Completed Procurements
                              </v-card-text>
                            </v-card>
                          </v-col>
                          <v-col cols="6">
                            <v-card height="150" color="red lighten-3">
                              <v-card-title class="headline font-weight-bold" style="justify-content: center;">
                                <div style="font-size: 50px; padding-top: 10px">
                                  {{terminatedProcurementCount}}
                                </div>
                              </v-card-title>
                              <v-card-text class="headline " style="text-align: left;">
                                Terminated Procurements
                              </v-card-text>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-card-text>
                  </v-card>
                </v-row>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="12" md="12">
                <!-- bury all your secrets in my skin, go away with innocence and leave me with my sins -->
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";
  import Requisition from "./Requisition"

/*

// Validation Library - Vuelidate
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

*/

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];

/* Note: When Declaring Variables, always think about how Form Validation Rules are applied */
export default {
  // Mixins
  // mixins: [validationMixin],

  // Form Validations
  // validations: {},

  // Props Received
  props: [],

  // Imported Components
  components: {
    requisition: Requisition,
  },

  // Data Variables and Values
  data: () => ({
    search: "",
    requisitionCount: '',
    ongoingProcurementCount: '',
    completedProcurementCount: '',
    terminatedProcurementCount: '',
    approvedRequisitions: [],
    isMounted: false,
    approvedRequisitionsDialog: false,
    approvedRequisition: '',
    recentPurchases: [],

    headers: [
      {
        text: "Product",
        align: "start",
        value: "product_name"
      },
      { text: "Supplier", value: "name" },
      { text: "Quantity", value: "quantity"},
      { text: "Delivery Date", value: "delivery_date" },
    ]
  }),

  // Custom Methods and Functions
  methods: {
    getProcurements(){
      this.$http
        .get("/api/director/procurements")
        .then(response => {
          console.log(response);
          this.ongoingProcurementCount = response.data.filter(item => item.status == 'on-going').length;
          this.completedProcurementCount = response.data.filter(item => item.status == 'completed').length;
          this.terminatedProcurementCount = response.data.filter(item => item.status == 'terminated').length;
          this.requisitionCount = response.data.filter(item => new Date(item.date).getMonth() == new Date().getMonth() && new Date(item.date).getFullYear() == new Date().getFullYear()).length;
          // this.isMounted = true;
        })
        .catch(err => {
          console.log(err);
        })
    },

    getApprovedRequisitions(){
      this.$http
        .get("/api/director/get_approved_requisitions")
        .then(response => {
          // console.log(response)
          this.approvedRequisitions = response.data;
        }).catch(err => {
          console.log(err)
        })
    },

    OpenApprovedRequisitionsDialog(item){
      this.approvedRequisition = item;
      this.isMounted = true;
      this.approvedRequisitionsDialog = true;
    },

    getRecentProducts(){
      this.isMounted = true;
      this.$http
        .get("/api/director/get_recent_products")
        .then(response => {
          console.log(response);
          this.recentPurchases = response.data;
          this.isMounted = true;
        })
        .catch(err => {
          console.log(err);
        })
    },
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getProcurements();
    this.getApprovedRequisitions();
    this.getRecentProducts();
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
    overflow-y: scroll
  }
</style>
