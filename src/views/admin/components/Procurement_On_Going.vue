<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container class="ma-0 pa-0">
            <v-row no-gutters>
              <v-col v-if="procurements.length == 0" cols="12">
                <v-alert type="info" outlined border="left">
                  No Any Ongoing Procurements Available
                </v-alert>
              </v-col>
              <v-col v-else cols="12">
                <v-text-field
                  v-model="search"
                  outlined
                  dense
                  label="Search"
                  clearable
                />
                <v-data-table
                  :headers="headers"
                  :items="procurements"
                  :search="search"
                  :items-per-page="10"
                  no-data-text="Please Add Items"
                >
                  <template v-slot:item.action="{ item }">
                    <v-btn
                      @click="getoProcurement(item.procurement_id)"
                      color="primary"
                      text
                      >View</v-btn
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
    tab: null,
    //   Data Table
    headers: [
      {
        text: "#",
        value: "index",
        sortable: false,
        align: "start",
        // divider: true,
        groupable: true
      },
      {
        text: "Procurement ID",
        value: "procurement_id",
        sortable: false,
        align: "start",
        // divider: true,
        groupable: true
      },
      {
        text: "Category",
        value: "category",
        sortable: false,
        align: "start",
        // divider: true,
        groupable: true
      },
      {
        text: "Bid Opening Date",
        value: "bid_opening_date",
        sortable: false,
        align: "center"
        // divider: true
      },
      {
        text: "Procurement Method",
        value: "procurement_method",
        sortable: false,
        align: "center"
        // divider: true
      },
      {
        text: "Finance Method",
        value: "finance_method",
        sortable: false,
        align: "center",
        // divider: true,
        groupable: true
      },

      {
        text: "Actions",
        value: "action",
        sortable: false,
        align: "center"
        // divider: true
      }
    ],
    procurements: [],
    search: ""
  }),

  // Custom Methods and Functions
  methods: {
    getOngoingProcurements(status) {
      return new Promise((resolve, reject) => {
        this.$http
          .get(`/api/admin/procurements/status?status=${status}`)
          .then(res => {
            console.log(res.data);
            resolve(res.data);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },
    getoProcurement(procurementId) {
      this.$router
        .push("/admin/procurement_overview/" + btoa(procurementId))
        .catch(() => {});
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getOngoingProcurements("on-going")
      .then(res => {
        console.log(res);
        this.procurements = res;
        let index = 0;
        this.procurements = this.procurements.map(procurement => {
          index++;
          let temp = { ...procurement, index, action: "" };
          temp.bid_opening_date = temp.bid_opening_date.split("T")[0];
          return temp;
        });
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
