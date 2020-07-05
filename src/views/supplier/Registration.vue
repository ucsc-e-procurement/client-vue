<template>
  <v-container class="fill-height" fluid>
    <!-- Page's Background Image -->
    <div class="bg"></div>

    <!-- App Bar -->
    <v-app-bar app color="primary" dark>
      <v-avatar tile>
        <v-img :src="require('../../assets/UCSC_Logo.png')"></v-img>
      </v-avatar>
      <v-toolbar-title class="pl-5">Supplier Registration</v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1">System</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" step="2">General</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 3" step="3">Business</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="4">Payment</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-form ref="form1" v-model="valid">
                <v-text-field
                  label="Email"
                  v-model="formdata.email"
                  :rules="rules.email"
                ></v-text-field>
                <v-text-field
                  v-model="formdata.password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="rules.password"
                  :type="show ? 'text' : 'password'"
                  name="input-10-2"
                  label="Password"
                  hint="At least 8 characters"
                  @click:append="show = !show"
                  required
                ></v-text-field>
              </v-form>
              Already Have an account?<router-link class="mx-3" :to="{ name: 'login'}">Login here</router-link>
              <v-btn color="primary float-right" @click="proceedToForm2">Continue</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-form ref="form2" v-model="valid">
                <v-text-field
                  label="Name of establishment ( Legal Name )"
                  v-model="formdata.legal"
                  :rules="[rules.name]"
                ></v-text-field>
                <v-text-field
                  label="Business Address"
                  v-model="formdata.business_address"
                  :rules="[rules.name]"
                ></v-text-field>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      label="Contact Name"
                      v-model="formdata.contact_name"
                      :rules="[rules.name]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="Contact Number"
                      v-model="formdata.contact"
                      :rules="rules.contact"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field
                  label="Fax Number"
                  v-model="formdata.fax"
                ></v-text-field>
                <v-text-field
                  label="Official Email Address"
                  v-model="formdata.official_email"
                  :rules="rules.email"
                ></v-text-field>
                <v-text-field
                  label="Web Address"
                  v-model="formdata.web"
                ></v-text-field>
                <v-row>
                  <v-col cols="7">
                    <v-text-field
                      label="Business Registration Number"
                      v-model="formdata.business_reg_no"
                      :rules="[rules.name]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <v-file-input
                      v-model="formdata.cert_copy"
                      accept="image/jpg, image/png"
                      hint="Attach certified copy of Business registration"
                      persistent-hint
                      :rules="[rules.image]"
                    ></v-file-input>
                  </v-col>
                </v-row>
                <v-text-field
                  label="VAT Registration Number"
                  v-model="formdata.vat_reg_no"
                  :rules="[rules.name]"
                ></v-text-field>
                <v-text-field
                  label="ICTAD Registration Number"
                  v-model="formdata.ictad_reg_no"
                  :rules="[rules.name]"
                ></v-text-field>
                <v-row>
                  <v-col cols="8">
                    <v-text-field
                      label="Name of Bank"
                      v-model="formdata.bank"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      label="Branch"
                      v-model="formdata.branch"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
              <v-btn color="primary float-right" @click="proceedToForm3">Continue</v-btn>
              <v-btn text @click.native="step = 1">Back</v-btn>
            </v-stepper-content>
            <v-stepper-content step="3">
              <v-form ref="form3" v-model="valid">
                <v-select
                  v-model="formdata.business_nature"
                  :items="business_nature"
                  :rules="[rules.categories]"
                  label="Nature of business"
                ></v-select>
                <v-select
                  v-model="formdata.business_type"
                  :items="business_type"
                  :rules="[rules.categories]"
                  label="Business Type"
                ></v-select>
                <v-radio-group v-model="formdata.credit_offered" row label="Is credit facility being offered">
                  <v-radio label="Yes" value="yes"></v-radio>
                  <v-radio label="No" value="no"></v-radio>
                </v-radio-group>
                <v-select
                  v-model="formdata.cat_selection"
                  :items="categories"
                  :rules="[rules.categories]"
                  label="Select categories"
                  multiple
                  chips
                  hint="Applying categories of Goods/Services"
                  persistent-hint
                ></v-select>
                <v-select
                  v-model="formdata.maximum_credit"
                  :items="maximum_credit"
                  label="Maximum credit facility offered"
                  persistent-hint
                ></v-select>
                <v-select
                  v-model="formdata.credit_period"
                  :items="credit_period"
                  label="Credit period"
                ></v-select>
                <v-select
                  v-model="formdata.experience"
                  :items="experience"
                  label="Experience in the industry ( No. of Years )"
                ></v-select>
              </v-form>
              <v-btn color="primary float-right" @click="proceedToForm4">Continue</v-btn>
              <v-btn text @click.native="step = 2">Back</v-btn>
            </v-stepper-content>
            <v-stepper-content step="4">
              <v-form ref="form4" v-model="valid">
                <v-radio-group v-model="formdata.payment_type" row>
                  <v-radio label="Paid from Bank" value="bank"></v-radio>
                  <v-radio label="Paid to the Shroff counter" value="shroff"></v-radio>
                </v-radio-group>
                <v-text-field
                  v-if="formdata.payment_type == 'bank'"
                  label="Name of Bank and Branch"
                  v-model="formdata.payment_bank"
                  :rules="[rules.name]"
                ></v-text-field>
                <v-text-field
                  v-if="formdata.payment_type == 'shroff'"
                  label="Shroff receipt Number"
                  v-model="formdata.shroff"
                  :rules="[rules.name]"
                ></v-text-field>
                <v-row>
                  <v-col cols="6">
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
                          label="Registration Date"
                          v-model="formdata.date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="formdata.date"
                        @input="menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="6"> 
                    <v-text-field
                      label="Amount(Rs.)"
                      v-model="formdata.amount"
                      :rules="[rules.name]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-file-input
                  v-model="formdata.payment"
                  accept="image/jpg, image/png"
                  placeholder="Attach payment slip"
                  hint="This should be a jpg/png file"
                  persistent-hint
                  :rules="[rules.image]"
                ></v-file-input>
              </v-form>
              <v-btn color="primary float-right" @click="registerUser">Submit</v-btn>
              <v-btn text @click.native="step = 3" v-if="user_state == 'new'">Back</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
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

  // Data Variables and Values
  data: () => ({
    step: 1,
    valid: true,
    show: false,
    user_state: "new",
    menu: false,
    business_nature: ['Manufacturer', 'Wholesaler', 'Importer', 'Retailer', 'Authorized Agent', 'Contractor', 'Consultant'],
    business_type: ['Private Limited Company', 'Public Limited Company', 'Sole Proprietorship', 'Partnership', 'Government', 'Cooperative/Society'],
    maximum_credit: ['1-1000', '1000-10000', 'Above 10000'],
    credit_period: ['1-30 Days', '31-60 Days', 'More than 60 Days'],
    experience: ['Below 1 Year', '1-5 Years', '6-10 Years', 'More than 10 Years'],
    categories: ["Stationery", "Computers", "Services"],
    formdata: {
      email: "",
      password: "",
      legal: "",
      business_address: "",
      contact_name: "",
      contact: "",
      fax: "none",
      official_email: "",
      web: "none",
      business_reg_no: "",
      cert_copy: null,
      vat_reg_no: "",
      ictad_reg_no: "",
      bank: "none",
      branch: "none",
      business_nature: "",
      business_type: "",
      credit_offered: "none",
      maximum_credit: "none",
      credit_period: "none",
      experience: "none",
      cat_selection: "",
      payment_bank: "",
      shroff: "",
      date: new Date().toISOString().substr(0, 10),
      amount: 0,
      payment: null,
      payment_type: "bank",
    },
    rules: {
      name: v => !!v || "This field is required",
      email: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      contact: [
        v => !!v || "Contact number is required",
        v => v.length >= 10 || "Enter valid contact number"
      ],
      password: [
        v => !!v || "Password is required",
        v => v.length >= 8 || "Min 8 characters"
      ],
      address: v => !!v || "Address is required",
      categories: v => !!v || "Select a category",
      image: v => !!v || "image attachment is required"
    }
  }),

  methods: {
    backToLogin() {
      this.$router.push({name: 'login'})
    },

    proceedToForm2() {
      if(this.$refs.form1.validate()) {
        this.$http.get("api/supplier/registration", { params: {email: this.formdata.email} })
          .then(res => {
            if(res.data.length > 0) {
              const user_registered = res.data.filter(entry => { return entry.reg_year === 2020 })
              if(user_registered.length > 0) {
                alert("You have already registered to our system for this year. Thank you!");
              }
              else {
                this.user_state = "renew";
                alert("Happy to see you renewing your registration. Only fill out the payment information.");
                this.step = 4;
              }
            } else this.step = 2;
          })
      }
    },

    proceedToForm3() {
      if(this.$refs.form2.validate()) this.step = 3;
    },

    proceedToForm4() {
      if(this.$refs.form3.validate()) this.step = 4;
    },

    registerUser() {
      if (this.$refs.form4.validate()) {
        let form = new FormData();
        form.append("email", this.formdata.email);
        form.append("password", this.formdata.password);
        form.append("legal", this.formdata.legal);
        form.append("business_address", this.formdata.business_address);
        form.append("contact_name", this.formdata.contact_name);
        form.append("contact", this.formdata.contact);
        form.append("fax", this.formdata.fax);
        form.append("official_email", this.formdata.official_email);
        form.append("web", this.formdata.web);
        form.append("business_reg_no", this.formdata.business_reg_no);
        form.append("cert_copy", this.formdata.cert_copy);
        form.append("vat_reg_no", this.formdata.vat_reg_no);
        form.append("ictad_reg_no", this.formdata.ictad_reg_no);
        form.append("bank", this.formdata.bank);
        form.append("branch", this.formdata.branch);
        form.append("business_nature", this.formdata.business_nature);
        form.append("business_type", this.formdata.business_type);
        form.append("credit_offered", this.formdata.credit_offered);
        form.append("maximum_credit", this.formdata.maximum_credit);
        form.append("credit_period", this.formdata.credit_period);
        form.append("experience", this.formdata.experience);
        form.append("cat_selection", this.formdata.cat_selection);
        form.append("payment_bank", this.formdata.payment_bank);
        form.append("shroff", this.formdata.shroff);
        form.append("date", this.formdata.date);
        form.append("amount", this.formdata.amount);
        form.append("payment", this.formdata.payment);
        form.append("payment_type", this.formdata.payment_type);
        form.append("user_state", this.user_state);
        this.$http.post("/api/supplier/registration", form).then(res => {
          console.log(res);
        });
      }
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
  computed: {}
};
</script>

// Custom CSS Rules and Classes
<style scoped>
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url("../../assets/ucsc.jpg") no-repeat center center;
    background-size: cover;

    transform: scale(1);
  }

</style>
