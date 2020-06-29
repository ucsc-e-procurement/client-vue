<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">This Month</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->

            <!-- Info Card Row -->
            <v-row class="justify-space-between">
              <v-col cols="3">
                <v-card height="100" color="deep-purple lighten-3">
                  <v-card-title></v-card-title>
                  <v-card-text class="headline font-weight-bold" style="text-align: center;">
                      Purchase Requisitions
                      <v-chip
                        class="ma-2"
                        color="deep-purple lighten-2"
                      >
                        12
                      </v-chip>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card height="100" color="orange lighten-3">
                  <v-card-title></v-card-title>
                  <v-card-text class="headline font-weight-bold" style="text-align: center;">
                    Ongoing Procurements
                    <v-chip
                      class="ma-2"
                      color="orange lighten-2"
                    >
                      04
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card height="100" color="green lighten-3">
                  <v-card-title></v-card-title>
                  <v-card-text class="headline font-weight-bold" style="text-align: center;">
                    Completed Procurements
                    <v-chip
                      class="ma-2"
                      color="green lighten-2"
                    >
                      08
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card height="100" color="red lighten-3">
                  <v-card-title></v-card-title>
                  <v-card-text class="headline font-weight-bold" style="text-align: center;">
                    Terminated Procurements
                    <v-chip
                      class="ma-2"
                      color="red lighten-2"
                    >
                      02
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card
                  class="mx-auto text-center"
                  color="blue"
                  dark
                >
                <v-card-text>
                  <v-sheet color="rgba(0, 0, 0, .12)">
                    <v-sparkline
                      :value="value"
                      color="rgba(255, 255, 255, .7)"
                      height="100"
                      padding="24"
                      stroke-linecap="round"
                      smooth
                    >
                      <template v-slot:label="item">
                        ${{ item.value }}
                      </template>
                    </v-sparkline>
                  </v-sheet>
                </v-card-text>

                <v-card-text>
                  <div class="display-1 font-weight-thin">Sales Last 24h</div>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions class="justify-center">
                  <v-btn block text>Go to Report</v-btn>
                </v-card-actions>
              </v-card>
              </v-col>
              <v-col cols="6">
                <v-card
                  class="mx-auto text-center"
                  color="blue"
                  dark
                >
                <v-card-text>
                  <v-sheet color="rgba(0, 0, 0, .12)">
                    <v-sparkline
                      :value="values"
                      color="rgba(255, 255, 255, .7)"
                      height="100"
                      padding="24"
                      stroke-linecap="round"
                      smooth
                    >
                      <template v-slot:label="item">
                        ${{ item.value }}
                      </template>
                    </v-sparkline>
                  </v-sheet>
                </v-card-text>

                <v-card-text>
                  <div class="display-1 font-weight-thin">Sales Last 24h</div>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions class="justify-center">
                  <v-btn block text>Go to Report</v-btn>
                </v-card-actions>
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

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];

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
    // Dummy Data
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: "round",
    gradient: gradients[5],
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    gradientDirection: "top",
    gradients,
    fill: false,
    type: "trend",
    autoLineWidth: false,
    values: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
      ],
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
