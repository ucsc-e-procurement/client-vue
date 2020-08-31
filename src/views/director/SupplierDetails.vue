<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <v-row class="justify-space-between">
              <v-col cols="12">
                <v-card v-if="isMounted">
                  <v-card-title class="text-center justify-center py-6">
                    <h4 class="font-weight-bold ">
                      {{ this.supplierDetails.name }}
                    </h4>
                  </v-card-title>
                  <v-row>
                    <v-col cols="12" sm="9">
                      <ProcurementsTab
                        :procurements="this.supplierDetails.procurements"
                        v-if="isMounted && this.supplierDetails.procurements"
                      />
                      <v-card-text
                        v-else
                        class="text-center justify-center py-6"
                        >No Procurement Data Available</v-card-text
                      >
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-card flat>
                        <v-container>
                          <v-row class="justify-space-between">
                            <v-col cols="12">
                              <v-card>
                                <v-card-title
                                  class="text-center justify-center py-6"
                                >
                                  <v-avatar color="indigo" size="90">
                                    <span
                                      class="white--text headline"
                                      v-if="
                                        this.supplierDetails.name.split(' ')
                                          .length > 1
                                      "
                                      >{{
                                        this.supplierDetails.name.split(
                                          " "
                                        )[0][0] +
                                          this.supplierDetails.name.split(
                                            " "
                                          )[1][0]
                                      }}</span
                                    >
                                    <span class="white--text headline" v-else>{{
                                      this.supplierDetails.name.split(" ")[0][0]
                                    }}</span>
                                  </v-avatar>
                                </v-card-title>
                                <v-divider class="mx-4"></v-divider>
                                <v-card-text>
                                  <v-card-text
                                    >Email:
                                    {{
                                      this.supplierDetails.email
                                    }}</v-card-text
                                  >
                                  <v-card-text
                                    >Address:
                                    {{
                                      this.supplierDetails.address
                                    }}</v-card-text
                                  >
                                  <v-card-text
                                    >Mobile:
                                    {{
                                      this.supplierDetails.contact_number
                                    }}</v-card-text
                                  >

                                  <v-divider class="mx-4"></v-divider>

                                  <v-card-text
                                    >Category:
                                    {{
                                      this.supplierDetails.category
                                    }}</v-card-text
                                  >
                                  <v-card-text
                                    >Status:
                                    {{
                                      this.supplierDetails.status
                                    }}</v-card-text
                                  >
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card>
                    </v-col>
                  </v-row>
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

import ProcurementsTab from "./ProcurementsTab";

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
    ProcurementsTab: ProcurementsTab
  },

  // Data Variables and Values
  data: () => ({
    supplierDetails: "",
    isMounted: false
  }),

  // Custom Methods and Functions
  methods: {
    getSupplierDetails() {
      this.$http
        .get(
          `/api/director/get_supplier_details?supplierId=${this.$route.query.supplierId}`
        )
        .then(response => {
          //   this.requisitionData = response.data[0];
          this.supplierDetails = response.data[0];
          // console.log('>>', response.data[0]);
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
    this.getSupplierDetails();
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
