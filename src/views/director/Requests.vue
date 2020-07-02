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
            <v-row class="justify-space-between container"> 
                <v-col cols="6">
                  <v-card>
                    <v-card-title class="text-center justify-center py-6">
                        <h4 class="font-weight-bold ">Requisition Approval Requests</h4>
                    </v-card-title>
                    <v-card-text>
                      <v-banner two-line>
                        <v-avatar
                          slot="icon"
                          color="indigo lighten-1"
                          size="40"
                        >
                          <v-icon
                            icon="mdi-alert-circle"
                            color="white"
                          >
                            mdi-alert-circle
                          </v-icon>
                        </v-avatar>

                        Three line text string example with two actions. One to two lines is preferable. Three lines should be considered the maximum string length on desktop in order to keep messages short and actionable.

                        <template v-slot:actions>
                          <v-btn text color="blue accent-4">View</v-btn>
                        </template>
                      </v-banner>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card>
                    <v-card-title class="text-center justify-center py-6">
                        <h4 class="font-weight-bold ">Purchase Order Approval Requests</h4>
                    </v-card-title>
                    <v-card-text>
                      <v-banner two-line>
                        <v-avatar
                          slot="icon"
                          color="red lighten-1"
                          size="40"
                        >
                          <v-icon
                            icon="mdi-alert-circle"
                            color="white"
                          >
                            mdi-alert-circle
                          </v-icon>
                        </v-avatar>

                        Three line text string example with two actions. One to two lines is preferable. Three lines should be considered the maximum string length on desktop in order to keep messages short and actionable.

                        <template v-slot:actions>
                          <v-btn text color="blue accent-4">View</v-btn>
                        </template>
                      </v-banner>
                    </v-card-text>
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
