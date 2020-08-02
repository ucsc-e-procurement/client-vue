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
              <v-expansion-panels v-model="panel" multiple flat accordion>
                <!-- ITV Clause Reference: 1.1 -->
                <v-expansion-panel>
                  <v-expansion-panel-header
                    ><h5 class="subtitle-1 font-weight-regular">
                      ITV Clause Reference: <strong>1.1</strong>
                    </h5>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
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
                  </v-expansion-panel-content>
                  <v-divider class="mx-5"></v-divider>
                </v-expansion-panel>

                <!-- ITV Clause Reference: 5.1 -->
                <v-expansion-panel>
                  <v-expansion-panel-header
                    ><h5 class="subtitle-1 font-weight-regular">
                      ITV Clause Reference: <strong>5.1</strong>
                    </h5>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-select
                      label="If the bidder is allowed to quote for less than the all the items specified, indicate the details: "
                      outlined
                      dense
                      ::items="itemsRef_5_1"
                    />
                  </v-expansion-panel-content>
                  <v-divider class="mx-5"></v-divider>
                </v-expansion-panel>

                <!-- ITV Clause Reference: 7.3 -->
                <v-expansion-panel>
                  <v-expansion-panel-header
                    ><h5 class="subtitle-1 font-weight-regular">
                      ITV Clause Reference: <strong>7.3</strong>
                    </h5>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-text-field
                      prefix="Manufacture’s Authorization is Required"
                      outlined
                      dense
                      readonly
                    />
                  </v-expansion-panel-content>
                  <v-divider class="mx-5"></v-divider>
                </v-expansion-panel>

                <!-- ITV Clause Reference: 8 -->
                <v-expansion-panel>
                  <v-expansion-panel-header
                    ><h5 class="subtitle-1 font-weight-regular">
                      ITV Clause Reference: <strong>8</strong>
                    </h5>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-menu
                      v-model="menuValidTill"
                      :close-on-content-click="false"
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
                  </v-expansion-panel-content>
                  <v-divider class="mx-5"></v-divider>
                </v-expansion-panel>

                <!-- ITV Clause Reference: 11.1 -->
                <v-expansion-panel>
                  <v-expansion-panel-header
                    ><h5 class="subtitle-1 font-weight-regular">
                      ITV Clause Reference: 11.1
                    </h5>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-textarea
                      label="Address for submission of Quotations is"
                      :value="
                        `Assistant Bursar - Procurement \n ${datasheet.purchaser} \n ${datasheet.address}`
                      "
                      outlined
                      dense
                    >
                    </v-textarea>

                    <v-menu
                      v-model="menuValidTill"
                      :close-on-content-click="false"
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
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="timeEndQuotations"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="timeEndQuotations"
                          label="Deadline for submission of quoted items is"
                          prefix="Time: "
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menuTimePicker"
                        v-model="timeEndQuotations"
                        full-width
                        @click:minute="
                          $refs.menuTimePicker.save(timeEndQuotations)
                        "
                      ></v-time-picker>
                    </v-menu>
                  </v-expansion-panel-content>
                  <v-divider class="mx-5"></v-divider>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header
                    ><h5 class="subtitle-1 font-weight-regular">
                      ITV Clause Reference: 1.1
                    </h5>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-select
                      label="adasdasdasdasd"
                      outlined
                      dense
                      :items="['aasdasdasd']"
                    />
                  </v-expansion-panel-content>
                  <v-divider class="mx-5"></v-divider>
                </v-expansion-panel>

                <!-- ITV Clause Reference: 3.1 -->
                <v-expansion-panel>
                  <v-expansion-panel-header
                    ><h5 class="subtitle-1 font-weight-regular">
                      ITV Clause Reference: 1.1
                    </h5>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-select
                      label="adasdasdasdasd"
                      outlined
                      dense
                      :items="['aasdasdasd']"
                    />
                  </v-expansion-panel-content>
                  <v-divider class="mx-5"></v-divider>
                </v-expansion-panel>

                <!-- ITV Clause Reference: 13 -->
                <v-expansion-panel>
                  <v-expansion-panel-header
                    ><h5 class="subtitle-1 font-weight-regular">
                      ITV Clause Reference: 1.1
                    </h5>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-select
                      label="adasdasdasdasd"
                      outlined
                      dense
                      :items="['aasdasdasd']"
                    />
                  </v-expansion-panel-content>
                  <v-divider class="mx-5"></v-divider>
                </v-expansion-panel>

                <!-- ITV Clause Reference: 16 -->
                <v-expansion-panel>
                  <v-expansion-panel-header
                    ><h5 class="subtitle-1 font-weight-regular">
                      ITV Clause Reference: 1.1
                    </h5>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-select
                      label="adasdasdasdasd"
                      outlined
                      dense
                      :items="['aasdasdasd']"
                    />
                  </v-expansion-panel-content>
                  <v-divider class="mx-5"></v-divider>
                </v-expansion-panel>

                <!-- ITV Clause Reference: 20 -->
                <v-expansion-panel>
                  <v-expansion-panel-header
                    ><h5 class="subtitle-1 font-weight-regular">
                      ITV Clause Reference: 1.1
                    </h5>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-select
                      label="adasdasdasdasd"
                      outlined
                      dense
                      :items="['aasdasdasd']"
                    />
                  </v-expansion-panel-content>
                  <v-divider class="mx-5"></v-divider>
                </v-expansion-panel>

                <!-- ITV Clause Reference: 21 -->
                <v-expansion-panel>
                  <v-expansion-panel-header
                    ><h5 class="subtitle-1 font-weight-regular">
                      ITV Clause Reference: 1.1
                    </h5>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-select
                      label="adasdasdasdasd"
                      outlined
                      dense
                      :items="['aasdasdasd']"
                    />
                  </v-expansion-panel-content>
                  <v-divider class="mx-5"></v-divider>
                </v-expansion-panel>
              </v-expansion-panels>
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
      timeEndQuotations: null
    },
    itemsRef_5_1: ["Should be quoted for total Items", "Ask For the Option"],
    menuValidTill: false,
    manuTimePicker: false
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
