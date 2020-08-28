<template>
    <v-card v-if="this.requisition && this.procurement && this.bid_data" class="mx-auto" max-width=1500>
        <!-- <v-app-bar dark color="primary" fixed>
          <v-btn icon dark @click="closeTecReport">
              <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>TEC Report</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items v-if="! filled">
              <v-btn dark text @click="save">Save</v-btn>
          </v-toolbar-items>
          </v-app-bar> -->
        <v-container> 
            <!-- <v-row no-gutters>
                <h3 class="text-h4 justify-center">Bid Evaluation Report</h3>
            </v-row>
            <v-divider class="mt-1"></v-divider> -->
        <v-form ref="form">
          <v-stepper :value="stepperStep" class="mt-12">
              <v-stepper-header>
                <v-stepper-step step="1" :complete="stepperStep > 1">Procurement Details</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="2" :complete="stepperStep > 2">Evaluation Committee Members</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3" :complete="stepperStep > 3">Bids Recieved Before Closing Time</v-stepper-step>
                
                <v-divider></v-divider>

                <v-stepper-step step="4" :complete="stepperStep > 4">Bid Evaluation</v-stepper-step>
                
                <v-divider></v-divider>

                <v-stepper-step step="5" :complete="stepperStep > 5">TEC Recommendation</v-stepper-step>
              </v-stepper-header>

              <v-stepper-content step="1">
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
                <v-divider class="mt-1"></v-divider>
                <br/>
                <v-row no-gutters>
                  <v-btn color="primary" @click="nextStep" rounded>
                    Next
                  </v-btn>
                </v-row>
              </v-stepper-content>

              <v-stepper-content step="2">
                  <v-row class="justify-center">
                    <v-col>
                    <v-card>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-h6 text-left" width="250px">Name</th>
                            <th class="text-h6 text-left" width="250px">Capacity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in tec_team" :key="item.name">
                            <td>{{ item.employee_name }}</td>
                            <td>{{ item.capacity }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    </v-card>
                    </v-col>
                </v-row>
                <v-divider class="mt-1"></v-divider>
                <br/>
                <v-row no-gutters>
                  <v-btn color="primary" @click="prevStep" rounded>
                    Back
                  </v-btn>
                  <v-btn color="primary" @click="nextStep" rounded absolute right>
                    Next
                  </v-btn>
                </v-row>
              </v-stepper-content>

              <v-stepper-content step="3">
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
                <v-divider class="mt-1"></v-divider>
                <br/>
                <v-row no-gutters>
                  <v-btn color="primary" @click="prevStep" rounded>
                    Back
                  </v-btn>
                  <v-btn color="primary" @click="nextStep" rounded absolute right>
                    Next
                  </v-btn>
                </v-row>
              </v-stepper-content>

              <v-stepper-content step="4">
                <v-form ref="form1">
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
                                :value="tec_report_data ? rejected_reasons[key] : rejectReasons[key]"
                                label="Reason for rejecting supplier"
                                outlined
                                :rules="[rules.required]"
                                :readonly="tec_report_data && tec_report_data.status == 'saved'"
                                @input="getReasonForRejecting($event, key)"
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
                                :value="tec_report_data ? recommended_reasons[key] : recommendReasons[key]"
                                label="Reason for recommending supplier"
                                outlined
                                :rules="[rules.required]"
                                :readonly="tec_report_data && tec_report_data.status == 'saved'"
                                @input="getReasonForRecommending($event, key)"
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
                </v-form>
                <v-divider class="mt-1"></v-divider>
                <br/>
                <v-row no-gutters>
                  <v-btn color="primary" @click="prevStep" rounded>
                    Back
                  </v-btn>
                  <v-btn color="primary" @click="nextStep" rounded absolute right>
                    Next
                  </v-btn>
                </v-row>
              </v-stepper-content>

              <v-stepper-content step="5">
                  <v-row>
                    <v-col>
                      <template v-for="(member,key) in this.tec_team">
                        <div :key="key">
                          {{member.employee_name}} - {{member.capacity}}
                          <!-- radio group if not logged in user -->
                          <v-radio-group 
                            v-if="user != member.employee_id" 
                            :value="tec_approval[key]"  
                            row 
                            disabled 
                            @input="tecRecommendation(key)" 
                          >
                            <v-radio label="Agree" value="agree"></v-radio>
                            <v-radio label="Disagree" value="disagree"></v-radio>
                          </v-radio-group>
                          <!-- radio group if logged in user -->
                          <v-radio-group 
                            v-if="user == member.employee_id"
                            :value="tec_report_data ? tec_approval[key] : row[key]"
                            row  
                            :rules="[rules.required]"
                            :readonly="tec_report_data && tec_report_data.status == 'saved' && filled"
                            @change="tecApproval($event, key)"
                          >
                            <v-radio label="Agree" value="agree"></v-radio>
                            <v-radio label="Disagree" value="disagree"></v-radio>
                          </v-radio-group>

                          <v-text-field
                              v-if="user != member.employee_id"
                              :value="tec_remarks[key]"
                              label="Remarks"
                              outlined
                              @input="tecRecommendation(key)"
                              disabled
                          ></v-text-field>
                          <v-text-field
                              v-else
                              :value="tec_report_data ? tec_remarks[key] : tecTeamRemarks[key]"
                              label="Remarks"
                              outlined
                              :rules="[rules.required]"
                              :readonly="tec_report_data && tec_report_data.status == 'saved' && filled"
                              @input="tecRecommendation($event, key)"
                          ></v-text-field>
                        </div>
                      </template>
                    </v-col>
                  </v-row>
                  <v-row no gutters>
                    <v-btn v-if="! filled" large class="mx-2" small color="success" @click="save">
                        SAVE
                    </v-btn>
                  </v-row>
                  <v-divider class="mt-1"></v-divider>
                  <br/>
                  <v-row no-gutters>
                    <v-btn color="primary" @click="prevStep" rounded>
                      Back
                    </v-btn>
                  </v-row>
              </v-stepper-content>
            </v-stepper>
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
    rejected: [],
    recommended: [],
    reason_for_rejecting: [],
    reason_for_recommending: [],
    rejectReasons: [],
    recommendReasons: [],
    tecTeamRemarks: [],
    row: [],
    tec_recommendation:[],
    rules: {required: value => !!value || 'Required.'},
    stepperStep: 1
  }),

  // Custom Methods and Functions
  methods: {

    nextStep() {
      var valid = this.$refs.form1.validate()
      if(this.stepperStep == 4) {
        if(valid){
          this.stepperStep = this.stepperStep + 1
        }
      }
      else{
          this.stepperStep = this.stepperStep + 1
      }
    },

    prevStep() {
      this.stepperStep = this.stepperStep - 1
    },

    getReasonForRejecting(val, key) {
      this.rejectReasons[key] = val
      this.reason_for_rejecting[key] = {bid_id: this.rejected_bids[key].bid_id, name: this.rejected_bids[key].name, reason: this.rejectReasons[key]}
      console.log('onchange reject',this.reason_for_rejecting)
    },

    getReasonForRecommending(val, key) {
      this.recommendReasons[key] = val
      this.reason_for_recommending[key] = {bid_id: this.recommended_bids[key].bid_id, name: this.recommended_bids[key].name, reason: this.recommendReasons[key]}
      console.log('on change recommend', this.reason_for_recommending)
    },

    tecRecommendation(val, key) {
      this.tecTeamRemarks[key] = val
      this.tec_recommendation[key] = {emp_id: this.tec_team[key].employee_id, emp_name: this.tec_team[key].employee_name, decision: this.row[key], remarks: this.tecTeamRemarks[key]}
      console.log('on change tec recommendation', this.tec_recommendation)
    },

    tecApproval(val, key) {
      this.row[key] = val
      this.tec_recommendation[key] = {emp_id: this.tec_team[key].employee_id, emp_name: this.tec_team[key].employee_name, decision: this.row[key], remarks: this.tecTeamRemarks[key]}
      console.log('on change tec approval', this.row)
    },

    save() {
      var valid = this.$refs.form.validate()
      if(valid) {
        console.log('valid')
        if(this.tec_report_data && this.tec_report_data.status == 'saved'){
          //update
          var complete = true
          this.tec_team.forEach((item, key) => {
            console.log(key, item)
            if(!this.tec_recommendation[key]) {
              this.tec_recommendation[key] = {emp_id: this.tec_team[key].employee_id, emp_name: this.tec_team[key].employee_name, decision: this.tec_approval[key], remarks: this.tec_remarks[key]} 
            }
          })
          this.tec_team.forEach((item, key) => {
            if(!this.tec_recommendation[key].decision){
              complete = false
            }
          })
          console.log('update tec report', this.tec_recommendation,complete)
          this.$http.post('/api/tec_team/update_tec_report', {
                tecRecommendation: JSON.stringify(this.tec_recommendation),
                procurementId: this.procurement.procurement_id,
                complete: complete
            })
            .then(response => {
                console.log(response);
                this.people = response.data;
                this.$router.go()
            })
            .catch(err => {
                console.log(err);
            })
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
                this.$router.go()
            })
            .catch(err => {
                console.log(err);
            })
        }
        // this.closeTecReport()
        // this.$router.go()
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
        if(this.tec_report_data) {
          //rejected_fetched
          bids = this.bid_data.filter(bid => {
            console.log('rejected',this.rejected)
            return this.rejected_fetched.includes(bid.bid_id)
          })
        }
        else{
          bids = this.bid_data.filter(bid => {
            console.log('rejected',this.rejected)
            return this.rejected.includes(bid.bid_id)
          })
        }
        console.log('rejected bids', bids)
        return bids
    },

    // get responsive bids - !rejected_bids
    responsive_bids () {
      var bids = []
      if(this.tec_report_data) {
        //
        bids = this.bid_data.filter(bid => {
          console.log('rejected',this.rejected)
          return !this.rejected_fetched.includes(bid.bid_id)
        })
      }
      else {
        bids = this.bid_data.filter(bid => {
          console.log(this.rejected)
          return !this.rejected.includes(bid.bid_id)
        })
      }
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
      if(this.tec_report_data) {
        //
        bids = this.bid_data.filter(bid => {
          console.log(this.recommended)
          return this.recommended_fetched.includes(bid.bid_id)
        })
      }
      else {
        bids = this.bid_data.filter(bid => {
          console.log(this.recommended)
          return this.recommended.includes(bid.bid_id)
        })
      }
      console.log('recommended bids', bids)
      return bids
    },

  //radio buttons
    tec_approval () {
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
        console.log('tec_approval', arr)
        return arr
      }
      else{
        return []
      }
    },

    tec_remarks () {
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
    rejected_reasons () {
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
    rejected_fetched () {
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

    recommended_fetched () {
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

    recommended_reasons () {
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

    filled () {
      var userHasFilled = false
      if(this.tec_report_data){
        this.tec_report_data.tec_recommendation.forEach(item => {
          if(item && item.emp_id == this.user && item.decision){
            userHasFilled = true
          }
        })
      }
      return userHasFilled
    }
  }

}
</script>