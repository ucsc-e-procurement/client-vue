<template>
  <v-container>
    <form>
      <v-card class="overflow-hidden" color="white">
        <v-toolbar flat color="blue">
          <v-toolbar-title>Request Form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="3" class="ml-4 mt-9"><label> Procurement Name </label></v-col>
            <v-col cols="5">
            <v-text-field readonly="true"
              v-model="name"
              color="black">
            </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" class="ml-4 mt-9"><label> Procurement Type </label></v-col>
            <v-col cols="5">
            <v-text-field readonly="true"
              v-model="selectProcType"
              color="black"
              item-text="name">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" class="ml-4 mt-9"><label> Procurement Method </label></v-col>
            <v-col cols="5">
            <v-text-field readonly="true"
              v-model="selectProcMethod"
              color="black"
              item-text="name"
            ></v-text-field>
            </v-col>
          </v-row>
            <v-col cols="3" class="ml-1 mt-9"><label> Procurement Description </label></v-col>
            <v-textarea readonly="true"
              v-model="descript"
              outlined
              name="input-7-4">
            </v-textarea>       
        </v-card-text>
        <v-row justify="center" class="mb-10">
          <v-btn color="primary" width="40%" @click.stop="dialog1 = true">Approve</v-btn>
          <v-btn color="danger" width="40%" @click.stop="dialog2 = true">Deny</v-btn>
        </v-row>
        <v-dialog v-model="dialog1" width="500">
        <v-card>
          <v-card-title><h4> Request Approval</h4></v-card-title>
          <v-card-text>Do you want to approve the request?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" text @click="dialog1 = false">Yes</v-btn>
            <v-btn color="primary" text @click="dialog1 = false">No</v-btn>
          </v-card-actions>
        </v-card>
        </v-dialog>
        <v-dialog v-model="dialog2" width="500">
          <v-card>
            <v-card-title><h4 class="ml-6"> Reasons for denial</h4></v-card-title>
              <v-textarea 
                v-model="denial_reasons"
                solo
                name="denial reasons">
              </v-textarea> 
              <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" text @click="dialog2 = false">Submit</v-btn>
              <v-btn color="primary" text @click="dialog2 = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>        
      </v-card>
    </form>
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
    dialog1:false,
    dialog2:false
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
<style scoped></style>
