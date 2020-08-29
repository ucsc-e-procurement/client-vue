<template>
  <v-card class="mx-auto" max-width="1500">
    <v-container>
      <ValidationObserver ref="observer">
        <v-form>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                :value="this.$route.query.requisition.requisition_id"
                label="Requisition ID"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                :value="this.$route.query.requisition.name"
                label="Requester"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                :value="this.$route.query.requisition.department"
                label="Department"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                :value="
                  new Date(this.$route.query.requisition.date).getDate() +
                    ' - ' +
                    new Date(this.$route.query.requisition.date).getMonth() +
                    ' - ' +
                    new Date(this.$route.query.requisition.date).getFullYear()
                "
                label="Date Requested"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field
                :value="this.$route.query.requisition.description"
                label="Product Description"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-data-table
                :headers="headers"
                :items="JSON.parse(this.$route.query.requisition.products)"
                :items-per-page="5"
                class="elevation-1"
              ></v-data-table>
            </v-col>
          </v-row>
          <v-divider class="mt-1"></v-divider>
          <v-row no-gutters>
            <h5 class="headline pt-5 pb-5">Deputy Bursar Recommendation</h5>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                :value="this.$route.query.requisition.deputy_bursar_remarks"
                label="Deputy Bursar Remarks"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                :value="
                  this.$route.query.requisition.deputy_bursar_recommendation
                "
                label="Deputy Bursar Recommendation"
                outlined
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-divider class="mt-1"></v-divider>
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
                ></v-select>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-btn color="success" class="mr-4 ml-4" @click="this.submit">
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
              <v-btn color="blue darken-1" text @click="acceptRequisition"
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
  name: "AcceptRequisition",
  props: [],

  // Imported Components
  components: {
    ValidationProvider,
    ValidationObserver
  },

  // Data Variables and Values
  data: () => ({
    // reqId: this.requisitionId,
    requisition: [],
    options: ["Approved", "Denied"],
    products: "",
    headers: [
      {
        text: "Product Name",
        align: "start",
        sortable: false,
        value: "product_name"
      },
      { text: "Description", value: "prod_desc" },
      { text: "Quantity", value: "prod_qty" }
    ],
    directorRemarks: "",
    directorApproval: "",
    dialog: false
  }),

  // Custom Methods and Functions
  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        this.dialog = true;
      }
    },
    acceptRequisition() {
      this.$http
        .post(`/api/director/requisitions/approve`, {
          requisitionId: this.$route.query.requisition.requisition_id,
          directorRemarks: this.directorRemarks,
          directorRecommendation: this.directorApproval
        })
        .then(response => {
          console.log(response);
          this.people = response.data;
        })
        .catch(err => {
          console.log(err);
        });
      this.dialog = false;
      this.$router.back();
      // this.$router.push({ path: `requests`})
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    // this.getRequisitions()
    // console.log('crt', this.$route.query.requisition);
    // this.products = JSON.parse(this.$route.query.requisition.products);
  },
  beforeMount() {},
  mounted() {
    //   console.log('mont', this.requisitionId)
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},

  // Computed Properties
  computed: {}
};
</script>
