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
          <v-list-item-title>Employee Name</v-list-item-title>
          <v-list-item-subtitle>Employee</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>
    <v-list dense>
      <v-list-item exact="" link to="/employee/">
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item exact="" link to="/employee/tecteam">
        <v-list-item-action>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>TEC Team</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item exact="" link to="/employee/bidopeningteam">
        <v-list-item-action>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Bid-Opening Team</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item exact="" link to="/employee/specsheet">
        <v-list-item-action>
          <v-icon>mdi-blur-linear</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Specification</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-action>
          <v-badge color="blue" content="1">
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Notifications</v-list-item-title>
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
    //
  }),

  // Custom Methods and Functions
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
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
