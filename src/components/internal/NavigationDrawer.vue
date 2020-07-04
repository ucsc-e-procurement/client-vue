<template>
  <v-navigation-drawer v-model="drawer" app clipped>
    <!-- Admin Navigation Items -->
    <v-list shaped v-if="$store.getters.userRole == 'admin'" dense>
      <v-list-item-group v-model="listNaviagation" color="primary">
        <v-list-item link @click="$router.push('/admin')">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-divider class="my-0" /> -->
        <v-list-item link @click="$router.push('/admin/ongoing_procurements')">
          <v-list-item-action>
            <v-icon>mdi-timeline-clock-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Ongoing</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-divider class="my-0" /> -->
        <v-list-item
          link
          @click="$router.push('/admin/terminated_procurements')"
        >
          <v-list-item-action>
            <v-icon>mdi-alert-octagon-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Terminated</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-divider class="my-0" /> -->
        <v-list-item
          link
          @click="$router.push('/admin/completed_procurements')"
        >
          <v-list-item-action>
            <v-icon>mdi-check-circle-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Completed</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-divider class="my-0" /> -->
        <v-list-item link @click="$router.push('/admin/pending_approvals')">
          <v-list-item-action>
            <v-icon>mdi-file-clock-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Pending Approvals</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <!-- Deputy Bursar Navigation Items -->
    <v-list v-else-if="$store.getters.userRole == 'deputy_bursar'" dense>
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-0" />
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-email</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Procurements</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider />
    <template v-slot:append>
      <div class="pa-2">
        <v-btn @click="logout" block>Logout</v-btn>
      </div>
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
    listNaviagation: 0,
    role: ""
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
  mounted() {
    console.log("Navigation Drawer => Role: ", this.$store.state);
    this.role = this.$store.getters.userRole;
  },
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
