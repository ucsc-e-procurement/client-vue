<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Supplier Registrations</h5>
              <v-spacer />
              <v-btn color="primary" small outlined>Registered Suppliers</v-btn>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row class="">
              <v-col cols="6">
                <v-select
                  v-model="selectedYear"
                  :items="years"
                  label="Registration Year"
                  outlined
                  dense
                  class="pt-5"
                ></v-select>
              </v-col>
              <v-spacer />
              <v-col cols="3">
                <v-text-field
                  v-model="search"
                  label="Search"
                  outlined
                  dense
                  append-icon="mdi-magnify"
                  class="pt-5"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col v-if="registrations.length == 0" cols="12">
                <v-alert type="info" outlined border="left">
                  No Any Suppliers Available
                </v-alert>
              </v-col>
              <v-col v-else cols="12">
                <v-data-table
                  :headers="headers"
                  :items="registrations"
                  :search="search"
                  :items-per-page="10"
                  no-data-text="No Users Available"
                  :loading="loaderUsers"
                >
                  <template v-slot:item.status="{ item }">
                    <v-chip
                      small
                      outlined
                      :color="item.status === 'active' ? 'success' : 'error'"
                      >{{
                        item.status === "active" ? "Active" : "Deactive"
                      }}</v-chip
                    >
                  </template>

                  <template v-slot:item.actions="{ item }">
                    <v-btn
                      @click="gotoSupplierProfile(item.supplier_id)"
                      small
                      text
                      color="primary"
                      class="ml-5"
                      >View</v-btn
                    >
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
            <!-- Snackbar -->
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-snackbar
        v-model="snackbar.show"
        bottom
        right
        :color="snackbar.color"
        :timeout="snackbar.timeout"
      >
        {{ snackbar.text }}
        <v-btn text @click="snackbar.show = false">
          Close
        </v-btn>
      </v-snackbar>
    </v-row>

    <!-- Fullscreen Overlay - Loader -->
    <v-overlay :value="loaderOverlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
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
    headers: [
      {
        text: "#",
        value: "index",
        sortable: false,
        align: "start",
        divider: false
      },
      {
        text: "Supplier ID",
        value: "supplier_id",
        sortable: true,
        align: "start",
        divider: false
      },
      {
        text: "Registration No",
        value: "registration_no",
        sortable: true,
        align: "start",
        divider: false
      },
      {
        text: "Name / Company",
        value: "name",
        sortable: true,
        align: "start",
        divider: false
      },
      {
        text: "Email",
        value: "email",
        sortable: true,
        align: "start",
        divider: false
      },
      {
        text: "Date of Registration",
        value: "registration_date",
        sortable: false,
        align: "start",
        divider: false
      },
      // {
      //   text: "Contact",
      //   value: "contact_number",
      //   sortable: false,
      //   align: "center",
      //   divider: false
      // },
      {
        text: "Status",
        value: "verified",
        sortable: false,
        align: "center",
        divider: false
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "right",
        divider: false
      }
    ],
    registrations: [],
    search: "",

    selectedYear: "",
    years: [],

    // Snackbar
    snackbar: {
      show: false,
      text: "",
      color: "",
      timeout: 4000
    },

    // Loaders
    loaderOverlay: false,
    loaderRegistrations: false
  }),

  // Custom Methods and Functions
  methods: {
    getRegistrationsByYear() {
      this.loaderRegistrations = true;
      return new Promise((resolve, reject) => {
        this.$http
          .get(`/api/admin/registrations/year?year=${this.selectedYear}`)
          .then(res => {
            console.log("Data: ", res.data);

            this.loaderRegistrations = false;
            let registrations = res.data;

            let index = 0;
            registrations = registrations.map(registration => {
              index++;
              let temp = { ...registration, index, actions: "" };
              temp.registration_date = temp.registration_date.split("T")[0];
              return temp;
            });

            resolve(registrations);
          })
          .catch(err => {
            this.loaderRegistrations = false;

            reject(err);
          });
      });
    },
    gotoSupplierProfile(supplierId) {
      //   console.log(supplierId, atob(supplierId), btoa(supplierId));
      this.$router.push(`/admin/supplier/${btoa(supplierId)}`).catch(() => {});
    },
    generateYearList(startYear) {
      let years = [];
      const d = new Date();
      for (let year = startYear; year <= d.getFullYear(); year++) {
        years.push(year);
      }

      return { currentYear: d.getFullYear(), yearList: years };
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    const yearData = this.generateYearList(2019);
    this.years = yearData.yearList;
    this.selectedYear = yearData.currentYear;

    this.getRegistrationsByYear().then(registrations => {
      this.registrations = registrations;
      console.log(">>>>>>>>>>>>>>> ", this.registrations);
    });
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
