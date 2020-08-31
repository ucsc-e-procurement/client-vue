<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Purchases</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-card class="mx-auto" min-width="1000">
        <v-tabs v-model="tab" background-color="transparent" height="60" grow>
          <v-tab v-for="tab in tabs" :key="tab">
            {{ tab }}
          </v-tab>
        </v-tabs>
        <v-divider></v-divider>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <Pending />
          </v-tab-item>
          <v-tab-item>
            <Completed />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import Pending from "./Pending_Orders";
import Completed from "./Completed_Orders";

export default {
  // Props Received
  props: [],

  // Imported Components
  components: { Pending, Completed },

  // Data Variables and Values
  data: () => ({
    //
    tab: null,
    dialog: false,
    procurement: null,
    tabs: ["Pending Orders", "Completed orders"],
    supplier: null
  }),

  // Custom Methods and Functions
  methods: {
    getSupplier(supplier_id) {
      this.$http
        .get("/api/supplier/get_supplier", {
          params: {
            id: supplier_id
          }
        })
        .then(response => {
          this.supplier = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.getSupplier("sale@gamestreet.lk");
    //this.getSupplier(this.$store.getters.user.supplier_id)
  },
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
