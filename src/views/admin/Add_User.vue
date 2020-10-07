<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Add New User</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row>
              <v-col cols="12">
                <v-container class="px-0">
                  <v-card flat>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-row class="" no-gutters>
                            <v-col cols="7">
                              <v-text-field
                                :value="employee.id"
                                label="Employee ID"
                                outlined
                                dense
                                readonly
                              />
                            </v-col>
                          </v-row>
                          <v-row class="" no-gutters>
                            <v-col cols="1">
                              <v-select
                                v-model="employee.title"
                                label="Title"
                                :items="[
                                  'Mr.',
                                  'Mrs.',
                                  'Ms.',
                                  'Dr.',
                                  'Prof.',
                                  'Rev.'
                                ]"
                                class="pr-1"
                                outlined
                                dense
                                :error-messages="titleErrors"
                                @change="$v.employee.title.$touch()"
                                @blur="$v.employee.title.$touch()"
                              />
                            </v-col>

                            <v-col cols="6">
                              <v-text-field
                                v-model="employee.name"
                                clearable
                                label="Name"
                                outlined
                                dense
                                :error-messages="nameErrors"
                                @input="$v.employee.name.$touch()"
                                @blur="$v.employee.name.$touch()"
                              />
                            </v-col>
                          </v-row>
                          <v-row class="" no-gutters>
                            <v-col cols="7">
                              <v-select
                                v-model="employee.division"
                                :items="[
                                  'DIR',
                                  'ADIR',
                                  'AB',
                                  'NOC',
                                  'ENG',
                                  'DB',
                                  'AB',
                                  'ADMTC',
                                  'FIN'
                                ]"
                                label="Division"
                                outlined
                                dense
                                :error-messages="divisionErrors"
                                @change="$v.employee.division.$touch()"
                                @blur="$v.employee.division.$touch()"
                              />
                            </v-col>
                          </v-row>
                          <v-row class="" no-gutters>
                            <v-col cols="7">
                              <v-select
                                v-model="employee.role"
                                label="User Role"
                                :items="userRoles"
                                outlined
                                dense
                                :error-messages="userRoleErrors"
                                @change="$v.employee.role.$touch()"
                                @blur="$v.employee.role.$touch()"
                              />
                            </v-col>
                          </v-row>
                          <v-row class="" no-gutters>
                            <v-col cols="7">
                              <v-text-field
                                v-model="employee.email"
                                clearable
                                label="Email (Official)"
                                outlined
                                loading="isCheckingEmail"
                                dense
                                :error-messages="emailErrors"
                                @input="
                                  $v.employee.email.$touch();
                                  checkEmailAvailability();
                                "
                                @blur="$v.employee.email.$touch()"
                              />
                            </v-col>
                            <v-chip
                              v-show="!isCheckingEmail && employee.email !== ''"
                              :color="isEmailAvailable ? 'success' : 'error'"
                              dark
                              class="mx-2 mt-1"
                              ><v-icon left>{{
                                isEmailAvailable
                                  ? "mdi-check-circle"
                                  : "mdi-close-circle"
                              }}</v-icon>
                              {{
                                isEmailAvailable ? "Available" : "Already Taken"
                              }}</v-chip
                            >
                          </v-row>

                          <v-row class="" no-gutters>
                            <v-col cols="7">
                              <v-text-field
                                v-model="employee.password"
                                clearable
                                label="Temporary Password"
                                outlined
                                dense
                                :error-messages="passwordErrors"
                                @input="$v.employee.password.$touch()"
                                @blur="$v.employee.password.$touch()"
                              />
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>

                      <v-card-actions>
                        <v-btn :disabled="!isEmailAvailable" @click="createUser"
                          >Create</v-btn
                        >
                      </v-card-actions>
                    </v-container>
                  </v-card>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

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

    <!-- Fullscreen Overlay - Loader -->
    <v-overlay :value="isCreating">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";

// Validation Library - Vuelidate
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

