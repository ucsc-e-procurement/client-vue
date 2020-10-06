<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Product Requisition</h5>
              <v-spacer></v-spacer>
              <!-- <h5 class="subtitle-2">{{ requisition.id }}</h5> -->
              <v-btn
                small
                color="primary"
                @click="showProcurementInitializationConfirmation"
                :disabled="!isOkayToInitialize"
                >Initialize Procurement</v-btn
              >
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row v-if="isLoaded">
              <v-col cols="12">
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-alert
                      :type="alert.type"
                      border="left"
                      outlined
                      v-show="alert.show"
                      ><v-row no-gutters>
                        {{ alert.text }}
                        <v-spacer />
                        <v-btn color="primary" small text
                          >View Procurement</v-btn
                        >
                      </v-row></v-alert
                    >
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="3">
                    <h5 class="subtitle-1">Requisition ID:</h5>
                  </v-col>
                  <v-col cols="8">
                    <h5 class="subtitle-1">{{ requisition.id }}</h5>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col cols="3">
                    <h5 class="subtitle-1">Procurement Type:</h5>
                  </v-col>
                  <v-col cols="8">
                    <v-chip small class="ml-n2">{{
                      requisition.procurementType
                    }}</v-chip>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col cols="3">
                    <h5 class="subtitle-1">Date Created:</h5>
                  </v-col>
                  <v-col cols="8">
                    <h5 class="subtitle-1">{{ requisition.dateCreated }}</h5>
                  </v-col>
                </v-row>

                <v-row no-gutters class="mt-2">
                  <v-col cols="3">
                    <h5 class="subtitle-1">
                      Description:
                    </h5>
                  </v-col>
                  <v-col cols="8">
                    <h5 class="subtitle-1">
                      {{ requisition.description }}
                    </h5>
                  </v-col>
                </v-row>

                <v-row no-gutters class="mt-2">
                  <v-col cols="3">
                    <h5 class="subtitle-1">
                      Head of Division:
                    </h5>
                  </v-col>
                  <v-col cols="8">
                    <h5 class="subtitle-1">
                      {{ requisition.hod.name }}
                    </h5>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col cols="3">
                    <h5 class="subtitle-1">
                      Division:
                    </h5>
                  </v-col>
                  <v-col cols="8">
                    <h5 class="subtitle-1">
                      {{ requisition.divisionId }}
                    </h5>
                  </v-col>
                </v-row>

                <v-row no-gutters class="mt-2">
                  <v-col cols="3">
                    <h5 class="subtitle-1">
                      Fund Type:
                    </h5>
                  </v-col>
                  <v-col cols="8">
                    <h5 class="subtitle-1">
                      {{
                        requisition.fundType === null
                          ? "-Not Provided-"
                          : requisition.fundType
                      }}
                    </h5>
                  </v-col>
                </v-row>

                <v-row no-gutters class="mt-2">
                  <v-col cols="3">
                    <h5 class="subtitle-1">Deputy Bursar's Recommendation:</h5>
                  </v-col>
                  <v-col cols="8">
                    <v-chip
                      :color="
                        requisition.isDeputyBurasrRecommended
                          ? 'success'
                          : 'error'
                      "
                      small
                      class="ml-n2"
                    >
                      {{
                        requisition.isDeputyBurasrRecommended
                          ? "Reccommended"
                          : "Not Reccommended"
                      }}</v-chip
                    >
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col cols="3">
                    <h5 class="subtitle-1">
                      Remarks of Rejection:
                    </h5>
                  </v-col>
                  <v-col cols="8">
                    <h5 class="subtitle-1">
                      {{
                        requisition.deputyBursarRemark === "None"
                          ? "No Rejection Remarks Has Provided"
                          : requisition.deputyBursarRemark
                      }}
                    </h5>
                  </v-col>
                </v-row>

                <v-row no-gutters class="mt-2">
                  <v-col cols="3">
                    <h5 class="subtitle-1">Director's Approval:</h5>
                  </v-col>
                  <v-col cols="8">
                    <v-chip
                      :color="
                        requisition.isDirectorApproved ? 'success' : 'error'
                      "
                      small
                      class="ml-n2"
                    >
                      {{
                        requisition.isDirectorApproved ? "Approved" : "Rejected"
                      }}</v-chip
                    >
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col cols="3">
                    <h5 class="subtitle-1">Remarks of Rejection:</h5>
                  </v-col>
                  <v-col cols="8">
                    <h5 class="subtitle-1">
                      {{
                        requisition.directorsRemark === "None"
                          ? "No Rejection Remarks Has Provided"
                          : requisition.deputyBursarRemark
                      }}
                    </h5>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-card outlined>
                      <v-card-title>
                        Required Producs / Services / Works
                        <v-spacer></v-spacer>
                        <v-text-field
                          v-model="searchProduct"
                          append-icon="mdi-magnify"
                          label="Search"
                          outlined
                          dense
                          clearable
                          single-line
                          hide-details
                        ></v-text-field>
                      </v-card-title>
                      <v-data-table
                        :headers="headers"
                        :items="requisition.products"
                        :search="searchProduct"
                      ></v-data-table>
                    </v-card>
                  </v-col>
                </v-row>
                <v-divider />
                <v-row no-gutters class="my-5">
                  <v-select
                    v-model="procurementMethod"
                    :disabled="!isOkayToInitialize"
                    label="Procurement Method"
                    :items="procurementMethods"
                    outlined
                    dense
                    :error-messages="procurementMethodErrors"
                    @change="$v.procurementMethod.$touch()"
                    @blur="$v.procurementMethod.$touch()"
                  />
                </v-row>

                <v-row no-gutters class="my-5">
                  <v-select
                    v-model="procurementCategory"
                    :disabled="!isOkayToInitialize"
                    label="Procurement Category"
                    :items="procurementCategories"
                    outlined
                    dense
                    :error-messages="procurementCategoryErrors"
                    @change="$v.procurementCategory.$touch()"
                    @blur="$v.procurementCategory.$touch()"
                  />
                </v-row>

                <v-row class="my-5">
                  <v-col cols="6">
                    <v-menu
                      v-model="menuBidOpeningDate"
                      :close-on-text-click="false"
                      :nudge-right="300"
                      transition="scale-transition"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="bidOpeningDate"
                          label="Bid Opening Date"
                          outlined
                          :disabled="!isOkayToInitialize"
                          dense
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          :error-messages="bidOpeningDateErrors"
                          @change="$v.bidOpeningDate.$touch()"
                          @blur="$v.bidOpeningDate.$touch()"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="bidOpeningDate"
                        no-title
                        @input="menuBidOpeningDate = false"
                        :min="today"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="6">
                    <v-menu
                      v-model="menuExpirationDate"
                      :close-on-text-click="false"
                      :nudge-right="300"
                      transition="scale-transition"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="bidExpirationDate"
                          label="Bid Expiration Date"
                          :disabled="!isOkayToInitialize"
                          outlined
                          dense
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          :error-messages="bidExpirationDateErrors"
                          @change="$v.bidExpirationDate.$touch()"
                          @blur="$v.bidExpirationDate.$touch()"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="bidExpirationDate"
                        no-title
                        @input="menuExpirationDate = false"
                        :min="today"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-card-actions class="mx-0 px-0">
              <v-row no-gutters>
                <v-spacer />
                <v-btn
                  class=""
                  @click="showProcurementInitializationConfirmation"
                  :disabled="!isOkayToInitialize"
                  color="primary"
                  >Initialize Procurement</v-btn
                >
              </v-row>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog Initialize Procurement -->
    <v-row justify="center">
      <v-dialog
        v-model="dialogInitializeProcurement"
        persistent
        max-width="360"
      >
        <v-card>
          <v-card-title class="headline"
            >Procurement Initialization</v-card-title
          >
          <v-card-text>
            Do you want to <strong>initialize</strong> this Procurement now ?
            Note: This Process Cannot be Undone.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color=""
              small
              text
              @click="dialogInitializeProcurement = false"
              >Cancel</v-btn
            >
            <v-btn color="primary" small dark @click="initializeProcurement"
              >Okay</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Snackbar -->
    <v-row>
      <v-snackbar
        v-model="snackbar.show"
        top
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

    <v-overlay :value="loaderOverlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";

