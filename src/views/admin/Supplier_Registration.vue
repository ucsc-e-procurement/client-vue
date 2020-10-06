<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container v-if="isLoaded">
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Registration Details</h5>
              <v-spacer />
              <v-chip
                :color="
                  registration.verified === 'verified'
                    ? 'success'
                    : registration.verified === ''
                    ? 'primary'
                    : 'error'
                "
                small
                class="mx-5"
                ><v-avatar left>
                  <v-icon size="20">{{
                    registration.verified === "verified"
                      ? "mdi-checkbox-marked-circle"
                      : registration.verified === ""
                      ? "mdi-clock-time-four"
                      : "mdi-close-circle"
                  }}</v-icon> </v-avatar
                >{{
                  registration.verified === "verified"
                    ? "Verified"
                    : registration.verified === ""
                    ? "Pending"
                    : "Rejected"
                }}</v-chip
              >
              <v-btn color="primary" outlined small @click="gotoSupplierProfile"
                >Supplier Profile</v-btn
              >
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row>
              <v-col cols="12">
                <key-value-a
                  :leftCols="2"
                  :rightCols="10"
                  leftKey="Registration No"
                  :rightValue="registration.registration_no"
                  :dense="true"
                  :outlined="false"
                  :flat="true"
                />
              </v-col>
              <v-col cols="12" class="mt-n5">
                <key-value-a
                  :leftCols="2"
                  :rightCols="10"
                  leftKey="Supplier ID"
                  :rightValue="registration.supplier_id"
                  :dense="true"
                  :outlined="false"
                  :flat="true"
                />
              </v-col>
              <v-col cols="12" class="mt-n7">
                <key-value-a
                  :leftCols="2"
                  :rightCols="10"
                  leftKey="Supplier Name / Company"
                  :rightValue="registration.name"
                  :dense="true"
                  :outlined="false"
                  :flat="true"
                />
              </v-col>

              <v-col cols="12" class="mt-n5">
                <key-value-a
                  :leftCols="2"
                  :rightCols="10"
                  leftKey="Date of Registration"
                  :rightValue="registration.registration_date"
                  :dense="true"
                  :outlined="false"
                  :flat="true"
                />
              </v-col>
              <v-col cols="12" class="mt-n5">
                <key-value-a
                  :leftCols="2"
                  :rightCols="10"
                  leftKey="Contact No"
                  :rightValue="registration.contact_number"
                  :dense="true"
                  :outlined="false"
                  :flat="true"
                />
              </v-col>
              <v-col cols="12" class="mt-n5">
                <key-value-a
                  :leftCols="2"
                  :rightCols="10"
                  leftKey="Address"
                  :rightValue="registration.address"
                  :dense="true"
                  :outlined="false"
                  :flat="true"
                />
              </v-col>
              <v-col cols="12" class="mt-n5">
                <key-value-a
                  :leftCols="2"
                  :rightCols="10"
                  leftKey="Email"
                  :rightValue="registration.email"
                  :dense="true"
                  :outlined="false"
                  :flat="true"
                />
              </v-col>
            </v-row>
            <v-divider />
            <v-row no-gutters>
              <v-col cols="12">
                <v-card flat>
                  <v-card-title>Payment </v-card-title>

                  <v-card-text class="pa-0">
                    <v-container class="pa-0 ma-0">
                      <v-row no-gutters>
                        <v-col cols="12">
                          <key-value-a
                            :leftCols="2"
                            :rightCols="10"
                            leftKey="Bank Name - Branch"
                            :rightValue="registration.payment_bank"
                            :dense="true"
                            :outlined="false"
                            :flat="true"
                          />
                        </v-col>
                        <v-col cols="12">
                          <key-value-a
                            :leftCols="2"
                            :rightCols="10"
                            leftKey="Payment Type"
                            :rightValue="registration.payment_type"
                            :dense="true"
                            :outlined="false"
                            :flat="true"
                          />
                        </v-col>
                        <v-col cols="12">
                          <key-value-a
                            :leftCols="2"
                            :rightCols="10"
                            leftKey="Amount (LKR)"
                            :rightValue="registration.amount"
                            :dense="true"
                            :outlined="false"
                            :flat="true"
                          />
                        </v-col>

                        <v-col cols="12" class="pl-5">
                          <v-img
                            :src="registration.payment"
                            :aspect-ratio="1.77"
                            :max-height="600"
                            :max-width="1000"
                          ></v-img>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      v-if="registration.verified === ''"
                      color="error"
                      small
                      class="ml-5"
                      @click="dialogDenySupplier = true"
                      >Deny</v-btn
                    >
                    <v-btn
                      v-if="registration.verified === ''"
                      color="primary"
                      small
                      class="ml-5"
                      @click="dialogVerifySupplier = true"
                      >Verify</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog - Verification Confiramtion -->
    <v-row justify="center">
      <v-dialog v-model="dialogVerifySupplier" persistent max-width="400">
        <v-card>
          <v-card-title class="headline">Supplier Verification</v-card-title>
          <v-card-text
            >Do you really want to verify this supplier ?
            <br />
            Note: This process cannot be
            <strong>undone</strong>. Please make sure that all prerequisites are
            met including documentations.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="" text @click="dialogVerifySupplier = false" small
              >Cancel</v-btn
            >
            <v-btn color="primary" small @click="verifyRegistration"
              >Proceed</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Dialog - Verification Confiramtion -->
    <v-row justify="center">
      <v-dialog v-model="dialogDenySupplier" persistent max-width="400">
        <v-card>
          <v-card-title class="headline">Supplier Denial</v-card-title>
          <v-card-text
            >Do you really want to Deny this supplier registration ?
            <br />
            Note: This process cannot be
            <strong>undone</strong>. Please make sure that the supplier
            registration is not met with the registration requirements.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="" text @click="dialogDenySupplier = false" small
              >Cancel</v-btn
            >
            <v-btn color="error" small @click="denyRegistration">Proceed</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Fullscreen Overlay - Loader -->
    <v-overlay :value="loaderOverlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <!-- Snackbar -->
    <v-row>
      <v-snackbar
        v-model="snackbar.show"
        top
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
  </v-container>
