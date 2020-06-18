<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Example Form Page</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->

            <!-- Same Row Multiple Cloumns ** Sum of Colums should be add upto 12 ** -->
            <v-row class="mt-5">
              <v-col cols="12" md="6" sm="" xs="" lg="">
                <v-text-field
                  v-model="firstName"
                  label="First Name"
                  placeholder="Enter Your First Name"
                  outlined
                  dense
                />
              </v-col>

              <v-col cols="12" md="6" sm="" xs="" lg="">
                <v-text-field
                  v-model="lastName"
                  label="Last Name"
                  placeholder="Enter Your Last Name"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="selectedItem"
                  :items="items"
                  label="Team Members"
                  placeholder="Select Your Name"
                  outlined
                  dense
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-checkbox
                  v-model="checkbox"
                  :label="`Checkbox 1: ${checkbox.toString()}`"
                ></v-checkbox>
                <v-radio-group v-model="radioGroup">
                  <v-radio
                    v-for="n in 3"
                    :key="n"
                    :label="`Radio ${n}`"
                    :value="n"
                  ></v-radio>
                </v-radio-group>
                <v-switch
                  v-model="switch1"
                  :label="`Switch 1: ${switch1.toString()}`"
                ></v-switch>
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
  data: () => ({
    firstName: "",
    lastName: "",
    text: "",
    selectedItem: "",
    items: ["Prashastha", "Tharinda", "Jayani", "Naveen", "Sachini", "Pasindu"],

    checkbox: true,
    radioGroup: 1,
    switch1: true
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
