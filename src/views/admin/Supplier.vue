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
              <v-chip
                color="success"
                small
                outlined
                class="mx-5"
                v-if="registrationStatus === 'VERIFIED'"
                >Active</v-chip
              >
              <v-chip color="error" small outlined class="" v-else
                >Inactive</v-chip
              >
              <!-- <v-btn small color="red darken-2" dark>Delete</v-btn> -->
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row
              no-gutters
              class="pt-5"
              v-show="registrationStatus !== 'VERIFIED'"
            >
              <v-col cols="12">
                <v-alert
                  v-if="registrationStatus === 'NOT_REGISTERED'"
                  type="error"
                  outlined
                  border="left"
                  >{{ supplier.name }} is <strong>NOT</strong> Registered for
                  this Year.</v-alert
                >
                <v-alert
                  v-else-if="registrationStatus === 'DENIED'"
                  type="error"
                  outlined
                  border="left"
                  >{{ supplier.name }} is Denied. Due to Failure to fulfil
                  Prerequisites</v-alert
                >

                <v-alert
                  v-else-if="
                    registrationStatus === 'REGISTERED_BUT_NOT_VERIFIED'
                  "
                  type="info"
                  outlined
                  border="left"
                  >Pending Verification</v-alert
                >
              </v-col>
            </v-row>
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
                    <v-tab
                      @click="
                        getRegistrationsBySupplierId(supplier.supplier_id)
                      "
                    >
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

                          <v-col cols="12">
                            <v-text-field
                              v-model="searchRegistration"
                              outlined
                              dense
                              label="Search"
                              clearable
                            />
                            <v-data-table
                              :headers="headersRegistrations"
                              :items="registrations"
                              :search="searchRegistration"
                              :items-per-page="10"
                              no-data-text="Please Add Items"
                            >
                              <template v-slot:item.action="{ item }">
                                <v-btn
                                  @click="
                                    gotoRegistration(item.registration_no)
                                  "
                                  color="primary"
                                  text
                                  >View</v-btn
                                >
                              </template>

                              <template v-slot:item.verified="{ item }">
                                <v-chip
                                  small
                                  :color="
                                    item.verified === 'verified'
                                      ? 'success'
                                      : item.verified === 'denied'
                                      ? 'error'
                                      : 'primary'
                                  "
                                >
                                  {{
                                    item.verified === "verified"
                                      ? "Verified"
                                      : item.verified === "denied"
                                      ? "Denied"
                                      : "Pending"
                                  }}
                                </v-chip>
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

    <!-- Dialog - Delete Confiramtion -->
    <!-- <v-row justify="center">
      <v-dialog v-model="dialogDeleteSupplier" persistent max-width="400">
        <v-card>
          <v-card-title class="headline">Supplier Delete Confirmation/v-card-title>
          <v-card-text
            >Do you really want to Delete this supplier Permenently ?
            <br />
            Note: This process cannot be
            <strong>undone</strong>. Please make sure that the supplier
            deletion is thoroughly required.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="" text @click="dialogDeleteSupplier = false" small
              >Cancel</v-btn
            >
            <v-btn color="error" small @click="deleteSupplier">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row> -->
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
    searchBid: "",

    isRegistered: false,
    registrationStatus: "",

    searchRegistration: "",
    registrations: [],
    headersRegistrations: [
      {
        text: "#",
        value: "index",
        sortable: false,
        align: "start",
        // divider: true,
        groupable: true
      },
      {
        text: "Registration Year",
        value: "registration_year",
        sortable: false,
        align: "start",
        // divider: true,
        groupable: true
      },
      {
        text: "Registration Date",
        value: "registration_date",
        sortable: false,
        align: "start",
        // divider: true,
        groupable: true
      },
      {
        text: "Status",
        value: "verified",
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

    dialogDeleteSupplier: true
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
    },
    // ---------------------------------------------
    //           Tab 03
    // ---------------------------------------------
    getRegistrationsBySupplierId(id) {
      return new Promise((resolve, reject) => {
        this.$http
          .get(`/api/admin/supplier/registrations?supplierId=${id}`)
          .then(res => {
            console.log(res.data);
            let index = 0;
            this.registrations = res.data.map(registration => {
              index++;
              return {
                ...registration,
                index,
                action: "",
                registration_year: registration.registration_date.split("-")[0]
              };
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },
    // ---------------------------------------------
    //           Tab 04
    // ---------------------------------------------

    // ---------------------------------------------
    getRegistrationStatus() {
      this.$http
        .get(
          `/api/admin/supplier/registration-status?supplierId=${atob(
            this.encodedSupplierId
          )}`
        )
        .then(res => {
          console.log(res.data);
          this.registrationStatus = res.data.status;
        })
        .catch(err => {
          console.log(err);
        });
    },

    gotoRegistration(registrationId) {
      this.$router
        .push(`/admin/supplier-registration/${btoa(registrationId)}`)
        .catch(() => {});
    },

    deleteSupplier() {}
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getRegistrationStatus();
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
