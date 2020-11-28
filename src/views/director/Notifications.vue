<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline"></h5>
            </v-row>
            <!-- <v-divider class="mt-1"></v-divider> -->

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row>
              <v-col cols="12" sm="8">
                <v-row no-gutters>
                  <h5 class="headline">Activity</h5>
                </v-row>
                <v-divider class="mt-1"></v-divider>
                <v-banner two-line v-for="activity in this.activities" :key="activity.procurement_id">
                  <v-avatar slot="icon" color="deep-purple accent-4" size="40">
                    <v-icon icon="mdi-lock" color="white">
                      mdi-lock
                    </v-icon>
                  </v-avatar>
                  {{activity.procurement_id}} | On-Going Procurement
                  <template v-slot:actions>
                    <v-btn text color="deep-purple accent-4" @click="manageActivity(activity)">View</v-btn>
                  </template>
                </v-banner>
              </v-col>
              <v-col cols="12" sm="4">
                <v-row no-gutters>
                  <h5 class="headline">My Tasks</h5>
                </v-row>
                <v-divider class="mt-1"></v-divider>
                <v-alert
                  border="top"
                  colored-border
                  prominent
                  type="info"
                  elevation="2"
                  v-for="request in this.requisitionRequests"
                  :key="request.requisition_id"
                >
                  <v-row align="center">
                    <v-col class="grow">Approve Product Requisition</v-col>
                    <v-col class="shrink">
                      <v-btn @click="viewRequisitionRequest(request)"
                        >Take action</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-alert>
                <v-alert
                  border="top"
                  colored-border
                  prominent
                  type="warning"
                  elevation="2"
                  v-for="tecRequest in this.tecAppointmentRequests"
                  :key="tecRequest.procurement_id"
                >
                  <v-row align="center">
                    <v-col class="grow">Appoint TEC Team</v-col>
                    <v-col class="shrink">
                      <v-btn @click="manageTecAppointmentRequest(tecRequest)"
                        >Take action</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-alert>
                <v-alert
                  border="top"
                  colored-border
                  prominent
                  type="success"
                  elevation="2"
                  v-for="approvalRequest in this.approvalRequests"
                  :key="approvalRequest.procurement_id"
                >
                  <v-row align="center">
                    <v-col class="grow">Approve TEC Evaluation</v-col>
                    <v-col class="shrink">
                      <v-btn @click="manageTecAppointmentRequest(approvalRequest)"
                        >Take action</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-alert>
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
import {bus} from "../../main";

/* Note: When Declaring Variables, always think about how Form Validation Rules are applied */
export default {
  // Props Received
  props: [],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    requisitionRequests: [],
    POApprovalRequests: [],
    tecAppointmentRequests: [],
    approvalRequests: [],
    activities: []
  }),

  // Custom Methods and Functions
  methods: {
    getRequisitionRequests() {
      this.$http
        .get("/api/director/get_requisition_requests")
        .then(response => {
          // console.log(response)
          this.requisitionRequests = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTecTeamRequests() {
      this.$http
        .get("/api/director/get_tec_appointment_requests")
        .then(response => {
          //   console.log(response)
          this.tecAppointmentRequests = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getApprovalRequests() {
      this.$http
        .get("/api/director/get_approval_requests")
        .then(response => {
          //   console.log(response)
          this.approvalRequests = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    viewRequisitionRequest: function(event) {
      console.log(event);
      bus.$emit('notificationUpdated', 1);
      this.$router.push({
        path: `requisition/view`,
        query: {
          requisition: event
        }
      });
    },
    manageActivity: function(event) {
      var proc_id = event.procurement_id;
      if (!event.procurement_method.includes("DIM")) {
        this.$router.push({
          path: `procurements/shopping/${proc_id.replace(/[/]/g, "")}`,
          query: {
            proc_id: event.procurement_id,
            stepper: event.step
          }
        });
      } else {
        this.$router.push({
          path: `procurements/direct/${proc_id.replace(/[/]/g, "")}`,
          query: {
            proc_id: event.procurement_id,
            stepper: event.step
          }
        });
      }
    },
    manageTecAppointmentRequest: function(event) {
      console.log(event);
      var proc_id = event.procurement_id;
      bus.$emit('notificationUpdated', 1);
      if (!event.procurement_method.includes("DIM")) {
        this.$router.push({
          path: `procurements/shopping/${proc_id.replace(/[/]/g, "")}`,
          query: {
            proc_id: event.procurement_id,
            stepper: event.step
          }
        });
      } else {
        this.$router.push({
          path: `procurements/direct/${proc_id.replace(/[/]/g, "")}`,
          query: {
            proc_id: event.procurement_id,
            stepper: event.step
          }
        });
      }
    },
    getActivity() {
      this.$http
        .get("/api/director/get_activity")
        .then(response => {
            console.log(response)
          this.activities = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getRequisitionRequests();
    this.getTecTeamRequests();
    this.getApprovalRequests();
    this.getActivity();
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
