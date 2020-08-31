<template>
  <v-container>
    <v-row v-if="approvedRequisitions.length > 0">
      <v-card>
        <v-card-title
          class="text-center justify-center py-6"
          height="50%"
          color="blue lighten-2"
        >
          <h4 class="font-weight-bold ">Approved Requisitions</h4>
        </v-card-title>
        <v-card-text>
          <v-banner
            two-line
            :key="item.requisition_id"
            v-for="item in this.approvedRequisitions"
          >
            <v-avatar slot="icon" color="deep-purple accent-4" size="40">
              <v-icon icon="mdi-lock" color="white">
                mdi-lock
              </v-icon>
            </v-avatar>
            Description: {{ item.description }} <br />
            Department: {{ item.department }} <br />
            Date Requested:
            {{
              new Date(item.date).getDate() +
                "/" +
                new Date(item.date).getMonth() +
                "/" +
                new Date(item.date).getFullYear()
            }}
            <template v-slot:actions>
              <v-btn
                text
                color="deep-purple accent-4"
                @click="OpenApprovedRequisitionsDialog(item)"
                >View</v-btn
              >
            </template>
          </v-banner>
        </v-card-text>
      </v-card>
      <v-dialog v-model="approvedRequisitionsDialog" max-width="800px">
        <v-card>
          <v-card-title class="headline">Product Requisition</v-card-title>

          <v-card-text>
            <requisition
              :requisitionData="this.approvedRequisition"
              v-if="isMounted"
            />
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="blue darken-1"
              text
              @click="approvedRequisitionsDialog = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-col v-if="approvedRequisitions.length > 0"></v-col>
  </v-container>
</template>

<script>
import Requisition from "../Requisition";

export default {
  // Mixins
  // mixins: [validationMixin],

  // Form Validations
  // validations: {},

  // Props Received
  props: [],

  // Imported Components
  components: {
    requisition: Requisition
  },

  // Data Variables and Values
  data: () => ({
    approvedRequisitions: [],
    isMounted: false,
    approvedRequisitionsDialog: false,
    approvedRequisition: "",
    search: ""
  }),

  // Custom Methods and Functions
  methods: {
    getApprovedRequisitions() {
      this.$http
        .get("/api/director/get_approved_requisitions")
        .then(response => {
          // console.log(response)
          this.approvedRequisitions = response.data;
          this.isMounted = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    OpenApprovedRequisitionsDialog(item) {
      this.approvedRequisition = item;
      this.isMounted = true;
      this.approvedRequisitionsDialog = true;
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getApprovedRequisitions();
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
