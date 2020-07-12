<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-container>
          <v-row no-gutters>
            <h5 class="headline">Price Schedule</h5>
          </v-row>
          <v-divider class="mt-1"></v-divider>

          <v-row no-gutters class="my-2">
            <h4>UNIVERSITY OF COLOMBO SCHOOL OF COMPUTING</h4>
          </v-row>
          <v-row no-gutters>
            <h5>Tender Number : {{ this.procurement.procurement_id }}</h5>
          </v-row>
          <v-row no-gutters>
            <h5> Closing Date & Time : {{ this.procurement.deadline }}</h5>
          </v-row>

          <v-card class="my-2 py-2 px-1" id="schedule">
            <table class="mt-4">
              <thead>
                <tr>
                  <th rowspan="2">#</th>
                  <th scope="col" rowspan="2" class="border-bottom-2">
                    Description of Materials/Services required
                  </th>
                  <th width="5%" scope="col" rowspan="2">Qty</th>
                  <th width="20%" scope="col" colspan="2">Unit Price (Rs.)</th>
                  <th width="10%" scope="col" rowspan="2">
                    Make/Model & Trademark
                  </th>
                  <th width="10%" scope="col" rowspan="2">
                    Date by which delivery can be completed
                  </th>
                  <th width="5%" scope="col" rowspan="2">
                    Quotation validity period
                  </th>
                  <th width="10%" scope="col" rowspan="2">
                    Period for which credit facilities offered
                  </th>
                  <th width="10%" rowspan="2">Action</th>
                </tr>
                <tr>
                  <th width="10%">In figures(without VAT)</th>
                  <th width="10%">VAT</th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr v-for="(item, index) in items" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td style="max-width: 30px">
                    <span v-if="editIndex !== index">{{
                      item.description
                    }}</span>
                    <span v-if="editIndex === index">
                      <v-text-field v-model="item.description" disabled />
                    </span>
                  </td>
                  <td>
                    <span v-if="editIndex !== index">{{ item.qty }}</span>
                    <span v-if="editIndex === index">
                      <v-text-field
                        type="number"
                        min="0"
                        oninput="validity.valid||(value='')"
                        v-model.number="item.qty"
                      />
                    </span>
                  </td>
                  <td>
                    <span v-if="editIndex !== index">{{ item.figures }}</span>
                    <span v-if="editIndex === index">
                      <v-text-field
                        type="number"
                        step=".01"
                        min="0"
                        oninput="validity.valid||(value='')"
                        v-model.number="item.figures"
                      />
                    </span>
                  </td>
                  <td>
                    <span v-if="editIndex !== index">{{ item.vat }}</span>
                    <span v-if="editIndex === index">
                      <v-text-field
                        type="number"
                        step=".01"
                        min="0"
                        oninput="validity.valid||(value='')"
                        v-model.number="item.vat"
                      />
                    </span>
                  </td>
                  <td>
                    <span v-if="editIndex !== index">{{ item.make }}</span>
                    <span v-if="editIndex === index">
                      <v-text-field v-model="item.make" />
                    </span>
                  </td>
                  <td>
                    <span v-if="editIndex !== index">{{ item.date }}</span>
                    <span v-if="editIndex === index">
                      <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="item.date"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="item.date"
                          @input="menu = false"
                        ></v-date-picker>
                      </v-menu>
                    </span>
                  </td>
                  <td>
                    <span v-if="editIndex !== index">{{ item.validity }}</span>
                    <span v-if="editIndex === index">
                      <v-text-field
                        type="number"
                        min="0"
                        oninput="validity.valid||(value='')"
                        v-model.number="item.validity"
                      />
                    </span>
                  </td>
                  <td>
                    <span v-if="editIndex !== index">{{ item.credit }}</span>
                    <span v-if="editIndex === index">
                      <v-text-field
                        type="number"
                        min="0"
                        oninput="validity.valid||(value='')"
                        v-model.number="item.credit"
                      />
                    </span>
                  </td>
                  <td class="py-2">
                    <span v-if="editIndex !== index">
                      <v-icon @click="edit(item, index)" class="mx-1"
                        >mdi-pencil</v-icon
                      >
                    </span>
                    <span v-else>
                      <v-icon @click="cancel(item)" class="mx-1"
                        >mdi-close</v-icon
                      >
                      <v-icon @click="save(item)" class="mx-1"
                        >mdi-check</v-icon
                      >
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-card>

          <v-row no-gutters class="my-2 mt-4">
            <v-col cols="12" sm="6">
              <v-card class="px-3 py-3">
                <v-text-field
                  :value="this.subTotal | money"
                  label="Grand Total without VAT (Rs.)"
                  readonly
                ></v-text-field>
                <v-text-field
                  class="mt-4"
                  :value="this.total | money"
                  label="Grand Total with VAT (Rs.)"
                  readonly
                ></v-text-field>
              </v-card>
            </v-col>

            <v-col cols="12" sm="5" class="ml-6">
              <v-form @submit.prevent="registerUser" ref="form" v-model="valid">
                <v-text-field
                  v-model="vatNo"
                  label="Vat Registration No."
                  placeholder="Enter Vat Registration Number"
                  outlined
                  dense
                  :rules="[rules.vat]"
                />
                <v-text-field
                  v-model="authorizedName"
                  label="Authorized Person"
                  placeholder="Name of authorized person"
                  outlined
                  dense
                  :rules="[rules.authorized]"
                />
              </v-form>
            </v-col>
          </v-row>

          <v-btn class="primary" v-show="!editIndex" @click="add"
            >Add Signature</v-btn
          >

          <v-row class="mt-4" no-gutters>
            <v-btn class="mr-2 secondary">Cancel</v-btn>
            <v-btn class="success" @click="submitBid">Review & Submit</v-btn>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  // Props Received
  props: ['procurement'],

  // Imported Components
  components: {},

  filters: {
    money: value =>
      new Intl.NumberFormat("sl-SL", {
        style: "currency",
        currency: "LKR"
      }).format(value)
  },

  // Data Variables and Values
  data: () => ({
    valid: true,
    vatNo: "",
    authorizedName: "",
    editIndex: null,
    originalData: null,
    rules: {
      vat: v => !!v || "Vat Registration No. is required",
      authorized: v => !!v || "There should be an authorized person"
    },
    items: [],
    menu: false
  }),

  // Custom Methods and Functions
  methods: {
    createTable() {
      let products = JSON.parse(this.procurement.products);
        this.originalData = null;
        for (const index in products) {
          this.items.push({
            prod_id: products[index]['product_id'],
            description: products[index]['product_name'],
            qty: products[index]['qty'],
            figures: 0,
            vat: 0,
            make: "-",
            date: new Date().toISOString().substr(0, 10),
            validity: 0,
            credit: 0
          });
        }
    },

    edit(item, index) {
      this.originalData = Object.assign({}, item);
      this.editIndex = index;
    },

    cancel(item) {
      this.editIndex = null;

      if (!this.originalData) {
        this.items.splice(this.items.indexOf(item), 1);
        return;
      }

      Object.assign(item, this.originalData);
      this.originalData = null;
    },

    save(item) {
      if (item.description && item.make) {
        this.originalData = null;
        this.editIndex = null;
      }
    },

    subtotal(item) {
      return item.qty * item.figures;
    },

    subtotalVAT(item) {
      return item.qty * (item.figures + item.vat);
    },

    submitBid() {
      if (this.$refs.form.validate()) {
        this.$http.post('/api/supplier/price_schedule/:procurement',
        {
          supplier_id: this.procurement.supplier_id,
          procurement_id: this.procurement.procurement_id,
          items: this.items,
          subtotal: this.subTotal,
          total_with_vat: this.total,
          vat_no: this.vatNo,
          authorized: this.authorizedName
        })
          .then(res => {
            console.log(res);
            // this.$router.go(-1);
          })
      }
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {},
  beforeMount() {
    this.createTable();
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},

  // Computed Properties
  computed: {
    subTotal() {
      return this.items
        .map(item => this.subtotal(item))
        .reduce((a, b) => a + b, 0);
    },

    total() {
      return this.items
        .map(item => this.subtotalVAT(item))
        .reduce((a, b) => a + b, 0);
    }
  }
};
</script>

<style scoped>
input[type="number"] {
  text-align: right;
}

th {
  border: 1px solid #000;
}

.v-icon {
  color: #000;
}

#schedule {
  font-size: 12px;
}

table .v-text-field {
  font-size: 12px;
}
</style>
