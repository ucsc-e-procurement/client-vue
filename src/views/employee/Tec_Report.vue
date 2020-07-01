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
                                <th class="text-h5 text-left" width="300px">Item</th>
                                <th class="text-h5 text-left" width="250px">Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="product in requisition.products" :key="product.product_id">
                                <td class="text-h6">{{ product.product_name }}</td>
                                <td class="text-h6">{{ product.qty }}</td>
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
                        <th class="text-h5 text-left" width="500px">Name</th>
                        <th class="text-h5 text-left" width="250px">Designation</th>
                        <th class="text-h5 text-left" width="250px">Capacity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in tec_team" :key="item.name">
                        <td class="text-h6">{{ item.employee_name }}</td>
                        <td class="text-h6">{{ item.designation }}</td>
                        <td class="text-h6">{{ item.capacity }}</td>
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
                            Item : {{product[0].product_name}}
                        </div>
                        <v-simple-table>
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-h5 text-left" width="300px">Supplier</th>
                                <th class="text-h5 text-left" width="250px">Quantity</th>
                                <th class="text-h5 text-left" width="250px">Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="bid in product" :key="bid.supplier_id">
                                <td class="text-h6">{{ bid.supplier_name }}</td>
                                <td class="text-h6">{{ bid.qty }}</td>
                                <td class="text-h6">{{ bid.price }}</td>
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
            <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">Deputy Bursar Recommendation</h5>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12">
                <v-text-field
                    value="Remarks"
                    label="Deputy Bursar Remarks"
                    outlined
                    readonly
                ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                <v-text-field
                    value="Recommended"
                    label="Deputy Bursar Recommendation"
                    outlined
                    readonly
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
                    :value="requisition.requisition_id"
                    label="Derector Remarks"
                    outlined
                    readonly
                ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                <v-text-field
                    value="Approved"
                    label="Derector Approval"
                    outlined
                    readonly
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

  props: ['procurement', 'requisition_id', 'tec_team_id'],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    //requisitionId: this.requisitionId,
    requisition: null,
    tec_team: null,
    items: [{product_name:'prod 1', qty: '5'}],
    team: [{name: 'name1', designation: 'designation 1', capasity: 'chairman'}, {name: 'name2', designation: 'designation 2', capasity: 'member'}]
  }),

  // Custom Methods and Functions
  methods: {
      fetchRequisition(requisition_id) {
      this.$http.get('/api/tec_team/get_requisition', {
        params: {
          id: requisition_id
        }
      })
      .then(response => {
        console.log(response.data);
        this.requisition = response.data[0]
        this.requisition.products = JSON.parse(this.requisition.products)
        console.log(this.requisition)
        //console.log(Object.values(this.ongoingProcurements[0].bids))
      })
      .catch(error => {
        console.log(error);
      });
    },

    fetchTecTeam(tec_team_id) {
      this.$http.get('/api/tec_team/get_tec_team', {
        params: {
          id: tec_team_id
        }
      })
      .then(response => {
        console.log(response.data);
        this.tec_team = response.data[0]
        this.tec_team = JSON.parse(this.tec_team.team)
        console.log(this.tec_team)
        //console.log(Object.values(this.ongoingProcurements[0].bids))
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
      this.fetchRequisition(this.requisition_id)
      this.fetchTecTeam(this.tec_team_id)
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  // Computed Properties
  computed: {}
}
</script>