/* Note: When Declaring Variables, always think about how Form Validation Rules are applied */
export default {
  // Mixins
  mixins: [validationMixin],

  // Form Validations
  validations: {
    employee: {
      title: { required },
      name: { required },
      division: { required },
      role: { required },
      email: { required, email },
      password: { required }
    }
  },

  // Props Received
  props: [],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    mapRoleIdToRole: new Map(),
    userRoles: [],

    employee: {
      id: "",
      name: "",
      division: "",
      role: "",
      email: "",
      password: "ucsc@123"
    },
    title: "",

    // Loaders
    isCheckingEmail: false,
    isEmailAvailable: true,
    isCreating: false,

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
    getUserRoles() {
      return new Promise((resolve, reject) => {
        this.$http
          .get("/api/admin/user_roles_internal")
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getNextEmployeeId() {
      return new Promise((resolve, reject) => {
        this.$http
          .get("/api/admin/next_employee_id")
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    createUser() {
      console.log("Create Invoked");
      this.$v.employee.$touch();
      if (!this.$v.employee.$invalid) {
        this.isCreating = true;
        let tempData = { ...this.employee };
        tempData.name = this.title + this.employee.name;
        tempData.role = this.mapRoleIdToRole.get(this.employee.role);

        this.$http
          .post("/api/admin/user", tempData)
          .then(res => {
            if (res.status === 201) {
              // Snackbar Error
              this.snackbar.text = "User Created Sucessfully";
              this.snackbar.color = "";
              this.snackbar.timeout = 4000;
              this.snackbar.show = true;

              this.$router.push("/admin/users");
            } else {
              // Snackbar Error
              this.snackbar.text = "Unable to Create User";
              this.snackbar.color = "error";
              this.snackbar.timeout = 4000;
              this.snackbar.show = true;
            }
            this.isCreating = false;
          })
          .catch(() => {
            // Snackbar Error
            this.snackbar.text = "Unable to Create User";
            this.snackbar.color = "error";
            this.snackbar.timeout = 4000;
            this.snackbar.show = true;

            this.isCreating = false;
          });
      }
    },
    checkEmailAvailability() {
      console.log("checking");
      this.isCheckingEmail = true;

      this.$http
        .get("/api/admin/user/email/is-available?email=" + this.employee.email)
        .then(res => {
          if (res.status === 200 && res.data.message === "available") {
            this.isEmailAvailable = true;
          } else {
            this.isEmailAvailable = false;
          }
          this.isCheckingEmail = false;
        })
        .catch(() => {
          this.isCheckingEmail = false;
        });
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getUserRoles()
      .then(res => {
        console.log(res);
        res.map(record => {
          this.userRoles.push(record.role);
          this.mapRoleIdToRole.set(record.role, record.role_id);
          return record;
        });
        return this.getNextEmployeeId();
      })
      .then(res => {
        this.employee.id = res;
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
  computed: {
    // Validation Rules
    titleErrors() {
      const errors = [];
      if (!this.$v.employee.title.$dirty) return errors;
      !this.$v.employee.title.required &&
        errors.push("Please Select the Title");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.employee.name.$dirty) return errors;
      !this.$v.employee.name.required &&
        errors.push("Please Enter the Name of the Employee");
      return errors;
    },
    divisionErrors() {
      const errors = [];
      if (!this.$v.employee.division.$dirty) return errors;
      !this.$v.employee.division.required &&
        errors.push("Please Select the Division");
      return errors;
    },
    userRoleErrors() {
      const errors = [];
      if (!this.$v.employee.role.$dirty) return errors;
      !this.$v.employee.role.required &&
        errors.push("Please Select the User Role");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.employee.email.$dirty) return errors;
      !this.$v.employee.email.required &&
        errors.push("Please Enter the Official Email");
      !this.$v.employee.email.email && errors.push("Invalid Email");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.employee.password.$dirty) return errors;
      !this.$v.employee.password.required &&
        errors.push("Please Enter the Temperary Password");
      return errors;
    }
  }
};
</script>

// Custom CSS Rules and Classes
<style scoped></style>
