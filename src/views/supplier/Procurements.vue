<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Procurements</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-card class="mx-auto" min-width=1000>
        <!-- <v-card-title class="text-center justify-center py-6">
          <h1 class="font-weight-bold display-3 basil--text">BASiL</h1>
        </v-card-title> -->

        <v-tabs
          v-model="tab"
          background-color="transparent"
          height=60
          grow
        >
          <v-tab
            v-for="tab in tabs"
            :key="tab"
          >
            {{ tab }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <template v-for="(item) in newRequests">
                <v-divider :key="item.tenderNo"></v-divider>
                <v-card :key="item.tenderNo"
                  class="mx-auto"
                  max-width="800"
                  flat
                >
                    <v-card-text>
                      <div>Tender Number : {{item.tenderNo}}</div>
                      <p class="text-h6">
                        {{item.category}}
                      </p>
                      <div class="text--primary">
                        Published Date : {{item.publishedDate}}
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        text
                        color="blue darken-3"
                      >
                        View
                      </v-btn>
                    </v-card-actions>
                </v-card>
              </template>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <template v-for="(item) in ongoingProcurements">
                <v-divider :key="item.tenderNo"></v-divider>
                <v-card :key="item.tenderNo"
                  class="mx-auto"
                  max-width="800"
                  flat
                >
                    <v-card-text>
                      <div>Tender Number : {{item.tenderNo}}</div>
                      <p class="text-h6">
                        {{item.category}}
                      </p>
                      <div class="text--primary">
                        Published Date : {{item.publishedDate}}
                      </div>
                      <div class="text--primary">
                        Status : {{item.status}}
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        text
                        color="blue darken-3"
                      >
                        View
                      </v-btn>
                    </v-card-actions>
                </v-card>
              </template>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>Completed</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
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
    //
    tab: null,
    tabs: [
      'New Requests', 'On-Going', 'Completed'
    ],
    newRequests: [
      {tenderNo: 'UCSC/DIM/G/ENG/2020/0005', publishedDate: '18-06-2020', category: 'Stationeries and Office Consumables'},
      {tenderNo: 'UCSC/DIM/G/ENG/2020/0006', publishedDate: '18-06-2020', category: 'Supply of Refreshment and Foods'}
    ],
    ongoingProcurements: [
      {tenderNo: 'UCSC/DIM/G/ENG/2020/0004', publishedDate: '20-06-2020', category: 'Stationeries and Office Consumables', status: 'Bid sent'},
    ],
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
