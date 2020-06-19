<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Requests</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row> 
                <v-col cols="12">
                    <v-alert
                        text
                        color="info"
                        >
                        <h3 class="headline">New Product Requisition Request</h3>
                        <v-divider
                            class="my-4 info"
                            style="opacity: 0.22"
                        ></v-divider>

                        <v-row
                            align="center"
                            no-gutters
                        >
                            <v-col class="grow">Requisition details</v-col>
                            <v-spacer></v-spacer>
                            <v-col class="shrink">
                            <v-btn
                                color="info"
                                outlined
                            >
                                VIEW
                            </v-btn>
                            </v-col>
                        </v-row>
                    </v-alert>
                </v-col>
                <v-col cols="12">
                    <v-alert
                        text
                        color="deep-orange"
                        >
                        <h3 class="headline">New PO Approval Request</h3>
                        <v-divider
                            class="my-4 info"
                            style="opacity: 0.22"
                        ></v-divider>

                        <v-row
                            align="center"
                            no-gutters
                        >
                            <v-col class="grow">Procurement Details</v-col>
                            <v-spacer></v-spacer>
                            <v-col class="shrink">
                            <v-btn
                                color="deep-orange"
                                outlined
                            >
                                VIEW
                            </v-btn>
                            </v-col>
                        </v-row>
                    </v-alert>
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
