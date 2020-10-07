<template>
  <v-container fluid class="px-0 py-0" v-if="isLoaded">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">
                Bid Information
              </h5>
              <v-spacer />
              <v-chip
                :color="
                  bid.status === 'approved'
                    ? 'success'
                    : bid.status === 'pending'
                    ? 'primary'
                    : 'error'
                "
                small
                class="mx-5"
                ><v-avatar left>
                  <v-icon size="20">{{
                    bid.status === "approved"
                      ? "mdi-checkbox-marked-circle"
                      : bid.status === "pending"
                      ? "mdi-clock-time-four"
                      : "mdi-close-circle"
                  }}</v-icon> </v-avatar
                >{{
                  bid.status === "approved"
                    ? "Approved"
                    : bid.status === "pending"
                    ? "Pending"
                    : "Rejected"
                }}</v-chip
              >
              <v-btn
                color="primary"
                :disabled="bid.status !== 'pending'"
                outlined
                small
                class=""
                >Approve Bid</v-btn
              >
              <!-- <v-btn color="primary" outlined small
                >UCSC/DIM/ENG?sdfdsf/sdf</v-btn
              > -->
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row>
              <v-col cols="12" class="pb-0">
                <key-value-a
                  :leftCols="2"
                  :rightCols="9"
                  leftKey="Procurement ID"
                  :rightValue="bid.procurement_id"
                  :dense="true"
                  :outlined="false"
                  :flat="true"
                />
              </v-col>
              <v-col cols="12" class="pb-0">
                <key-value-a
                  :leftCols="2"
                  :rightCols="9"
                  leftKey="Bid ID"
                  :rightValue="bid.bid_id"
                  :dense="true"
                  :outlined="false"
                  :flat="true"
                />
              </v-col>
              <v-col cols="12" class="py-0">
                <key-value-a
                  :leftCols="2"
                  :rightCols="9"
                  leftKey="Description"
                  :rightValue="bid.description"
                  :dense="true"
                  :outlined="false"
                  :flat="true"
                />
              </v-col>

              <v-col cols="12" class="py-0">
                <key-value-a
                  :leftCols="2"
                  :rightCols="9"
                  leftKey="Supplier ID"
                  :rightValue="bid.supplier_id"
                  :dense="true"
                  :outlined="false"
                  :flat="true"
                />
              </v-col>

              <v-col cols="12" class="py-0">
                <key-value-a
                  :leftCols="2"
                  :rightCols="9"
                  leftKey="Authorized Person"
                  :rightValue="bid.authorize_person"
                  :dense="true"
                  :outlined="false"
                  :flat="true"
                />
              </v-col>

              <v-col cols="12">
                <key-value-a
                  :leftCols="2"
                  :rightCols="9"
                  leftKey="Total Amount - LKR (Without VAT)"
                  :rightValue="bid.total"
                  :dense="true"
                  :outlined="false"
                  :flat="true"
                />
              </v-col>

              <v-col cols="12" class="py-0 mt-n3">
                <key-value-a
                  :leftCols="2"
                  :rightCols="9"
                  leftKey="Total Amount - LKR (With VAT)"
                  :rightValue="bid.total_with_vat"
                  :dense="true"
                  :outlined="false"
                  :flat="true"
                />
              </v-col>
              <v-col cols="12" class="py-0 mt-n1">
                <key-value-a
                  :leftCols="2"
                  :rightCols="9"
                  leftKey="VAT No"
                  :rightValue="bid.vat_no"
                  :dense="true"
                  :outlined="false"
                  :flat="true"
                />
              </v-col>
            </v-row>
            <v-divider class="my-5" />
            <v-row no-gutters class="pl-4">
              <v-col cols="12">
                <v-card flat>
                  <v-card outlined>
                    <v-card-title>
                      Quoted Products / Services / Works
                      <v-spacer></v-spacer>
                      <v-text-field
                        v-model="searchProduct"
                        append-icon="mdi-magnify"
                        label="Search"
                        outlined
                        dense
                        clearable
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-card-title>
                    <v-data-table
                      :headers="headers"
                      :items="products"
                      :search="searchProduct"
                    >
                      <template v-slot:item.action="{ item }">
                        <v-btn
                          small
                          text
                          color="primary"
                          @click="showProductDetails(item)"
                          >View Details</v-btn
                        >
                      </template>
                    </v-data-table>
                  </v-card>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-dialog v-model="dialogViewProduct" max-width="600">
        <v-card>
          <v-card-title class="headline">Product Details</v-card-title>
          <v-divider />
          <v-card-text class="px-0">
            <v-container>
              <v-row no-gutters>
                <v-col cols="12">
                  <key-value-a
                    :leftCols="5"
                    :rightCols="7"
                    leftKey="Product ID"
                    :rightValue="selectedProduct.product_id"
                    :dense="true"
                    :outlined="false"
                    :flat="true"
                  />
                </v-col>
                <v-col cols="12">
                  <key-value-a
                    :leftCols="5"
                    :rightCols="7"
                    leftKey="Product Name"
                    :rightValue="selectedProduct.product_name"
                    :dense="true"
                    :outlined="false"
                    :flat="true"
                  />
                </v-col>
                <v-col cols="12">
                  <key-value-a
                    :leftCols="5"
                    :rightCols="7"
                    leftKey="Description"
                    :rightValue="selectedProduct.description"
                    :dense="true"
                    :outlined="false"
                    :flat="true"
                  />
                </v-col>

                <v-col cols="12">
                  <key-value-a
                    :leftCols="5"
                    :rightCols="7"
                    leftKey="Make / Brand (If Applicable)"
                    :rightValue="selectedProduct.make"
                    :dense="true"
                    :outlined="false"
                    :flat="true"
                  />
                </v-col>

                <v-col cols="12">
                  <key-value-a
                    :leftCols="5"
                    :rightCols="7"
                    leftKey="Product Type"
                    :rightValue="selectedProduct.type"
                    :dense="true"
                    :outlined="false"
                    :flat="true"
                  />
                </v-col>
                <v-col cols="12" class="my-5">
                  <v-divider />
                </v-col>
                <v-col cols="12">
                  <key-value-a
                    :leftCols="5"
                    :rightCols="7"
                    leftKey="Quantity"
                    :rightValue="selectedProduct.quantity"
                    :dense="true"
                    :outlined="false"
                    :flat="true"
                  />
                </v-col>
                <v-col cols="12">
                  <key-value-a
                    :leftCols="5"
                    :rightCols="7"
                    leftKey="Unit Price (LKR)"
                    :rightValue="selectedProduct.unit_price"
                    :dense="true"
                    :outlined="false"
                    :flat="true"
                  />
                </v-col>
                <v-col cols="12">
                  <key-value-a
                    :leftCols="5"
                    :rightCols="7"
                    leftKey="VAT (LKR)"
                    :rightValue="selectedProduct.vat"
                    :dense="true"
                    :outlined="false"
                    :flat="true"
                  />
                </v-col>

                <v-col cols="12" class="my-5">
                  <v-divider />
                </v-col>
                <v-col cols="12">
                  <key-value-a
                    :leftCols="5"
                    :rightCols="7"
                    leftKey="Credit Period"
                    :rightValue="selectedProduct.credit_period"
                    :dense="true"
                    :outlined="false"
                    :flat="true"
                  />
                </v-col>

                <v-col cols="12">
                  <key-value-a
                    :leftCols="5"
                    :rightCols="7"
                    leftKey="Delivery Date"
                    :rightValue="selectedProduct.delivery_date"
                    :dense="true"
                    :outlined="false"
                    :flat="true"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="primary" text @click="dialogViewProduct = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Fullscreen Overlay - Loader -->
    <v-overlay :value="loaderOverlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";
