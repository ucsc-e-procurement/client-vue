<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->

            <v-row class="justify-space-between">
              <v-col cols="12">
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
/* Note: When Declaring Variables, always think about how Form Validation Rules are applied */
export default {
  // Mixins
  // mixins: [validationMixin],

  // Form Validations
  // validations: {},

  // Props Received
  props: ["procurements"],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    search: "",
    isMounted: false,
    tab: null,
    procurementsList: "",
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
        value: "procurementId"
      },
      { text: "Status", value: "status" },
      { text: "Description", value: "prod_desc" },
      { text: "Procurement Method", value: "procurement_method" },
      { text: "Actions", value: "controls", sortable: false }
    ]
  }),

  // Custom Methods and Functions
  methods: {
    onButtonClick: function(event) {
      var proc_id = event.procurementId;

      if (event.procurement_method == "shopping") {
        this.$router.push({
          path: `/director/procurements/shopping/${proc_id.replace(
            /[/]/g,
            ""
          )}`,
          query: {
            proc_id: event.procurementId,
            stepper: event.step
          }
        });
        // this.$router.go(-1)
      } else {
        this.$router.push({
          path: `/director/procurements/direct/${proc_id.replace(/[/]/g, "")}`,
          query: {
            proc_id: event.procurementId,
            stepper: event.step
          }
        });
      }
    },

    getProcurements() {
      this.ongoingProcurements = this.procurementsList.filter(
        item => item.status == "on-going" && item.bidStatus == "approved"
      );
      this.completedProcurements = this.procurementsList.filter(
        item => item.status == "completed" && item.bidStatus == "approved"
      );
      this.terminatedProcurements = this.procurementsList.filter(
        item => item.status == "terminated" && item.bidStatus == "approved"
      );
      this.isMounted = true;
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.procurementsList = JSON.parse(this.procurements);
    this.getProcurements();
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
