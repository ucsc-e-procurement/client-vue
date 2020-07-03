<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12">
        <nav_drawer_internal :drawer="navDrawerInternal" />
        <router-view />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";
import NavigationDrawer_Internal from "../head_of_department/NavigationDrawer";
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
  components: { nav_drawer_internal: NavigationDrawer_Internal },

  // Data Variables and Values
  data: () => ({
    navDrawerInternal: true,
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
  computed: {},
};
</script>

// Custom CSS Rules and Classes
<style scoped></style>
