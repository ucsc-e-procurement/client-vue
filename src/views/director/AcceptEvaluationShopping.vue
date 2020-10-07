<template>
  <v-card class="mx-auto" max-width="1500">
    <v-container>
      <ValidationObserver ref="observer">
        <v-form>
          <v-row no-gutters>
            <h5 class="headline pt-5 pb-5">Director Approval</h5>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="Director Remarks"
                rules="required"
              >
                <v-text-field
                  v-model="directorRemarks"
                  label="Director Remarks"
                  :error-messages="errors"
                  outlined
                  required
                  :readonly="step!=8"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="Director Approval"
                rules="required"
              >
                <v-select
                  v-model="directorApproval"
                  :items="options"
                  label="Director Approval"
                  :error-messages="errors"
                  dense
                  outlined
                  required
                  :readonly="step!=8"
                ></v-select>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-btn color="success" class="mr-4 ml-4" @click="this.submit" v-if="this.step==8">
              Submit
            </v-btn>
          </v-row>
        </v-form>
      </ValidationObserver>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Submit Response?</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-col cols="12" sm="12">
                  <v-list>
                    <v-list-item>
                      <v-text-field
                        :value="this.directorRemarks"
                        label="Director Remarks"
                        outlined
                        readonly
                      ></v-text-field>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-list>
                    <v-list-item>
                      <v-text-field
                        :value="this.directorApproval"
                        outlined
                        readonly
                        label="Director Approval"
                      ></v-text-field>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false"
                >Close</v-btn
              >
              <v-btn color="blue darken-1" text @click="acceptEvaluation"
                >Confirm</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { required } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});

export default {
  // Form Validations
  // validations: {},

  // Props Received
  name: "AcceptEvaluation",
  props: ["procurementId", "stepVal"],

  // Imported Components
  components: {
    ValidationProvider,
    ValidationObserver
  },

  // Data Variables and Values
  data: () => ({
    options: ["Approve", "Deny"],
    directorRemarks: "",
    directorApproval: "",
    dialog: false,
    step: null
  }),

  // Custom Methods and Functions
  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        this.dialog = true;
      }
    },
    acceptEvaluation() {
      this.$http
        .post(`/api/director/accept_bid_evaluation`, {
          procurementId: this.procurementId,
          directorRemarks: this.directorRemarks,
          directorRecommendation:
            this.directorApproval == "Approve" ? "Approved" : "Denied",
          step: 9
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
      this.dialog = false;
      this.step = 7;
      this.checkIfEvaluated();
    //   this.$router.back();
      this.$emit("bidEvaluationApproved", 3);
      // this.$router.push({ path: `requests`})
    },
    checkIfEvaluated(){
      if(this.step != 8){
        this.$http.get(
          `/api/director/get_evaluation_details?procId=${this.procurementId}`
        )
        .then(response => {
          // console.log("trololololo", response);
          this.directorRemarks = response.data[0].director_remarks;
          this.directorApproval = response.data[0].status == "completed" ? "Approved" : "Rejected";
          this.options = response.data[0].status == "completed" ? ["Approved"] : ["Rejected"];
        })
        .catch(err => {
          console.log(err);
        });
      }
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
      this.step = this.stepVal;
      this.checkIfEvaluated();
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
