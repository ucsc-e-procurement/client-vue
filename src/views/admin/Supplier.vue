<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container v-if="isLoaded">
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">
                Supplier Profile of <strong>{{ supplier.name }}</strong>
              </h5>
              <v-spacer />
              <v-chip color="success" small outlined class="mx-5"
                >Active</v-chip
              >
              <v-btn small color="red darken-2" dark>Delete</v-btn>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row no-gutters>
              <v-col cols="12">
                <v-card flat outlined class="mt-5">
                  <v-tabs v-model="tab" background-color="grey lighten-2" grow>
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab>
                      General Information
                    </v-tab>
                    <v-tab>
                      Bid Placements
                    </v-tab>
                    <v-tab>
                      Registrations
                    </v-tab>
                    <v-tab>
                      Settings
                    </v-tab>
                  </v-tabs>
                  <v-tabs-items v-model="tab">
                    <v-tab-item>
                      <v-container class="ma-0 ">
                        <v-row>
                          <v-col cols="7" class="pb-0 mb-0">
                            <v-text-field
                              v-model="supplier.supplier_id"
                              label="Supplier ID"
                              dense
                              outlined
                              :readonly="!isEditable"
                            />
                          </v-col>
                          <v-col cols="7" class="py-0 my-0">
                            <v-text-field
                              v-model="supplier.name"
                              label="Registered Name"
                              dense
                              outlined
                              :readonly="!isEditable"
                            />
                          </v-col>
                          <v-col cols="7" class="py-0 my-0">
                            <v-text-field
                              v-model="supplier.address"
                              label="Address"
                              dense
                              outlined
                              :readonly="!isEditable"
                            />
                          </v-col>

                          <v-col cols="7" class="py-0 my-0">
                            <v-text-field
                              v-model="supplier.email"
                              label="Email"
                              dense
                              outlined
                              readonly
                              :hint="
                                isEditable ? 'This Field Cannot be Edited' : ''
                              "
                            />
                          </v-col>

                          <v-col cols="7" class="py-0 my-0">
                            <v-text-field
                              v-model="supplier.contact_number"
                              label="Telephone"
                              dense
                              outlined
                              :readonly="!isEditable"
                            />
                          </v-col>

                          <v-col cols="7" class="py-0 my-0">
                            <v-text-field
                              v-model="supplier.category"
                              label="Category"
                              dense
                              outlined
                              :readonly="!isEditable"
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-tab-item>

                    <v-tab-item>
                      <v-container class="ma-0 ">
                        <v-row no-gutters>
                          <v-col cols="12">
                            <!-- <v-progress-circular indeterminate size="50" /> -->
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="searchBid"
                              outlined
                              dense
                              label="Search"
                              clearable
                            />
                            <v-data-table
                              :headers="headersBids"
                              :items="bids"
                              :search="searchBid"
                              :items-per-page="10"
                              no-data-text="Please Add Items"
                            >
                              <template v-slot:item.action="{ item }">
                                <v-btn
                                  @click="gotoBid(item.bid_id)"
                                  color="primary"
                                  text
                                  >View</v-btn
                                >
                              </template>
                            </v-data-table>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-tab-item>

                    <v-tab-item>
                      <v-container class="ma-0 ">
                        <v-row no-gutters>
                          <v-col cols="12"> </v-col>
                        </v-row>
                      </v-container>
                    </v-tab-item>

                    <v-tab-item>
                      <v-container class="ma-0 ">
                        <v-row no-gutters>
                          <v-col cols="12"> </v-col>
                        </v-row>
                      </v-container>
                    </v-tab-item>
                  </v-tabs-items>
                </v-card>
              </v-col>
              <!-- <v-col v-if="procurements.length == 0" cols="12">
                <v-alert type="info" outlined border="left">
                  No Any Ongoing Procurements Available
                </v-alert>
              </v-col>
              <v-col v-else cols="12">
                <v-data-table
                  :headers="headers"
                  :items="procurements"
                  :search="search"
                  :items-per-page="10"
                  @click:row="onclickTableRowTeacher"
                  no-data-text="Please Add Items"
                >
                  <template v-slot:item.action="{ item }">
                    <v-icon
                      small
                      color="red"
                      @click="deleteMaterial(item.path, item.id)"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
                </v-data-table>
              </v-col> -->
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";

// import General from "./components/Supplier_General";
// import Procurements from "./components/Supplier_General";
// import Registrations from "./components/Supplier_General";

/*

// Validation Library - Vuelidate
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

*/

/* Note: When Declaring Variables, always think about how Form Validation Rules are applied */
export default {
  // Mixins
  // mixins: [validationMixin],

  // Form Validations
  // validations: {},

  // Props Received
  props: ["encodedSupplierId", "encodedSupplierName"],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    supplier: null,
    // Loaders
    isLoaded: false,

    // Tab
    tab: null,

    isEditable: false,

    headersBids: [
      {
        text: "#",
        value: "index",
        sortable: false,
        align: "start",
        // divider: true,
        groupable: true
      },
      {
        text: "Bid ID",
        value: "bid_id",
        sortable: false,
        align: "start",
        // divider: true,
        groupable: true
      },
      {
        text: "Description",
        value: "description",
        sortable: false,
        align: "start",
        // divider: true,
        groupable: true
      },
      {
        text: "Procurement ID",
        value: "procurement_id",
        sortable: false,
        align: "center"
        // divider: true
      },
      {
        text: "Total Amount (VAT included)",
        value: "total_with_vat",
        sortable: false,
        align: "center"
        // divider: true
      },
      {
        text: "Status",
        value: "status",
        sortable: false,
        align: "center"
        // divider: true
      },

      {
        text: "Actions",
        value: "action",
        sortable: false,
        align: "center"
        // divider: true
      }
    ],
    bids: [],
    searchBid: ""
  }),

  // Custom Methods and Functions
  methods: {
    // ---------------------------------------------
    //           Tab 01
    // ---------------------------------------------
    getSupplierById(supplierId) {
      return new Promise((resolve, reject) => {
        this.$http
          .get(`/api/admin/supplier?id=${supplierId}`)
          .then(res => {
            console.log("Supplier: ", res.data);

            this.isLoaded = true;

            resolve(res.data);
          })
          .catch(err => {
            this.isLoaded = true;

            reject(err);
          });
      });
    },
    // -----------------------------------------
    //       Tab 02
    // -----------------------------------------
    getBidsBySupplierId(id) {
      return new Promise((resolve, reject) => {
        this.$http
          .get(`/api/admin/bids/supplier?supplierId=${id}`)
          .then(res => {
            console.log(res.data);
            resolve(res.data);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },
    gotoBid(bidId) {
      this.$router.push("/admin/bid/" + btoa(bidId)).catch(() => {});
    }
    // ---------------------------------------------
    //           Tab 03
    // ---------------------------------------------

    // ---------------------------------------------
    //           Tab 04
    // ---------------------------------------------
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getSupplierById(atob(this.encodedSupplierId))
      .then(supplier => {
        console.log(supplier);
        this.supplier = supplier;
        return this.getBidsBySupplierId(supplier.supplier_id);
      })
      .then(bids => {
        console.log(bids);
        let index = 0;
        this.bids = bids.map(bid => {
          index++;
          return { ...bid, index, actions: "" };
        });
      })
      .catch(err => {
        console.log(err);
      });
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
