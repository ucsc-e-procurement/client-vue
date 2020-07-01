<template>
  <v-container width="90%">
    <v-toolbar flat color="blue">
      <v-toolbar-title>Product Requisition List</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card class="scroll"> 
      <v-row class="ml-16 mt-4">         
        <v-col cols="9"><label> Request Number  : 01 </label><br/><label> Date  : 21/06/2020 </label></v-col>
        <v-col cols="1"><v-btn color="primary" @click="gotoViewRequisition('req1')">View</v-btn></v-col>
      </v-row>
      <v-row class="ml-16 mt-4">
        <v-col cols="9"><label> Request Number  : 02 </label><br/><label> Date  : 21/06/2020 </label></v-col>
        <v-col cols="1"><v-btn color="primary" to="/view_purchase_request">View</v-btn></v-col>
      </v-row>
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
  }),

  // Custom Methods and Functions
  methods: {   
    gotoViewRequisition(id){
      this.$router
      .push(`/view_product_requisition/${id}`);
    }
  },

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
  height: 500px;
  overflow: scroll;
}
</style>
