<template>
  <v-container fluid class="px-0 py-0">
    <v-row>
      <v-col cols="2">
        <v-card class="mb-4">
          <v-container>
            <v-list dense>
              <v-subheader>PROCUREMENTS NEEDED ATTENTION</v-subheader>
              <v-list-item-group v-model="item" color="primary">
                <v-list-item
                  v-for="item in procs"
                  :key="item.procurement_id"
                  @click="updateSelected(item.procurement_id)"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="item.procurement_id"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-container>
        </v-card>
      </v-col>

      <v-col cols="10">
        <v-tabs v-model="tab" background-color="grey lighten-2" grow>
          <v-tab>Specification Sheet</v-tab>
          <v-tab>Data Sheet</v-tab>

          <v-tab-item>
            <v-card class="mb-4">
              <v-container>
                <!-- Page Title -->
                <v-row no-gutters>
                  <h5 class="headline">Specification Sheet</h5>
                </v-row>
                <v-divider class="mt-1"></v-divider>

                <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->

                <!-- Info Card Row -->
                <div>
                  <v-card flat>
                    <v-container>
                      <v-form>
                        <v-row align="center">
                          <v-col cols="12">
                            <v-text-field
                              v-model="invitationNo"
                              dense
                              label="Procurement ID"
                              outlined
                              disabled
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row align="center">
                          <v-col cols="12">
                            <v-text-field
                              v-model="procName"
                              dense
                              label="Procurement Name"
                              outlined
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card>

                  <v-card>
                    <SpecView />
                  </v-card>

                  <v-card flat>
                    <v-card-text>
                      <v-select
                        v-model="steps"
                        :items="[1, 2, 3, 4, 5]"
                        label="Select number of items in procurement"
                      ></v-select>
                    </v-card-text>
                  </v-card>
                  <v-stepper v-model="e1">
                    <v-stepper-header>
                      <template v-for="n in steps">
                        <v-stepper-step
                          :key="`${n}-step`"
                          :complete="e1 > n"
                          :step="n"
                        >
                          Item {{ n }}
                        </v-stepper-step>

                        <v-divider v-if="n !== steps" :key="n"></v-divider>
                      </template>
                    </v-stepper-header>

                    <v-stepper-items>
                      <v-stepper-content
                        v-for="n in steps"
                        :key="`${n}-content`"
                        :step="n"
                      >
                        <v-card class="mb-12">
                          <!--Add insert item logic here-->

                          <v-row align="center">
                            <v-col cols="12">
                              <v-text-field
                                v-model="itemName"
                                dense
                                label="Item Name"
                                outlined
                              ></v-text-field>
                            </v-col>

                            <v-col cols="4">
                              <v-text-field
                                v-model="feature"
                                dense
                                label="Feature"
                                outlined
                              ></v-text-field>
                            </v-col>
                            <v-col cols="8">
                              <v-text-field
                                v-model="minRequirement"
                                label="Min Requirement"
                                outlined
                                dense
                              />
                            </v-col>
                          </v-row>

                          <v-btn
                            class="ma-2"
                            depressed
                            large
                            color="primary"
                            @click="addFeatureRequirementSet"
                            >Add Feature</v-btn
                          >
                          <v-btn
                            class="ma-2"
                            depressed
                            large
                            color=""
                            @click="reset"
                            >Reset</v-btn
                          >

                          <!-- </ValidationObserver> -->
                          <v-simple-table
                            :dense="dense"
                            :fixed-header="fixedHeader"
                            :height="height"
                            light
                          >
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">Feature</th>
                                  <th class="text-left">Minimum Requrement</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="item in tableData"
                                  :key="item.feature"
                                >
                                  <td>{{ item.feature }}</td>
                                  <td>{{ item.minrequirement }}</td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-card>

                        <v-btn color="primary" @click="upload(n)">
                          Continue
                        </v-btn>

                        <v-btn text @click="deleteProcData()">Cancel</v-btn>
                      </v-stepper-content>
                    </v-stepper-items>
                  </v-stepper>
                </div>

                <!-- <v-row>
              <v-col cols="6">
                <v-card>
                  <v-sparkline
                    :value="value"
                    :gradient="gradient"
                    :smooth="radius || false"
                    :padding="padding"
                    :line-width="width"
                    :stroke-linecap="lineCap"
                    :gradient-direction="gradientDirection"
                    :fill="fill"
                    :type="type"
                    :auto-line-width="autoLineWidth"
                    auto-draw
                    height="150"
                  ></v-sparkline>
                </v-card>
              </v-col>
            </v-row> -->
              </v-container>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <data-sheet :procurementId="invitationNo" :sorId="sorId" />
          </v-tab-item>
        </v-tabs>

        <v-row justify="center">
          <v-dialog v-model="finalize" max-width="290">
            <v-card>
              <v-card-title class="headline">Confirm Request?</v-card-title>

              <v-card-text>
                By proceeding you are accepting to initialize a new procurement
                process
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="green darken-1"
                  text
                  @click="submit(this.invitationNo)"
                  >Proceed</v-btn
                >

                <v-btn color="red darken-1" text @click="finalize = false"
                  >Cancel</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <v-row justify="center">
          <v-dialog v-model="dialog" max-width="290">
            <v-card>
              <v-card-title class="headline">Error</v-card-title>

              <v-card-text>Please add Feature and Requirement</v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="red darken-1" text @click="dialog = false"
                  >Ok</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

        <v-row justify="center">
          <v-dialog v-model="dialog2" max-width="290">
            <v-card>
              <v-card-title class="headline">Error</v-card-title>

              <v-card-text>Please add Feature and Requirements</v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="red darken-1" text @click="dialog2 = false"
                  >Ok</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Componenets
