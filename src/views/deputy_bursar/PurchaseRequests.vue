<template>
<v-container>
      <v-card class="scroll" color="white" width="90%">
        <v-toolbar flat color="blue">
          <v-toolbar-title>Purchase Requests List</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="9" class="ml-4 mt-4"><label> Request Number  : 01 </label><br/><label> Date  : 21/06/2020 </label></v-col>
            <v-col cols="1">
            <v-btn color="primary" to="/view_purchase_request">View</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9" class="ml-4 mt-4"><label> Request Number  : 02 </label><br/><label> Date  : 21/06/2020 </label></v-col>
            <v-col cols="1">
            <v-btn color="primary" to="/view_purchase_request">View</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9" class="ml-4 mt-4"><label> Request Number  : 03 </label><br/><label> Date  : 21/06/2020 </label></v-col>
            <v-col cols="1">
            <v-btn color="primary" to="/view_purchase_request">View</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9" class="ml-4 mt-4"><label> Request Number  : 04 </label><br/><label> Date  : 21/06/2020 </label></v-col>
            <v-col cols="1">
            <v-btn color="primary" to="/view_purchase_request">View</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9" class="ml-4 mt-4"><label> Request Number  : 05 </label><br/><label> Date  : 21/06/2020 </label></v-col>
            <v-col cols="1">
            <v-btn color="primary" to="/view_purchase_request">View</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9" class="ml-4 mt-4"><label> Request Number  : 06 </label><br/><label> Date  : 21/06/2020 </label></v-col>
            <v-col cols="1">
            <v-btn color="primary" to="/view_purchase_request">View</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
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
    //
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
  background-color: lightblue;
  height: 600px;
  overflow: scroll;
}
</style>
