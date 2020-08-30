
<template>
<v-container>
    <v-card flat>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Procurement ID</th>
                <th>Category</th>
                <th></th>
            </tr>
        </thead>  
        <tbody>
            <tr v-for="result in resultsArray" :key="result" cols="12">
                <td>{{result.procurement_id}}</td>
                <td>{{result.category}}</td>
                <td><v-btn color="primary" class="mb-4 mt-4">Send RFQ</v-btn></td>
            </tr> 
        </tbody>           
    </table>
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
    search: '',
    resultsArray: []
  }),

  // Custom Methods and Functions
  methods: {
    // get shopping ongoing procurements
    getShoppingOngoingProcurements() {
      this.$http
        .get(
          `/api/admin/shopping_ongoing_procurements`
        )
        .then(response => {
          this.resultsArray = response.data; 
          console.log("resultsArray",this.resultsArray)
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  // Life Cycle Hooks
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.getShoppingOngoingProcurements();
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
<style scoped>
  table {
    border-collapse: collapse;
    width: 95%;
    margin: 25px;
  }
  th, td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}</style>
