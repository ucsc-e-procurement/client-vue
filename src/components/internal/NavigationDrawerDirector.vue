<template>
  <v-navigation-drawer v-model="drawer" app clipped dark>
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img
            src="http://icons.iconarchive.com/icons/icons8/ios7/512/Users-User-Male-2-icon.png"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>KP Hewagamage</v-list-item-title>
          <v-list-item-subtitle>Director</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>
    <v-list dense rounded>
      <v-list-item exact="" link to="/director">
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/director/procurements">
        <v-list-item-action>
          <v-icon>mdi-notebook-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Procurements</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/director/notifications">
        <v-list-item-action>
          <v-badge
            color="blue"
            :content="
              this.notificationCount
            "
          >
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Notifications</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/director/reports">
        <v-list-item-action>
          <v-icon>mdi-magnify</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Advanced Search</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/director/departments">
        <v-list-item-action>
          <v-icon>mdi-view-grid</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Departments</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/director/suppliers">
        <v-list-item-action>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Suppliers</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-list>
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";

/*

// Validation Library - Vuelidate
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
*/
import {bus} from "../../main"

/* Note: When Declaring Variables, always think about how Form Validation Rules are applied */
export default {
  // Mixins
  // mixins: [validationMixin],

  // Form Validations
  // validations: {},

  // Props Received
  props: ["drawer"],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    requisitionRequests: [],
    POApprovalRequests: [],
    tecAppointmentRequests: [],
    approvalRequests: [],
    notificationCount: 0,
  }),

  // Custom Methods and Functions
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    getRequisitionRequests() {
      this.$http
        .get("/api/director/get_requisition_requests")
        .then(response => {
          // console.log(response)
          this.requisitionRequests = response.data;
          this.notificationCount += response.data.length;
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
          this.notificationCount += response.data.length;
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
          this.notificationCount += response.data.length;
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
    bus.$on('notificationUpdated', payload => {
      this.notificationCount -= 1;
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
