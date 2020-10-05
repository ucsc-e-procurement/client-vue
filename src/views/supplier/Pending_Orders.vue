<template>
  <v-container>
    <v-card flat>
      <template v-for="(item, key) in pendingOrders">
        <v-card :key="item.tenderNo" class="mx-auto" max-width="800" flat>
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
          v-if="key != pendingOrders.length - 1"
        ></v-divider>
      </template>
    </v-card>
    <v-dialog
      v-if="dialog"
      :procurement="procurement"
      v-model="dialog"
      width="750px"
    >
      <v-card>
        <v-card-title class="justify-center">
          <p class="text--primary">
            Quotation No: {{ pendingOrders[procurement].procurement_id }}
          </p>
        </v-card-title>
        <v-card-text>
          <p class="text--primary text-center">
            PO pdf goes here
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-3" text @click="processOrder('accept_sup')"
            >Accept</v-btn
          >
          <v-btn color="grey darken-3" text @click="processOrder('reject_sup')"
            >Reject</v-btn
          >
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
    user: null,
    tab: null,
    dialog: false,
    procurement: null,
    pendingOrders: []
  }),

  // Custom Methods and Functions
  methods: {
    openDialog: function(key) {
      this.procurement = key;
      this.dialog = true;
    },

    getPendingOrders(supplier_id) {
      this.$http
        .get("/api/supplier/get_pending_orders", {
          params: {
            id: supplier_id
          }
        })
        .then(response => {
          this.pendingOrders = response.data;
          console.log(this.pendingOrders);
        })
        .catch(error => {
          console.log(error);
        });
    },

    processOrder(status) {
      this.dialog = false;
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    // this.getPendingOrders("sale@gamestreet.lk");
    this.user = this.$store.getters.user.supplier_id
    this.fetchRequests(this.user)
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
