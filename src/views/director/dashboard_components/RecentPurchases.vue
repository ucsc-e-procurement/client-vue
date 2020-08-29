<template>
  <v-container>
    <v-card>
      <!-- <v-card-title class="headline">Recently Purchased Products</v-card-title> -->
      <v-card-title class="text-center justify-center py-6">
        <h4 class="font-weight-bold ">Recent Purchases</h4>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="recentPurchases"
        :search="search"
        :items-per-page="5"
        v-if="isMounted"
      >
      </v-data-table>
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
    recentPurchases: [],
    isMounted: false,
    search: "",

    headers: [
      {
        text: "Product",
        align: "start",
        value: "product_name"
      },
      { text: "Supplier", value: "name" },
      { text: "Quantity", value: "quantity" },
      { text: "Delivery Date", value: "delivery_date" }
    ]
  }),

  // Custom Methods and Functions
  methods: {
    getRecentProducts() {
      this.isMounted = true;
      this.$http
        .get("/api/director/get_recent_products")
        .then(response => {
          console.log(response);
          this.recentPurchases = response.data;
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
    this.getRecentProducts();
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
