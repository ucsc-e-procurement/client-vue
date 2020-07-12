<template>
  <v-container fluid class="">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- -------------------------- Fullscreen Dialog Add User --------------------------- -->
            <v-row justify="center">
              <v-dialog
                v-model="showDialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
              >
                <v-card>
                  <v-toolbar dark color="primary" dense>
                    <v-btn icon dark @click="closeDialog">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Add User</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn dark text @click="dialog = false">Save</v-btn>
                    </v-toolbar-items>
                  </v-toolbar>
                  <v-container class="py-10">
                    <v-card outlined>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-row class="" no-gutters>
                              <v-col cols="6">
                                <v-text-field
                                  label="First Name"
                                  outlined
                                  dense
                                />
                              </v-col>
                            </v-row>
                            <v-row class="" no-gutters>
                              <v-col cols="6">
                                <v-text-field
                                  label="Last Name"
                                  outlined
                                  dense
                                />
                              </v-col>
                            </v-row>
                            <v-row class="" no-gutters>
                              <v-col cols="6">
                                <v-text-field
                                  label="User Role"
                                  outlined
                                  dense
                                />
                              </v-col>
                            </v-row>
                            <v-row class="" no-gutters>
                              <v-col cols="6">
                                <v-text-field
                                  label="Last Name"
                                  outlined
                                  dense
                                />
                              </v-col>
                            </v-row>
                          </v-col> 
                          </v-row
                      ></v-container>
                    </v-card>
                  </v-container>
                </v-card>
              </v-dialog>
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

import { bus } from "../../../main";
/* Note: When Declaring Variables, always think about how Form Validation Rules are applied */
export default {
  // Mixins
  // mixins: [validationMixin],

  // Form Validations
  // validations: {},

  // Props Received
  props: ["showDialog"],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({}),

  // Custom Methods and Functions
  methods: {
    closeDialog() {
      bus.$emit("CLOSE_ADD_USER_DIALOG_0001");
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
<style scoped></style>
