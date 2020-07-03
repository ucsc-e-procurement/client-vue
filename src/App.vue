<template>
  <v-app>
    <v-main>
      <v-app-bar app color="indigo" dark dense clipped-left>
        <v-app-bar-nav-icon
          @click.stop="navDrawerInternal = !navDrawerInternal"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>UCSC E-Procurement</v-toolbar-title>
      </v-app-bar>
      <router-view />
    </v-main>

    <!-- Footer -->
    <app_footer />
  </v-app>
</template>

<script>
// Imported Components
import Footer from "./components/common/Footer";

// For Internal Parties
//import NavigationDrawer_Internal from "./components/internal/NavigationDrawer";

export default {
  name: "App",

  // Components Registration
  components: {
    app_footer: Footer,
    //nav_drawer_internal: NavigationDrawer_Internal,
  },

  // Data Variables
  data: () => ({
    //
    //navDrawerInternal: true,
  }),
};
</script>
