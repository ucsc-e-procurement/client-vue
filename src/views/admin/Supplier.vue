<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container v-if="isLoaded">
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">
                Supplier Profile of <strong>{{ supplier.name }}</strong>
              </h5>
              <v-spacer />
              <v-chip color="success" small outlined class="mx-5"
                >Active</v-chip
              >
              <v-btn small color="red darken-2" dark>Delete</v-btn>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row> </v-row>
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
  props: ["encodedSupplierId", "encodedSupplierName"],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    supplier: null,
    // Loaders
    isLoaded: false
  }),

  // Custom Methods and Functions
  methods: {
    getSupplierById(supplierId) {
      return new Promise((resolve, reject) => {
        this.$http
          .get(`/api/admin/supplier?id=${supplierId}`)
          .then(res => {
            console.log("Supplier: ", res.data);

            this.isLoaded = true;

            resolve(res.data);
          })
          .catch(err => {
            this.isLoaded = true;

            reject(err);
          });
      });
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getSupplierById(atob(this.encodedSupplierId))
      .then(supplier => {
        console.log(supplier);
        this.supplier = supplier;
      })
      .catch(err => {
        console.log(err);
      });
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
<style scoped></style>
