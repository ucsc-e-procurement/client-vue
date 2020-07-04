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
                  <div>Tender Number : {{item.procurement_id}}</div>
                  <p class="text-h6">
                    {{item.catagory}}
                  </p>
                  <div class="text--primary">
                    Published Date : {{item.date}}
                  </div>
                  <div class="text--primary">
                    Completed Date : {{item.completed_date}}
                  </div>
                  <div class="text--primary">
                    Status : {{item.procurement_status}}
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
                <span class="headline">Tender Number : {{completedProcurements[procurement].procurement_id}}</span>
                </v-card-title>
                <v-card-text>
                <p class="text-h6">
                    {{completedProcurements[procurement].catagory}}
                </p>
                <div class="text--primary">
                    Published Date : {{completedProcurements[procurement].date}}
                </div>
                <div class="text--primary">
                    Bid Opening Date : {{completedProcurements[procurement].bid_opening_date}}
                </div>
                <div class="text--primary">
                    Completed Date : {{completedProcurements[procurement].completed_date}}
                </div>
                <div class="text--primary">
                    Status : {{completedProcurements[procurement].procurement_status}}
                </div>
                <p class="text--primary text-decoration-underline text-center">
                    Submitted Bid
                </p>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Item</th>
                        <th class="text-left">Quantity</th>
                        <th class="text-left">Unit Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in JSON.parse(completedProcurements[procurement].bids)" :key="item.name">
                        <td>{{ item.product_name }}</td>
                        <td>{{ item.qty }}</td>
                        <td>{{ item.unit_price }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <p class="text--primary text-center">
                    Total with VAT(LKR): {{completedProcurements[procurement].total_with_vat}}
                </p>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-3" text @click="dialog = false">View Purchase Order</v-btn>
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
      {
        tenderNo: 'UCSC/DIM/G/ENG/2020/0001', 
        publishedDate: '20-01-2020', 
        category: 'Janitorial Items/ Essential Items', 
        completedDate: '30-01-2020',
        status: 'Delivered',
        items: [{name: 'Soap', qty: '20', price: '1500.00'}, {name: 'Hand Sanitizer', qty: '10', price: '1000.00'}]
      },
      {
        tenderNo: 'UCSC/DIM/G/ENG/2020/0002', 
        publishedDate: '02-04-2020', 
        category: 'Supply of Refreshment and Foods', 
        completedDate: '18-04-2020',
        status: 'Not Delivered',
        items: [{name: 'Biscuits', qty: '20', price: '1500.00'}]
      },
    ],
  }),

  // Custom Methods and Functions
  methods: {
    openDialog: function (key) {
      this.procurement = key
      this.dialog = true
      console.log(key)
    },

    fetchCompletedProcurements(supplier_id) {
      this.$http.get('/api/supplier/get_completed_procurements', {
        params: {
          id: supplier_id
        }
      })
      .then(response => {
        console.log(response.data);
        this.allCompletedProcurements = response.data
        console.log('fetched',JSON.parse(this.allCompletedProcurements[0].bids))
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
    this.fetchCompletedProcurements('s0001')
    //this.fetchCompletedProcurements(this.$store.getters.user.supplier_id)
  },
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
