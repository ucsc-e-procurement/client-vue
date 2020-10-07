<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat outlined>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Section II: Data Sheet</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row>
              <v-col cols="12">
                <!-- ITV Clause Reference: 1.1 -->
                <v-card class="my-5" flat>
                  <v-card-title
                    ><h5 class="subtitle-1 font-weight-regular">
                      ITV Clause Reference: <strong>1.1</strong>
                    </h5>
                  </v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="datasheet.itvCR_1_1.purchaser"
                      label="The Purchaser is: "
                      outlined
                      dense
                      clearable
                    />

                    <v-text-field
                      v-model="datasheet.itvCR_1_1.address"
                      label="Address: "
                      outlined
                      dense
                      clearable
                    />
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>
                </v-card>

                <!-- ITV Clause Reference: 5.1 -->
                <v-card class="my-5" flat>
                  <v-card-title
                    ><h5 class="subtitle-1 font-weight-regular">
                      ITV Clause Reference: <strong>5.1</strong>
                    </h5>
                  </v-card-title>
                  <v-card-text>
                    <v-select
                      v-model="datasheet.itvCR_5_1"
                      label="If the bidder is allowed to quote for less than the all the items specified, indicate the details: "
                      outlined
                      dense
                      :items="itemsRef_5_1"
                    />
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>
                </v-card>

                <!-- ITV Clause Reference: 7.3 -->
                <v-card class="my-5" flat>
                  <v-card-title
                    ><h5 class="subtitle-1 font-weight-regular">
                      ITV Clause Reference: <strong>7.3</strong>
                    </h5>
                  </v-card-title>
                  <v-card-text>
                    <v-text-field
                      :value="datasheet.itvCR_7_3"
                      outlined
                      dense
                      readonly
                    />
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>
                </v-card>

                <!-- ITV Clause Reference: 8 -->
                <v-card class="my-5" flat>
                  <v-card-title
                    ><h5 class="subtitle-1 font-weight-regular">
                      ITV Clause Reference: <strong>8</strong>
                    </h5>
                  </v-card-title>
                  <v-card-text>
                    <v-menu
                      v-model="menuValidTill"
                      :close-on-text-click="false"
                      :nudge-right="300"
                      transition="scale-transition"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="datasheet.itvCR_8.quotationValidUntil"
                          label="The Quotation shall be valid until: "
                          outlined
                          dense
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="datasheet.itvCR_8.quotationValidUntil"
                        no-title
                        @input="menuValidTill = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>
                </v-card>

                <!-- ITV Clause Reference: 11.1 -->
                <v-card class="my-5" flat>
                  <v-card-title
                    ><h5 class="subtitle-1 font-weight-regular">
                      ITV Clause Reference: 11.1
                    </h5>
                  </v-card-title>
                  <v-card-text>
                    <h5 class="subtitle-1 font-weight-regular">
                      Address for submission of Quotations is
                    </h5>
                    <v-row no-gutters>
                      <v-textarea
                        v-model="datasheet.itvCR_11_1.address"
                        :value="
                          `Assistant Bursar - Procurement \n${this.datasheet.itvCR_1_1.purchaser} \n${this.datasheet.itvCR_1_1.address}`
                        "
                        outlined
                        dense
                      >
                      </v-textarea>
                    </v-row>

                    <v-menu
                      v-model="menuDeadlineDate"
                      :close-on-text-click="false"
                      :nudge-right="300"
                      transition="scale-transition"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="datasheet.itvCR_11_1.deadlineDate"
                          label="Deadline for submission of quoted items is"
                          prefix="Date: "
                          outlined
                          dense
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="datasheet.itvCR_11_1.deadlineDate"
                        no-title
                        @input="menuDeadlineDate = false"
                      ></v-date-picker>
                    </v-menu>

                    <v-menu
                      ref="menuTP"
                      v-model="menuTimePicker"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="datasheet.itvCR_11_1.deadlineTime"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="datasheet.itvCR_11_1.deadlineTime"
                          outlined
                          dense
                          label="Deadline for submission of quoted items is"
                          prefix="Time: "
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menuTimePicker"
                        v-model="datasheet.itvCR_11_1.deadlineTime"
                        full-width
                        scrollable
                        @click:minute="
                          $refs.menuTP.save(datasheet.itvCR_11_1.deadlineTime)
                        "
                      ></v-time-picker>
                    </v-menu>
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>
                </v-card>

                <!-- ITV Clause Reference: 3.1 -->
                <v-card class="my-5" flat>
                  <v-card-title
                    ><h5 class="subtitle-1 font-weight-regular">
                      ITV Clause Reference: 3.1
                    </h5>
                  </v-card-title>
                  <v-card-text>
                    <h5 class="subtitle-1">
                      The Bidder shall submit the following additional
                      documents:
                    </h5>
                    <v-row no-gutters class="mt-2">
                      <v-text-field
                        v-model="documentDescription"
                        class="pr-5"
                        label="Document Description"
                        outlined
                        dense
                      />
                      <v-btn @click="addDocumentDescription">Add</v-btn>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-list dense shaped>
                          <v-list-item-group
                            v-model="listItem_3_1"
                            color="primary"
                          >
                            <v-list-item
                              v-for="(doc, i) in datasheet.itvCR_3_1
                                .additionalDocuments"
                              :key="i"
                              class="px-1"
                            >
                              <v-list-item-avatar class="ml-2" size="25">
                                {{ alphabet[i] }} )
                              </v-list-item-avatar>

                              <v-list-item-content>
                                <v-list-item-title
                                  v-text="doc"
                                ></v-list-item-title>
                              </v-list-item-content>

                              <v-list-item-action>
                                <v-row no-gutters>
                                  <v-divider verticl dark></v-divider>
                                  <v-btn
                                    icon
                                    @click="
                                      showDeleteDialogDocumentDescription(i)
                                    "
                                  >
                                    <v-icon color="red darken-2"
                                      >mdi-delete</v-icon
                                    >
                                  </v-btn>
                                </v-row>
                              </v-list-item-action>
                            </v-list-item>
                          </v-list-item-group>
                        </v-list>
                      </v-col>
                    </v-row>

                    <!-- <v-select
                      label="adasdasdasdasd"
                      outlined
                      dense
                      :items="['aasdasdasd']"
                    /> -->
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>
                </v-card>

                <!-- ITV Clause Reference: 13 -->
                <v-card class="my-5" flat>
                  <v-card-title
                    ><h5 class="font-weight-regular">
                      ITV Clause Reference: 13
                    </h5>
                  </v-card-title>
                  <v-card-text>
                    <h5 class="subtitle-1 font-weight-regular">
                      The quotations shall be opened at the following address
                    </h5>
                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          v-model="datasheet.itvCR_13.quotationOpenAddress"
                          outlined
                          dense
                        />
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>
                </v-card>

                <!-- ITV Clause Reference: 16 -->
                <v-card class="my-5" flat>
                  <v-card-title
                    ><h5 class="subtitle-1 font-weight-regular">
                      ITV Clause Reference: 16
                    </h5>
                  </v-card-title>
                  <v-card-text>
                    <h5 class="subtitle-1">
                      Other factors that will be considered for evaluation are
                      (List and describe the methodology)
                    </h5>
                    <v-row no-gutters class="mt-2">
                      <v-text-field
                        v-model="statement"
                        class="pr-5"
                        label="Evaluation Statement"
                        outlined
                        dense
                      />
                      <v-btn @click="addEvaluationFactor">Add</v-btn>
                    </v-row>
                    <v-row no-gutters class="my-n5">
                      <v-col cols="12">
                        <v-card class="pt-2 pb-1 pl-4" outlined>
                          <v-radio-group
                            v-model="rbOption"
                            row
                            class="ma-0 py-0 ml-n1"
                            @change="changeStatement_itv_16"
                          >
                            <v-radio
                              label="Evaluate As Packaged Basis (as a Lot)"
                              value="packaged"
                            ></v-radio>
                            <v-radio
                              label="Evaluate as Item-wise"
                              value="items"
                            ></v-radio>
                          </v-radio-group>
                          <v-card-subtitle class="px-0 py-0"
                            >Note: The statement will be added automatically
                            into the list</v-card-subtitle
                          >
                        </v-card>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-list dense shaped>
                          <v-list-item-group
                            v-model="listItem_16"
                            color="primary"
                          >
                            <v-list-item
                              v-for="(fact, i) in datasheet.itvCR_16
                                .evaluationFactors"
                              :key="i"
                              class="px-1"
                            >
                              <v-list-item-avatar class="ml-2" size="25">
                                {{ alphabet[i] }} )
                              </v-list-item-avatar>

                              <v-list-item-content>
                                <v-list-item-title
                                  v-text="fact"
                                ></v-list-item-title>
                              </v-list-item-content>

                              <v-list-item-action>
                                <v-row no-gutters>
                                  <v-divider verticl dark></v-divider>
                                  <v-btn
                                    icon
                                    @click="showDeleteDialogEvaluationFactor(i)"
                                  >
                                    <v-icon color="red darken-2"
                                      >mdi-delete</v-icon
                                    >
                                  </v-btn>
                                </v-row>
                              </v-list-item-action>
                            </v-list-item>
                          </v-list-item-group>
                        </v-list>
                      </v-col>
                    </v-row>

                    <!-- <v-select
                      label="adasdasdasdasd"
                      outlined
                      dense
                      :items="['aasdasdasd']"
                    /> -->
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>
                </v-card>

                <!-- ITV Clause Reference: 20 -->
                <v-card class="my-5" flat>
                  <v-card-title
                    ><h5 class="font-weight-regular">
                      ITV Clause Reference: 20
                    </h5>
                  </v-card-title>
                  <v-card-text>
                    <h5 class="subtitle-1 font-weight-regular">
                      The method and conditions of payment to be made to the
                      Supplier under this Contract shall be as follows
                    </h5>
                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          v-model="
                            datasheet.itvCR_20.methodsAndConditionsOfPayment
                          "
                          outlined
                          dense
                        />
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>
                </v-card>

                <!-- ITV Clause Reference: 21 -->
                <v-card class="my-5" flat>
                  <v-card-title
                    ><h5 class="font-weight-regular">
                      ITV Clause Reference: 21
                    </h5>
                  </v-card-title>
                  <v-card-text>
                    <v-row no-gutters>
                      <v-text-field
                        v-model="datasheet.itvCR_21.addresseeOfTheBidSecurity"
                        class="pr-5"
                        label="Addressee of the Bid Security"
                        outlined
                        dense
                      />
                      <h5 class="subtitle-1 font-weight-regular">
                        Bid shall include a Bid Security issued from a
                        <strong
                          >Commercial Bank Registered in Central Bank of Sri
                          Lanka</strong
                        >. Specimen Format Included in Section IV Bidding Forms
                        &
                        <strong
                          >Bid Security should be addressed in favor of “{{
                            datasheet.itvCR_21.addresseeOfTheBidSecurity
                          }}”</strong
                        >
                      </h5>
                    </v-row>
                    <v-row no-gutters class="mt-5">
                      <v-col cols="12">
                        <v-text-field
                          v-model="datasheet.itvCR_21.bidSecurityAmount"
                          class="pr-5"
                          label="The amount of the bid security shall be "
                          prefix="LKR"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="datasheet.itvCR_21.bidSecurityValidiUntil"
                          class="pr-5"
                          label="The validity period of the bid security shall be until"
                          outlined
                          dense
                        />
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>

                  <v-card-actions>
                    <v-btn @click="saveDatasheet">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>

            <!-- Snackbar -->
            <v-row>
              <v-snackbar
                v-model="snackbar.show"
                bottom
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
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog Delete Confirmation - Evaluation Factors -->
    <v-row justify="center">
      <v-dialog
        v-model="dialogDeleteEvaluationFactor"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">Delete Confirmation</v-card-title>
          <v-card-text>Do You Reallly Want to Delete this ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color=""
              small
              text
              @click="dialogDeleteEvaluationFactor = false"
              >Cancel</v-btn
            >
            <v-btn
              color="red darken-2"
              small
              dark
              @click="removeEvaluationFactor"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Dialog Delete Confirmation - Additional Documents / Document Description -->
    <v-row justify="center">
      <v-dialog
        v-model="dialogDeleteDocumentDescription"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">Delete Confirmation</v-card-title>
          <v-card-text>Do You Reallly Want to Delete this ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color=""
              small
              text
              @click="dialogDeleteDocumentDescription = false"
              >Cancel</v-btn
            >
            <v-btn
              color="red darken-2"
              small
              dark
              @click="removeDocumentDescription"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
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

