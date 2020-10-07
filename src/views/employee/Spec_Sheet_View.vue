<template>
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
                            <tr v-for="item in tableData" :key="item.feature">
                              <td>{{ item.feature }}</td>
                              <td>{{ item.minrequirement }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>

                    <v-btn color="primary" @click="nextStep(n)">
                      Next
                    </v-btn>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
</template>

<script>
// Componenets
import axios from "axios";
import firebase from "firebase";
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
    invitationNo: "UCSC/NSP1/G/ENG/2020/0000023",
    procName: "",
    minRequirement:"",
    featureList: [],
    minRequirementList: [],
    tableData: [],
    // Dummy Data
    e1: 1,
    steps: 5
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
    async getBidData() {
      let docRef = firebase.firestore().collection("ScheduleOfRequirements");
      let doc_id;
      await docRef
        .where("InvitationNo", "==", this.invitationNo)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            this.procName = doc.data().Name;
            doc_id = doc.id;
            this.$store.state.sorId = doc.id;
            console.log(">>>>>>>>>>>>>>>>>>>>>>>", this.$store.state.sorId);
          });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

        await docRef
        .doc(doc_id)
        .collection("Items")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
               this.featureList = doc.data().Features
               this.minRequirementList = doc.data().MinimumRequirement
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    },

    
    //  async refFunction() {
    //   let invRef = firebase.firestore().collection("ScheduleOfRequirements");
    //   let doc_id;
    //   this.fbData.push({
    //     doc: await invRef
    //       .where("InvitationNo", "==", "UCSC/SP/ADMTC/2019/099")
    //       .get()
    //       .then(function(querySnapshot) {
    //         let docArr;

    //         querySnapshot.forEach(function(doc) {
    //           docArr = doc.data();
    //           doc_id = doc.id;
    //         });

    //         return docArr;
    //       }),
    //     items: await invRef
    //       .doc(doc_id)
    //       .collection("Items")
    //       .get()
    //       .then(function(querySnapshot) {
    //         let itemArr = [];
    //         let iterator = 0;

    //         querySnapshot.forEach(function(doc) {
    //           itemArr.push(doc.data());
    //           itemArr[iterator].bidderResponse = [];
    //           for (const index in doc.data().Features) {
    //             itemArr[iterator].bidderResponse.push("No");
    //           }
    //           console.log(itemArr[iterator]);
    //           iterator++;
    //         });

    //         return itemArr;
    //       })
    //   });
    // },

    nextStep(n) {
      if (n === this.steps) {
          this.e1 = 1
      } else {
          this.e1 = n + 1
      }
    },

    reset() {
      this.itemName = "";
      this.feature = "";
      this.minRequirement = "";
      this.tableData = [];
    },

   
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getBidData();
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
