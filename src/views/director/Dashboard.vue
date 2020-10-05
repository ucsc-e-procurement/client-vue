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
            <v-row>
              <infoCardThisYear />
            </v-row>
            <v-row>
              <v-col cols="8">
                <recentPurchases />
                <v-row>
                  <v-col cols="6">
                    <ChartLastYearProcurements />
                  </v-col>
                  <v-col cols="6">
                    <ChartLastYearProcurements />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="4">
                <approvedRequisitions />
                <v-row>
                  <infoCardThisMonth />
                </v-row>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="12" md="12"> </v-col>
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
  import InfoCardThisYear from "./dashboard_components/InfoCardThisYear"
  import RecentPurchases from "./dashboard_components/RecentPurchases"
  import ApprovedRequisitions from "./dashboard_components/ApprovedRequisitions"
  import InfoCardThisMonth from "./dashboard_components/InfoCardThisMonth"
  import ChartLastYearProcurements from "./dashboard_components/ChartLastYearProcurements"
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
    infoCardThisYear: InfoCardThisYear,
    recentPurchases: RecentPurchases,
    approvedRequisitions: ApprovedRequisitions,
    infoCardThisMonth: InfoCardThisMonth,
    ChartLastYearProcurements: ChartLastYearProcurements
  },

  // Data Variables and Values
  data: () => ({
    isMounted: false
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
<style scoped>
.scroll {
  overflow-y: scroll;
}
</style>
