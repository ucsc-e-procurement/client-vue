<template>
  <v-card
    v-if="this.requisition && this.procurement && this.bid_data"
    class="mx-auto"
    max-width="1500"
  >
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
          <v-col class="justify-center">
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
                    <tr
                      v-for="product in requisition.products"
                      :key="product.product_id"
                    >
                      <td>{{ product.product_name }}</td>
                      <td>{{ product.qty }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>
        </v-row>
        <br />
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
                      <th class="text-h6 text-left" width="250px">
                        Designation
                      </th>
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
        <br />
        <v-divider class="mt-1"></v-divider>
        <v-row no-gutters>
          <h5 class="headline pt-5 pb-5">Bids Recieved Before Closing Time</h5>
        </v-row>
        <v-row>
          <v-col class="justify-center">
            <template v-for="(product, key) in bid_data">
              <div :key="key">
                <v-card flat>
                  <div class="text-h6">
                    Item {{ key + 1 }} - {{ product.product_name }}
                  </div>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-h6 text-left" width="300px">
                            Supplier
                          </th>
                          <th class="text-h6 text-left" width="250px">
                            Quantity
                          </th>
                          <th class="text-h6 text-left" width="250px">
                            Unit Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="bid in product.bids" :key="bid.supplier_id">
                          <td>{{ bid.supplier_name }}</td>
                          <td>{{ bid.qty }}</td>
                          <td>{{ bid.unit_price }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card>
                <br />
              </div>
            </template>
          </v-col>
        </v-row>
        <br />
        <v-divider class="mt-1"></v-divider>
        <v-row no-gutters>
          <h5 class="headline pt-5 pb-5">TEC Meeting Minutes</h5>
        </v-row>
        <v-divider class="mt-1"></v-divider>
        <v-row no-gutters>
          <h5 class="headline pt-5 pb-5">Bid Evaluation</h5>
        </v-row>
        <v-divider class="mt-1"></v-divider>
        <v-col class="justify-center">
          <template v-for="(product, key) in bid_data">
            <div :key="key">
              <div class="text-h6">
                Item {{ key + 1 }} - {{ product.product_name }}
              </div>
              <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">Rejected Bids</h5>
              </v-row>
              <v-row v-if="!tec_report_data">
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
                  <template v-for="(bid, key1) in rejected_bids[key]">
                    <div :key="key1">
                      {{ bid.supplier_name }}
                      <v-text-field
                        :value="
                          tec_report_data
                            ? rejected_reasons[key][key1]
                            : rejectReasons[key * maxBids + key1]
                        "
                        label="Reason for rejecting supplier"
                        outlined
                        :rules="[rules.required]"
                        :readonly="
                          tec_report_data && tec_report_data.status == 'saved'
                        "
                        @input="getReasonForRejecting($event, key, key1)"
                      ></v-text-field>
                    </div>
                  </template>
                  <v-card>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-h6 text-left" width="500px">
                              Supplier
                            </th>
                            <th class="text-h6 text-left" width="250px">
                              Unit Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in rejected_bids[key]"
                            :key="item.name"
                          >
                            <td>{{ item.supplier_name }}</td>
                            <td>{{ item.unit_price }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">
                  Evaluated Substantially Responsive Bidders
                </h5>
              </v-row>
              <v-row>
                <v-col>
                  <v-card>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-h6 text-left" width="500px">
                              Supplier
                            </th>
                            <th class="text-h6 text-left" width="250px">
                              Unit Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in responsive_bids[key]"
                            :key="item.name"
                          >
                            <td>{{ item.supplier_name }}</td>
                            <td>{{ item.unit_price }}</td>
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
                    :items="responsive_bid_selection[key]"
                    label="Select suppliers to recommend their bid"
                    v-model="recommended[key]"
                    outlined
                    required
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <template v-for="(bid, key1) in recommended_bids[key]">
                    <div :key="key1">
                      {{ bid.supplier_name }}
                      <v-text-field
                        :value="
                          tec_report_data
                            ? recommended_reasons[key][key1]
                            : recommendReasons[key * maxBids + key1]
                        "
                        label="Reason for recommending supplier"
                        outlined
                        :rules="[rules.required]"
                        :readonly="
                          tec_report_data && tec_report_data.status == 'saved'
                        "
                        @input="getReasonForRecommending($event, key, key1)"
                      ></v-text-field>
                    </div>
                  </template>
                  <v-card>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-h6 text-left" width="500px">
                              Supplier
                            </th>
                            <th class="text-h6 text-left" width="500px">
                              Address
                            </th>
                            <th class="text-h6 text-left" width="250px">
                              Unit Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in recommended_bids[key]"
                            :key="item.name"
                          >
                            <td>{{ item.supplier_name }}</td>
                            <td>{{ item.supplier_address }}</td>
                            <td>{{ item.unit_price }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card>
                </v-col>
              </v-row>
              <v-divider class="mt-1"></v-divider>
              <br />
            </div>
          </template>
        </v-col>
        <v-divider class="mt-1"></v-divider>
        <v-row no-gutters>
          <h5 class="headline pt-5 pb-5">TEC Team Recommendation</h5>
        </v-row>
        <v-row>
          <v-col>
            <template v-for="(member, key) in this.tec_team">
              <div :key="key">
                {{ member.employee_name }} - {{ member.capacity }}
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
                  :readonly="
                    tec_report_data &&
                      tec_report_data.status == 'saved' &&
                      filled
                  "
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
                  :value="
                    tec_report_data ? tec_remarks[key] : tecTeamRemarks[key]
                  "
                  label="Remarks"
                  outlined
                  :rules="[rules.required]"
                  :readonly="
                    tec_report_data &&
                      tec_report_data.status == 'saved' &&
                      filled
                  "
                  @input="tecRecommendation($event, key)"
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
        <v-btn
          v-if="!filled"
          large
          class="mx-2"
          small
          color="success"
          @click="save"
        >
          SAVE
        </v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
export default {
  // Form Validations
  // validations: {},
  // Props Received
  name: "Tec_Report",

  props: [
    "procurement",
    "bid_data",
    "requisition",
    "tec_team",
    "closeTecReport",
    "tec_report_data"
  ],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    //procurement: this.procurement,
    //requisition: this.requisition,
    //tec_team: this.tec_team,
    user: "emp00005",
    //user: this.$store.getters.user.employee_id,
    items: [{ product_name: "prod 1", qty: "5" }],
    team: [
      { name: "name1", designation: "designation 1", capasity: "chairman" },
      { name: "name2", designation: "designation 2", capasity: "member" }
    ],
    rejected: [],
    recommended: [],
    reason_for_rejecting: [],
    reason_for_recommending: [],
    rejectReasons: [],
    recommendReasons: [],
    tecTeamRemarks: [],
    row: [],
    tec_recommendation: [],
    rules: { required: value => !!value || "Required." }
  }),

  // Custom Methods and Functions
  methods: {
    getReasonForRejecting(val, key, key1) {
      var itemwiseReject = [];
      console.log(val, key, key1, this.maxBids);
      this.rejectReasons[key * this.maxBids + key1] = val;
      if (this.reason_for_rejecting[key]) {
        this.reason_for_rejecting[key][key1] = {
          bid_id: this.rejected_bids[key][key1].bid_id,
          name: this.rejected_bids[key][key1].supplier_name,
          reason: this.rejectReasons[key * this.maxBids + key1]
        };
      } else {
        itemwiseReject[key1] = {
          bid_id: this.rejected_bids[key][key1].bid_id,
          name: this.rejected_bids[key][key1].supplier_name,
          reason: this.rejectReasons[key * this.maxBids + key1]
        };
        this.reason_for_rejecting[key] = itemwiseReject;
      }
      console.log("onchange reject", this.reason_for_rejecting);
    },

    getReasonForRecommending(val, key, key1) {
      var itemwiseRecommend = [];
      this.recommendReasons[key * this.maxBids + key1] = val;
      if (this.reason_for_recommending[key]) {
        this.reason_for_recommending[key][key1] = {
          bid_id: this.recommended_bids[key][key1].bid_id,
          name: this.recommended_bids[key][key1].supplier_name,
          reason: this.recommendReasons[key * this.maxBids + key1]
        };
      } else {
        itemwiseRecommend[key1] = {
          bid_id: this.recommended_bids[key][key1].bid_id,
          name: this.recommended_bids[key][key1].supplier_name,
          reason: this.recommendReasons[key * this.maxBids + key1]
        };
        this.reason_for_recommending[key] = itemwiseRecommend;
      }
      console.log("on change recommend", this.reason_for_recommending);
    },

    tecRecommendation(val, key) {
      this.tecTeamRemarks[key] = val;
      this.tec_recommendation[key] = {
        emp_id: this.tec_team[key].employee_id,
        emp_name: this.tec_team[key].employee_name,
        decision: this.row[key],
        remarks: this.tecTeamRemarks[key]
      };
      console.log("on change tec recommendation", this.tec_recommendation);
    },

    tecApproval(val, key) {
      this.row[key] = val;
      this.tec_recommendation[key] = {
        emp_id: this.tec_team[key].employee_id,
        emp_name: this.tec_team[key].employee_name,
        decision: this.row[key],
        remarks: this.tecTeamRemarks[key]
      };
      console.log("on change tec approval", this.row);
    },

    save() {
      var valid = this.$refs.form.validate();
      if (valid) {
        console.log("valid");
        if (this.tec_report_data && this.tec_report_data.status == "saved") {
          //update
          this.tec_team.forEach((item, key) => {
            console.log(key, item);
            if (!this.tec_recommendation[key]) {
              this.tec_recommendation[key] = {
                emp_id: this.tec_team[key].employee_id,
                emp_name: this.tec_team[key].employee_name,
                decision: this.tec_approval[key],
                remarks: this.tec_remarks[key]
              };
            }
          });
          console.log("update tec report");
          this.$http
            .post("/api/tec_team/update_tec_report", {
              tecRecommendation: JSON.stringify(this.tec_recommendation),
              procurementId: this.procurement.procurement_id
            })
            .then(response => {
              console.log(response);
              this.people = response.data;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$http
            .post("/api/tec_team/save_tec_report", {
              rejectedbids: this.rejected,
              reasonsForRejecting: JSON.stringify(this.reason_for_rejecting),
              recommendedbids: this.recommended,
              reasonForRecommending: JSON.stringify(
                this.reason_for_recommending
              ),
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
            });
        }
        this.closeTecReport();
      }
      console.log(
        "Save",
        this.rejected,
        this.reason_for_rejecting,
        this.recommended,
        this.reason_for_recommending,
        this.tec_recommendation
      );
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
    maxBids() {
      var len = this.bids.length;
      var max = 0;
      for (let i = 0; i < len; i++) {
        if (this.bids[i].length > max) {
          max = this.bids[i].length;
        }
      }
      console.log("max bids", max);
      return max;
    },

    //get bid_id and supplier_name for each bid - item-wise
    bids() {
      var len = this.bid_data.length;
      var bids = [];
      for (let i = 0; i < len; i++) {
        var suppliers = [];
        this.bid_data[i].bids.forEach(bid => {
          if (
            !this.recommended[i] ||
            !this.recommended[i].includes(bid.bid_id)
          ) {
            suppliers.push({
              bid_id: bid.bid_id,
              supplier_name: bid.supplier_name
            });
          }
        });
        console.log("supp", suppliers);
        bids[i] = suppliers;
      }
      console.log("bids", bids);
      return bids;
    },

    //get the rejected bids - item-wise
    rejected_bids() {
      var len = this.bid_data.length;
      var bids = [];
      if (this.tec_report_data) {
        //rejected_fetched
        console.log("rejected_bids_tec_report_data", len);
        for (let i = 0; i < len; i++) {
          var suppliers = [];
          if (this.rejected_fetched[i]) {
            suppliers = this.bid_data[i].bids.filter(bid => {
              return this.rejected_fetched[i].includes(bid.bid_id);
            });
            console.log("sup", suppliers);
            bids[i] = suppliers;
          }
        }
        return bids;
      } else {
        for (let i = 0; i < len; i++) {
          var suppliers = [];
          if (this.rejected[i]) {
            suppliers = this.bid_data[i].bids.filter(bid => {
              return this.rejected[i].includes(bid.bid_id);
            });
            console.log("supppp", suppliers);
            bids[i] = suppliers;
          }
        }
        console.log("rejected bids123", bids);
        return bids;
      }
    },

    //get responsive bids - !rejected_bids
    responsive_bids() {
      var bids = [];
      var len = this.bid_data.length;
      if (this.tec_report_data) {
        //rejected_fetched
        console.log("rejected_bids_tec_report_data", len);
        for (let i = 0; i < len; i++) {
          var suppliers = [];
          if (this.rejected_fetched[i]) {
            suppliers = this.bid_data[i].bids.filter(bid => {
              return !this.rejected_fetched[i].includes(bid.bid_id);
            });
            console.log("sup", suppliers);
            bids[i] = suppliers;
          } else {
            bids[i] = this.bid_data[i].bids;
          }
        }
        console.log("responsive bids", bids);
        return bids;
      } else {
        for (let i = 0; i < len; i++) {
          var suppliers = [];
          if (this.rejected[i]) {
            suppliers = this.bid_data[i].bids.filter(bid => {
              return !this.rejected[i].includes(bid.bid_id);
            });
            bids[i] = suppliers;
          } else {
            bids[i] = this.bid_data[i].bids;
          }
        }
        console.log("responsive bids", bids);
        return bids;
      }
    },

    //item-wise
    responsive_bid_selection() {
      var bids = [];
      var len = this.bid_data.length;
      for (let i = 0; i < len; i++) {
        var suppliers = [];
        this.responsive_bids[i].forEach(bid => {
          suppliers.push({
            bid_id: bid.bid_id,
            supplier_name: bid.supplier_name
          });
        });
        bids[i] = suppliers;
      }
      console.log("bids", bids);
      return bids;
    },

    //item-wise
    recommended_bids() {
      var bids = [];
      var len = this.bid_data.length;
      if (this.tec_report_data) {
        //rejected_fetched
        console.log("rejected_bids_tec_report_data", len);
        for (let i = 0; i < len; i++) {
          var suppliers = [];
          if (this.recommended_fetched[i]) {
            suppliers = this.bid_data[i].bids.filter(bid => {
              return this.recommended_fetched[i].includes(bid.bid_id);
            });
            console.log("sup", suppliers);
            bids[i] = suppliers;
          }
        }
        return bids;
      } else {
        for (let i = 0; i < len; i++) {
          var suppliers = [];
          if (this.recommended[i]) {
            suppliers = this.bid_data[i].bids.filter(bid => {
              return this.recommended[i].includes(bid.bid_id);
            });
          }
          bids[i] = suppliers;
        }
        console.log("recommended bids", bids);
        return bids;
      }
    },

    // if tec report was saved
    //-------------------------------------------------//
    tec_approval() {
      if (this.tec_report_data) {
        var arr = [];
        console.log("heeee", this.tec_report_data);
        this.tec_report_data.tec_recommendation.forEach(item => {
          if (item) {
            arr.push(item.decision);
          } else {
            arr.push("");
          }
        });
        console.log("tec_approval", arr);
        return arr;
      } else {
        return [];
      }
    },

    tec_remarks() {
      if (this.tec_report_data) {
        var arr = [];
        console.log("heeee", this.tec_report_data);
        this.tec_report_data.tec_recommendation.forEach(item => {
          if (item) {
            arr.push(item.remarks);
          } else {
            arr.push("");
          }
        });
        console.log("remarks", arr);
        return arr;
      } else {
        return [];
      }
    },

    //values for text fields
    rejected_reasons() {
      var len = this.bid_data.length;
      var arr = [];
      if (this.tec_report_data) {
        for (let i = 0; i < len; i++) {
          var reasons = [];
          console.log("heeee", this.tec_report_data);
          if (this.tec_report_data.rejected_bids[i]) {
            console.log(this.tec_report_data.rejected_bids[i]);
            this.tec_report_data.rejected_bids[i].forEach(item => {
              if (item) {
                reasons.push(item.reason);
              } else {
                reasons.push("");
              }
            });
            arr[i] = reasons;
          }
        }
        console.log("reject reasons", arr);
        return arr;
      } else {
        return [];
      }
    },

    //values for rejected array
    rejected_fetched() {
      var len = this.bid_data.length;
      var arr = [];
      if (this.tec_report_data) {
        //rejected_fetched
        for (let i = 0; i < len; i++) {
          var bids = [];
          console.log(
            "tec report rejected",
            this.tec_report_data.rejected_bids
          );
          if (this.tec_report_data.rejected_bids[i]) {
            this.tec_report_data.rejected_bids[i].forEach(item => {
              if (item) {
                bids.push(item.bid_id);
              } else {
                bids.push("");
              }
            });
            console.log("rej bids i", bids);
            arr[i] = bids;
          }
        }
        console.log("rejected_fetched", arr);
        return arr;
      } else {
        return [];
      }
    },

    recommended_fetched() {
      var len = this.bid_data.length;
      var arr = [];
      if (this.tec_report_data) {
        console.log("heeee", this.tec_report_data);
        for (let i = 0; i < len; i++) {
          var bids = [];
          if (this.tec_report_data.recommended_bids[i]) {
            this.tec_report_data.recommended_bids[i].forEach(item => {
              if (item) {
                bids.push(item.bid_id);
              } else {
                bids.push("");
              }
            });
            arr[i] = bids;
          }
        }
        console.log("recommended", arr);
        return arr;
      } else {
        return [];
      }
    },

    recommended_reasons() {
      var len = this.bid_data.length;
      var arr = [];
      if (this.tec_report_data) {
        for (let i = 0; i < len; i++) {
          var reasons = [];
          console.log("heeee", this.tec_report_data);
          if (this.tec_report_data.recommended_bids[i]) {
            console.log(this.tec_report_data.recommended_bids[i]);
            this.tec_report_data.recommended_bids[i].forEach(item => {
              if (item) {
                reasons.push(item.reason);
              } else {
                reasons.push("");
              }
            });
            arr[i] = reasons;
          }
        }
        console.log("reject reasons", arr);
        return arr;
      } else {
        return [];
      }
    },

    filled() {
      var userHasFilled = false;
      if (this.tec_report_data) {
        this.tec_report_data.tec_recommendation.forEach(item => {
          if (item && item.emp_id == this.user && item.decision) {
            userHasFilled = true;
          }
        });
      }
      return userHasFilled;
    }
  }
};
</script>
