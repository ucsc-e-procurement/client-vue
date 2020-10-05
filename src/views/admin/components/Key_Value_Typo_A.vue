<template>
  <v-container class="pa-0 ma-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card :outlined="outlined" :flat="flat">
          <v-container class="py-1 px-0">
            <v-row :no-gutters="dense">
              <v-col :cols="leftCols">
                <v-card-text class="py-0 font-weight-regular"
                  >{{ leftKey }}:
                </v-card-text>
                <!-- <h5 class="subtitle-1"></h5> -->
              </v-col>
              <v-col :cols="rightCols">
                <v-card-text class="py-0 font-weight-regular"
                  >{{ rightValue }}
                </v-card-text>
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
  props: [
    "leftKey",
    "rightValue",
    "dense",
    "outlined",
    "flat",
    "leftCols",
    "rightCols"
  ],

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
<style scoped></style>
