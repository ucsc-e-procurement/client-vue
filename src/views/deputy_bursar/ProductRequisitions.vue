
  <!-- <v-container width="90%"> -->
    <!-- <v-toolbar flat color="primary" class="mt-3">
      <v-toolbar-title>Product Requisitions</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card color="#f2f4f2" class="scroll mt-5">
      <v-col v-for="result in resultsArray" :key="result" cols="12">
        <v-card color="white" class="mt-3">
          <div class="d-flex justify-space-between">
            <v-col cols="6" class="ml-4">
              <v-text-field v-text="result.requisition_id"></v-text-field> -->
              <!-- <v-text-field v-text="result.division"></v-text-field>
              <v-text-field v-text="result.date"></v-text-field>
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
</template> -->

<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row class="justify-space-between">
                <v-col cols="12">
                    <v-card>
                        <v-card-title class="text-center justify-center py-6">
                            <h4 class="font-weight-bold ">Product Requisitions</h4>
                        </v-card-title>
                        <v-divider></v-divider>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Requisition ID</th>
                                    <th>Division</th>
                                    <th>Date</th>
                                    <th></th>
                                </tr>
                            </thead>  
                            <tbody>
                                <tr v-for="result in resultsArray" :key="result" cols="12">
                                    <td>{{result.requisition_id}}</td>
                                    <td>{{result.division}}</td>
                                    <td>{{result.date}}</td>
                                    <td><v-btn color="primary" class="mb-4 mt-4" @click="gotoViewRequisition(result.requisition_id)">View</v-btn></td>
                                </tr> 
                            </tbody>           
                        </table>
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
</style>
