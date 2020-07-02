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

    <!-- Centered Card with Login Form -->
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5">
        <v-card class="elevation-12 px-3">
          <v-card-text>
            <v-form @submit.prevent="registerUser" ref="form" v-model="valid">
              <v-text-field
                label="Name"
                v-model="name"
                :rules="[rules.name]"
              ></v-text-field>
              <v-text-field
                label="Email"
                v-model="email"
                :rules="rules.email"
              ></v-text-field>
              <v-text-field
                label="Contact Number"
                v-model="contact"
                :rules="[rules.contact]"
              ></v-text-field>
              <v-textarea
                name="address"
                label="Address"
                v-model="address"
                auto-grow
                row-height="6"
                :rules="[rules.address]"
              ></v-textarea>
              <v-text-field
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="rules.password"
                :type="show ? 'text' : 'password'"
                name="input-10-2"
                label="Password"
                hint="At least 8 characters"
                @click:append="show = !show"
                required
              ></v-text-field>
              <v-select
                v-model="cat_selection"
                :items="categories"
                :rules="[rules.categories]"
                label="Select categories"
                multiple
                chips
                hint="Applying categories of Goods/Services"
                persistent-hint
              ></v-select>
              <v-row no-gutters>
                <v-col cols="8">
                  <v-file-input
                    v-model="image"
                    accept="image/jpg, image/png"
                    placeholder="Attach payment slip"
                    hint="This should be a jpg/png file"
                    persistent-hint
                    :rules="[rules.image]"
                  ></v-file-input>
                </v-col>
                <v-col align="right">
                  <v-btn type="submit" class="primary mt-6">
                    Sign Up
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pl-4">
            Already Have an account?<v-btn depressed class="ml-2"
              >Login here</v-btn
            >
          </v-card-actions>
        </v-card>
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
    valid: true,
    cat_selection: null,
    show: false,
    categories: ["Stationery", "Computers", "Services"],
    name: "",
    email: "",
    contact: "",
    address: "",
    password: "",
    image: null,
    rules: {
      name: v => !!v || "Name is required",
      email: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      contact: v => !!v || "Contact number is required",
      password: [
        v => !!v || "Password is required",
        v => v.length >= 8 || "Min 8 characters"
      ],
      address: v => !!v || "Address is required",
      categories: v => !!v || "Select at least one category",
      image: v => !!v || "Attach an image as payment slip"
    }
  }),

  // Custom Methods and Functions
  methods: {
    registerUser() {
      if (this.$refs.form.validate()) {
        let form = new FormData();
        form.append("name", this.name);
        form.append("email", this.email);
        form.append("contact", this.contact);
        form.append("password", this.password);
        form.append("address", this.address);
        form.append("categories", this.cat_selection);
        form.append("payment", this.image);
        this.$http.post("/api/supplier/registration", form).then(res => {
          if (res.statusText == "User exists") {
            alert("Email already exists in the system");
          } else if (res.statusText == "Successfully added") {
            alert("You have been successfully registered");
            // this.$router. push("/login");
          } else {
            alert("Something went wrong! Please try again");
          }
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
