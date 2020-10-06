<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-card color="#1976d2" dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline font-weight-bold"
                style="padding-top: 20px;"
              >
                <div style="font-size: 40px;">
                  3
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn text>Registered Suppliers</v-btn>
              </v-card-actions>
            </div>
            <v-avatar class="ma-3" slot="icon" color="blue darken-4" size="100">
              <v-icon icon="mdi-lock" color="white" size="50">
                mdi-account-multiple
              </v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card color="#1976d2" dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline font-weight-bold"
                style="padding-top: 20px;"
              >
                <div style="font-size: 40px;">
                  {{ this.supplierCount }}
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn text>Registered Suppliers</v-btn>
              </v-card-actions>
            </div>
            <v-avatar class="ma-3" slot="icon" color="blue darken-4" size="100">
              <v-icon icon="mdi-lock" color="white" size="50">
                mdi-account-multiple
              </v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card color="#1976d2" dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline font-weight-bold"
                style="padding-top: 20px;"
              >
                <div style="font-size: 40px;">
                  {{ this.supplierCount }}
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn text>Registered Suppliers</v-btn>
              </v-card-actions>
            </div>
            <v-avatar class="ma-3" slot="icon" color="blue darken-4" size="100">
              <v-icon icon="mdi-lock" color="white" size="50">
                mdi-account-multiple
              </v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card color="#1976d2" dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline font-weight-bold"
                style="padding-top: 20px;"
              >
                <div style="font-size: 40px;">
                  {{ this.supplierCount }}
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn text>Registered Suppliers</v-btn>
              </v-card-actions>
            </div>
            <v-avatar class="ma-3" slot="icon" color="blue darken-4" size="100">
              <v-icon icon="mdi-lock" color="white" size="50">
                mdi-account-multiple
              </v-icon>
            </v-avatar>
          </div>
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
    //
  }),

  // Custom Methods and Functions
  methods: {
    getData() {
      return new Promise((resolve, reject) => {
        this.$http
          .get(`api/admin-analytics/main-counts`)
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      });
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
