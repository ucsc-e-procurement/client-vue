<template>
    <v-card v-if="this.requisition && this.procurement && this.bid_data && this.tec_report_data" class="mx-auto" max-width=1500>
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
        <v-form ref="form">
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
            <v-row>
                <v-col  class="justify-center">
                <template v-for="(bid,key) in bid_data">
                    <div :key="key">
                    <v-card flat>
                        <div class="text-h6">
                            Supplier {{key+1}} - {{bid.name}}
                        </div>
                        <v-simple-table>
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-h6 text-left" width="300px">Item</th>
                                <th class="text-h6 text-left" width="250px">Quantity</th>
                                <th class="text-h6 text-left" width="250px">Unit Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in bid.bids" :key="item.product_id">
                                <td>{{ item.product_name }}</td>
                                <td>{{ item.qty }}</td>
                                <td>{{ item.unit_price }}</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td class="text-h6 text-left">Total with VAT</td>
                              <td class="text-h6 text-left">{{ bid.total_with_vat }}</td>
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
            <br/>
            <v-divider class="mt-1"></v-divider>
            <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">TEC Meeting Minutes</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>
             <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">Bid Evaluation</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>
            <v-col  class="justify-center">
                <v-row no-gutters>
                    <h5 class="headline pt-5 pb-5">Rejected Bids</h5>
                </v-row>
                <v-row v-if="!tec_report_data">
                  <v-col>
                  <v-select
                    item-text="supplier_name"
                    item-value="bid_id"
                    :items="bids"
                    label="Select suppliers to reject their bids"
                    v-model="rejected"
                    multiple
                    outlined
                    :rules="[rules.required]"
                  ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <template v-for="(bid,key) in rejected_bids">
                        <div :key="key">
                        {{bid.name}}
                        <v-text-field
                            v-model="rejectReasons[key]"
                            label="Reason for rejecting supplier"
                            outlined
                            :rules="[rules.required]"
                            :readonly="tec_report_data && tec_report_data.status == 'saved'"
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
                            <th class="text-h6 text-left" width="250px">Total with VAT</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item) in rejected_bids" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.total_with_vat }}</td>
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
                            <th class="text-h6 text-left" width="250px">Total with VAT</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item) in responsive_bids" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.total_with_vat }}</td>
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
                <v-row v-if="!tec_report_data">
                  <v-col>
                  <v-select
                    item-text="supplier_name"
                    item-value="bid_id"
                    :items="responsive_bid_selection"
                    label="Select suppliers to recommend their bid"
                    v-model="recommended"
                    outlined
                    :rules="[rules.required]"
                    required
                  ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <template v-for="(bid,key) in recommended_bids">
                        <div :key="key">
                        {{bid.name}}
                        <v-text-field
                            v-model="recommendReasons[key]"
                            label="Reason for recommending supplier"
                            outlined
                            :rules="[rules.required]"
                            :readonly="tec_report_data && tec_report_data.status == 'saved'"
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
                            <th class="text-h6 text-left" width="250px">Total with VAT</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item) in recommended_bids" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.address }}</td>
                            <td>{{ item.total_with_vat }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    </v-card> 
                  </v-col>
                </v-row>
                <v-divider class="mt-1"></v-divider>
                <br/>
            </v-col>
            <v-divider class="mt-1"></v-divider>
            <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">TEC Team Recommendation</h5>
            </v-row>
            <v-row>
              <v-col>
                <template v-for="(member,key) in this.tec_team">
                  <div :key="key">
                    {{member.employee_name}} - {{member.capacity}}
                    <v-radio-group 
                      v-if="user != member.employee_id" 
                      v-model="row[key]" 
                      row 
                      disabled 
                      @input="tecRecommendation(key)" 
                    >
                      <v-radio label="Agree" value="agree"></v-radio>
                      <v-radio label="Disagree" value="disagree"></v-radio>
                    </v-radio-group>
                    <v-radio-group 
                      v-else
                      v-model="row[key]" 
                      row  
                      @input="tecRecommendation(key)" 
                      :rules="[rules.required]"
                      :readonly="tec_report_data && tec_report_data.status == 'saved'"
                    >
                      <v-radio label="Agree" value="agree"></v-radio>
                      <v-radio label="Disagree" value="disagree"></v-radio>
                    </v-radio-group>

                    <v-text-field
                        v-if="user != member.employee_id"
                        v-model="tecTeamRemarks[key]"
                        label="Remarks"
                        outlined
                        @input="tecRecommendation(key)"
                        disabled
                    ></v-text-field>
                    <v-text-field
                        v-else
                        v-model="tecTeamRemarks[key]"
                        label="Remarks"
                        outlined
                        :rules="[rules.required]"
                        :readonly="tec_report_data && tec_report_data.status == 'saved'"
                        @input="tecRecommendation(key)"
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

  props: ['procurement', 'bid_data','requisition', 'tec_team', 'tec_report_data','closeTecReport'],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    //procurement: this.procurement,
    //requisition: this.requisition,
    //tec_team: this.tec_team,
    user: "emp00005",
    //user: this.$store.getters.user.employee_id,
    //rejected: [],
    //recommended: [],
    reason_for_rejecting: [],
    reason_for_recommending: [],
    //rejectReasons: [],
    //recommendReasons: [],
    //tecTeamRemarks: [],
    //row: [],
    tec_recommendation:[],
    rules: {required: value => !!value || 'Required.'}
  }),

  // Custom Methods and Functions
  methods: {
    getReasonForRejecting(key) {
      this.reason_for_rejecting[key] = {bid_id: this.rejected_bids[key].bid_id, name: this.rejected_bids[key].name, reason: this.rejectReasons[key]}
      console.log('onchange reject',this.reason_for_rejecting)
    },

    getReasonForRecommending(key) {
      this.reason_for_recommending[key] = {bid_id: this.recommended_bids[key].bid_id, name: this.recommended_bids[key].name, reason: this.recommendReasons[key]}
      console.log('on change recommend', this.reason_for_recommending)
    },

    tecRecommendation(key) {
      this.tec_recommendation[key] = {emp_id: this.tec_team[key].employee_id, emp_name: this.tec_team[key].employee_name, decision: this.row[key], remarks: this.tecTeamRemarks[key]}
      console.log('on change tec recommendation', this.tec_recommendation)
    },

    save() {
      var valid = this.$refs.form.validate()
      if(valid) {
        console.log('valid')
        if(this.tec_report_data && this.tec_report_data.status == 'saved'){
          //update
          console.log('update tec report')
        }
        else{
          this.$http.post('/api/tec_team/save_tec_report', {
                rejectedbids: this.rejected,
                reasonsForRejecting: JSON.stringify(this.reason_for_rejecting),
                recommendedbids: this.recommended,
                reasonForRecommending: JSON.stringify(this.reason_for_recommending),
                tecRecommendation: JSON.stringify(this.tec_recommendation),
                tecTeamId: this.procurement.tec_team_id,
                procurementId: this.procurement.procurement_id
            })
            .then(response => {
                console.log(response);
                this.people = response.data;
            })
            .catch(err => {
                console.log(err);
            })
        }
      }
      console.log('Save', this.rejected, this.reason_for_rejecting, this.recommended, this.reason_for_recommending, this.tec_recommendation)
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
    bids () {
      var bids = []
      this.bid_data.forEach(bid => {
        if(!this.recommended || !this.recommended.includes(bid.bid_id)) {
          bids.push({bid_id: bid.bid_id, supplier_name: bid.name})
        }
      })
      console.log('bids', bids)
      return bids
    },

    //get the rejected bids - packaged
    rejected_bids () {
      var bids = []
        bids = this.bid_data.filter(bid => {
          console.log('rejected',this.rejected)
          return this.rejected.includes(bid.bid_id)
        })
        console.log('rejected bids', bids)
        return bids
    },

    // get responsive bids - !rejected_bids
    responsive_bids () {
      var bids = []
      bids = this.bid_data.filter(bid => {
        console.log(this.rejected)
        return !this.rejected.includes(bid.bid_id)
      })
      console.log('responsive bids', bids)
      return bids
    },

    //packaged
    responsive_bid_selection () {
      var bids = []
      this.responsive_bids.forEach(bid => {
        bids.push({bid_id: bid.bid_id, supplier_name: bid.name})
      })
      console.log('bids', bids)
      return bids
    },

    //packaged
    recommended_bids () {
      var bids = []
      bids = this.bid_data.filter(bid => {
        console.log(this.recommended)
        return this.recommended.includes(bid.bid_id)
      })
      console.log('recommended bids', bids)
      return bids
    },

  //radio buttons
    row () {
      if(this.tec_report_data){
        var arr =[]
        console.log('heeee', this.tec_report_data)
        this.tec_report_data.tec_recommendation.forEach(item => {
          if(item){
            arr.push(item.decision)
          }
          else{
            arr.push('')
          }
        })
        console.log('row', arr)
        return arr
      }
      else{
        return []
      }
    },

    tecTeamRemarks () {
      if(this.tec_report_data){
        var arr =[]
        console.log('heeee', this.tec_report_data)
        this.tec_report_data.tec_recommendation.forEach(item => {
          if(item){
            arr.push(item.remarks)
          }
          else{
            arr.push('')
          }
        })
        console.log('remarks', arr)
        return arr
      }
      else{
        return []
      }
    },

    //values for text fields
    rejectReasons () {
      if(this.tec_report_data){
        var arr =[]
        console.log('heeee', this.tec_report_data)
        this.tec_report_data.rejected_bids.forEach(item => {
          if(item){
            arr.push(item.reason)
          }
          else{
            arr.push('')
          }
        })
        console.log('reject reasons', arr)
        return arr
      }
      else{
        return []
      }
    },

    //values for rejected array
    rejected () {
      if(this.tec_report_data){
        var arr =[]
        console.log('heeee', this.tec_report_data)
        this.tec_report_data.rejected_bids.forEach(item => {
          if(item){
            arr.push(item.bid_id)
          }
          else{
            arr.push('')
          }
        })
        console.log('rejected', arr)
        return arr
      }
      else{
        return []
      }
    },

    recommended () {
      if(this.tec_report_data){
        var arr =[]
        console.log('heeee', this.tec_report_data)
        this.tec_report_data.recommended_bids.forEach(item => {
          if(item){
            arr.push(item.bid_id)
          }
          else{
            arr.push('')
          }
        })
        console.log('recommended', arr)
        return arr
      }
      else{
        return []
      }
    },

    recommendReasons () {
      if(this.tec_report_data){
        var arr =[]
        console.log('heeee', this.tec_report_data)
        this.tec_report_data.recommended_bids.forEach(item => {
          if(item){
            arr.push(item.reason)
          }
          else{
            arr.push('')
          }
        })
        console.log('recommended reasons', arr)
        return arr
      }
      else{
        return []
      }
    },
  }

}
</script>