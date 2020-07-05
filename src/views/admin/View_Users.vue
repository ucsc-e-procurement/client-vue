<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Users of the System</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row>
              <v-col v-if="users.length == 10" cols="12">
                <v-alert type="info" outlined border="left">
                  No Any Users Available
                </v-alert>
              </v-col>
              <v-col v-else cols="12">
                <v-data-table
                  :headers="headers"
                  :items="users"
                  :search="search"
                  :items-per-page="10"
                  @click:row="onclickTableRowUsers"
                  no-data-text="No Users Available"
                >
                  <template v-slot:item.actions="{ item }">
                    <v-btn small color="" @click="gotoProcurement(item)"
                      >Edit</v-btn
                    >

                    <v-btn
                      class="mx-2"
                      small
                      color=""
                      @click="gotoProcurement(item)"
                      >Deactivate</v-btn
                    >
                    <v-btn small color="" @click="gotoProcurement(item)"
                      >Delete</v-btn
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
        value: "no",
        sortable: false,
        align: "start",
        divider: true,
        groupable: true
      },
      {
        text: "Username (Email)",
        value: "user_id",
        sortable: true,
        align: "start",
        divider: true,
        groupable: true
      },
      {
        text: "Password",
        value: "password",
        sortable: true,
        align: "start",
        divider: true,
        groupable: true
      },
      {
        text: "Role",
        value: "user_role",
        sortable: false,
        align: "start",
        divider: true,
        groupable: true
      },

      {
        text: "Status",
        value: "status",
        sortable: false,
        align: "start",
        divider: true,
        groupable: true,
        width: "150"
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "center",
        divider: true,
        width: "300"
      }
    ],
    users: [
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
    search: ""
  }),

  // Custom Methods and Functions
  methods: {},

  // Life Cycle Hooks
  beforeCreate() {},
  created() {},
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
