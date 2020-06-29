<template>
  <v-app>
    <!-- ------------------------------------------------------------- Navigation Bars ------------------------------------------------------------ -->
    <!-- Internal -->
    <nav_drawer_internal v-if="isInternal" :drawer="navDrawerInternal" />
    <!-- External -->
    <nav_drawer_external v-else :drawer="navDrawerExternal" />

    <!-- ------------------------------------------------------------------ App Bars -------------------------------------------------------------- -->
    <!-- Internal -->
    <v-app-bar v-if="isInternal" app color="indigo" dark dense clipped-left>
      <v-app-bar-nav-icon
        @click.stop="navDrawerInternal = !navDrawerInternal"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>UCSC E-Procurement (Internal)</v-toolbar-title>
    </v-app-bar>

    <!-- External -->
    <v-app-bar v-else app color="blue darken-2" dark dense clipped-left>
      <v-app-bar-nav-icon
        @click.stop="navDrawerExternal = !navDrawerExternal"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>UCSC E-Procurement (External)</v-toolbar-title>
    </v-app-bar>

    <!-- ----------------------------------------- Main Content (Pages Render into This Router View) ---------------------------------------------- -->
    <v-main>
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
// import NavigationDrawer_Internal from "./components/internal/NavigationDrawer";

// For Director
import NavigationDrawer_Internal_Director from "./components/internal/NavigationDrawerDirector";

export default {
  name: "App",

  // Components Registration
  components: {
    app_footer: Footer,
    // nav_drawer_internal: NavigationDrawer_Internal
    nav_drawer_internal: NavigationDrawer_Internal_Director
  },

  // Data Variables
  data: () => ({
    //
    navDrawerInternal: true,
    navDrawerExternal: true,

    // For Controlling External And Internal Views (Later this should be done using Vuex + Authentication)
    isInternal: true
  })
};
</script>
