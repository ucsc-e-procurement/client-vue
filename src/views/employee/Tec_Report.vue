<template>
    <v-card v-if="this.requisition" class="mx-auto" max-width=1500>
        <v-container> 
            <v-row no-gutters>
                <h3 class="text-h4 justify-center">Bid Evaluation Report</h3>
            </v-row>
            <v-divider class="mt-1"></v-divider>
        <v-form>
             <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">Background</h5>
            </v-row>    
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
            <v-row class="justify-center">
                <v-col  class="justify-center">
                    <v-card>
                        <v-simple-table>
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-h6 text-left" width="300px">Item</th>
                                <th class="text-h6 text-left" width="250px">Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="product in requisition.products" :key="product.product_id">
                                <td>{{ product.product_name }}</td>
                                <td>{{ product.qty }}</td>
                            </tr>
                            </tbody>
                        </template>
                        </v-simple-table>
                    </v-card>
                </v-col>
            </v-row>
            <br/>
            <v-divider class="mt-1"></v-divider>
            <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">Evaluation Committee Members</h5>
            </v-row>
            <v-row class="justify-center">
                <v-col>
                <v-card>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-h6 text-left" width="500px">Name</th>
                        <th class="text-h6 text-left" width="250px">Designation</th>
                        <th class="text-h6 text-left" width="250px">Capacity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in tec_team" :key="item.name">
                        <td>{{ item.employee_name }}</td>
                        <td>{{ item.designation }}</td>
                        <td>{{ item.capacity }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                </v-card>
                </v-col>
            </v-row>
            <br/>
            <v-divider class="mt-1"></v-divider>
            <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">Bids Recieved Before Closing Time</h5>
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
                <h5 class="headline pt-5 pb-5">Rejected Bids</h5>
            </v-row>
            <v-row>
              <v-col>
              <v-select
                item-text="supplier_name"
                item-value="bid_id"
                :items="this.bids"
                label="Select suppliers to reject their bids"
                v-model="rejected"
                multiple
                outlined
              ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <template v-for="(bid,key) in this.rejected_bids">
                    <div :key="key">
                    {{bid[0].supplier_name}}
                    <v-text-field
                        v-model="rejectReasons[key]"
                        label="Reason for rejecting supplier"
                        outlined
                        @input="getReasonForRejecting(key)"
                    ></v-text-field>
                  </div>
                </template>
                <v-card>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-h6 text-left" width="500px">Supplier</th>
                        <th class="text-h6 text-left" width="250px">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item) in rejected_bids" :key="item.name">
                        <td>{{ item[0].supplier_name }}</td>
                        <td>{{ item[0].total_with_vat }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                </v-card>
              </v-col>
            </v-row>
            <v-divider class="mt-1"></v-divider>
            <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">Evaluated Substantially Responsive Bidders</h5>
            </v-row>
            <v-row>
              <v-col>
                <v-card>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-h6 text-left" width="500px">Supplier</th>
                        <th class="text-h6 text-left" width="250px">Total with VAT</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item) in responsive_bids" :key="item.name">
                        <td>{{ item[0].supplier_name }}</td>
                        <td>{{ item[0].total_with_vat }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                </v-card>
              </v-col>
            </v-row>
            <v-divider class="mt-1"></v-divider>
            <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">Recommended Bidders</h5>
            </v-row>
            <v-row>
              <v-col>
              <v-select
                item-text="supplier_name"
                item-value="bid_id"
                :items="this.responsive_bid_selection"
                label="Select suppliers to recommend their bid"
                v-model="recommended"
                multiple
                outlined
              ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <template v-for="(bid,key) in this.recommended_bids">
                    <div :key="key">
                    {{bid[0].supplier_name}}
                    <v-text-field
                        v-model="recommendReasons[key]"
                        label="Reason for recommending supplier"
                        outlined
                        @input="getReasonForRecommending(key)"
                    ></v-text-field>
                  </div>
                </template>
                <v-card>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-h6 text-left" width="500px">Supplier</th>
                        <th class="text-h6 text-left" width="500px">Address</th>
                        <th class="text-h6 text-left" width="250px">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item) in recommended_bids" :key="item.name">
                        <td>{{ item[0].supplier_name }}</td>
                        <td>{{ item[0].supplier_address }}</td>
                        <td>{{ item[0].total_with_vat }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                </v-card>
              </v-col>
            </v-row>
            <v-divider class="mt-1"></v-divider>
            <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">TEC Team Recommendation</h5>
            </v-row>
            <v-row>
              <v-col>
                <template v-for="(member,key) in this.tec_team">
                  <div :key="key">
                    {{member.employee_name}} - {{member.capacity}}
                    <v-radio-group v-model="row[key]" row :disabled="user != member.employee_id">
                      <v-radio label="Agree" value="agree"></v-radio>
                      <v-radio label="Disagree" value="disagree"></v-radio>
                    </v-radio-group>
                    <v-text-field
                        v-model="tecTeamRemarks[key]"
                        label="Remarks"
                        outlined
                        :disabled="user != member.employee_id"
                    ></v-text-field>
                  </div>
                </template>
              </v-col>
            </v-row>
            <v-divider class="mt-1"></v-divider>
            <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">Deputy Bursar Recommendation</h5>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12">
                <v-text-field
                    value=""
                    label="Deputy Bursar Remarks"
                    outlined
                    disabled
                ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                <v-text-field
                    value=""
                    label="Deputy Bursar Recommendation"
                    outlined
                    disabled
                ></v-text-field>
                </v-col>
            </v-row>

            <v-divider class="mt-1"></v-divider>
            <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">Director Approval</h5>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12">
                <v-text-field
                    value=""
                    label="Derector Remarks"
                    outlined
                    disabled
                ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                <v-text-field
                    value=""
                    label="Director Approval"
                    outlined
                    disabled
                ></v-text-field>
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
  name: 'Tec_Report',

  props: ['procurement', 'requisition', 'tec_team'],

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
    rejected: [],
    recommended: [],
    reason_for_rejecting: [],
    rejectReasons: [],
    recommendReasons: [],
    tecTeamRemarks: [],
    row:[]
  }),

  // Custom Methods and Functions
  methods: {
    getReasonForRejecting(key) {
      this.reason_for_rejecting[key] = {bid_id: this.rejected_bids[key][0].bid_id, supplier_name: this.rejected_bids[key][0].supplier_name, reason: this.rejectReasons[key]}
      console.log('onchange',this.reason_for_rejecting)
    },

    getReasonForRecommending(key) {
      console.log(this.recommendReasons[key])
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

    //get the rejected bids
    rejected_bids () {
      var bids = []
      console.log('supplier bids', Object.values(this.procurement.supplier_bids))
      bids = Object.values(this.procurement.supplier_bids).filter(bid => {
        console.log(bid[0].bid_id)
        console.log(this.rejected)
        return this.rejected.includes(bid[0].bid_id)
      })
      console.log('rejected bids', bids)
      // bids.forEach(bid => {
      //   bid[0].reason_for_rejecting = ""
      // })
      return bids
    },

    //get responsive bids - !rejected_bids
    responsive_bids () {
      var bids = []
      console.log('supplier bids', Object.values(this.procurement.supplier_bids))
      bids = Object.values(this.procurement.supplier_bids).filter(bid => {
        console.log(bid[0].bid_id)
        console.log(this.rejected)
        return !this.rejected.includes(bid[0].bid_id)
      })
      console.log('rejected bids', bids)
      return bids
    },

    responsive_bid_selection () {
      var bids = []
      Object.values(this.responsive_bids).forEach(bid => {
        bids.push({bid_id: bid[0].bid_id, supplier_name: bid[0].supplier_name})
      })
      console.log('bids', bids)
      return bids
    },

    recommended_bids () {
      var bids = []
      console.log('supplier bids', Object.values(this.procurement.supplier_bids))
      bids = Object.values(this.procurement.supplier_bids).filter(bid => {
        console.log(this.recommended)
        return this.recommended.includes(bid[0].bid_id)
      })
      console.log('rejected bids', bids)
      return bids
    },

    rejected_reasons () {
      var arr = []
      this.reason_for_rejecting.forEach(reason => {
        arr.push(reason)
      })
      console.log('rejected reasons', arr)
      return arr
    }
  }
}
</script>