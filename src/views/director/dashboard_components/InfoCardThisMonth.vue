<template>
    <v-container>
        <v-card>
            <v-card-title class="text-center justify-center">
                <h4 class="font-weight-bold ">This Month</h4>
            </v-card-title>
            <v-card-text>
                <v-col cols="12">
                <v-row>
                    <v-col cols="6">
                    <v-card height="150" color="deep-purple lighten-3">
                        <v-card-title class="headline font-weight-bold" style="justify-content: center;">
                        <div style="font-size: 50px; padding-top: 10px">
                            {{this.requisitionCount}}
                        </div>
                        </v-card-title>
                        <v-card-text class="headline " style="text-align: left;">
                            Purchase Requisitions
                        </v-card-text>
                    </v-card>
                    </v-col>
                    <v-col cols="6">
                    <v-card height="150" color="orange lighten-3">
                        <v-card-title class="headline font-weight-bold" style="justify-content: center;">
                        <div style="font-size: 50px; padding-top: 10px">
                            {{ongoingProcurementCount}}
                        </div>
                        </v-card-title>
                        <v-card-text class="headline " style="text-align: left;">
                        Ongoing Procurements  
                        </v-card-text>
                    </v-card>
                    </v-col>
                </v-row>
                </v-col>
                <v-col cols="12">
                <v-row>
                    <v-col cols="6">
                    <v-card height="150" color="green lighten-3">
                        <v-card-title class="headline font-weight-bold" style="justify-content: center;">
                        <div style="font-size: 50px; padding-top: 10px">
                            {{completedProcurementCount}}
                        </div>
                        </v-card-title>
                        <v-card-text class="headline " style="text-align: left;">
                        Completed Procurements
                        </v-card-text>
                    </v-card>
                    </v-col>
                    <v-col cols="6">
                    <v-card height="150" color="red lighten-3">
                        <v-card-title class="headline font-weight-bold" style="justify-content: center;">
                        <div style="font-size: 50px; padding-top: 10px">
                            {{terminatedProcurementCount}}
                        </div>
                        </v-card-title>
                        <v-card-text class="headline " style="text-align: left;">
                        Terminated Procurements
                        </v-card-text>
                    </v-card>
                    </v-col>
                </v-row>
                </v-col>
            </v-card-text>
        </v-card>
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
    isMounted: false,
    headers: [
      {
        text: "Product",
        align: "start",
        value: "product_name"
      },
      { text: "Supplier", value: "name" },
      { text: "Quantity", value: "quantity"},
      { text: "Delivery Date", value: "delivery_date" },
    ]
  }),

  // Custom Methods and Functions
  methods: {
    getProcurements(){
      this.$http
        .get("/api/director/procurements")
        .then(response => {
          console.log(response);
          this.ongoingProcurementCount = response.data.filter(item => item.status == 'on-going').length;
          this.completedProcurementCount = response.data.filter(item => item.status == 'completed').length;
          this.terminatedProcurementCount = response.data.filter(item => item.status == 'terminated').length;
          this.requisitionCount = response.data.filter(item => new Date(item.date).getMonth() == new Date().getMonth() && new Date(item.date).getFullYear() == new Date().getFullYear()).length;
          // this.isMounted = true;
        })
        .catch(err => {
          console.log(err);
        })
    },
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
      this.getProcurements();
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
