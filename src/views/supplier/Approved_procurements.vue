<template>
  <v-container>
        <v-card flat>
          <template v-for="(item,key) in completedProcurements">
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
                    @click="openDialog(key)"
                  >
                    View
                  </v-btn>
                </v-card-actions>
            </v-card>
            <v-divider :key="key" v-if="key != allCompletedProcurements.length - 1"></v-divider>
          </template>
        </v-card>
        <template>
          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="Math.ceil(allCompletedProcurements.length / perPage)"
              circle
            ></v-pagination>
          </div>
        </template>
        <v-dialog  v-if="dialog" :procurement="procurement" v-model="dialog" width="600px">
            <!-- <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                >
                Open Dialog
                </v-btn>
            </template> -->
            <v-card>
                <v-card-title>
                <span class="headline">Tender Number : {{completedProcurements[procurement].tenderNo}}</span>
                </v-card-title>
                <v-card-text>
                <p class="text-h6">
                    {{completedProcurements[procurement].category}}
                </p>
                <div class="text--primary">
                    Published Date : {{completedProcurements[procurement].publishedDate}}
                </div>
                <div class="text--primary">
                    Completed Date : {{completedProcurements[procurement].completedDate}}
                </div>
                <div class="text--primary">
                    --- other details ---
                </div>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-3" text @click="dialog = false">Close</v-btn>
                </v-card-actions>
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
    //
    tab: null,
    dialog: false,
    procurement: null,
    page: 1,
    perPage: 10,
    allCompletedProcurements: [
      {tenderNo: 'UCSC/DIM/G/ENG/2020/0001', publishedDate: '20-01-2020', category: 'Janitorial Items/ Essential Items', completedDate: '30-01-2020'},
      {tenderNo: 'UCSC/DIM/G/ENG/2020/0002', publishedDate: '02-04-2020', category: 'Supply of Refreshment and Foods', completedDate: '18-04-2020'},
    ],
  }),

  // Custom Methods and Functions
  methods: {
    openDialog: function (key) {
      this.procurement = key
      this.dialog = true
      console.log(key)
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
  computed: {
    completedProcurements () {
      return this.allCompletedProcurements.slice((this.page - 1)* this.perPage, this.page* this.perPage)
    }
  }
};
</script>

// Custom CSS Rules and Classes
<style scoped></style>