import axios from "axios";
import firebase from "firebase";

import SpecView from "./Spec_Sheet_View";
import Datasheet from "../admin/components/Bidding_Doc_Data_Sheet";
import Bidding_Doc_Data_SheetVue from "../admin/components/Bidding_Doc_Data_Sheet.vue";
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
  components: {
    "data-sheet": Bidding_Doc_Data_SheetVue
  },

  // Data Variables and Values
  data: () => ({
    invitationNo: "",
    procName: "",
    itemName: "",
    feature: "",
    minRequirement: "",
    featureList: [],
    minRequirementList: [],
    tableData: [],
    item: "",

    e1: 1,
    tab: null,

    sorId: "",

    steps: 1,
    finalize: false,
    dialog: false,
    dialog2: false,
    itemNull: true,
    empid: "",
    procs: [],
    initializedOnce: false,
    // Dummy Data
    testdata: "Test"
  }),

  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    }
  },

  // Custom Methods and Functions
  methods: {
    //initialize a document
    async initializeDoc(proc_id) {
      var doc = firebase
        .firestore()
        .collection("ScheduleOfRequirements")
        .add({
          InvitationNo: proc_id,
          Name: "Procurement Name"
        });
      this.initializedOnce = true;
    },

    //set items including featurelist and MinRequirements
    async setItem(item, features, minreq) {
      let docRef = firebase.firestore().collection("ScheduleOfRequirements");
      let doc_id;
      await docRef
        .where("InvitationNo", "==", this.invitationNo)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc_id = doc.id;
            console.log(doc_id);
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });

      console.log(item);
      console.log(this.features);
      console.log(this.minreq);

      await docRef
        .doc(doc_id)
        .collection("Items")
        .add({
          ItemName: item,
          Features: this.featureList,
          MinimumRequirement: this.minRequirementList
        });
    },

    //  async fbTest(){
    //   this.procs.forEach((element) =>{
    //     //this.initializeDoc(element.procurement_id);
    //     firebase.firestore().collection("test_col").add({
    //       first: "Alan",
    //       middle: "Mathison",
    //       last: "Turing",
    //       born: 1912,
    //       lt: element.procurement_id
    //     });
    //     //console.log(element.procurement_id);
    //   });
    //  },

    //Add name for procurement
    async addProcName() {
      let docRef = firebase.firestore().collection("ScheduleOfRequirements");
      let doc_id;
      await docRef
        .where("InvitationNo", "==", this.invitationNo)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc_id = doc.id;
            console.log(doc_id);
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });

      await docRef.doc(doc_id).upadate({
        Name: "name"
      });
    },

    //delete all data if cancelled.
    async deleteProcData() {
      let db = firebase.firestore();
      let docRef = db.collection("ScheduleOfRequirements");
      let doc_id;
      this.fbData.push({
        doc: await docRef
          .where("InvitationNo", "==", this.invitationNo)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              doc_id = doc.id;
              this.sorId = doc_id;
            });
            return;
          })
      });
      await docRef.document(doc_id).delete();

      //clear all data
      this.initializedOnce = false;
      this.reset();

      //set stepper to 1
      this.steps = 1;
    },

    upload(n) {
      if (n == 1 && !this.initializedOnce) {
        this.initializeDoc(this.invitationNo);
      }

      if (this.itemNull == true) {
        this.dialog2 = true;
        return;
      }
      let item = this.itemName;
      this.setItem(item, this.featureList, this.minRequirementList); //set item data
      this.nextStep(n);

      this.reset();
    },

    nextStep(n) {
      if (n === this.steps) {
        this.finalize = true;
      } else {
        this.e1 = n + 1;
        this.itemNull = true;
      }
    },

    //selecting proc
    updateSelected(invNo) {
      this.invitationNo = invNo;
      // this.initializeDoc(invNo);
    },

    //reset data in following states
    reset() {
      this.itemName = "";
      this.feature = "";
      this.minRequirement = "";
      this.tableData = [];
    },

    //final proceed
    submit(invitationNo) {
      console.log(invitationNo);
      this.addProcName();
      var removeIndex = this.procs
        .map(function(item) {
          return item.procurement_id;
        })
        .indexOf(invitationNo);
      this.procs.splice(removeIndex, 1);
      this.reset();
      this.invitationNo = "";
      this.initializedOnce = false;

      axios
        .post(`http://localhost:5000/api/hod/update_step`, {
          procurement_id: this.invitationNo
        })
        .then(response => {
          alert(response);
          //window.location.href = "http://localhost:8080/hod";
          // alert(JSON.stringify(response));
        })
        .catch(error => {
          alert(error);
          //window.location.href = "http://localhost:8080/hod";
          // alert(JSON.stringify(error));
        });

      window.location.href = "http://localhost:8080/employee";
    },

    addFeatureRequirementSet() {
      if (this.feature == "" || this.minRequirement == "") {
        this.dialog = true;
        return;
      }
      this.featureList.push(this.feature);
      this.minRequirementList.push(this.minRequirement);

      var obj = {};
      obj["feature"] = this.feature;
      obj["minrequirement"] = this.minRequirement;
      this.tableData.push(obj);
      this.feature = "";
      this.minRequirement = "";
      this.itemNull = false;
    }
  },

  // Life Cycle Hooks
  beforeCreate() {
    //this.empid = this.$store.getters.user.employee_id
    this.empid = "emp00006";
    axios
      .get(`http://localhost:5000/api/hod/procforspec/${this.empid}`)
      .then(response => {
        this.procs = response.data;
      })
      .catch(error => console.log(error));
  },
  created() {},
  beforeMount() {},
  mounted() {
    this.fbTest();
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
<style scoped></style>