</template>

<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";
import KeyVal_A from "./components/Key_Value_Typo_A";

import firebase from "firebase";
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
  props: ["encodedRegistrationId"],

  // Imported Components
  components: {
    "key-value-a": KeyVal_A
  },

  // Data Variables and Values
  data: () => ({
    registration: {},
    isLoaded: false,

    // Dialogs
    dialogVerifySupplier: false,
    dialogDenySupplier: false,

    // Loaders
    loaderOverlay: false,

    // Snackbar
    snackbar: {
      show: false,
      text: "",
      color: "",
      timeout: 4000
    }
  }),

  // Custom Methods and Functions
  methods: {
    getRegistrationById(id) {
      return new Promise((resolve, reject) => {
        this.$http
          .get(`/api/admin/supplier-registration?id=${id}`)
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
    gotoSupplierProfile() {
      //   console.log(supplierId, atob(supplierId), btoa(supplierId));
      this.$router
        .push(`/admin/supplier/${btoa(this.registration.supplier_id)}`)
        .catch(() => {});
    },
    verifyRegistration() {
      this.loaderOverlay = true;
      this.$http
        .put(`/api/admin/supplier-registration/verification-status`, {
          registrationNo: this.registration.registration_no,
          status: "verified"
        })
        .then(res => {
          console.log(res);
          this.registration.verified = "verified";
          this.loaderOverlay = false;
          this.dialogVerifySupplier = false;

          // Snackbar Error
          this.snackbar.text = "Verifications Successful";
          this.snackbar.color = "";
          this.snackbar.timeout = 4000;
          this.snackbar.show = true;
        })
        .catch(err => {
          console.log(err);
          this.loaderOverlay = false;
          this.dialogVerifySupplier = false;

          // Snackbar Error
          this.snackbar.text = "Update Status Failed";
          this.snackbar.color = "error";
          this.snackbar.timeout = 4000;
          this.snackbar.show = true;
        });
    },

    denyRegistration() {
      this.loaderOverlay = true;
      this.$http
        .put(`/api/admin/supplier-registration/verification-status`, {
          registrationNo: this.registration.registration_no,
          status: "denied"
        })
        .then(res => {
          console.log(res);
          this.registration.verified = "denied";
          this.loaderOverlay = false;
          this.dialogDenySupplier = false;

          // Snackbar Error
          this.snackbar.text = "Denial Successful";
          this.snackbar.color = "";
          this.snackbar.timeout = 4000;
          this.snackbar.show = true;
        })
        .catch(err => {
          console.log(err);
          this.loaderOverlay = false;
          this.dialogDenySupplier = false;

          // Snackbar Error
          this.snackbar.text = "Update Status Failed";
          this.snackbar.color = "error";
          this.snackbar.timeout = 4000;
          this.snackbar.show = true;
        });
    }
  },
  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    const storageRef = firebase.storage().ref();

    this.getRegistrationById(atob(this.encodedRegistrationId))
      .then(res => {
        console.log(res, res.registration_date.split("T")[0]);
        this.registration = res;

        // Preprocess Date to fix Issue
        let date = new Date(res.registration_date.split("T")[0]);

        console.log(date);
        date.setDate(date.getDate() + 1);
        let dateStr = `${date.getFullYear()}-${
          String(date.getMonth() + 1).length < 2
            ? "0" + String(date.getMonth() + 1)
            : String(date.getMonth() + 1)
        }-${
          String(date.getDate()).length < 2
            ? "0" + String(date.getDate())
            : String(date.getDate())
        }`;
        console.log("New DateString: ", dateStr);
        this.isLoaded = true;
        return storageRef
          .child(`payment/${dateStr}${res.email}`)
          .getDownloadURL();
      })
      .then(url => {
        console.log("URL: ", url);
        this.registration.payment = url;
      })
      .catch(err => {
        this.isLoaded = true;

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
