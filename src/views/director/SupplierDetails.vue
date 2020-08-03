<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->

            <v-row class="justify-space-between">
              <v-col cols="12">
                <v-card v-if="isMounted">
                  <v-card-title class="text-center justify-center py-6">
                    <h4 class="font-weight-bold ">SUPPLIERS</h4>
                  </v-card-title>
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

      if (event.procurement_method == "shopping") {
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