import firebsase from "firebase";
/* Note: When Declaring Variables, always think about how Form Validation Rules are applied */
export default {
  // Mixins
  // mixins: [validationMixin],

  // Form Validations
  // validations: {},

  // Props Received
  props: ["procurementId", "sorId"],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    datasheet: {
      itvCR_1_1: {
        purchaser: "University of Colombo School of Computing",
        address: "No 35 Reid Avenue Colombo 00700"
      },
      itvCR_5_1: "",
      itvCR_7_3: "Manufacture’s Authorization is required",
      itvCR_8: {
        quotationValidUntil: ""
      },
      itvCR_11_1: {
        address: "",
        deadlineDate: "",
        deadlineTime: ""
      },
      itvCR_3_1: {
        additionalDocuments: []
      },
      itvCR_13: {
        quotationOpenAddress: ""
      },
      itvCR_16: {
        evaluationFactors: []
      },
      itvCR_20: {
        methodsAndConditionsOfPayment:
          "Advance payment will not be allowed. \nPayment shall be made in Sri Lanka Rupees within Thirty (30) days of presentation of claim supported by a certificate from the Purchaser declaring that the Goods have been delivered and that all other contracted Services have been performed."
      },
      itvCR_21: {
        addresseeOfTheBidSecurity:
          "Director University of Colombo School of Computing",
        bidSecurityAmount: 0.0,
        bidSecurityValidiUntil: ""
      }
    },
    alphabet: "abcdefghijklmnopqrstuvwxyz".split(""),
    itemsRef_5_1: ["Should be quoted for total Items", "Ask For the Option"],

    // Menu
    menuValidTill: false,
    menuTimePicker: false,
    menuDeadlineDate: false,

    // Section 3.1
    listItem_3_1: null,
    documentDescription: "",
    deletePointer: null,

    // Section 16
    listItem_16: null,
    statement: "",
    rbOption: "packaged",

    // Dialogs
    dialogDeleteEvaluationFactor: false,
    dialogDeleteDocumentDescription: false,

    // Snackbar
    snackbar: {
      show: false,
      text: "",
      color: "",
      timeout: 4000
    }

    //
  }),

  // Custom Methods and Functions
  methods: {
    // Section 3.1
    addDocumentDescription() {
      this.datasheet.itvCR_3_1.additionalDocuments.push(
        this.documentDescription.trim()
      );

      this.documentDescription = "";
    },

    // Section 16
    addEvaluationFactor() {
      this.datasheet.itvCR_16.evaluationFactors.push(this.statement.trim());
      this.statement = "";
    },
    removeEvaluationFactor(deletePointer) {
      this.datasheet.itvCR_16.evaluationFactors.splice(deletePointer, 1);
      this.dialogDeleteEvaluationFactor = false;
      // Snackbar Error
      this.snackbar.text = "Evaluation Factor Deleted";
      this.snackbar.color = "";
      this.snackbar.timeout = 4000;
      this.snackbar.show = true;
    },
    removeDocumentDescription(deletePointer) {
      this.datasheet.itvCR_3_1.splice(deletePointer, 1);
      this.dialogDeleteDocumentDescription = false;
      // Snackbar Error
      this.snackbar.text = "Document Description Deleted";
      this.snackbar.color = "";
      this.snackbar.timeout = 4000;
      this.snackbar.show = true;
    },
    showDeleteDialogEvaluationFactor(index) {
      this.dialogDeleteEvaluationFactor = true;
      this.deletePointer = index;
    },
    showDeleteDialogDocumentDescription(index) {
      this.dialogDeleteDocumentDescription = true;
      this.deletePointer = index;
    },
    updateBidType(procurementId, bidType) {
      return new Promise((resolve, reject) => {
        this.$http
          .post("/api/admin/bid/bid-type", {
            procurement_id: procurementId,
            bid_type: bidType
          })
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    saveDatasheet() {
      return new Promise((resolve, reject) => {
        let db = firebsase.firestore();

        let datasheet = { ...this.datasheet };

        // TODO
        // ################################################################################
        //                       Change This to Dynamic
        // ################################################################################
        db.collection("ScheduleOfRequirements")
          .doc(this.sorId)
          .update(datasheet)
          .then(() => {
            // resolve();
            console.log("Firebase Updated");
            return this.updateBidType(this.procurementId, this.rbOption);
          })
          .then(res => {
            console.log("MySQL Updated");
            // Update Procurement Table --> Bid Type
            resolve(res);
          })
          .catch(err => {
            reject(err);
            console.log(err);
          });
      });
    },
    changeStatement_itv_16() {
      if (
        this.datasheet.itvCR_16.evaluationFactors.includes(
          "The bids will be evaluated as lot basis. Bidder shall not be allowed to quote part of the bid."
        )
      ) {
        this.datasheet.itvCR_16.evaluationFactors.splice(
          this.datasheet.itvCR_16.evaluationFactors.indexOf(
            "The bids will be evaluated as lot basis. Bidder shall not be allowed to quote part of the bid."
          ),
          1
        );
      } else {
        this.datasheet.itvCR_16.evaluationFactors.splice(
          this.datasheet.itvCR_16.evaluationFactors.indexOf(
            "The bid may be evaluated as Item-Wise. And packaging will not be concidered as a requirement"
          ),
          1
        );
      }
      this.datasheet.itvCR_16.evaluationFactors.push(
        this.rbOption === "packaged"
          ? "The bids will be evaluated as lot basis. Bidder shall not be allowed to quote part of the bid."
          : "The bid may be evaluated as Item-Wise. And packaging will not be concidered as a requirement."
      );
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.datasheet.itvCR_16.evaluationFactors.push(
      "The bids will be evaluated as lot basis. Bidder shall not be allowed to quote part of the bid."
    );
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
