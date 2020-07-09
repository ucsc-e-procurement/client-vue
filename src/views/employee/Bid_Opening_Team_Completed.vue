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
            :headers="completedHeaders"
            :items="completedProcurements"
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
            <v-card>
                
                <v-card-title>
                <span class="headline">Tender Number : {{procurement.procurement_id}}</span>
                </v-card-title>
                <v-card-text>
                <p class="text-h6">
                    {{procurement.category}}
                </p>
                <div class="text--primary">
                    Initialized Date : {{procurement.date}}
                </div>
                <div class="text--primary">
                    Completed Date : {{procurement.completed_date}}
                </div>
                <div class="text--primary">
                    Status : {{procurement.procurement_status}}
                </div>
                <br/>
                <v-divider></v-divider>
                <br/>
                <p class="text-h6 text-decoration-underline text-center">
                    Submitted Bids
                </p>
                <template v-for="(product,key) in Object.values(procurement.bids)">
                    <div :key="product[0].product_id" class="text--primary">
                        Item : {{product[0].product_name}}
                    </div>
                    <v-simple-table :key="key">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">Supplier</th>
                            <th class="text-left">Quantity</th>
                            <th class="text-left">Unit Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="bid in product" :key="bid.supplier_id">
                            <td>{{ bid.supplier_name }}</td>
                            <td>{{ bid.qty }}</td>
                            <td>{{ bid.unit_price }}</td>
                        </tr>
                        </tbody>
                    </template>
                    </v-simple-table>
                    <br :key="product[0].product_name"/>
                </template>
                <!-- <p class="text--primary text-center">
                    Total Amount(LKR): {{completedProcurements[procurement].total_with_vat}}
                </p> -->
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
    search: '',
    completedHeaders: [
        { text: 'Procurement ID', align: 'start', filterable: true, value: 'procurement_id'},
        { text: 'Category', value: 'category' },
        { text: 'Date Initiated', value: 'date' },
        { text: 'Date Completed', value: 'completed_date' },
        { text: "Actions", value: "controls", sortable: false }
    ],
    completedProcurements: [
        {
        tenderNo: 'UCSC/DIM/G/ENG/2020/0001',
        category: 'Janitorial Items/ Essential Items',
        status: 'Completed',
        init_date: '20-01-2020',
        comp_date: '30-01-2020',
        supplier: 'John Keells Holdings',
        actions: '1%',
        },
        {
        tenderNo: 'UCSC/DIM/G/ENG/2020/0002',
        category: 'Supply of Refreshment and Foods',
        status: 'Completed',
        init_date: '02-04-2020',
        comp_date: '18-04-2020',
        supplier: 'SLT',
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
    },

    fetchCompletedProcurements(employee_id) {
      this.$http.get('/api/bid_opening_team/get_completed_procurements', {
        params: {
          id: employee_id
        }
      })
      .then(response => {
        console.log(response.data);
        this.completedProcurements = response.data
        this.completedProcurements.forEach(element => {
            element.bids = JSON.parse(element.bids)
            element.bids = element.bids.reduce((r, a) => {
                console.log("a", a);
                console.log('r', r);
                r[a.product_id] = [...r[a.product_id] || [], a];
                return r;
            }, {})
        });
        console.log(this.completedProcurements)
        console.log(Object.values(this.completedProcurements[0].bids))
      })
      .catch(error => {
        console.log(error);
      });
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
      this.fetchCompletedProcurements('emp00005')
      //this.fetchCompletedProcurements(this.$store.getters.user.employee_id)
  },
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
