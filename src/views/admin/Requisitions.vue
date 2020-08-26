<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Product Requisitions</h5>
              <v-spacer />
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
              <v-col v-if="requisitions.length == 10" cols="12">
                <v-alert type="info" outlined border="left">
                  No Any Requisitions Available
                </v-alert>
              </v-col>
              <v-col v-else cols="12">
                <v-data-table
                  :headers="headers"
                  :items="requisitions"
                  :search="search"
                  :items-per-page="10"
                  no-data-text="No Users Available"
                  :loading="loaderUsers"
                  @click:row="gotoViewRequisition"
                >
                  <template v-slot:item.procurement_type="{ item }">
                    <v-chip small outlined>{{
                      item.procurement_type === "G"
                        ? "Goods"
                        : item.procurement_type === "W"
                        ? "Work"
                        : item.procurement_type === "S"
                        ? "Service"
                        : "Other"
                    }}</v-chip>
                  </template>

                  <!-- <template v-slot:item.actions="{}">
                    <v-btn
                      small
                      icon
                      class="ml-5"
                      @click="gotoProcurement(item)"
                      ></v-btn
                    >
                  </template> -->
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
        text: "Requisition ID",
        value: "requisition_id",
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
        text: "Date Created",
        value: "date",
        sortable: true,
        align: "start",
        divider: false,
        groupable: true
      },
      {
        text: "Procurement Type",
        value: "procurement_type",
        sortable: false,
        align: "start",
        divider: false,
        groupable: true
      },
      {
        text: "Division",
        value: "division",
        sortable: false,
        align: "center",
        divider: false,
        width: "300"
      }
      // {
      //   text: "Actions",
      //   value: "actions",
      //   sortable: false,
      //   align: "center",
      //   divider: false,
      //   width: "300"
      // }
    ],
    requisitions: [],
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
    getRequisitions() {
      this.loaderProducts = true;
      return new Promise((resolve, reject) => {
        this.$http
          .get("/api/admin/requisitions")
          .then(res => {
            console.log("Users: ", res.data);
            let index = 0;
            let requisitions = [];

            requisitions = res.data.map(requisition => {
              index++;
              return {
                index: index,
                ...requisition,
                actions: ""
              };
            });
            this.loaderProducts = false;

            resolve(requisitions);
          })
          .catch(err => {
            this.loaderProducts = false;

            reject(err);
          });
      });
    },
    gotoViewRequisition(requisition) {
      const encodedRequisitionId = btoa(requisition.requisition_id);
      this.$router.push(`/admin/requisition/${encodedRequisitionId}`);
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getRequisitions().then(requisitions => {
      this.requisitions = requisitions;
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
