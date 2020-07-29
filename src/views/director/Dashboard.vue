<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">This Month</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->

            <!-- Info Card Row -->
            <v-row class="justify-space-between">
              <v-col cols="3">
                <v-card height="100" color="deep-purple lighten-3">
                  <v-card-title></v-card-title>
                  <v-card-text class="headline font-weight-bold" style="text-align: center;">
                      Purchase Requisitions
                      <v-chip
                        class="ma-2"
                        color="deep-purple lighten-2"
                      >
                        {{this.requisitionCount}}
                      </v-chip>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card height="100" color="orange lighten-3">
                  <v-card-title></v-card-title>
                  <v-card-text class="headline font-weight-bold" style="text-align: center;">
                    Ongoing Procurements
                    <v-chip
                      class="ma-2"
                      color="orange lighten-2"
                    >
                      {{ongoingProcurementCount}}
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card height="100" color="green lighten-3">
                  <v-card-title></v-card-title>
                  <v-card-text class="headline font-weight-bold" style="text-align: center;">
                    Completed Procurements
                    <v-chip
                      class="ma-2"
                      color="green lighten-2"
                    >
                      {{completedProcurementCount}}
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card height="100" color="red lighten-3">
                  <v-card-title></v-card-title>
                  <v-card-text class="headline font-weight-bold" style="text-align: center;">
                    Terminated Procurements
                    <v-chip
                      class="ma-2"
                      color="red lighten-2"
                    >
                      {{terminatedProcurementCount}}
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row></v-row>
            <v-row>
              <v-col cols="6">
                <v-card class="scroll">
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
              </v-col>
              <v-col cols="6">
                <v-card>
                  <!-- <v-card-title class="headline">Recently Purchased Products</v-card-title> -->
                  <v-card-title class="text-center justify-center py-6">
                    <h4 class="font-weight-bold ">Recently Purchased Products</h4>
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