import KeyVal_A from "./components/Key_Value_Typo_A";
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
  props: ["encodedBidId"],

  // Imported Components
  components: {
    "key-value-a": KeyVal_A
  },

  // Data Variables and Values
  data: () => ({
    bid: null,

    // Products Table
    searchProduct: "",
    headers: [
      { text: "Product ID", value: "product_id" },
      { text: "Product Name", value: "product_name" },
      //   { text: "Description", value: "description" },
      { text: "Make", value: "make" },
      //   { text: "Credit Period", value: "credit_period" },
      //   { text: "Delivery Date", value: "delivery_date" },
      { text: "Quantity", value: "quantity" },
      { text: "Unit Price(LKR)", value: "unit_price" },
      { text: "VAT (LKR)", value: "vat" },
      { text: "Action", value: "action", sortable: false, align: "center" }

      //   { text: "Quatation Validity", value: "quotation_validity" }
    ],
    products: [],

    // Dialogs
    dialogViewProduct: false,
    selectedProduct: {},
    loaderOverlay: false,
    isLoaded: false
  }),

  // Custom Methods and Functions
  methods: {
    getBidById(id) {
      return new Promise((resolve, reject) => {
        this.$http
          .get(`/api/admin/bid?id=${id}`)
          .then(res => {
            // console.log(res.data);
            resolve(res.data);
          })
          .catch(err => {
            // console.log(err);
            reject(err);
          });
      });
    },
    showProductDetails(product) {
      this.selectedProduct = product;
      this.dialogViewProduct = true;
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.loaderOverlay = true;
    this.getBidById(atob(this.encodedBidId))
      .then(res => {
        console.log("Bid >>: ", res);
        this.bid = res;
        this.products = res.products.map(product => {
          return { ...product, action: "" };
        });

        this.isLoaded = true;
        this.loaderOverlay = false;
      })
      .catch(err => {
        this.isLoaded = true;
        this.loaderOverlay = false;

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
