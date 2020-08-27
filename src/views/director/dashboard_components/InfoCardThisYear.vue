<template>
  <v-container>
    <v-row class="justify-space-between">
          <v-col cols="3">
                <v-card
                  color="#1976d2"
                  dark
                >
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title class="headline font-weight-bold" style="padding-top: 40px;">
                        <div style="font-size: 50px;">
                          {{this.supplierCount}}
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn text>Registered Suppliers</v-btn>
                      </v-card-actions>
                    </div>
                    <v-avatar
                    class="ma-3"
                    slot="icon"
                    color="blue darken-4"
                    size="125"
                  >
                    <v-icon
                      icon="mdi-lock"
                      color="white"
                    >
                      mdi-lock
                    </v-icon>
                  </v-avatar>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card
                  color="#1976d2"
                  dark
                >
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title class="headline font-weight-bold" style="padding-top: 40px;">
                        <div style="font-size: 50px;">
                          {{this.requisitionCount}}
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn text>Total Requisitions</v-btn>
                      </v-card-actions>
                    </div>
                    <v-avatar
                    class="ma-3"
                    slot="icon"
                    color="yellow darken-3"
                    size="125"
                  >
                    <v-icon
                      icon="mdi-lock"
                      color="white"
                    >
                      mdi-lock
                    </v-icon>
                  </v-avatar>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card
                  color="#1976d2"
                  dark
                >
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title class="headline font-weight-bold" style="padding-top: 40px;">
                        <div style="font-size: 50px;">
                          {{Math.round(this.completedProcurementCount * 100 *100)/100}}%
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn text>Completed</v-btn>
                      </v-card-actions>
                    </div>
                    <v-avatar
                    class="ma-3"
                    slot="icon"
                    color="green lighten-1"
                    size="125"
                  >
                    <v-icon
                      icon="mdi-lock"
                      color="white"
                    >
                      mdi-lock
                    </v-icon>
                  </v-avatar>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card
                  color="#1976d2"
                  dark
                >
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title class="headline font-weight-bold" style="padding-top: 40px;">
                        <div style="font-size: 50px;">
                          {{Math.round(this.terminatedProcurementCount * 100 *100)/100}}%
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn text>Rejected</v-btn>
                      </v-card-actions>
                    </div>
                    <v-avatar
                    class="ma-3"
                    slot="icon"
                    color="red lighten-1"
                    size="125"
                  >
                    <v-icon
                      icon="mdi-lock"
                      color="white"
                    >
                      mdi-lock
                    </v-icon>
                  </v-avatar>
                  </div>
                </v-card>
              </v-col>
    </v-row>
  </v-container>
</template>

<script>

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
    requisitionCount: '',
    ongoingProcurementCount: '',
    completedProcurementCount: '',
    terminatedProcurementCount: '',
    totalProcurements: '',
    supplierCount: '',
    isMounted: false,
  }),

  // Custom Methods and Functions
  methods: {
    getProcurements(){
      this.$http
        .get("/api/director/procurements")
        .then(response => {
          console.log(response);
          var totalProcurements = response.data.filter(item => item.status == 'on-going').length + response.data.filter(item => item.status == 'completed').length + response.data.filter(item => item.status == 'terminated').length
          this.ongoingProcurementCount = response.data.filter(item => item.status == 'on-going').length / totalProcurements;
          this.completedProcurementCount = response.data.filter(item => item.status == 'completed').length / totalProcurements;
          this.terminatedProcurementCount = response.data.filter(item => item.status == 'terminated').length / totalProcurements;
          this.requisitionCount = response.data.filter(item => new Date(item.date).getFullYear() == new Date().getFullYear()).length;
          // this.isMounted = true;
        })
        .catch(err => {
          console.log(err);
        })
    },
    getSuppliers() {
      this.$http
        .get("/api/director/get_suppliers")
        .then(response => {
          // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", response);
          this.supplierCount = response.data.length
          // this.isMounted = true;
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
