<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Edit Spec Sheet</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->

            <!-- Info Card Row -->
            <div>
    <v-card class="mb-4">
      <v-card-text>
        <v-select
          v-model="steps"
          :items="[1, 2, 3, 4, 5, 6]"
          label="number of items"
        ></v-select>
      </v-card-text>
    </v-card>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1 > n"
            :step="n"
            editable
          >
            Item {{ n }}
          </v-stepper-step>

          <v-divider
            v-if="n !== steps"
            :key="n"
          ></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
          v-for="n in steps"
          :key="`${n}-content`"
          :step="n"
        >
          <v-card
            class="mb-12"
            
            height="200px"
          >
          <!--Add insert item logic here-->
            <v-btn
              class="ma-2"
              depressed
              large
              color="primary"
              @click="additem"
              >Add Feature</v-btn
            >
            <v-btn
              class="ma-2"
              depressed
              large
              color=""
              @click="reset"
              >Reset</v-btn
            >

          <v-row align="center">
              <v-col cols="4">
                <v-text-field
                  v-model="value"
                  dense
                  label="Feature"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="quantity"
                  label="Min Requirement"
                  outlined
                  dense
                />
              </v-col>
            </v-row>
            <!-- </ValidationObserver> -->
            <v-simple-table
              :dense="dense"
              :fixed-header="fixedHeader"
              :height="height"
              light
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Feature</th>
                    <th class="text-left">Minimum Requrement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in product_request" :key="item.product_name">
                    <td>{{ item.product_name }}</td>
                    <td>{{ item.qnty }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>

          <v-btn
            color="primary"
            @click="nextStep(n)"
          >
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>

            <!-- <v-row>
              <v-col cols="6">
                <v-card>
                  <v-sparkline
                    :value="value"
                    :gradient="gradient"
                    :smooth="radius || false"
                    :padding="padding"
                    :line-width="width"
                    :stroke-linecap="lineCap"
                    :gradient-direction="gradientDirection"
                    :fill="fill"
                    :type="type"
                    :auto-line-width="autoLineWidth"
                    auto-draw
                    height="150"
                  ></v-sparkline>
                </v-card>
              </v-col>
            </v-row> -->
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
    // Dummy Data
     e1: 1,
     steps: 2,
  }),

  watch: {
      steps (val) {
        if (this.e1 > val) {
          this.e1 = val
        }
      },
    },


  // Custom Methods and Functions
  methods: {
      nextStep (n) {
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n + 1
        }
      },
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
