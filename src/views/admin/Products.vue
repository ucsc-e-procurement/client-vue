<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Products</h5>
              <v-spacer />
              <v-btn small color="primary">Add Product</v-btn>
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
              <v-col v-if="products.length == 10" cols="12">
                <v-alert type="info" outlined border="left">
                  No Any Products Available
                </v-alert>
              </v-col>
              <v-col v-else cols="12">
                <v-data-table
                  :headers="headers"
                  :items="products"
                  :search="search"
                  :items-per-page="10"
                  no-data-text="No Users Available"
                  :loading="loaderUsers"
                >
                  <template v-slot:item.actions="{ item }">
                    <v-btn
                      small
                      icon
                      class="ml-5"
                      @click="gotoProcurement(item)"
                      ><v-icon color="red darken-2">mdi-delete</v-icon></v-btn
                    >
                  </template>

                  <template v-slot:item.status="{ item }">
                    <v-chip
                      outlined
                      small
                      :color="item.status === true ? 'success' : 'error'"
                      >{{
                        item.status === true ? "Active" : "InActive"
                      }}</v-chip
                    >
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog Verify Deactivation -->
    <v-row justify="center">
      <v-dialog v-model="dialogDeactivateUser" persistent max-width="350">
        <v-card>
          <v-card-title class="headline">Account Deactivation</v-card-title>
          <v-card-text
            >Do you want to <strong>Deactivate</strong> this user account ?
            <small
              >Note: By deactivating User account, User cannot be logged in to
              the system</small
            >
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="loaderDeactivateUser"
              small
              color=""
              @click="cancelDeactivateConfirmation"
              >Cancel</v-btn
            >
            <v-btn
              small
              color="red darken-2"
              dark
              :loading="loaderDeactivateUser"
              @click="deactivateUser(deactivatePointer)"
              >Deactivate</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Snackbar -->
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
        divider: false,
        groupable: true
      },
      {
        text: "Product ID",
        value: "id",
        sortable: true,
        align: "start",
        divider: false,
        groupable: true
      },
      {
        text: "Product Name",
        value: "name",
        sortable: true,
        align: "start",
        divider: false,
        groupable: true
      },
      {
        text: "Description",
        value: "description",
        sortable: true,
        align: "start",
        divider: false,
        groupable: true
      },
      {
        text: "Type",
        value: "type",
        sortable: false,
        align: "start",
        divider: false,
        groupable: true
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "center",
        divider: false,
        width: "300"
      }
    ],
    products: [
      {
        no: 1,
        user_id: "test@gmail.com",
        password: "********",
        user_role: "admin",
        status: true,
        date_created: new Date(),
        actions: ""
      }
    ],
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
    loaderProducts: false,

    // Dialogs
    dialogDeactivateUser: false,

    deactivatePointer: null
  }),

  // Custom Methods and Functions
  methods: {
    getProducts() {
      this.loaderProducts = true;
      return new Promise((resolve, reject) => {
        this.$http
          .get("/api/admin/get_all_products")
          .then(res => {
            console.log("Users: ", res.data);
            let index = 0;
            let users = [];

            users = res.data.map(product => {
              index++;
              return {
                index: index,
                id: product.product_id,
                name: product.product_name,
                description: product.description,
                typr: product.type,
                actions: ""
              };
            });
            this.loaderProducts = false;

            resolve(users);
          })
          .catch(err => {
            this.loaderProducts = false;

            reject(err);
          });
      });
    },

    // Account Deactivation
    openDeactivateConfirmation(user) {
      this.dialogDeactivateUser = true;
      this.deactivatePointer = user;
    },

    cancelDeactivateConfirmation() {
      this.dialogDeactivateUser = false;
      this.deactivatePointer = null;
    },

    deactivateUser(user) {
      this.loaderDeactivateUser = true;
      this.$http
        .put("/api/admin/change_user_status", {
          user_id: user.email,
          status: 1
        })
        .then(res => {
          console.log("Deactivate Res: ", res.data);
          if (res.data.message === "SUCCESS") {
            // Snackbar
            this.snackbar.text = "User Deactivated Successfully";
            this.snackbar.color = "";
            this.snackbar.timeout = 4000;
            this.snackbar.show = true;

            this.users[this.users.indexOf(user)].status = false;
          } else {
            // Snackbar
            this.snackbar.text = "Something Went Wrong";
            this.snackbar.color = "error";
            this.snackbar.timeout = 4000;
            this.snackbar.show = true;
          }
          this.loaderDeactivateUser = false;
          this.cancelDeactivateConfirmation();
        })
        .catch(err => {
          console.log("Deactivate Err: ", err);
          this.loaderDeactivateUser = false;
          // Snackbar
          this.snackbar.text = "Something Went Wrong";
          this.snackbar.color = "error";
          this.snackbar.timeout = 4000;
          this.snackbar.show = true;
          this.cancelDeactivateConfirmation();
        });
    },

    // Account Activation
    activateUser(user) {
      this.loaderOverlay = true;
      this.$http
        .put("/api/admin/change_user_status", {
          user_id: user.email,
          status: 0
        })
        .then(res => {
          console.log("Activate Res: ", res.data);
          if (res.data.message === "SUCCESS") {
            // Snackbar
            this.snackbar.text = "User Activated Successfully";
            this.snackbar.color = "";
            this.snackbar.timeout = 4000;
            this.snackbar.show = true;

            this.users[this.users.indexOf(user)].status = true;
          } else {
            // Snackbar
            this.snackbar.text = "Something Went Wrong";
            this.snackbar.color = "error";
            this.snackbar.timeout = 4000;
            this.snackbar.show = true;
          }
          this.loaderOverlay = false;
        })
        .catch(err => {
          console.log("Deactivate Err: ", err);
          this.loaderOverlay = false;

          // Snackbar
          this.snackbar.text = "Something Went Wrong";
          this.snackbar.color = "error";
          this.snackbar.timeout = 4000;
          this.snackbar.show = true;
        });
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getProducts().then(products => {
      this.products = products;
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
