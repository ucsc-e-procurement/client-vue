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
                      v-model="datasheet.purchaser"
                      label="The Purchaser is: "
                      outlined
                      dense
                      clearable
                    />

                    <v-text-field
                      v-model="datasheet.address"
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
                      label="If the bidder is allowed to quote for less than the all the items specified, indicate the details: "
                      outlined
                      dense
                      ::items="itemsRef_5_1"
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
                      prefix="Manufacture’s Authorization is Required"
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
                          v-model="datasheet.dateValidTill"
                          label="The Quotation shall be valid until: "
                          outlined
                          dense
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="datasheet.dateValidTill"
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
                    <v-row>
                      <v-textarea
                        :value="
                          `Assistant Bursar - Procurement \n ${datasheet.purchaser} \n ${datasheet.address}`
                        "
                        outlined
                        dense
                      >
                      </v-textarea>
                    </v-row>

                    <v-menu
                      v-model="menuValidTill"
                      :close-on-text-click="false"
                      :nudge-right="300"
                      transition="scale-transition"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="datasheet.dateValidTill"
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
                        v-model="datasheet.dateValidTill"
                        no-title
                        @input="menuValidTill = false"
                      ></v-date-picker>
                    </v-menu>

                    <v-menu
                      ref="menuTimePicker"
                      v-model="menuTimePicker"
                      :close-on-text-click="false"
                      :nudge-right="40"
                      :return-value.sync="datasheet.endQuotationTime"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="datasheet.endQuotationTime"
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
                        v-model="datasheet.endQuotationTime"
                        full-width
                        @click:minute="
                          $refs.menuTimePicker.save(datasheet.endQuotationTime)
                        "
                      ></v-time-picker>
                    </v-menu>
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>
                </v-card>

                <v-card class="my-5" flat>
                  <v-card-title
                    ><h5 class="subtitle-1 font-weight-regular">
                      ITV Clause Reference: 1.1
                    </h5>
                  </v-card-title>
                  <v-card-text>
                    <v-select
                      label="adasdasdasdasd"
                      outlined
                      dense
                      :items="['aasdasdasd']"
                    />
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
                              v-for="(doc, i) in additionalDocuments"
                              :key="i"
                              class="px-1"
                            >
                              <v-list-item-avatar
                                color="grey lighten-2"
                                size="25"
                              >
                                {{ i + 1 }}
                              </v-list-item-avatar>

                              <v-list-item-content>
                                <v-list-item-title
                                  v-text="doc"
                                ></v-list-item-title>
                              </v-list-item-content>

                              <v-list-item-action>
                                <v-row no-gutters>
                                  <v-divider verticl dark></v-divider>
                                  <v-btn icon @click="removeChoice(choice, i)">
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
                          v-model="addressQuotationsOpen"
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
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-list dense shaped>
                          <v-list-item-group
                            v-model="listItem_16"
                            color="primary"
                          >
                            <v-list-item
                              v-for="(fact, i) in otherFactorsForEvaluations"
                              :key="i"
                              class="px-1"
                            >
                              <v-list-item-avatar
                                color="grey lighten-2"
                                size="25"
                              >
                                {{ i + 1 }}
                              </v-list-item-avatar>

                              <v-list-item-content>
                                <v-list-item-title
                                  v-text="fact"
                                ></v-list-item-title>
                              </v-list-item-content>

                              <v-list-item-action>
                                <v-row no-gutters>
                                  <v-divider verticl dark></v-divider>
                                  <v-btn icon @click="removeChoice(choice, i)">
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
                          v-model="conditionsOfPayment"
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
                        v-model="bidSecurityAddressee"
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
                            bidSecurityAddressee
                          }}”</strong
                        >
                      </h5>
                    </v-row>
                    <v-row no-gutters class="mt-5">
                      <v-col cols="12">
                        <v-text-field
                          v-model="bidSecurityAmount"
                          class="pr-5"
                          label="The amount of the bid security shall be "
                          prefix="LKR"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="bidSecurityValidiUntil"
                          class="pr-5"
                          label="The validity period of the bid security shall be until"
                          outlined
                          dense
                        />
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>
                </v-card>
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
    panel: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    items: 5,
    datasheet: {
      purchaser: "University of Colombo School of Computing",
      address: "No 35 Reid Avenue Colombo 00700",
      dateValidTill: "",
      endQuotationTime: "",
      endQuotationDate: ""
    },
    itemsRef_5_1: ["Should be quoted for total Items", "Ask For the Option"],
    menuValidTill: false,
    manuTimePicker: false,

    // Section 3.1
    additionalDocuments: [],
    listItem_3_1: 0,
    documentDescription: "",

    // Section 13
    addressQuotationsOpen:
      "ADMTC Lab – 03rd Floor \nUniversity Of Colombo School Of Computing \nNo 35 Reid Avenue Colombo 00700.",

    // Section 16
    listItem_16: null,
    otherFactorsForEvaluations: [],
    statement: "",

    // Section 20
    conditionsOfPayment:
      "Advance payment will not be allowed. \nPayment shall be made in Sri Lanka Rupees within Thirty (30) days of presentation of claim supported by a certificate from the Purchaser declaring that the Goods have been delivered and that all other contracted Services have been performed.",

    // Section 21
    bidSecurityAddressee: "Director University of Colombo School of Computing",
    bidSecurityAmount: 0,
    bidSecurityValidiUntil: ""
  }),

  // Custom Methods and Functions
  methods: {
    // Section 3.1
    addDocumentDescription() {
      this.additionalDocuments.push(this.documentDescription);
    },

    // Section 16
    addEvaluationFactor() {
      this.otherFactorsForEvaluations.push(this.statement);
    }
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
