<template>
  <v-navigation-drawer v-model="drawer" app clipped dark>
    <v-list dense>
      <v-list-item two-line :class="miniVariant && 'px-0'">
        <v-list-item-avatar>
          <v-icon dark>mdi-account-circle</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>MR M M P W MUDANNAYAKE</v-list-item-title>
          <v-list-item-subtitle>Division head</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-item v-for="item in items" :key="item.title" :to="item.link" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
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
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard", link: "/hod" },
      { title: "Photos", icon: "mdi-image", link: "#" },
    ],
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
