<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline"></h5>
            </v-row>
            <!-- <v-divider class="mt-1"></v-divider> -->

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row> 
            <v-col cols="12" sm="8">
                <v-row no-gutters>
                    <h5 class="headline">Activity</h5>
                </v-row>
                <v-divider class="mt-1"></v-divider>
                <v-banner two-line>
                    <v-avatar
                    slot="icon"
                    color="deep-purple accent-4"
                    size="40"
                    >
                    <v-icon
                        icon="mdi-lock"
                        color="white"
                    >
                        mdi-lock
                    </v-icon>
                    </v-avatar>
                        UCSC/NSP1/G/ENG/2020/0000030 : Procurement Initialized
                    <template v-slot:actions>
                    <v-btn text color="deep-purple accent-4">View</v-btn>
                    </template>
                </v-banner>
                <v-banner two-line>
                    <v-avatar
                    slot="icon"
                    color="deep-purple accent-4"
                    size="40"
                    >
                    <v-icon
                        icon="mdi-lock"
                        color="white"
                    >
                        mdi-lock
                    </v-icon>
                    </v-avatar>
                        UCSC/NSP1/G/ENG/2020/0000030 : Tec Report Created
                    <template v-slot:actions>
                    <v-btn text color="deep-purple accent-4">View</v-btn>
                    </template>
                </v-banner>
                <v-banner two-line>
                    <v-avatar
                    slot="icon"
                    color="deep-purple accent-4"
                    size="40"
                    >
                    <v-icon
                        icon="mdi-lock"
                        color="white"
                    >
                        mdi-lock
                    </v-icon>
                    </v-avatar>
                        UCSC/NSP1/G/ENG/2020/0000030 : PO Generated
                    <template v-slot:actions>
                    <v-btn text color="deep-purple accent-4">View</v-btn>
                    </template>
                </v-banner>
            </v-col>
            <v-col cols="12" sm="4">
                <v-row no-gutters>
                    <h5 class="headline">My Tasks</h5>
                </v-row>
                <v-divider class="mt-1"></v-divider>
                <v-alert
                    border="top"
                    colored-border
                    prominent
                    type="info"
                    elevation="2"
                >
                    <v-row align="center">
                        <v-col class="grow">Appoint TEC team</v-col>
                        <v-col class="shrink">
                            <v-btn>Take action</v-btn>
                        </v-col>
                    </v-row>
                </v-alert>
                <v-alert
                    border="top"
                    colored-border
                    prominent
                    type="info"
                    elevation="2"
                >
                    <v-row align="center">
                        <v-col class="grow">Appoint Bid Opening team</v-col>
                        <v-col class="shrink">
                            <v-btn>Take action</v-btn>
                        </v-col>
                    </v-row>
                </v-alert>
            </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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


  // Props Received
  props: [],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({}),

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
