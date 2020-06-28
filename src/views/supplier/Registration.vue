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
                <form @submit.prevent="registerUser">
                    <v-text-field
                        label="Name"
                        v-model="name"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="Email"
                        v-model="email"
                        required
                    ></v-text-field>
                    <v-select
                      v-model="cat_selection"
                      :items="categories"
                      label="Select categories"
                      multiple
                      chips
                      hint="Applying categories of Goods/Services"
                      persistent-hint
                    ></v-select>
                    <v-text-field
                        label="Contact Number"
                        v-model="contact"
                        required
                    ></v-text-field>
                    <v-textarea
                        name="address"
                        label="Address"
                        v-model="address"
                        auto-grow
                        row-height="6"
                        required
                    ></v-textarea>
                    <v-text-field
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.min]"
                        :type="show ? 'text' : 'password'"
                        name="input-10-2"
                        label="Password"
                        hint="At least 8 characters"
                        @click:append="show = !show"
                        required
                    ></v-text-field>
                    <v-btn type="submit" class="primary">
                        Sign Up
                    </v-btn>
                </form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="pl-4">
                Already Have an account?<v-btn depressed class="ml-2">Login here</v-btn>
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
      cat_selection: [],
      show: false,
      categories: [
          'Stationery', 'Computers', 'Services',
        ],
      password: 'Password',
      rules: {
        min: v => v.length >= 8 || 'Min 8 characters',
      },
    }),

    // Custom Methods and Functions
    methods: {},

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
