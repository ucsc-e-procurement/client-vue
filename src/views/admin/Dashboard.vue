<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Dashboard</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->

            <!-- Info Card Row -->
            <v-row class="justify-space-between">
              <v-col cols="12">
                <procurement-count />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-card class="px-2">
                  <monthly-product-requisitions :height="150" />
                </v-card>
              </v-col>
            </v-row>

            <v-row>
              <test-chart />
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
// import InfoCard_A from "./components/InfoCard_A";
import TestChart from "./components/Test_Chart";
import ProcurementCount_Cards from "./components/Anual_Procurements_Count";
import MonthlyProductRequisitionChart from "./analytics/Monthly_Product_Requisition_Chart";
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
  // mixins: [Bar],

  // Form Validations
  // validations: {},

  // Props Received
  props: [],

  // Imported Components
  components: {
    // "info-card": InfoCard_A,
    "test-chart": TestChart,
    "procurement-count": ProcurementCount_Cards,
    "monthly-product-requisitions": MonthlyProductRequisitionChart
  },

  // Data Variables and Values
  data: () => ({
    // Dummy Data
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: "round",
    gradient: gradients[5],
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    gradientDirection: "top",
    gradients,
    fill: false,
    type: "trend",
    autoLineWidth: false
  }),

  // Custom Methods and Functions
  methods: {},

  // Life Cycle Hooks
  beforeCreate() {},
  created() {},
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
<style scoped></style>