// Validation Library - Vuelidate
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

/* Note: When Declaring Variables, always think about how Form Validation Rules are applied */
export default {
  // Mixins
  mixins: [validationMixin],

  // Form Validations
  validations: {
    bidOpeningDate: { required },
    bidExpirationDate: { required },
    procurementCategory: { required },
    procurementMethod: { required }
  },

  // Props Received
  props: ["encodedRequisitionId"],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    requisition: {
      id: "",
      description: "",
      dateCreated: "",
      fundType: "",
      procurementType: "",
      isDeputyBursarRecommended: false,
      deputyBursarRemark: "",
      isDirectorApproved: false,
      directorRemarks: "",
      isReorder: false,
      divisionId: "",
      director: null,
      hod: null,
      deputyBursar: null,
      products: []
    },
    searchProduct: "",
    headers: [
      {
        text: "#",
        align: "start",
        sortable: false,
        value: "index"
      },
      { text: "Product ID", value: "product_id" },
      { text: "Product Name", value: "product_name" },
      { text: "Description", value: "description" },
      { text: "Quantity", value: "quantity" },
      { text: "Type", value: "type" }
    ],
    prosucts: [],

    // Alert
    alert: {
      show: true,
      type: "info",
      text: "test "
    },
    // Snackbar
    snackbar: {
      show: false,
      text: "",
      color: "",
      timeout: 4000
    },

    isOkayToInitialize: false,

    // Dialogs
    dialogInitializeProcurement: false,

    // Loaders
    loaderOverlay: false,

    isLoaded: false,
    isInitialized: false,

    // Menus
    menuBidOpeningDate: false,
    menuExpirationDate: false,

    bidOpeningDate: "",
    bidExpirationDate: "",
    procurementCategory: "",
    procurementMethod: "",

    procurementMethods: [
      "Direct Method",
      "National Competitive Bidding",
      "Normal Price Schedule",
      "National Shopping"
    ],
    procurementCategories: [
      "Stationeries and Office Consumable",
      "Office Equipment",
      "Books and Periodicals",
      "Office Furniture- Wooden/ Steel/Plastic",
      "Teaching Equipment",
      "Electrical Goods and Appliances",
      "Supply of Refreshment and Foods",
      "Motor Spare Parts",
      "Hardware and Plumbing Items",
      "Janitorial Items / Essential Items",
      "Building Materials",
      "Kitchen Utensils / Equipment and Furniture",
      "Uniform Materials and Curtain Materials",
      "Procurement of Services - Repairs to Office, Laboratory, Teaching Equipment, and Other Equipment",
      "Printing",
      "Repair to Motor Vehicles",
      "Procurement of Works",
      "Hiring of Vehicles",
      "Other Services"
    ],

    procurementMethodMap: new Map(),

    today: "",
    tomorrow: ""
  }),

  // Custom Methods and Functions
  methods: {
    getProductRequisition(requisitionId) {
      this.loaderOverlay = true;
      return new Promise((resolve, reject) => {
        this.$http
          .get(`/api/admin/requisition?requisitionId=${requisitionId}`)
          .then(res => {
            this.loaderOverlay = false;

            resolve(res.data);
          })
          .catch(err => {
            this.loaderOverlay = false;

            reject(err);
          });
      });
    },
    showProcurementInitializationConfirmation() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.dialogInitializeProcurement = true;
      }

      // TODO Check Whether Requisition is met the Initialization Requirements
    },
    initializeProcurement() {
      this.dialogInitializeProcurement = false;
      this.loaderOverlay = true;
      let procurementData = {
        requisitionId: this.requisition.id,
        procurementMethod: this.procurementMethodMap.get(
          this.procurementMethod
        ),
        procurementCategory: this.procurementCategory,
        bidOpeningDate: this.bidOpeningDate,
        bidExpirationDate: this.bidExpirationDate,
        assistantBursarId: this.$store.getters.employeeId,
        newStepValue: 3
      };

      this.$http
        .post("/api/admin/procurement/init", procurementData)
        .then(res => {
          console.log(res.status);
          this.loaderOverlay = false;

          // Snackbar Error
          this.snackbar.text = "Procurement Initialized Successfully";
          this.snackbar.color = "";
          this.snackbar.timeout = 4000;
          this.snackbar.show = true;
        })
        .catch(err => {
          console.log(err);
          this.loaderOverlay = false;

          // Snackbar Error
          this.snackbar.text = "Something Went Wrong";
          this.snackbar.color = "error";
          this.snackbar.timeout = 4000;
          this.snackbar.show = true;
        });
    },
    getInitialisationStatus(requisitionId) {
      return new Promise((resolve, reject) => {
        this.$http
          .get(
            `/api/admin/procurement/is_initialized?requisitionId=${requisitionId}`
          )
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    setToday() {
      let d = new Date();

      this.today = `${String(d.getFullYear())}-${
        String(d.getMonth() + 1).length < 2
          ? "0" + String(d.getMonth() + 1)
          : String(d.getMonth() + 1)
      }-${
        String(d.getDate() + 1).length < 2
          ? "0" + String(d.getDate() + 1)
          : String(d.getDate() + 1)
      }`;
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.setToday();

    // Setting Up the Map
    this.procurementMethodMap.set("Direct Method", "DIM");
    this.procurementMethodMap.set("National Competitive Bidding", "NCB");
    this.procurementMethodMap.set("Normal Price Schedule", "NSP1");
    this.procurementMethodMap.set("National Shopping", "NSP2");

    this.getInitialisationStatus(atob(this.encodedRequisitionId))
      .then(res => {
        this.isInitialized = res.is_initialized;

        return this.getProductRequisition(atob(this.encodedRequisitionId));
      })
      .then(requisition => {
        this.requisition.id = requisition.requisition_id;
        this.requisition.description = requisition.description;
        this.requisition.dateCreated = requisition.date.split("T")[0];
        this.requisition.fundType = requisition.fund_type;

        this.requisition.isDeputyBurasrRecommended =
          requisition.deputy_bursar_recommendation === "Recommended"
            ? true
            : false;
        this.requisition.deputyBursarRemark = requisition.deputy_bursar_remarks;
        this.requisition.isDirectorApproved =
          requisition.director_recommendation === "Approved" ? true : false;
        this.requisition.directorRemarks = requisition.director_remarks;
        this.requisition.divisionId = requisition.division;
        this.requisition.isReorder = requisition.reorder === 0 ? false : true;
        this.requisition.hod = requisition.hod;
        this.requisition.director = requisition.director;
        this.requisition.deputyBursar = requisition.deputy_burasr;

        this.requisition.products = requisition.products.map(product => {
          let index = 0;
          index++;
          return {
            ...product,
            index: index
          };
        });

        this.requisition.procurementType =
          requisition.procurement_type === "G"
            ? "Goods"
            : requisition.procurement_type === "W"
            ? "Work"
            : requisition.procurement_type === "S"
            ? "Service"
            : "Unknown";

        this.isOkayToInitialize =
          this.requisition.fundType === null ||
          !this.requisition.isDirectorApproved ||
          !this.requisition.isDeputyBurasrRecommended
            ? false
            : true;

        // Alert
        if (!this.isInitialized) {
          this.alert.text =
            "This Product Requitition Cannot be Initialized to a Procurement";
          this.alert.type = "error";
          this.alert.show = !this.isOkayToInitialize;
        } else {
          this.alert.text = "This Procurement Has Already Initialized";
          this.alert.type = "info";
          this.alert.show = true;
          this.isOkayToInitialize = false;
        }
        console.log("Procurement: ", this.requisition);
        this.isLoaded = true;
      })
      .catch(() => {
        // Snackbar Error
        this.snackbar.text = "Unable to Load the Data";
        this.snackbar.color = "error";
        this.snackbar.timeout = 4000;
        this.snackbar.show = true;
      });
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},

  // Computed Properties
  computed: {
    // Validation Rules
    procurementMethodErrors() {
      const errors = [];
      if (!this.$v.procurementMethod.$dirty) return errors;
      !this.$v.procurementMethod.required &&
        errors.push("Please Select the Procurement Method");
      return errors;
    },
    bidExpirationDateErrors() {
      const errors = [];
      if (!this.$v.bidExpirationDate.$dirty) return errors;
      !this.$v.bidExpirationDate.required &&
        errors.push("Please Select the Bid Expiration Date");
      return errors;
    },
    procurementCategoryErrors() {
      const errors = [];
      if (!this.$v.procurementCategory.$dirty) return errors;
      !this.$v.procurementCategory.required &&
        errors.push("Please Select the Procurement Category");
      return errors;
    },
    bidOpeningDateErrors() {
      const errors = [];
      if (!this.$v.bidOpeningDate.$dirty) return errors;
      !this.$v.bidOpeningDate.required &&
        errors.push("Please Select the Bid Opening Date");
      return errors;
    }
  }
};
</script>

// Custom CSS Rules and Classes
<style scoped></style>
