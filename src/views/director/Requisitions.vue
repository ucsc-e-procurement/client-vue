<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Requisition</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-card class="mx-auto" max-width=1500>
                <v-container> 
                <v-form>    
                    <v-row>
                        <v-col cols="12" sm="6">
                        <v-text-field
                            value="UCSC/NCB/W/ENG/2020/0004"
                            label="Procurement ID"
                            outlined
                            readonly
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6">
                        <v-text-field
                            value="Goods"
                            label="Procurement Type"
                            outlined
                            readonly
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6">
                        <v-text-field
                            value="Direct Method"
                            label="Procurement Method"
                            outlined
                            readonly
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="12">
                        <v-text-field
                            value="Description"
                            label="Procurement Description"
                            outlined
                            readonly
                        ></v-text-field>
                        </v-col>
                        
                    </v-row>
                    <v-divider class="mt-1"></v-divider>
                    <v-row no-gutters>
                        <h5 class="headline pt-5 pb-5">Deputy Bursar Recommendation</h5>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                        <v-text-field
                            value="Remarks"
                            label="Deputy Bursar Remarks"
                            outlined
                            readonly
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                        <v-text-field
                            value="Granted"
                            label="Deputy Bursar Approval"
                            outlined
                            readonly
                        ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-divider class="mt-1"></v-divider>
                    <v-row no-gutters>
                        <h5 class="headline pt-5 pb-5">Director Recommendation</h5>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-text-field
                                label="Remarks"
                                outlined
                            ></v-text-field>
                        </v-col>
                        
                        <v-btn
                            color="success"
                            class="mr-4 ml-4"
                            
                        >
                            Approve
                        </v-btn>

                        <v-btn
                            color="error"
                            class="mr-4"
                        >
                            Reject
                        </v-btn>
                    </v-row>
                    
                </v-form>   
                </v-container>
            </v-card>
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
  props: [],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({}),

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
