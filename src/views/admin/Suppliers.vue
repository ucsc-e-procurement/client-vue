<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Supplier</h5>
              <v-spacer />
              <v-btn color="primary" small outlined>Registrations</v-btn>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row class="">
              <v-spacer />
              <v-col cols="6">
                <v-text-field
                  v-model="search"
                  label="Search"
                  outlined
                  dense
                  append-icon="mdi-magnify"
                  class="pt-5"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col v-if="suppliers.length == 0" cols="12">
                <v-alert type="info" outlined border="left">
                  No Any Suppliers Available
                </v-alert>
              </v-col>
              <v-col v-else cols="12">
                <v-data-table
                  :headers="headers"
                  :items="suppliers"
                  :search="search"
                  :items-per-page="10"
                  no-data-text="No Users Available"
                  :loading="loaderUsers"
                >
                  <template v-slot:item.status="{ item }">
                    <v-chip
                      small
                      outlined
                      :color="item.status === 'active' ? 'success' : 'error'"
                      >{{
                        item.status === "active" ? "Active" : "Deactive"
                      }}</v-chip
                    >
                  </template>

                  <template v-slot:item.actions="{ item }">
                    <v-btn
                      @click="gotoSupplierProfile(item.supplier_id)"
                      small
                      text
                      color="primary"
                      class="ml-5"
                      >View</v-btn
                    >
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
            <!-- Snackbar -->
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-snackbar
        v-model="snackbar.show"
        bottom
        right
        :color="snackbar.color"
        :timeout="snackbar.timeout"
      >
        {{ snackbar.text }}
        <v-btn text @click="snackbar.show = false">
          Close
        </v-btn>
      </v-snackbar>
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
  props: [],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    headers: [
      {
        text: "#",
        value: "index",
        sortable: false,
        align: "start",
        divider: false
      },
      {
        text: "Supplier ID",
        value: "supplier_id",
        sortable: true,
        align: "start",
        divider: false
      },
      {
        text: "Name / Company",
        value: "name",
        sortable: true,
        align: "start",
        divider: false
      },
      {
        text: "Email",
        value: "email",
        sortable: true,
        align: "start",
        divider: false
      },
      {
        text: "Category",
        value: "category",
        sortable: false,
        align: "start",
        divider: false
      },
      {
        text: "Contact",
        value: "contact_number",
        sortable: false,
        align: "center",
        divider: false
      },
      {
        text: "Status",
        value: "status",
        sortable: false,
        align: "center",
        divider: false
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "right",
        divider: false
      }
    ],
    suppliers: [],
    search: "",

    // Snackbar
    snackbar: {
      show: false,
      text: "",
      color: "",
      timeout: 4000
    },

    // Loaders
    loaderOverlay: false,
    loaderSuppliers: false
  }),

  // Custom Methods and Functions
  methods: {
    getSuppliers() {
      this.loaderSuppliers = true;
      return new Promise((resolve, reject) => {
        this.$http
          .get("/api/admin/suppliers")
          .then(res => {
            console.log("Users: ", res.data);

            this.loaderSuppliers = false;
            let suppliers = res.data;

            let index = 0;
            suppliers = suppliers.map(supplier => {
              index++;

              return { ...supplier, index, actions: "" };
            });

            resolve(suppliers);
          })
          .catch(err => {
            this.loaderSuppliers = false;

            reject(err);
          });
      });
    },
    gotoSupplierProfile(supplierId) {
      //   console.log(supplierId, atob(supplierId), btoa(supplierId));
      this.$router.push(`/admin/supplier/${btoa(supplierId)}`).catch(() => {});
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getSuppliers().then(supplier => {
      this.suppliers = supplier;
      console.log(">>>>>>>>>>>>>>> ", this.suppliers);
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
