<template>
    <v-card v-if="this.procurement" class="mx-auto" max-width=1500>
        <v-container> 
            <v-row no-gutters>
                <h3 class="text-h4 justify-center">Bid Opening Schedule</h3>
            </v-row>
            <v-divider class="mt-1"></v-divider>
        <v-form>
            <v-row>
                <v-col cols="12" sm="6">
                <v-text-field
                    :value="this.procurement.procurement_id"
                    label="Procurement ID"
                    outlined
                    readonly
                ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                <v-text-field
                    value="Goods"
                    label="Procurement Type"
                    outlined
                    readonly
                ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12">
                <v-text-field
                    value="Description"
                    label="Procurement Description"
                    outlined
                    readonly
                ></v-text-field>
                </v-col>
                
            </v-row>
            <v-divider class="mt-1"></v-divider>
            <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">Recieved Bids</h5>
            </v-row>
            <v-row>
                <v-col  class="justify-center">
                <template v-for="(product,key) in Object.values(procurement.bids)">
                    <div :key="key">
                    <v-card flat>
                        <div class="text-h6">
                            Item {{key+1}} - {{product[0].product_name}}
                        </div>
                        <v-simple-table>
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-h6 text-left" width="300px">Supplier</th>
                                <th class="text-h6 text-left" width="250px">Quantity</th>
                                <th class="text-h6 text-left" width="250px">Unit Price</th>
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
                    </v-card>
                    <br/>
                    </div>
                </template>
                </v-col>
            </v-row>
            <v-divider class="mt-1"></v-divider>
            <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">Bid Openieng Team Members</h5>
            </v-row>
            <v-row>
              <v-col>
                <template v-for="(member,key) in this.bid_opening_team">
                  <div :key="key">
                    {{member.name}}
                    <v-text-field
                        v-model="remarks[key]"
                        label="Remarks"
                        outlined
                        :disabled="user != member.employee_id"
                    ></v-text-field>
                  </div>
                </template>
              </v-col>
            </v-row>            
        </v-form>   
        </v-container>
    </v-card>
</template>

<script>
export default {
    // Form Validations
  // validations: {},
  // Props Received
  name: 'Opening_Schedule',

  props: ['procurement', 'bid_opening_team'],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    //procurement: this.procurement,
    //requisition: this.requisition,
    //tec_team: this.tec_team,
    user: "emp00005",
    //user: this.$store.getters.user.employee_id,
    items: [{product_name:'prod 1', qty: '5'}],
    team: [{name: 'name1', designation: 'designation 1', capasity: 'chairman'}, {name: 'name2', designation: 'designation 2', capasity: 'member'}],
    remarks: [],
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
  computed: {
    //get bid_id and supplier_name for each bid
    bids () {
      var bids = []
      console.log('supplier bids', this.procurement.supplier_bids)
      Object.values(this.procurement.supplier_bids).forEach(bid => {
        bids.push({bid_id: bid[0].bid_id, supplier_name: bid[0].supplier_name})
      })
      console.log('bids', bids)
      return bids
    },
  }
}
</script>