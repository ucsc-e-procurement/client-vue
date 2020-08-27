<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Procurements</h5>
              <v-spacer />
              <v-btn small text color="primary">Advanced Search</v-btn>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row no-gutters>
              <v-col cols="12">
                <v-card flat outlined class="mt-5">
                  <v-tabs v-model="tab" background-color="grey lighten-2" grow>
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab>
                      On-Going
                    </v-tab>
                    <v-tab>
                      Completed
                    </v-tab>
                    <v-tab>
                      Terminated
                    </v-tab>
                    <v-tab>
                      Advanced Search
                    </v-tab>
                  </v-tabs>
                  <v-tabs-items v-model="tab">
                    <v-tab-item v-for="i in 4" :key="i">
                      <v-container class="ma-0 ">
                        <v-row no-gutters>
                          <v-col cols="12">
                            <on-going />
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-tab-item>
                  </v-tabs-items>
                </v-card>
              </v-col>
              <!-- <v-col v-if="procurements.length == 0" cols="12">
                <v-alert type="info" outlined border="left">
                  No Any Ongoing Procurements Available
                </v-alert>
              </v-col>
              <v-col v-else cols="12">
                <v-data-table
                  :headers="headers"
                  :items="procurements"
                  :search="search"
                  :items-per-page="10"
                  @click:row="onclickTableRowTeacher"
                  no-data-text="Please Add Items"
                >
                  <template v-slot:item.action="{ item }">
                    <v-icon
                      small
                      color="red"
                      @click="deleteMaterial(item.path, item.id)"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
                </v-data-table>
              </v-col> -->
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
import ProcurementOnGoing from "./components/Procurement_On_Going";
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
  components: {
    "on-going": ProcurementOnGoing
  },

  // Data Variables and Values
  data: () => ({
    tab: null,
    //   Data Table
    headers: [
      {
        text: "#",
        value: "no",
        sortable: false,
        align: "start",
        divider: true,
        groupable: true
      },
      {
        text: "Description / Title",
        value: "cat1",
        sortable: false,
        align: "start",
        divider: true,
        groupable: true
      },
      {
        text: "Tender No.",
        value: "cat1",
        sortable: false,
        align: "start",
        divider: true,
        groupable: true
      },
      {
        text: "Date Started",
        value: "cat2",
        sortable: false,
        align: "center",
        divider: true,
        groupable: true
      },
      {
        text: "Procurement Method",
        value: "subject",
        sortable: false,
        align: "center",
        divider: true
      },
      {
        text: "Actions",
        value: "",
        sortable: false,
        align: "center",
        divider: true
      }
    ],
    procurements: [],
    search: ""
  }),

  // Custom Methods and Functions
  methods: {
    getOngoingProcurements() {
      return new Promise((resolve, reject) => {});
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
