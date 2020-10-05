<template>
  <v-card class="mx-auto" max-width="1500" v-if="isMounted">
    <v-container>
      <v-form>
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              :value="this.bid.description"
              label="Description of Materials/Services"
              outlined
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              :value="this.bid.make"
              label="Make/Model"
              outlined
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              :value="'Rs. ' + this.bid.unit_price"
              label="Unit Price"
              outlined
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              :value="this.bid.quantity"
              label="Quantity"
              outlined
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              :value="this.bid.vat"
              label="VAT"
              outlined
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              :value="'Rs. ' + this.bid.total"
              label="Grand Total Without VAT"
              outlined
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :value="this.bid.vat_no"
              label="VAT Registration Number"
              outlined
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              :value="'Rs. ' + this.bid.total_with_vat"
              label="Grand Total With VAT"
              outlined
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :value="this.bid.authorize_person"
              label="Authorized Person"
              outlined
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              :value="
                new Date(this.bid.delivery_date).getDate() +
                  ' - ' +
                  new Date(this.bid.delivery_date).getMonth() +
                  ' - ' +
                  new Date(this.bid.delivery_date).getFullYear()
              "
              label="Delivery Date"
              outlined
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              :value="this.bid.quotation_validity"
              label="Quotation Validity"
              outlined
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              :value="this.bid.credit_period"
              label="Credit Period"
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
  props: ["procurementId"],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    bid: "",
    isMounted: false
  }),

  // Custom Methods and Functions
  methods: {
    getBidData() {
      this.$http
        .get(`/api/director/get_bid?procId=${this.procurementId}`)
        .then(response => {
          this.bid = response.data[0];
          this.isMounted = true;
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getBidData();
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
