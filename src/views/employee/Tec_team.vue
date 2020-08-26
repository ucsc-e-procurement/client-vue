<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row class="justify-space-between">
                <v-col cols="12">
                    <v-card>
                      <v-card-title class="text-center justify-center py-6">
                        <h4 class="font-weight-bold ">Procurements</h4>
                      </v-card-title>

                      <v-tabs
                        v-model="tab"
                        background-color="transparent"
                        grow
                      >
                        <v-tab
                          v-for="tab in tabs"
                          :key="tab"
                        >
                          {{ tab }}
                        </v-tab>
                      </v-tabs>
                      <v-divider></v-divider>
                      <v-tabs-items v-model="tab">
                        <v-tab-item>
                            <TecteamNew />
                        </v-tab-item>
                        <v-tab-item>
                            <TecteamOngoing />
                        </v-tab-item>
                        <v-tab-item>
                            <TecteamCompleted />
                        </v-tab-item>
                      </v-tabs-items>
                    </v-card>
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

import TecteamNew from "./Tec_team_new"
import TecteamOngoing from "./Tec_team_ongoing"
import TecteamCompleted from "./Tec_team_completed"

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
  components: { TecteamNew, TecteamOngoing, TecteamCompleted },

  // Data Variables and Values
  data: () => ({
    search: '',
    tab: null,
    tabs: [
      'Locked','Unlocked', 'Completed',
    ],
  }),

  // Custom Methods and Functions
  methods: {
    onButtonClick: function (proc) {
      console.log(proc.tenderNo)
    }
  },
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
