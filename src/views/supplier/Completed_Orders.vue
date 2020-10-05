<template>
  <v-container>
    <v-card flat>
      <template v-for="(item, key) in completedOrders">
        <v-card :key="item.procurement_id" class="mx-auto" max-width="800" flat>
          <v-card-text>
            <div>Procurement ID : {{ item.procurement_id }}</div>
            <p class="text-h6">
              {{ item.category }}
            </p>
            <div class="text--primary">Bid ID : {{ item.bid_id }}</div>
            <div class="text--primary">
              Description : {{ item.description }}
            </div>
            <div class="text--primary">
              <b>Total : Rs. {{ item.total_with_vat }}</b>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="blue darken-3" @click="openDialog(key)">
              View
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-divider
          :key="key"
          v-if="key != allCompletedOrders.length - 1"
        ></v-divider>
      </template>
    </v-card>
    <template>
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="Math.ceil(allCompletedOrders.length / perPage)"
          circle
        ></v-pagination>
      </div>
    </template>
    <v-dialog
      v-if="dialog"
      :procurement="procurement"
      v-model="dialog"
      width="650px"
    >
      <v-card>
        <v-card-title class="justify-center">
          <p class="text--primary">
            Quotation No: {{ completedOrders[procurement].procurement_id }}
          </p>
        </v-card-title>
        <v-card-text>
          <p class="text--primary text-center">
            PO pdf goes here
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-3" text @click="dialog = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  // Props Received
  props: [],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    //
    user:null,
    tab: null,
    dialog: false,
    procurement: null,
    page: 1,
    perPage: 10,
    allCompletedOrders: []
  }),

  // Custom Methods and Functions
  methods: {
    openDialog: function(key) {
      this.procurement = key;
      this.dialog = true;
    },

    getCompletedOrders(supplier_id) {
      this.$http
        .get("/api/supplier/get_completed_orders", {
          params: {
            id: supplier_id
          }
        })
        .then(response => {
          this.allCompletedOrders = response.data;
          console.log(this.allCompletedOrders);
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
    // this.getCompletedOrders("sale@gamestreet.lk");
    this.user = this.$store.getters.user.user_id
    this.fetchCompletedProcurements(this.user)
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},

  // Computed Properties
  computed: {
    completedOrders() {
      return this.allCompletedOrders.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    }
  }
};
</script>

// Custom CSS Rules and Classes
<style scoped></style>
