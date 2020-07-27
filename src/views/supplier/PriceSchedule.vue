<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <instructions v-if="this.method" />
        <datasheet v-if="this.method" :deadline='this.procurement.deadline' />

        <v-container class="elevation-1">
           <v-row no-gutters>
            <h5 class="headline">Authorization to sign the Quotation</h5>
          </v-row>
          <v-divider class="mt-1"></v-divider>
          <v-row no-gutters class="caption mt-4">
            You hereby agree that the authorizee details of you provided below are authorized from your company to sign the quotation. 
            The signature and the company seal entered here will appear in the document as proof of personnel and responsibilty.
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="authorizedName"
                label="Authorized Person"
                placeholder="Name of authorized person"
                outlined
                dense
                :rules="[rules.general]"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="authorizedNIC"
                label="NIC No."
                placeholder="NIC number of authorized person"
                outlined
                dense
                :rules="[rules.general]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="authorizedDesignation"
                label="Designation"
                placeholder="Designation of authorized person"
                outlined
                dense
                :rules="[rules.general]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
            <v-btn class="primary mb-3" v-show="!editIndex" @click="add">Add Signature & Company Seal</v-btn>
            </v-col>
            <v-col>
              Authorizee Signature :  
            </v-col>
            <v-col>
              Company Seal :  
            </v-col>
          </v-row>
        </v-container>

        <schedule :products='JSON.parse(this.procurement.products)' />

        <v-container class="elevation-1">
           <v-row no-gutters>
            <h5 class="headline">Technical Specification and Compliance</h5>
          </v-row>
          <v-divider class="mt-1"></v-divider>
          <table class="mt-4" style="width: 100%; font-size: 12px">
              <thead>
                <tr>
                  <th>Minimum Specification</th>
                  <th width="20%">Bidder Response (Yes/No)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in specs" :key="index">
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td class="text-right pr-3">Unit Price (Without VAT) (Rs)</td>
                  <td>
                    <v-text-field
                      type="number"
                      min="0"
                      step=".01"
                      oninput="validity.valid||(value='')"
                      v-model.number="compliance.unit"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="text-right pr-3">Discount (If any) (Rs)</td>
                  <td>
                    <v-text-field
                      type="number"
                      min="0"
                      step=".01"
                      oninput="validity.valid||(value='')"
                      v-model.number="compliance.discount"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="text-right pr-3">Unit Price After Discount (Without VAT) (Rs)</td>
                  <td>
                    <v-text-field
                      disabled
                      :value="this.unitDiscount"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="text-right pr-3">15% VAT Amount (Rs)</td>
                  <td>
                    <v-text-field
                      type="number"
                      min="0"
                      step=".01"
                      oninput="validity.valid||(value='')"
                      v-model.number="compliance.vat"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="text-right pr-3">Grand Total Amount With VAT</td>
                  <td>
                    <v-text-field
                      disabled
                      :value="this.grandTotal"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
        </v-container>

        <quotationForm :procurement='this.procurement' :beforeVat='this.unitDiscount' :total='this.grandTotal' />

        <v-container class="elevation-1">
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
                  disabled
                />
              </v-form>
            </v-col>
          </v-row>
        </v-container>

        <v-container class="elevation-1">
           <v-row no-gutters>
            <h5 class="headline">Manufacturer's Authorization</h5>
          </v-row>
          <v-divider class="mt-1"></v-divider>
          <v-row no-gutters class="py-2">
            Download the document<v-icon @click="downloadLetter" class="mx-2">mdi-package-down</v-icon>
          </v-row>
          <v-file-input
            v-model="manufacturerDoc"
            accept="application/pdf"
            placeholder="Attach manufacturer's authorization"
            hint="This should be a pdf file"
            persistent-hint
            :rules="[rules.general]"
          ></v-file-input>
        </v-container>

        <v-container class="elevation-1">
           <v-row no-gutters>
            <h5 class="headline">Other attachments</h5>
          </v-row>
          <v-file-input
            v-model="otherDoc"
            accept="application/pdf"
            placeholder="Attach any other drawings/attachments"
            hint="This should be a pdf file"
            persistent-hint
            :rules="[rules.general]"
          ></v-file-input>
        </v-container>
        <v-row class="mt-4" no-gutters>
          <v-btn class="success" @click="submitBid">Submit Bid</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import instructions from './Bid_Instructions';
import datasheet from './Bid_Datasheet';
import schedule from './Bid_Requirements';
import quotationForm from './Bid_QuotationForm';

export default {
  // Props Received
  props: ['procurement'],

  // Imported Components
  components: {
    instructions, datasheet, schedule, quotationForm
  },

  filters: {
    money: value =>
      new Intl.NumberFormat("sl-SL", {
        style: "currency",
        currency: "LKR"
      }).format(value)
  },

  // Data Variables and Values
  data: () => ({
    method: true,
    valid: true,
    vatNo: "",
    authorizedName: "",
    authorizedDesignation: "",
    authorizedNIC: "",
    manufacturerDoc: null,
    editIndex: null,
    originalData: null,
    rules: {
      vat: v => !!v || "Vat Registration No. is required",
      general: v => !!v || "This is required"
    },
    specs: [],
    compliance: {
      unit: 0,
      discount: 0,
      unit_after: 0,
      vat: 0,
      total: 0,
    },
    items: [],
    menu: false
  }),

  // Custom Methods and Functions
  methods: {
    createTable() {
      console.log(this.procurement)
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

    downloadLetter() {
      this.$http.get('/api/supplier/price_schedule/get_file')
        .then(res => {
          let bytes = new Uint8Array(res.data.data);
          let blob = new Blob([bytes], { type: 'application/pdf' });
          let fileURL = window.URL.createObjectURL(blob)
          let fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'manufacturer_auth.pdf');
          document.body.appendChild(fileLink);
          fileLink.click();
        })
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
    unitDiscount() {
      return (this.compliance.unit - this.compliance.discount).toFixed(2);
    },

    grandTotal() {
      return (this.compliance.unit - this.compliance.discount + this.compliance.vat).toFixed(2);
    },

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
