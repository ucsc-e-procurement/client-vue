<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12">
        <nav_drawer_deputy_bursar :drawer="navDrawerInternal" />
        <router-view />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";
import NavigationDrawer_Internal_Deputy_Bursar from "../../components/internal/NavigationDrawerDeputyBursar";

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
  components: {
    nav_drawer_deputy_bursar: NavigationDrawer_Internal_Deputy_Bursar
  },

  // Data Variables and Values
  data: () => ({
    navDrawerInternal: true
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
