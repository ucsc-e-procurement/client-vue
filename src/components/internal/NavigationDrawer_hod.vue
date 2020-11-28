<template>
  <v-navigation-drawer v-model="drawer" app clipped dark>
    <v-list dense>
      <v-list-item two-line :class="miniVariant && 'px-0'">
        <v-list-item-avatar>
          <img
            src="http://icons.iconarchive.com/icons/icons8/ios7/512/Users-User-Male-2-icon.png"
          />
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
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard", link: "/hod" },
      // { title: "Calender", icon: "mdi-calendar", link: "#" }
    ],
    role: "",

    user: null
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
  created() {
     this.user = this.$store.getters.user;
  },
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
