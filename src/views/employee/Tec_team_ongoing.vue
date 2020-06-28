<template>
  <v-container>
        <v-card flat>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
            :headers="ongoingHeaders"
            :items="ongoingProcurements"
            :search="search"
            >
                <template v-slot:item.controls="props">
                <v-btn class="mx-2" small color="primary" @click="openDialog(props.item)">
                    VIEW
                </v-btn>
                </template>
            </v-data-table>
        </v-card>
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
                <span class="headline">Tender Number : {{procurement.tenderNo}}</span>
                </v-card-title>
                <v-card-text>
                <p class="text-h6">
                    {{procurement.category}}
                </p>
                <div class="text--primary">
                    Initialized Date : {{procurement.init_date}}
                </div>
                <div class="text--primary">
                    Supplier : {{procurement.supplier}}
                </div>
                <div class="text--primary">
                    Status : {{procurement.status}}
                </div>
                <div class="text--primary">
                    [submitted price schedule]
                </div>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="procurement.status == 'Pending TEC Report'" color="green darken-3" text @click="dialog = false">Tec Report</v-btn>
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
    search: '',
    ongoingHeaders: [
        { text: 'Procurement ID', align: 'start', filterable: true, value: 'tenderNo'},
        { text: 'Category', value: 'category' },
        { text: 'Status', value: 'status' },
        { text: 'Date Initiated', value: 'init_date' },
        { text: "Actions", value: "controls", sortable: false }
    ],
    ongoingProcurements: [
        {
        tenderNo: 'UCSC/DIM/G/ENG/2020/0004',
        category: 'Stationeries and Office Consumables',
        status: 'Bid Open',
        init_date: '05-06-2020',
        comp_date: 'Pending',
        supplier: 'John Keells Holdings',
        actions: '1%',
        },
        {
        tenderNo: 'UCSC/DIM/G/ENG/2020/0006',
        category: 'Stationeries and Office Consumables',
        status: 'Pending TEC Report',
        init_date: '01-05-2020',
        comp_date: 'pending',
        supplier: 'Techzone',
        actions: '1%',
        },
    ],
  }),

  // Custom Methods and Functions
  methods: {
    openDialog: function (item) {
      this.procurement = item
      this.dialog = true
      console.log(item)
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
