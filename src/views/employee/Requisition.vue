<template>
    <v-card  v-if="this.requisition" class="mx-auto" max-width=1500>
        <v-container> 
        <v-form>    
            <v-row>
                <v-col cols="12" sm="6">
                <v-text-field
                    :value="this.requisition.requisition_id"
                    label="Requisition ID"
                    outlined
                    readonly
                ></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6">
                <v-text-field
                    :value="this.requisition.name"
                    label="Requester"
                    outlined
                    readonly
                ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                <v-text-field
                    :value="this.requisition.department"
                    label="Department"
                    outlined
                    readonly
                ></v-text-field>
                </v-col> -->
                <v-col cols="12" sm="6">
                <v-text-field
                    :value="new Date(this.requisition.date).getDate() + ' - ' + new Date(this.requisition.date).getMonth() + ' - ' + new Date(this.requisition.date).getFullYear()"
                    label="Date Requested"
                    outlined
                    readonly
                ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                <v-text-field
                    :value="this.requisition.description"
                    label="Product Description"
                    outlined
                    readonly
                ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                    <v-data-table
                        :headers="headers"
                        :items="requisition.products"
                        :items-per-page="5"
                        class="elevation-1"
                    ></v-data-table>
                </v-col>
                
            </v-row>
            <v-divider class="mt-1"></v-divider>
            <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">Deputy Bursar Recommendation</h5>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12">
                <v-text-field
                    :value="this.requisition.deputy_bursar_remarks"
                    label="Deputy Bursar Remarks"
                    outlined
                    readonly
                ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                <v-text-field
                    :value="this.requisition.deputy_bursar_recommendation"
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
                    :value="this.requisition.director_remarks"
                    label="Director Remarks"
                    outlined
                    readonly
                ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                <v-text-field
                    :value="this.requisition.director_recommendation"
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
  name: 'Requisition',
  props: ['requisition'],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    // reqId: this.requisitionId,
    headers: [
        {
        text: 'Product Name',
        align: 'start',
        sortable: false,
        value: 'product_name',
        },
        { text: 'Description', value: 'prod_desc' },
        { text: 'Quantity', value: 'qty' },
    ],
  }),

  // Custom Methods and Functions
  methods: {

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
}
</script>