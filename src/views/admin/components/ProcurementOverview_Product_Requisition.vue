<template>
  <v-container class="py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card color="" outlined>
          <v-container fluid class="ma-0 px-5" v-if="isLoaded">
            <!-- <v-row no-gutters>
              <v-text-field
                v-model="requisition.requisition_id"
                label="Requisition ID"
                outlined
                dense
                readonly
              />
            </v-row>
            <v-row no-gutters>
              <v-col cols="2" class="pr-2">
                <v-text-field
                  v-model="requisition.date"
                  label="Date Requested"
                  outlined
                  dense
                  readonly
                />
              </v-col>
              <v-col cols="10">
                <v-text-field label="Date Requested" outlined dense readonly />
              </v-col>
            </v-row> -->

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
                    requisition.isDeputyBurasrRecommended ? 'success' : 'error'
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
                  :color="requisition.isDirectorApproved ? 'success' : 'error'"
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

            <v-row no-gutters class="my-5">
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
  props: ["requisitionId"],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    //
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
    isLoaded: false,

    // Alert
    alert: {
      show: true,
      type: "info",
      text: "test "
    }
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
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getProductRequisition(this.requisitionId)
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
        this.isLoaded = true;
      })
      .catch(err => {
        console.log(err);
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
