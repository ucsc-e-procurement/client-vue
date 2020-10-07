<template>
  <v-card class="mx-auto" max-width="1500">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            :value="
              new Date(this.rfq.date).getDate() +
                ' - ' +
                new Date(this.rfq.date).getMonth() +
                ' - ' +
                new Date(this.rfq.date).getFullYear()
            "
            label="Date Initialized"
            outlined
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            :value="
              new Date(this.rfq.deadline).getDate() +
                ' - ' +
                new Date(this.rfq.deadline).getMonth() +
                ' - ' +
                new Date(this.rfq.deadline).getFullYear()
            "
            label="Deadline"
            outlined
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-data-table
            :headers="headers"
            :items="this.rfqData"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  // Form Validations
  // validations: {},

  // Props Received
  name: "Rfq",
  props: ["rfqData"],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    // reqId: this.requisitionId,
    rfq: "",
    products: "",
    isMounted: false,
    headers: [
      {
        text: "Supplier",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Category", value: "category" },
      { text: "Status", value: "status" }
    ]
  }),

  // Custom Methods and Functions
  methods: {},

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.rfq = this.rfqData[0];
  },
  beforeMount() {},
  mounted() {
    //   console.log('mont', this.requisitionId)
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},

  // Computed Properties
  computed: {}
};
</script>
