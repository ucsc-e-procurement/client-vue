<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <v-row no-gutters>
              <h5 class="headline">{{ this.$route.query.departmentname }}</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>
            <v-row class="justify-space-between">
              <v-col cols="12">
                <v-card v-if="isMounted">
                  <v-card-title
                    class="text-center justify-center py-6"
                  ></v-card-title>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <ProcurementsTab
                        :procurements="this.departmentDetails.procurements"
                        v-if="isMounted && this.departmentDetails.procurements"
                      />
                      <v-card-text
                        v-else
                        class="text-center justify-center py-6"
                        >No Procurement Data Available</v-card-text
                      >
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
    departmentDetails: "",
    isMounted: false
  }),

  // Custom Methods and Functions
  methods: {
    getDepartmentDetails() {
      this.$http
        .get(
          `/api/director/get_department_details?department=${this.$route.query.department}`
        )
        .then(response => {
          //   this.requisitionData = response.data[0];
          this.departmentDetails = response.data[0];
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
    this.getDepartmentDetails();
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
