<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Procurements</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-card class="mx-auto" min-width=1000>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          height=60
          grow
        >
          <v-tab
            v-for="tab in tabs"
            :key="tab"
          >
            {{ tab }}
          </v-tab>
        </v-tabs>
        <v-divider></v-divider>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <NewRequests v-if="supplier" v-bind:supplier="supplier[0]"/>
          </v-tab-item>
          <v-tab-item>
            <OngoingProcurements />
          </v-tab-item>
          <v-tab-item>
            <ApprovedProcurements />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";
import NewRequests from "./New_requests";
import OngoingProcurements from "./Ongoing_procurements";
import ApprovedProcurements from "./Approved_procurements";

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
  components: { NewRequests, OngoingProcurements, ApprovedProcurements },

  // Data Variables and Values
  data: () => ({
    //
    tab: null,
    dialog: false,
    procurement: null,
    tabs: [
      'New Requests', 'On-Going', 'Completed'
    ],
    supplier: null
  }),

  // Custom Methods and Functions
  methods: {
    getSupplier(supplier_id) {
      this.$http.get('/api/supplier/get_supplier', {
        params: {
          id: supplier_id
        }
      })
      .then(response => {
        console.log(response.data);
        this.supplier = response.data
      })
      .catch(error => {
        console.log(error);
      });
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.getSupplier('s0001')
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
<style scoped></style>
