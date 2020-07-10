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
              <h5 class="subtitle-2">{{ requisition.id }}</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row>
              <v-col cols="12">
                <h5 class="subtitle-1">Requisition ID: {{ requisition.id }}</h5>
                <h5 class="subtitle-1">
                  Description: {{ requisition.description }}
                </h5>
                <h5 class="subtitle-1">
                  Head of Division: {{ requisition.hod.name }}
                </h5>
                <h5 class="subtitle-1">
                  Division: {{ requisition.divisionId }}
                </h5>
                <h5 class="subtitle-1">
                  Fund Type:
                  {{
                    requisition.fundType === null
                      ? "No Provided"
                      : requisition.fundType
                  }}
                </h5>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <h5 class="subtitle-1">Deputy Bursar's Recommendation:</h5>
              <v-chip
                :color="
                  requisition.isDeputyBurasrRecommended ? 'success' : 'error'
                "
                small
                class="mx-5"
              >
                {{
                  requisition.isDeputyBurasrRecommended
                    ? "Reccommended"
                    : "Not Reccommended"
                }}</v-chip
              >
            </v-row>
            <v-row no-gutters>
              <h5 class="subtitle-1">
                Remarks of Rejection:
                {{
                  requisition.deputyBursarRemark === "None"
                    ? "No Rejection Remarks Has Provided"
                    : requisition.deputyBursarRemark
                }}
              </h5>
            </v-row>

            <v-row no-gutters>
              <h5 class="subtitle-1">Director's Approval:</h5>
              <v-chip
                :color="requisition.isDirectorApproved ? 'success' : 'error'"
                small
                class="mx-5"
              >
                {{
                  requisition.isDirectorApproved ? "Approved" : "Rejected"
                }}</v-chip
              >
            </v-row>
            <v-row no-gutters>
              <h5 class="subtitle-1">
                Remarks of Rejection:
                {{
                  requisition.directorsRemark === "None"
                    ? "No Rejection Remarks Has Provided"
                    : requisition.deputyBursarRemark
                }}
              </h5>
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
    }
  }),

  // Custom Methods and Functions
  methods: {
    getProductRequisition(requisitionId) {
      return new Promise((resolve, reject) => {
        this.$http
          .get(
            `/api/admin/get_product_requisition?requisitionId=${requisitionId}`
          )
          .then(res => {
            console.log("getProductRequisition Res: ", res.data);
            resolve(res.data);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getProductRequisition(atob(this.encodedRequisitionId))
      .then(requisition => {
        this.requisition.id = requisition.requisition_id;
        this.requisition.description = requisition.description;
        this.requisition.dateCreated = requisition.date;
        this.requisition.fundType = requisition.fund_type;
        this.requisition.isDeputyBursarRecommended =
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
        this.requisition.products = requisition.products;
        this.requisition.procurementType = requisition.procurement_type;

        console.log("Procurement: ", this.requisition);
      })
      .catch();
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
