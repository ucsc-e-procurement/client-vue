<template>
  <v-container fluid class="px-0 py-0" v-if="user">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Dashboard</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->

            <!-- Info Card Row -->
            <!-- <v-row class="justify-space-between">
              <v-col cols="4">
                <v-card height="100">
                  <v-card-title>Current Procurements</v-card-title>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card height="100">
                  <v-card-title>Pending Specifications</v-card-title>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card height="100">
                  <v-card-title>Pending TEC Reports</v-card-title>
                </v-card>
              </v-col>
            </v-row> -->
            <v-row class="justify-space-between">
              <v-col cols="3">
                <v-card color="#1976d2" dark>
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title
                        class="headline font-weight-bold"
                        style="padding-top: 40px;"
                      >
                        <div style="font-size: 50px;" v-if="locked || locked == 0">
                          {{this.locked.count}}
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn text>Locked Procurements</v-btn>
                      </v-card-actions>
                    </div>
                    <v-avatar
                      class="ma-3"
                      slot="icon"
                      color="blue darken-4"
                      size="125"
                    >
                      <v-icon icon="mdi-lock" color="white" size="50">
                        mdi-lock
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
                        style="padding-top: 40px;"
                      >
                        <div style="font-size: 50px;" v-if="unlocked || unlocked == 0">
                          {{this.unlocked.count}}
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn text>Unlocked Procurements</v-btn>
                      </v-card-actions>
                    </div>
                    <v-avatar
                      class="ma-3"
                      slot="icon"
                      color="yellow darken-3"
                      size="125"
                    >
                      <v-icon icon="mdi-lock-open-variant" color="white" size="50">
                        mdi-lock-open-variant
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
                        style="padding-top: 40px;"
                      >
                        <div style="font-size: 50px;" v-if="completed || completed == 0">
                          {{completed.count}}
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn text>Completed</v-btn>
                      </v-card-actions>
                    </div>
                    <v-avatar
                      class="ma-3"
                      slot="icon"
                      color="green lighten-1"
                      size="125"
                    >
                      <v-icon icon="mdi-book-check" color="white" size="50">
                        mdi-book-check
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
                        style="padding-top: 40px;"
                      >
                        <div style="font-size: 50px;" v-if="(unlocked && locked) || unlocked == 0 || locked ==0">
                          {{locked.count + unlocked.count}}
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn text>Current TEC Teams</v-btn>
                      </v-card-actions>
                    </div>
                    <v-avatar
                      class="ma-3"
                      slot="icon"
                      color="red lighten-1"
                      size="125"
                    >
                      <v-icon icon="mdi-account-group" color="white" size="50">
                        mdi-account-group
                      </v-icon>
                    </v-avatar>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-divider class="mt-1"></v-divider>
            <v-row>
              <v-col cols="12" sm="6">
                <v-row no-gutters>
                  <h5 class="headline">New Appointments</h5>
                </v-row>
                <v-divider class="mt-1"></v-divider>
                <v-alert
                  border="top"
                  colored-border
                  prominent
                  type="info"
                  elevation="2"
                  v-for="item in this.pendingSpec"
                  :key="item.procurement_id"
                >
                  <v-row align="center">
                    <v-col class="grow"
                      >Specification Report Pending for
                      {{ item.procurement_id }}</v-col
                    >
                    <v-col class="shrink">
                      <v-btn @click="openSpecSheet(item)">View</v-btn>
                    </v-col>
                  </v-row>
                </v-alert>
              </v-col>
              <v-col cols="12" sm="6">
                <v-row no-gutters>
                  <h5 class="headline">New Bid Openings</h5>
                </v-row>
                <v-divider class="mt-1"></v-divider>
                <v-alert
                  border="top"
                  colored-border
                  prominent
                  type="info"
                  elevation="2"
                  v-for="item in this.pendingEval"
                  :key="item.procurement_id"
                >
                  <v-row align="center">
                    <v-col class="grow"
                      >Evaluation Report Pending for
                      {{ item.procurement_id }}</v-col
                    >
                    <v-col class="shrink">
                      <v-btn @click="openProcurement(item)">View</v-btn>
                    </v-col>
                  </v-row>
                </v-alert>
              </v-col>
            </v-row>

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

    // user: "emp00005",
    user: null,
    pendingSpec: null,
    pendingEval: null,
    unlocked: null,
    locked: null,
    completed: null,
  }),

  // Custom Methods and Functions
  methods: {
    openProcurement(item) {
      this.$router.push({
        path: `employee/tecteam/procurement/${item.procurement_id.replace(/[/]/g, "")}`,
        query: {
          procurement_id: item.procurement_id,
          tec_team_id: item.tec_team_id,
          requisition_id: item.requisition_id,
          type: item.bid_type,
          unlocked: item.step >= 7 ? true : false
        }
      });
    },

    openSpecSheet(item) {
      this.$router.push(`employee/specsheet`)
    },

    fetchNewProcurements(employee_id) {
      this.$http
        .get("/api/tec_team/get_new_appointments", {
          params: {
            id: employee_id
          }
        })
        .then(response => {
          console.log("new", response.data);
          this.pendingSpec = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    fetchNewBidOpenings(employee_id) {
      this.$http
        .get("/api/tec_team/get_new_bidopenings", {
          params: {
            id: employee_id
          }
        })
        .then(response => {
          console.log("new", response.data);
          this.pendingEval = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    fetchUnlockedProcurementCount(employee_id) {
      this.$http
        .get("/api/tec_team/get_unlocked_procurement_count", {
          params: {
            id: employee_id
          }
        })
        .then(response => {
          console.log('res', response.data);
          this.unlocked = response.data[0];
          console.log(this.unlocked.count);
        })
        .catch(error => {
          console.log(error);
        });
    },

    fetchLockedProcurementCount(employee_id) {
      this.$http
        .get("/api/tec_team/get_locked_procurement_count", {
          params: {
            id: employee_id
          }
        })
        .then(response => {
          this.locked = response.data[0];
        })
        .catch(error => {
          console.log(error);
        });
    },

    fetchCompletedProcurementCount(employee_id) {
      this.$http
        .get("/api/tec_team/get_completed_procurement_count", {
          params: {
            id: employee_id
          }
        })
        .then(response => {
          this.completed = response.data[0];
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.user = this.$store.getters.user.employee_id
    this.fetchNewProcurements(this.user)
    this.fetchNewBidOpenings(this.user)
    this.fetchLockedProcurementCount(this.user)
    this.fetchUnlockedProcurementCount(this.user)
    this.fetchCompletedProcurementCount(this.user)
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
