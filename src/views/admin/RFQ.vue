<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Request for Quatations</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>
            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row class="justify-space-between">
              <v-col cols="12">
                <v-card flat>
                  <v-tabs v-model="tab" background-color="transparent" grow>
                    <v-tab v-for="tab in tabs" :key="tab">
                      {{ tab }}
                    </v-tab>
                  </v-tabs>
                  <v-divider></v-divider>
                  <v-tabs-items v-model="tab">
                    <v-tab-item>
                      <RFQDirectOngoingProcurements />
                    </v-tab-item>
                    <v-tab-item>
                      <RFQShoppingOngoingProcurements />
                    </v-tab-item>
                  </v-tabs-items>
                </v-card>
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
import RFQDirectOngoingProcurements from "./RFQ_Direct_Ongoing_Procurements";
import RFQShoppingOngoingProcurements from "./RFQ_Shopping_Ongoing_Procurements";

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
  components: { RFQDirectOngoingProcurements, RFQShoppingOngoingProcurements },

  // Data Variables and Values
  data: () => ({
    search: "",
    tab: null,
    tabs: ["Direct Method", "Shopping Method"],
    resultsArray: []
  }),

  // Custom Methods and Functions
  methods: {
    // get direct ongoing procurements
    getDirectOngoingProcurements() {
      this.$http
        .get(`/api/admin/direct_ongoing_procurements`)
        .then(response => {
          this.resultsArray = response.data;
          console.log("resultsArray", this.resultsArray);
        })
        .catch(err => {
          console.log(err);
        });
    },

    // get shopping ongoing procurements
    getShoppingOngoingProcurements() {
      this.$http
        .get(`/api/admin/shopping_ongoing_procurements`)
        .then(response => {
          this.resultsArray = response.data;
          console.log("resultsArray", this.resultsArray);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getDirectOngoingProcurements();
    this.getShoppingOngoingProcurements();
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
th,
td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
</style>
