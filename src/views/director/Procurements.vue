<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <!-- <v-row no-gutters>
              <h5 class="headline">Procurements</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider> -->

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->

            <v-row class="justify-space-between">
              <v-col cols="12">
                <!-- <v-card>
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
                        :items="desserts"
                        :search="search"
                        ></v-data-table>
                    </v-card> -->
                <v-card v-if="isMounted">
                  <v-card-title class="text-center justify-center py-6">
                    <h4 class="font-weight-bold ">PROCUREMENTS</h4>
                  </v-card-title>

                  <v-tabs v-model="tab" background-color="transparent" grow>
                    <v-tab v-for="item in items" :key="item">
                      {{ item }}
                    </v-tab>
                  </v-tabs>

                  <v-tabs-items v-model="tab">
                    <!-- <v-tab-item
                          v-for="item in items"
                          :key="item"
                        >
                          <v-card>
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
                            :items="procurements"
                            :search="search"
                            >
                              <template v-slot:item.controls="props">
                                <v-btn class="mx-2" small color="primary" @click="onButtonClick(props.item)">
                                  VIEW
                                </v-btn>
                              </template>
                            </v-data-table>
                          </v-card>
                        </v-tab-item> -->

                    <v-tab-item>
                      <v-card>
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
                          :items="ongoingProcurements"
                          :search="search"
                          v-if="isMounted"
                        >
                          <template v-slot:item.controls="props">
                            <v-btn
                              class="mx-2"
                              small
                              color="primary"
                              @click="onButtonClick(props.item)"
                            >
                              VIEW
                            </v-btn>
                          </template>
                        </v-data-table>
                      </v-card>
                    </v-tab-item>
                    <v-tab-item>
                      <v-card>
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
                          :items="completedProcurements"
                          :search="search"
                        >
                          <template v-slot:item.controls="props">
                            <v-btn
                              class="mx-2"
                              small
                              color="primary"
                              @click="onButtonClick(props.item)"
                            >
                              VIEW
                            </v-btn>
                          </template>
                        </v-data-table>
                      </v-card>
                    </v-tab-item>
                    <v-tab-item>
                      <v-card>
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
                          :items="terminatedProcurements"
                          :search="search"
                        >
                          <template v-slot:item.controls="props">
                            <v-btn
                              class="mx-2"
                              small
                              color="primary"
                              @click="onButtonClick(props.item)"
                            >
                              VIEW
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
    isMounted: false,
    tab: null,
    ongoingProcurements: [],
    completedProcurements: [],
    terminatedProcurements: [],
    items: ["Ongoing", "Completed", "Terminated"],
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    headers: [
      {
        text: "Procurement ID",
        align: "start",
        value: "procurement_id"
      },
      { text: "Status", value: "status" },
      { text: "Description", value: "description" },
      { text: "Procurement Method", value: "procurement_method" },
      { text: "Bid Opening Date", value: "bid_opening_date" },
      { text: "Actions", value: "controls", sortable: false }
    ]
  }),

  // Custom Methods and Functions
  methods: {
    onButtonClick: function(event) {
      var proc_id = event.procurement_id;

      if (!event.procurement_method.includes('DIM')) {
        this.$router.push({
          path: `procurements/shopping/${proc_id.replace(/[/]/g, "")}`,
          query: {
            proc_id: event.procurement_id,
            stepper: event.step
          }
        });
      } else {
        this.$router.push({
          path: `procurements/direct/${proc_id.replace(/[/]/g, "")}`,
          query: {
            proc_id: event.procurement_id,
            stepper: event.step
          }
        });
      }
    },

    getProcurements() {
      this.$http
        .get("/api/director/procurements")
        .then(response => {
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", response);
          this.ongoingProcurements = response.data.filter(
            item => item.status == "on-going"
          );
          this.completedProcurements = response.data.filter(
            item => item.status == "completed"
          );
          this.terminatedProcurements = response.data.filter(
            item => item.status == "terminated"
          );
          this.isMounted = true;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getProcurements();
  },
  beforeMount() {
    // this.getProcurements();
  },
  mounted() {
    // this.getProcurements();
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
