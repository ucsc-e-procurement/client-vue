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
              <h5>[ Tender Name & Tender Number ]</h5>
            </v-row>
            <v-row no-gutters>
              <h5>[ Closing Date & Time ]</h5>
            </v-row>

            <v-card class="my-2 py-2 px-1" id="schedule">
              <table class="mt-4">
                <thead>
                  <tr>
                    <th rowspan="2">#</th>
                    <th scope="col" rowspan="2" class="border-bottom-2">Description of Materials/Services required</th>
                    <th width="5%" scope="col" rowspan="2">Qty</th>
                    <th width="20%" scope="col" colspan="2">Unit Price (Rs.)</th>
                    <th width="10%" scope="col" rowspan="2">Make/Model & Trademark</th>
                    <th width="10%" scope="col" rowspan="2">Date by which delivery can be completed</th>
                    <th width="5%" scope="col" rowspan="2">Quotation validity period</th>
                    <th width="10%" scope="col" rowspan="2">Period for which credit facilities offered</th> 
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
                      <span v-if="editIndex !== index">{{ item.description }}</span>
                      <span v-if="editIndex === index">
                        <v-text-field
                          v-model="item.description"
                        />
                      </span>
                    </td>
                    <td>
                      <span v-if="editIndex !== index">{{ item.qty }}</span>
                      <span v-if="editIndex === index">
                        <v-text-field
                          type="number"
                          v-model.number="item.qty"
                        />
                      </span>
                    </td>
                    <td>
                      <span v-if="editIndex !== index">{{
                        item.figures
                      }}</span>
                      <span v-if="editIndex === index">
                        <v-text-field
                          type="number"
                          v-model.number="item.figures"
                        />
                      </span>
                    </td>
                    <td>
                      <span v-if="editIndex !== index">{{ item.vat }}</span>
                      <span v-if="editIndex === index">
                        <v-text-field
                          type="number"
                          v-model.number="item.vat"
                        />
                      </span>
                    </td>
                    <td>
                      <span v-if="editIndex !== index">{{ item.make }}</span>
                      <span v-if="editIndex === index">
                        <v-text-field
                          v-model="item.make"
                        />
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
                              v-model="date"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
                        </v-menu>
                      </span>
                    </td>
                    <td>
                      <span v-if="editIndex !== index">{{ item.validity }}</span>
                      <span v-if="editIndex === index">
                        <v-text-field
                          type="number"
                          v-model.number="item.validity"
                        />
                      </span>
                    </td>
                    <td>
                      <span v-if="editIndex !== index">{{ item.credit }}</span>
                      <span v-if="editIndex === index">
                        <v-text-field
                          type="number"
                          v-model.number="item.credit"
                        />
                      </span>
                    </td>
                    <td class="py-2">
                      <span v-if="editIndex !== index">
                        <v-icon @click="edit(item, index)" class="mx-1">mdi-pencil</v-icon>
                        <v-icon @click="remove(item, index)" class="mx-1">mdi-delete</v-icon>
                      </span>
                      <span v-else>
                        <v-icon @click="cancel(item)" class="mx-1">mdi-close</v-icon>
                        <v-icon @click="save(item)" class="mx-1">mdi-check</v-icon>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-card>

            <v-btn class="primary" v-show="!editIndex" @click="add">Add Item</v-btn>

            <v-card class="my-2">
              <div class="col-3">
                <div class="input-group input-group-sm mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Grand Total without VAT (Rs.)</span>
                  </div>
                  <input
                    class="form-control form-control-sm text-right"
                    disabled
                    :value="this.allSubTotal | money"
                  />
                </div>

                <div class="input-group input-group-lg mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Grand Total with VAT (Rs.)</span>
                  </div>
                  <input
                    class="form-control form-control-sm text-right"
                    disabled
                    :value="this.total | money"
                  />
                </div>
              </div>
            </v-card>

            <v-row class="mt-2">
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="vatNo"
                  label="Vat Registration No."
                  placeholder="Enter Vat Registration Number"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="authorizedName"
                  label="Authorized Person"
                  placeholder="Name of authorized person"
                  outlined
                  dense
                />
              </v-col>
            </v-row>

            <v-btn class="primary" v-show="!editIndex" @click="add">Add Signature</v-btn>

            <v-row class="mt-4" no-gutters>
              <v-btn class="mr-2 secondary">Cancel</v-btn>
              <v-btn class="success">Review & Submit</v-btn>
            </v-row>
          </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {

  // Props Received
  props: [],

  // Imported Components
  components: {},

  filters: {
    money: value =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(value)
  },

  // Data Variables and Values
  data: () => ({
    vatNo: "",
    authorizedName: "",
    editIndex: null,
    originalData: null,
    items: [
      { description: 'laptops', qty: '20', figures: 30000, vat: 1200, make: 'dell', date: new Date().toISOString().substr(0, 10), validity: 4, credit: 10 },
      { description: 'soap', qty: '100', figures: 300, vat: 12, make: 'dettol', date: new Date().toISOString().substr(0, 10), validity: 2, credit: 2 },
    ],
    tax: 10,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
  }),

  // Custom Methods and Functions
  methods: {
    add() {
      this.originalData = null;
      this.items.push({
        description: "",
        qty: 1,
        figures: 1,
        vat: 1,
        make: "",
        date: new Date().toISOString().substr(0, 10),
        validity: 0,
        credit: 0
      });
      this.editIndex = this.items.length - 1;
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

    remove(item, index) {
      this.items.splice(index, 1);
    },

    save(item) {
      this.originalData = null;
      this.editIndex = null;
      console.log(item);
    },

    subtotal(item) {
      return (
        item.qty * item.price - (item.qty * item.price * item.discount) / 100
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
    allSubTotal() {
      return this.items
        .map(item => this.subtotal(item))
        .reduce((a, b) => a + b, 0);
    },

    total() {
      return this.tax
        ? this.allSubTotal + this.allSubTotal * (this.tax / 100)
        : this.allSubTotal;
    }
  }
};
</script>

// Custom CSS Rules and Classes
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

  .v-text-field {
    font-size: 12px;
  }
</style>
