<template>
    <v-card class="mx-auto" max-width=1500>
        <v-container> 
        <v-form>    
            <v-row>
                <v-col cols="12" sm="6">
                <v-text-field
                    value="UCSC/NCB/W/ENG/2020/0004"
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
                    :value="requisitionId"
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
  name: 'Requisition',
  props: ['requisitionId'],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    requisitionId: this.requisitionId,
    requisition: [],
  }),

  // Custom Methods and Functions
  methods: {
      getRequisitions(requisitionId){
      this.$http
        .get(`/api/director/requisitions/${requisitionId.replace(/[/]/g, '')}?reqId=${requisitionId}`)
        .then(response => {
          console.log(response);
          this.requisition = response.data
        })
        .catch(err => {
          console.log(err);
        })
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
      this.getRequisitions(this.requisitionId)
  },
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