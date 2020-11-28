<template>
  <v-card class="mx-auto" max-width="1500">
    <v-container>
      <v-form>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              :value="this.requisitionData.procurement_id"
              label="Procurement Id"
              outlined
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :value="this.requisitionData.procurement_method"
              label="Procurement Method"
              outlined
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              :value="
                this.requisitionData.procurement_type == 'G'
                  ? 'Goods'
                  : 'Service'
              "
              label="Procurement Type"
              outlined
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :value="this.requisitionData.finance_method"
              label="Finance Method"
              outlined
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              :value="
                new Date(this.requisitionData.bid_opening_date).getDate() +
                  ' - ' +
                  new Date(this.requisitionData.bid_opening_date).getMonth() +
                  ' - ' +
                  new Date(this.requisitionData.bid_opening_date).getFullYear()
              "
              label="Bid Opening Date"
              outlined
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :value="
                new Date(this.requisitionData.expiration_date).getDate() +
                  ' - ' +
                  new Date(this.requisitionData.expiration_date).getMonth() +
                  ' - ' +
                  new Date(this.requisitionData.expiration_date).getFullYear()
              "
              label="Closing Date"
              outlined
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
export default {
  // Form Validations
  // validations: {},

  // Props Received
  name: "Procurement_Method",
  props: ["requisitionData"],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    //
  }),

  // Custom Methods and Functions
  methods: {},

  // Life Cycle Hooks
  beforeCreate() {},
  created() {},
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
