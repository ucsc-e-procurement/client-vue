<template>
  <v-container>
    <v-card flat>
      <v-col v-if="resultsArray.length == 0" cols="12">
        <v-alert type="info" outlined border="left">
          No Any Direct On-going Procurements Available
        </v-alert>
      </v-col>
      <v-col v-else cols="12">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Procurement ID</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in resultsArray" :key="result" cols="12">
              <td>{{ result.procurement_id }}</td>
              <td>{{ result.category }}</td>
              <td>
                <v-btn
                  color="primary"
                  class="mb-4 mt-4"
                  @click="
                    getSupplierList(result.procurement_id, result.category)
                  "
                  >Select Supplier</v-btn
                >
              </td>
            </tr>
          </tbody>
        </table>
        <v-dialog v-model="dialog2" width="380">
          <v-card>
            <v-card-title><h4>Error</h4></v-card-title>
            <v-card-text
              >There are no suppliers in this procurement category</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="dialog2 = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-card>
    <v-dialog v-model="dialog3" width="380">
      <v-card>
        <v-card-title><h4>Error</h4></v-card-title>
        <v-card-text>Please enter the deadline</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog3 = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog class="dialog1" v-model="dialog1" width="300">
      <v-card>
        <v-card-title>
          <span class="headline mt-3">Suppliers List</span>
        </v-card-title>
        <v-container class="ml-3">
          <div v-for="result1 in resultsArray1" :key="result1" cols="12">
            <input
              type="radio"
              id="result1.supplier_id"
              :value="result1.supplier_id"
              v-model="picked"
            />
            <label for="result1.supplier_id"> {{ result1.name }}</label>
            <br /><br />
          </div>
          <br />
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
                class="deadline"
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
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              width="25%"
              @click="
                sendRFQDirectOngoingProcurements(picked), (dialog1 = false)
              "
              >Send</v-btn
            >
            <v-btn
              color="primary"
              width="25%"
              class="ml-3"
              @click="(dialog1 = false), (picked = ''), (deadline = '')"
              >Close</v-btn
            >
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
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
    dialog1: false,
    dialog2: false,
    dialog3: false,
    resultsArray: [],
    resultsArray1: [],
    picked: "",
    procurementId: "",
    date: new Date().toISOString().substr(0, 10),
    menu2: false,
    deadline: ""
  }),
  // Custom Methods and Functions
  methods: {
    // get direct ongoing procurements
    getDirectOngoingProcurements() {
      this.$http
        .get(`/api/admin/direct_ongoing_procurements`)
        .then(response => {
          this.resultsArray = response.data;
          console.log("resultsArray", this.resultsArray);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // get list of suppliers
    getSupplierList(procurementId, category) {
      this.procurementId = procurementId;
      this.category = category;
      console.log("testCategory", this.category);
      this.$http
        .get(
          `/api/admin/direct_ongoing_procurements/suppliers?category=${this.category}`
        )
        .then(response => {
          this.resultsArray1 = response.data;
          if (this.resultsArray1.length == 0) {
            this.dialog2 = true;
          } else {
            this.dialog1 = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // send rfq
    sendRFQDirectOngoingProcurements(supplierId) {
      if (this.deadline == null) {
        this.dialog3 = true;
      } else {
        this.dialog1 = true;
      }
      console.log("procurement_id", this.procurementId, this.deadline);
      console.log("supplier_id", supplierId);
      this.$http
        .post(
          `/api/admin/direct_ongoing_procurements/suppliers/send_rfq?supplierId=${supplierId}&procurementId=${this.procurementId}&date=${this.date}&deadline=${this.deadline}`
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  // Life Cycle Hooks
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.getDirectOngoingProcurements();
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
.deadline {
  width: 90%;
}
.dialog1 {
  overflow-x: hidden;
}
</style>
