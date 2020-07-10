<template>
    <v-card class="mx-auto" max-width=1500>
        <v-container> 
            <h3>RFQ</h3>
            <v-col cols="12" sm="6">
                <v-text-field
                    value="Hahah"
                    label="Requisition ID"
                    outlined
                    readonly
                ></v-text-field>
                </v-col>
        </v-container>
    </v-card>
</template>

<script>
export default {
    // Form Validations
  // validations: {},

  // Props Received
  name: 'Rfq',
  props: ['procurementId'],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    // reqId: this.requisitionId,
    requisition: [],
    products: '',
    headers: [
        {
        text: 'Product Name',
        align: 'start',
        sortable: false,
        value: 'product_name',
        },
        { text: 'Description', value: 'prod_desc' },
        { text: 'Quantity', value: 'prod_qty' },
    ],
  }),

  // Custom Methods and Functions
  methods: {

  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {

  },
  beforeMount() {
  },
  mounted() {
    //   console.log('mont', this.requisitionId)
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},

  // Computed Properties
  computed: {}
}
</script>