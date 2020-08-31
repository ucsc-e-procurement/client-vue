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
                    <h4 class="font-weight-bold ">Member in TEC</h4>
                  </v-card-title>

                  <v-tabs v-model="tab" background-color="transparent" grow>
                    <v-tab v-for="tab in tabs" :key="tab">
                      {{ tab }}
                    </v-tab>
                  </v-tabs>
                  <v-divider></v-divider>
                  <v-tabs-items v-model="tab">
                    <v-tab-item>
                      <v-card flat>
                        <v-card-title>
                          <v-text-field
                            v-model="search"
                            label="Search"
                            single-line
                            hide-details
                          ></v-text-field>
                        </v-card-title>
                        <v-data-table
                          :headers="headers"
                          :items="currentTeams"
                          :search="search"
                        >
                          <template v-slot:item.controls="props">
                            <v-btn
                              class="mx-2"
                              small
                              color="primary"
                              @click="openProcurement(props.item)"
                            >
                              PROCUREMENT
                            </v-btn>
                            <v-btn
                              class="mx-2"
                              small
                              color="primary"
                              @click="openTeam(props.item)"
                            >
                              TEAM
                            </v-btn>
                          </template>
                        </v-data-table>
                      </v-card>
                    </v-tab-item>
                    <v-tab-item>
                      <v-card flat>
                        <v-card-title>
                          <v-text-field
                            v-model="search"
                            label="Search"
                            single-line
                            hide-details
                          ></v-text-field>
                        </v-card-title>
                        <v-data-table
                          :headers="headers"
                          :items="pastTeams"
                          :search="search"
                        >
                          <template v-slot:item.controls="props">
                            <v-btn
                              class="mx-2"
                              small
                              color="primary"
                              @click="openProcurement(props.item)"
                            >
                              PROCUREMENT
                            </v-btn>
                            <v-btn
                              class="mx-2"
                              small
                              color="primary"
                              @click="openTeam(props.item)"
                            >
                              TEAM
                            </v-btn>
                          </template>
                        </v-data-table>
                      </v-card>
                    </v-tab-item>
                  </v-tabs-items>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-if="dialog"
      :team="tec_team"
      :procurement="procurement"
      v-model="dialog"
      width="650px"
    >
      <v-card>
        <v-card-title>
          <span class="headline"
            >TEC Team ID : {{ procurement.tec_team_id }}</span
          >
        </v-card-title>
        <v-card-text>
          <div class="text--primary">
            Appointed By : {{ procurement.appointed_by }}
          </div>
          <div class="text--primary">Chairman : {{ procurement.chairman }}</div>
          <div class="text--primary">
            Procurement Status : {{ procurement.step }}
          </div>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Employee ID</th>
                  <th class="text-left">Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tec_team" :key="item.name">
                  <td>{{ item.employee_id }}</td>
                  <td>{{ item.employee_name }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn color="green darken-3" text @click="dialog = false">View Purchase Order</v-btn> -->
          <v-btn color="blue darken-3" text @click="dialog = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    search: "",
    tab: null,
    tabs: [
      'Current Teams','Past Teams'
    ],
    // user: "emp00005",
    user: null,
    procurement: null,
    tec_team: null,
    dialog: false,
    currentTeams: [],
    pastTeams: [],
    headers: [
      {
        text: "Team ID",
        align: "start",
        filterable: true,
        value: "tec_team_id"
      },
      { text: "Procurement ID", value: "procurement_id" },
      { text: "Appointed By", value: "appointed_by" },
      { text: "Chairman", value: "chairman" },
      { text: "Actions", value: "controls", sortable: false }
    ]
  }),

  // Custom Methods and Functions
  methods: {
    openProcurement(item) {
      this.$router.push({
        path: `tecteam/procurement/${item.procurement_id.replace(/[/]/g, "")}`,
        query: {
          procurement_id: item.procurement_id,
          tec_team_id: item.tec_team_id,
          requisition_id: item.requisition_id,
          type: item.bid_type,
          unlocked: item.step >= 7 ? true : false
        }
      });
    },

    openTeam(item) {
      this.fetchTecTeam(item.tec_team_id);
      this.procurement = item;
      if (item.step <= 4) {
        this.procurement.step = "Pending TEC Specification";
      } else if (item.step > 4 && item.step < 7) {
        this.procurement.step = "Pending Bid Opening";
      } else if (item.step == 7) {
        this.procurement.step = "Pending Bid Evaluation";
      } else {
        this.procurement.step = "Evaluated";
      }
      this.dialog = true;
    },

    fetchTecTeam(tec_team_id) {
      this.$http
        .get("/api/tec_team/get_tec_team", {
          params: {
            id: tec_team_id
          }
        })
        .then(response => {
          console.log(response.data);
          this.tec_team = response.data[0];
          this.tec_team = JSON.parse(this.tec_team.team);
          console.log("team", this.tec_team);
          //console.log(Object.values(this.procurements[0].bids))
        })
        .catch(error => {
          console.log(error);
        });
    },

    fetchCurrentTeams(employee_id) {
      this.$http
        .get("/api/tec_team/get_current_tec_teams", {
          params: {
            id: employee_id
          }
        })
        .then(response => {
          console.log(response.data);
          this.currentTeams = response.data;
          console.log("current teams", this.currentTeams);
        })
        .catch(error => {
          console.log(error);
        });
    },

    fetchPastTeams(employee_id) {
      this.$http
        .get("/api/tec_team/get_past_tec_teams", {
          params: {
            id: employee_id
          }
        })
        .then(response => {
          console.log(response.data);
          this.pastTeams = response.data;
          console.log("past teams", this.pastTeams);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.user = this.$store.getters.user.employee_id
    this.fetchCurrentTeams(this.user)
    this.fetchPastTeams(this.user)
  },
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
