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
                                v-model="title"
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
                              />
                            </v-col>

                            <v-col cols="6">
                              <v-text-field
                                v-model="employee.name"
                                clearable
                                label="Name"
                                outlined
                                dense
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
                                dense
                              />
                            </v-col>
                          </v-row>

                          <v-row class="" no-gutters>
                            <v-col cols="7">
                              <v-text-field
                                v-model="employee.password"
                                clearable
                                label="Temporary Password"
                                outlined
                                dense
                              />
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>

                      <v-card-actions>
                        <v-btn @click="createUser">Create</v-btn>
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
    mapRoleIdToRole: new Map(),
    userRoles: [],

    employee: {
      id: "",
      name: "",
      division: "",
      role: "",
      email: "",
      password: ""
    },
    title: ""
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
      return new Promise((resolove, reject) => {
        let tempData = { ...this.employee };
        tempData.name = this.title + this.employee.name;
        tempData.role = this.mapRoleIdToRole.get(this.employee.role);

        this.$http
          .post("/api/admin/user", tempData)
          .then(res => {
            if (res.status === 201) {
              resolove(res.data);
            } else {
              reject();
            }
          })
          .catch(err => {
            reject(err);
          });
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
  computed: {}
};
</script>

// Custom CSS Rules and Classes
<style scoped></style>
