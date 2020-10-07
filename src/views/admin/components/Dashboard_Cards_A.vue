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
                  {{ registered }}
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
        <v-card color="green lighte-2" dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline font-weight-bold"
                style="padding-top: 20px;"
              >
                <div style="font-size: 40px;">
                  {{ ongoing }}
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn text>On Going Procurements</v-btn>
              </v-card-actions>
            </div>
            <v-avatar
              class="ma-3"
              slot="icon"
              color="green darken-2"
              size="100"
            >
              <v-icon icon="mdi-lock" color="white" size="50">
                mdi-timeline-clock
              </v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card color="red lighten-2" dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline font-weight-bold"
                style="padding-top: 20px;"
              >
                <div style="font-size: 40px;">
                  {{ completed }}
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn text>Completed Procurements</v-btn>
              </v-card-actions>
            </div>
            <v-avatar class="ma-3" slot="icon" color="red darken-2" size="100">
              <v-icon icon="mdi-lock" color="white" size="50">
                mdi-clipboard-check-multiple
              </v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card color="#ffd740" dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline font-weight-bold"
                style="padding-top: 20px;"
              >
                <div style="font-size: 40px;">
                  {{ requisitions }}
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn text>Requisitions</v-btn>
              </v-card-actions>
            </div>
            <v-avatar class="ma-3" slot="icon" color="#ff6f00" size="100">
              <v-icon icon="mdi-lock" color="white" size="50">
                mdi-book-variant-multiple
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
    ongoing: 0,
    registered: 0,
    completed: 0,
    requisitions: 0
  }),

  // Custom Methods and Functions
  methods: {
    getData(year) {
      return new Promise((resolve, reject) => {
        this.$http
          .get(`api/admin-analytics/main-counts?year=${year}`)
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
  created() {
    let d = new Date();
    this.getData(d.getFullYear())
      .then(res => {
        console.log(">>>>>>>>>", res);
        this.ongoing = res.ongoing;
        this.completed = res.completed;
        this.registered = res.registered;
        this.requisitions = res.requisitions;
      })
      .catch(err => {
        console.log(err);
      });
  },
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
