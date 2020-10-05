<template>
  <v-navigation-drawer app clipped>
    <!-- Admin Navigation Items -->
    <v-list shaped v-if="$store.getters.userRole == 'AB'" dense>
      <v-list-item-group v-model="listNaviagation" color="primary">
        <v-list-item link @click="$router.push('/admin').catch(() => {})">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$router.push('/admin/users').catch(() => {})">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="$router.push('/admin/suppliers').catch(() => {})"
        >
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Suppliers</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          @click="$router.push('/admin/supplier-registrations').catch(() => {})"
        >
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Supplier Registrations</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="$router.push('/admin/products').catch(() => {})"
        >
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="$router.push('/admin/requisitions').catch(() => {})"
        >
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Product Requisitions</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>RFQs (Request for Quotations)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- <v-divider class="my-0" /> -->
        <v-list-item
          link
          @click="$router.push('/admin/ongoing_procurements').catch(() => {})"
        >
          <v-list-item-action>
            <v-icon>mdi-timeline-clock-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Procurements</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-divider class="my-0" /> -->
      </v-list-item-group>
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
  props: [],
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
