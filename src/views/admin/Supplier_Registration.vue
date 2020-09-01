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
                  registration.status === 'approved'
                    ? 'success'
                    : registration.status === 'pending'
                    ? 'primary'
                    : 'error'
                "
                small
                class="mx-5"
                ><v-avatar left>
                  <v-icon size="20">{{
                    registration.status === "approved"
                      ? "mdi-checkbox-marked-circle"
                      : registration.status === "pending"
                      ? "mdi-clock-time-four"
                      : "mdi-close-circle"
                  }}</v-icon> </v-avatar
                >{{
                  registration.status === "approved"
                    ? "Approved"
                    : registration.status === "pending"
                    ? "Pending"
                    : "Rejected"
                }}</v-chip
              >
              <v-btn color="primary" outlined small>Supplier Profile</v-btn>
              <v-btn color="primary" small class="ml-5">Verify</v-btn>
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
                </v-card>
              </v-col>
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
  props: ["encodedRegistrationId"],

  // Imported Components
  components: {
    "key-value-a": KeyVal_A
  },

  // Data Variables and Values
  data: () => ({
    registration: {},
    isLoaded: false
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
    }
  },
  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getRegistrationById(atob(this.encodedRegistrationId))
      .then(res => {
        console.log(res);
        this.registration = res;

        this.isLoaded = true;
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
