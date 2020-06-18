<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Grid System Page</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->

            <!-- Same Row Multiple Cloumns ** Sum of Colums should be add upto 12 ** -->
            <v-row class="mt-5">
              <v-col cols="12" md="6" sm="" xs="" lg="">
                <v-card>
                  <v-card-title>
                    Card
                  </v-card-title>
                </v-card>
              </v-col>

              <v-col cols="12" md="6" sm="" xs="" lg="">
                <v-card>
                  <v-card-title>
                    Card
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>

            <!-- Single Row Only Taken Its Width Not Full Width  -->
            <v-row no-gutters>
              <v-card>
                <v-card-title>
                  Card (Only Taking What Its Need)
                </v-card-title>
              </v-card>
            </v-row>

            <!-- Single Row Only Taken Its Width Not Full Width  -->
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title>
                    Card (Taking Full Column Width)
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>

            <!-- General Grid Set Up -->
            <v-container>
              <v-row>
                <v-col>
                  <v-card>Card 1</v-card>
                  <v-card>
                    <v-text-field
                      label="Append outer"
                      append-outer-icon="mdi-map-marker"
                    ></v-text-field>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col> </v-col>
              </v-row>
              <v-row>
                <v-col> </v-col>
              </v-row>
            </v-container>

            <!-- In Columns - Vertical Placement -->
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title>
                    Card (Taking Full Column Width)
                  </v-card-title>
                </v-card>

                <v-card>
                  <v-card-title>
                    Card (Taking Full Column Width)
                  </v-card-title>
                </v-card>

                <v-card>
                  <v-card-title>
                    Card (Taking Full Column Width)
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>

            <!-- In Row Horizontal Placement -->
            <v-row>
              <v-card>
                <v-card-title>
                  Card
                </v-card-title>
              </v-card>

              <v-card>
                <v-card-title>
                  Card
                </v-card-title>
              </v-card>

              <v-card>
                <v-card-title>
                  Card
                </v-card-title>
              </v-card>
            </v-row>

            <!-- In Row Horizontal Placement -->
            <v-row class="my-5 justify-space-between">
              <v-card>
                <v-card-title>
                  Card
                </v-card-title>
              </v-card>

              <v-card>
                <v-card-title>
                  Card
                </v-card-title>
              </v-card>

              <v-card>
                <v-card-title>
                  Card
                </v-card-title>
              </v-card>
            </v-row>

            <!-- In Row Horizontal Placement -->
            <v-row class="my-5 justify-space-around">
              <v-card>
                <v-card-title>
                  Card
                </v-card-title>
              </v-card>

              <v-card>
                <v-card-title>
                  Card
                </v-card-title>
              </v-card>

              <v-card>
                <v-card-title>
                  Card
                </v-card-title>
              </v-card>
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
    firstName: "",
    lastName: "",
    text: "",
    selectedItem: "",
    items: ["Prashastha", "Tharinda", "Jayani", "Naveen", "Sachini", "Pasindu"]
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
