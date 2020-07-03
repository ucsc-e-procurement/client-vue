<template>
  <v-app v-if="$store.getters.isLoggedIn">
    <!-- ------------------------------------------------------------- Navigation Bars ------------------------------------------------------------ -->
    <!-- Internal -->
    <nav_drawer_internal
      v-if="$store.getters.isInternal"
      :drawer="navDrawerInternal"
    />
    <!-- External -->
    <nav_drawer_external v-else :drawer="navDrawerExternal" />

    <!-- ------------------------------------------------------------------ App Bars -------------------------------------------------------------- -->
    <!-- Internal -->
    <v-app-bar
      v-if="$store.getters.isInternal"
      app
      color="indigo"
      dark
      dense
      clipped-left
    >
      <v-app-bar-nav-icon
        @click.stop="navDrawerInternal = !navDrawerInternal"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>UCSC E-Procurement (Internal)</v-toolbar-title>
      <v-spacer />

      <v-menu transition="slide-x-transition" bottom right offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar size="35" v-bind="attrs" v-on="on">
            <v-img :src="require('./assets/user.png')"> </v-img>
          </v-avatar>
        </template>

        <v-list dense>
          <v-list-item-group color="primary">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-bell-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Notifications</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
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

  <!-- ---------------------------------------------------------- Login Page ---------------------------------------------------------------------- -->
  <v-app v-else>
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
//import NavigationDrawer_Internal from "./components/internal/NavigationDrawer";
// import NavigationDrawer_Internal from "./components/internal/NavigationDrawer";


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
    navDrawerInternal: true,
    navDrawerExternal: false

    // For Controlling External And Internal Views (Later this should be done using Vuex + Authentication)
  }),
  created() {
    this.$http.interceptors.response.use(undefined, err => {
      return new Promise(() => {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout");
        }
        throw err;
      });
    });
  }
};
</script>
