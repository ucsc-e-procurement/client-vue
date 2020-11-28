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
                <v-card>
                    <v-card-title class="text-center justify-center py-6">
                        <h4 class="font-weight-bold ">Advanced Search</h4>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <ValidationObserver ref="observer">
                                <v-form>
                                <v-row>
                                    <v-col cols="12" sm="3">
                                        <v-autocomplete
                                            v-model="department"
                                            :items="departments"
                                            dense
                                            filled
                                            label="Department"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="3">
                                        <v-autocomplete
                                            v-model="procurementStatus"
                                            :items="procurementStatusList"
                                            dense
                                            filled
                                            label="Procurement Status"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="3">
                                        <v-autocomplete
                                            v-model="procurementType"
                                            :items="procurementTypes"
                                            dense
                                            filled
                                            label="Procurement Type"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="3">
                                        <v-autocomplete
                                            v-model="supplier"
                                            :items="suppliers"
                                            dense
                                            filled
                                            label="Supplier"
                                        ></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="6">
                                    <ValidationProvider
                                        v-slot="{ errors }"
                                        name="From"
                                        rules="required"
                                    >
                                       <v-menu
                                            v-model="fromMenu"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="fromDate"
                                                label="From Date"
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                :error-messages="errors"
                                                v-on="on"
                                            ></v-text-field>
                                            </template>
                                            <v-date-picker
                                            v-model="fromDate"
                                            @input="fromMenu = false"
                                            ></v-date-picker>
                                        </v-menu>
                                    </ValidationProvider>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                    <ValidationProvider
                                        v-slot="{ errors }"
                                        name="To"
                                        rules="required"
                                    >
                                        <v-menu
                                            v-model="toMenu"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="toDate"
                                                label="To Date"
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                :error-messages="errors"
                                                v-on="on"
                                            ></v-text-field>
                                            </template>
                                            <v-date-picker
                                            v-model="toDate"
                                            @input="toMenu = false"
                                            :min="fromDate"
                                            ></v-date-picker>
                                        </v-menu>
                                    </ValidationProvider>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-btn color="primary" class="mr-4 ml-4" @click="this.advancedSearch">
                                    Search
                                    </v-btn>
                                </v-row>
                                </v-form>
                            </ValidationObserver>
                        </v-container>
                    </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" v-if="success">
                <v-card v-if="procurements">
                    <v-data-table
                        :headers="headers"
                        :items="procurements"
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
import { required } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});

export default {
  props: [],

  // Imported Components
  components: {
    ValidationProvider,
    ValidationObserver
  },

  // Data Variables and Values
  data: () => ({
    search: "",
    isMounted: true,
    departments: [
      "All",
      "ADM",
      "ADMTC",
      "APB",
      "CDF",
      "CSC",
      "EDC",
      "eLC",
      "ENG",
      "EXM",
      "FIN",
      "LIB",
      "NOC",
      "PRP",
      "PDC",
      "QAC",
      "SDU",
      "STR"
    ],
    suppliers: ['All'],
    procurementStatusList: ['All', 'on-going', 'completed', 'terminated'],
    procurementTypes: ["All", "direct", "shopping"],
    supplier: 'All',
    procurementType: 'All',
    procurementStatus: 'All',
    department: 'All',
    fromDate: new Date("2019-01-01").toISOString().substr(0, 10),
    toDate: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    fromMenu: false,
    toMenu: false,
    success: false,
    noData: 1,
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
    ],
    procurements: []
  }),

  // Custom Methods and Functions
  methods: {
    advancedSearch() {
        this.procurements = [];
        var dep = this.department == 'All' ? '' : this.department;
        var procStatus = this.procurementStatus == 'All' ? '' : this.procurementStatus;
        var procType = this.procurementType == 'All' ? '' : this.procurementType == 'direct' ? 'DIM' : 'NSP';
        var sup = this.supplier == 'All' ? '' : this.supplier;
        this.$http
          .get(`/api/director/advanced_search?department=${dep}&procurementStatus=${procStatus}&procurementType=${procType}&supplier=${sup}&from=${this.fromDate}&to=${this.toDate}`)
          .then(response => {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", response.data[0]);
            this.procurements = response.data[0];
            this.procurements = this.procurements.procurements ? JSON.parse(this.procurements.procurements) : [];
            this.procurementType = procType == 'DIM' ? 'direct' : procType == 'NSP' ? 'shopping' : 'All',
            this.procurementStatus = procStatus ? procStatus : 'All',
            this.department = dep ? dep : 'All',
            this.success = true;
          })
          .catch(err => {
            console.log(err);
          });
    },
    onButtonClick: function(event) {
      var proc_id = event.procurementId;

      if (!event.procurement_method.includes("DIM")) {
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
    getSuppliers() {
      this.$http
        .get("/api/director/get_suppliers")
        .then(response => {
          // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.suppliers.concat(response.data.map(i => i.name)));
          this.suppliers = this.suppliers.concat(response.data.map(i => i.name));
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getSuppliers();
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
