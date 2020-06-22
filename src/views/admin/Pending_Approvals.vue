<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Pending Approvals</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row>
              <v-col v-if="pendingApprovals.length == 0" cols="12">
                <v-alert type="info" outlined border="left">
                  No Any Pending Approvals Available
                </v-alert>
              </v-col>
              <v-col v-else cols="12">
                <v-data-table
                  :headers="headers"
                  :items="pendingApprovals"
                  :search="search"
                  :items-per-page="10"
                  @click:row="onclickTableRowPendingApprovals"
                  no-data-text="Please Add Items"
                >
                  <template v-slot:item.actions="{ item }">
                    <v-btn small color="" @click="gotoProcurement(item)"
                      >Review</v-btn
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
    //   Data Table
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
        text: "Tender No.",
        value: "procurementId",
        sortable: false,
        align: "start",
        divider: true,
        groupable: true
      },
      {
        text: "Description / Title",
        value: "description",
        sortable: false,
        align: "start",
        divider: true,
        groupable: true
      },

      {
        text: "Date Created",
        value: "dateCreated",
        sortable: false,
        align: "center",
        divider: true,
        groupable: true
      },

      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "center",
        divider: true
      }
    ],
    pendingApprovals: [
      {
        no: 1,
        procurementId: "UCSC/NCB/G/ENG/2020/0001",
        description: "This a Small Description about Procurement",
        dateCreated: "2020-06-01",
        actions: ""
      }
    ],
    search: ""
  }),

  // Custom Methods and Functions
  methods: {
    gotoProcurement(procurement) {
      console.log(
        "Encoded Procurement ID: ",
        btoa(procurement.procurementId),
        procurement.procurementId
      );
      this.$router.push(
        "/admin/procurement_overview/" + btoa(procurement.procurementId)
      );
    },
    onclickTableRowPendingApprovals() {}
  },

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
