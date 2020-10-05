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

            <v-row>
              <v-col cols="3">
                <h5 class="subtitle-1">Procurement Method</h5>
              </v-col>
              <v-col cols="8">
                <h5 class="subtitle-1">{{ procurement.procurement_method }}</h5>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <h5 class="subtitle-1">Procurement Type:</h5>
              </v-col>
              <v-col cols="8">
                <v-chip small class="ml-n2">{{
                  procurement.procurement_type
                }}</v-chip>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <h5 class="subtitle-1">Bid Opening Date:</h5>
              </v-col>
              <v-col cols="8">
                <h5 class="subtitle-1">{{ procurement.bid_opening_date }}</h5>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <h5 class="subtitle-1">
                  Bid Expiration Date:
                </h5>
              </v-col>
              <v-col cols="8">
                <h5 class="subtitle-1">
                  {{ procurement.expiration_date }}
                </h5>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <h5 class="subtitle-1">
                  Initialized By:
                </h5>
              </v-col>
              <v-col cols="8">
                <h5 class="subtitle-1">
                  {{ procurement.assistant_bursar_id }}
                </h5>
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
  props: ["procurementId"],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    //
    procurement: null,
    isLoaded: false
  }),

  // Custom Methods and Functions
  methods: {
    getProcurementById(procurementId) {
      this.loaderOverlay = true;
      return new Promise((resolve, reject) => {
        this.$http
          .get(`/api/admin/procurement?id=${procurementId}`)
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getProcurementById(this.procurementId)
      .then(procurement => {
        this.procurement = procurement;
        console.log("##############", this.procurementId, this.procurement);
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
