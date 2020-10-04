<template>
  <v-container width="90%">
    <v-toolbar flat color="primary" class="mt-4">
      <v-toolbar-title>Product Requisitions</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card color="#f2f4f2" class="scroll mt-5">
      <v-col v-for="result in resultsArray" :key="result" cols="12">
        <v-card color="white">
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-col cols="6" class="ml-4">
              <v-card-title v-text="result.division"></v-card-title>
              <v-card-subtitle v-text="result.date"></v-card-subtitle>
            </v-col>
            <v-col cols="3" class="mr-6">
              <v-btn
                class="mr-3 mt-4"
                color="primary"
                x-large
                width="80%"
                @click="gotoViewRequisition(result.requisition_id)"
                >View</v-btn
              >
            </v-col>
          </div>
        </v-card>
      </v-col>
    </v-card>
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
    resultsArray: []
  }),

  // Custom Methods and Functions
  methods: {
    gotoViewRequisition(id) {
      console.log("test", id);

      this.$router.push({
        query: { id: id },
        path: `view_product_requisition/${id.replace(/[/]/g, "")}`
      });
    },

    // get product requisition list
    getList() {
      this.$http
        .get(`/api/deputy_bursar/product_requisition`)
        .then(response => {
          this.resultsArray = response.data;
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getList();
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
  height: 700px;
  overflow: scroll;
}
</style>
