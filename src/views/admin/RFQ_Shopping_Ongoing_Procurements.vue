<template>
  <v-container>
    <v-card flat>
      <v-col v-if="resultsArray.length == 0" cols="12">
        <v-alert type="info" outlined border="left">
          No Any Shopping On-going Procurements Available
        </v-alert>
      </v-col>
      <v-col v-else cols="12">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Procurement ID</th>
              <th>Category</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in resultsArray" :key="result" cols="12">
              <td>{{ result.procurement_id }}</td>
              <td>{{ result.category }}</td>
              <td>
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="deadline"
                      class="deadline mt-6"
                      label="Select the deadline"
                      v-bind="attrs"
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="deadline"
                    @input="menu2 = false"
                    :min="date"
                  ></v-date-picker>
                </v-menu>
              </td>
              <td>
                <v-btn color="primary" class="mb-4 mt-4" @click="openDialog()"
                  >SEND RFQ</v-btn
                >
              </td>
              <v-dialog v-model="dialog1" width="500">
                <v-card>
                  <v-card-title><h4>Send RFQ</h4></v-card-title>
                  <v-card-text>Do you want to send RFQs?</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      @click.once="
                        sendRFQShoppingOngoingProcurements(
                          result.procurement_id,
                          result.category
                        );
                        dialog1 = false;
                      "
                      >Yes
                    </v-btn>
                    <v-btn color="secondary" @click="dialog1 = false">No</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog2" width="380">
                <v-card>
                  <v-card-title><h4>Error</h4></v-card-title>
                  <v-card-text>Please enter the deadline</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="dialog2 = false">OK</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-card>
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
    search: "",
    resultsArray: [],
    date: new Date().toISOString().substr(0, 10),
    dialog1: false,
    dialog2: false,
    menu2: false
  }),

  // Custom Methods and Functions
  methods: {
    // get shopping ongoing procurements
    getShoppingOngoingProcurements() {
      this.$http
        .get(`/api/admin/shopping_ongoing_procurements`)
        .then(response => {
          this.resultsArray = response.data;
          console.log("resultsArray", this.resultsArray);
        })
        .catch(err => {
          console.log(err);
        });
    },

    // open dialogs
    openDialog() {
      if (this.deadline == null){
        this.dialog2 = true
      }
      else{
        this.dialog1 = true
      }
    },

    // send rfq
    sendRFQShoppingOngoingProcurements(procurementId, category) {
      this.procurementId = procurementId;
      this.category = category;
      console.log("test1", this.date, this.deadline);
      this.$http
        .post(
          `/api/admin/shopping_ongoing_procurements/suppliers/send_rfq?date=${this.date}&deadline=${this.deadline}&procurementId=${this.procurementId}&category=${this.category}`
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      this.$router.go();
      this.dialog1 = false;
    }
  },
  // Life Cycle Hooks
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.getShoppingOngoingProcurements();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  // Computed Properties
  computed: {}
};
</script>

// Custom CSS Rules and Classes
<style scoped>
table {
  border-collapse: collapse;
  width: 95%;
  margin: 25px;
}
th,
td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
</style>
