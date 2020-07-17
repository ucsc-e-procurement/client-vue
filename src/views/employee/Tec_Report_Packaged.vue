<template>
    <v-card v-if="this.requisition && this.procurement" class="mx-auto" max-width=1500>
        <v-app-bar dark color="primary" fixed>
          <v-btn icon dark @click="closeTecReport">
              <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>TEC Report</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
              <v-btn dark text @click="save">Save</v-btn>
          </v-toolbar-items>
          </v-app-bar>
        <v-container> 
            <v-row no-gutters>
                <h3 class="text-h4 justify-center">Bid Evaluation Report</h3>
            </v-row>
            <v-divider class="mt-1"></v-divider>
        <v-form>
             <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">Procurement Details</h5>
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
            <!-- <v-row>
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
            <br/> -->
            <v-divider class="mt-1"></v-divider>
            <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">TEC Meeting Minutes</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>
             <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">Bid Evaluation</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>
            <!-- <v-col  class="justify-center">
                <template v-for="(product,key) in Object.values(procurement.bids)">
                  <div :key="key">
                    <div class="text-h6">
                        Item {{key+1}} - {{product[0].product_name}}
                    </div>
                    <v-row no-gutters>
                        <h5 class="headline pt-5 pb-5">Rejected Bids</h5>
                    </v-row>
                    <v-row>
                      <v-col>
                      <v-select
                        item-text="supplier_name"
                        item-value="bid_id"
                        :items="bids[key]"
                        label="Select suppliers to reject their bids"
                        v-model="rejected[key]"
                        multiple
                        outlined
                      ></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <template v-for="(bid,key1) in rejected_bids[key]">
                            <div :key="key1">
                            {{bid[key].supplier_name}}
                            <v-text-field
                                v-model="rejectReasons[key1]"
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
                                <th class="text-h6 text-left" width="250px">Unit Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(item) in rejected_bids[key]" :key="item.name">
                                <td>{{ item[key].supplier_name }}</td>
                                <td>{{ item[key].unit_price }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                        </v-card>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <h5 class="headline pt-5 pb-5">Evaluated Substantially Responsive Bidders</h5>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-card >
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-h6 text-left" width="500px">Supplier</th>
                                <th class="text-h6 text-left" width="250px">Unit Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(item) in responsive_bids[key]" :key="item.name">
                                <td>{{ item[key].supplier_name }}</td>
                                <td>{{ item[key].unit_price }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                        </v-card>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <h5 class="headline pt-5 pb-5">Recommended Bidder</h5>
                    </v-row>
                    <v-row>
                      <v-col>
                      <v-select
                        item-text="supplier_name"
                        item-value="bid_id"
                        :items="responsive_bid_selection[key]"
                        label="Select suppliers to recommend their bid"
                        v-model="recommended[key]"
                        multiple
                        outlined
                      ></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <template v-for="(bid,key) in recommended_bids[key]">
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
                                <th class="text-h6 text-left" width="250px">Unit Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(item) in recommended_bids[key]" :key="item.name">
                                <td>{{ item[0].supplier_name }}</td>
                                <td>{{ item[0].supplier_address }}</td>
                                <td>{{ item[0].unit_price }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                        </v-card>
                      </v-col>
                    </v-row>
                    <v-divider class="mt-1"></v-divider>
                    <br/>
                  </div>
                </template>
            </v-col> -->
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

  props: ['procurement', 'bid_data','requisition', 'tec_team', 'closeTecReport'],

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
    row:[],
  }),

  // Custom Methods and Functions
  methods: {
    getReasonForRejecting(key) {
      this.reason_for_rejecting[key] = {bid_id: this.rejected_bids[key][0].bid_id, supplier_name: this.rejected_bids[key][0].supplier_name, reason: this.rejectReasons[key]}
      console.log('onchange',this.reason_for_rejecting)
    },

    getReasonForRecommending(key) {
      console.log(this.recommendReasons[key])
    },

    save() {
      console.log('Save', this.rejected, this.rejectReasons, this.recommended, this.recommendReasons)
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
    //get bid_id and supplier_name for each bid -packaged
    // bids () {
    //   var bids = []
    //   console.log('supplier bids', this.procurement.supplier_bids)
    //   Object.values(this.procurement.supplier_bids).forEach(bid => {
    //     bids.push({bid_id: bid[0].bid_id, supplier_name: bid[0].supplier_name})
    //   })
    //   console.log('bids', bids)
    //   return bids
    // },

    //item-wise
    bids () {
      var len = Object.values(this.procurement.bids).length
      var bids = []
      console.log('supplier bids', this.procurement.supplier_bids)
      for (let i = 0; i < len; i++) {
          var suppliers = []
          Object.values(this.procurement.supplier_bids).forEach(bid => {
          suppliers.push({bid_id: bid[0].bid_id, supplier_name: bid[0].supplier_name})
        })
        console.log('supp', suppliers)
        bids[i] = suppliers
      }
      console.log('bids', bids)
      return bids
    },

    //get the rejected bids - packaged
    // rejected_bids () {
    //   var bids = []
    //   console.log('supplier bids', Object.values(this.procurement.supplier_bids))
    //   bids = Object.values(this.procurement.supplier_bids).filter(bid => {
    //     console.log(bid[0].bid_id)
    //     console.log(this.rejected)
    //     return this.rejected.includes(bid[0].bid_id)
    //   })
    //   console.log('rejected bids', bids)
    //   // bids.forEach(bid => {
    //   //   bid[0].reason_for_rejecting = ""
    //   // })
    //   return bids
    // },


    //item-wise
    rejected_bids () {
      var len = Object.values(this.procurement.bids).length
      var bids = []
      for (let i = 0; i < len; i++) {
        var suppliers = [];
        console.log('supplier bids in rejected', Object.values(this.procurement.supplier_bids))
        if(this.rejected[i]){
          suppliers = Object.values(this.procurement.supplier_bids).filter(bid => {
          return this.rejected[i].includes(bid[0].bid_id)
        })
        console.log('supppp', suppliers)
        bids[i] = suppliers
        }
      }
      console.log('rejected bids123', bids)
      return bids
    },

    //get responsive bids - !rejected_bids
    // responsive_bids () {
    //   var bids = []
    //   console.log('supplier bids', Object.values(this.procurement.supplier_bids))
    //   bids = Object.values(this.procurement.supplier_bids).filter(bid => {
    //     console.log(bid[0].bid_id)
    //     console.log(this.rejected)
    //     return !this.rejected.includes(bid[0].bid_id)
    //   })
    //   console.log('responsive bids', bids)
    //   return bids
    // },

    responsive_bids () {
      var bids = []
      var len = Object.values(this.procurement.bids).length
      console.log('supplier bids', Object.values(this.procurement.supplier_bids))
      for (let i = 0; i < len; i++) {
        var suppliers = [];
        if(this.rejected[i]){
          suppliers = Object.values(this.procurement.supplier_bids).filter(bid => {
            console.log(bid[0].bid_id)
            console.log(this.rejected)
            return !this.rejected[i].includes(bid[0].bid_id)
          })
          bids[i] = suppliers
        }
        else{
          console.log('responsive else',Object.values(this.procurement.supplier_bids))
          bids[i] = Object.values(this.procurement.supplier_bids)
        }
      }
      console.log('responsive bids', bids)
      return bids
    },

    //packaged
    // responsive_bid_selection () {
    //   var bids = []
    //   Object.values(this.responsive_bids).forEach(bid => {
    //     bids.push({bid_id: bid[0].bid_id, supplier_name: bid[0].supplier_name})
    //   })
    //   console.log('bids', bids)
    //   return bids
    // },

  //item-wise
    responsive_bid_selection () {
      var bids = []
      var len = Object.values(this.procurement.bids).length
      for (let i = 0; i < len; i++) {
        var suppliers = []
        Object.values(this.responsive_bids[i]).forEach(bid => {
          suppliers.push({bid_id: bid[0].bid_id, supplier_name: bid[0].supplier_name})
        })
        bids[i] = suppliers
      }
      console.log('bids', bids)
      return bids
    },

    //packaged
    // recommended_bids () {
    //   var bids = []
    //   console.log('supplier bids', Object.values(this.procurement.supplier_bids))
    //   bids = Object.values(this.procurement.supplier_bids).filter(bid => {
    //     console.log(this.recommended)
    //     return this.recommended.includes(bid[0].bid_id)
    //   })
    //   console.log('recommended bids', bids)
    //   return bids
    // },

    //item-wise
    recommended_bids () {
      var bids = []
      var len = Object.values(this.procurement.bids).length
      for (let i = 0; i < len; i++) {
        var suppliers = []
        console.log('supplier bids', Object.values(this.procurement.supplier_bids))
        if(this.recommended[i]){
          suppliers = Object.values(this.procurement.supplier_bids).filter(bid => {
            console.log(this.recommended)
            return this.recommended[i].includes(bid[i].bid_id)
          })
        }
        bids[i] = suppliers
      }
      console.log('recommended bids', bids)
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