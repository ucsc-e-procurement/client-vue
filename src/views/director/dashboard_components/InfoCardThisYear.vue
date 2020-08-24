<template>
  <v-container>
    <v-row class="justify-space-between">
          <v-col cols="3">
                <v-card
                  color="#1976d2"
                  dark
                >
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title class="headline font-weight-bold" style="padding-top: 40px;">
                        <div style="font-size: 50px;">
                          60
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn text>Registered Suppliers</v-btn>
                      </v-card-actions>
                    </div>
                    <v-avatar
                    class="ma-3"
                    slot="icon"
                    color="blue darken-4"
                    size="125"
                  >
                    <v-icon
                      icon="mdi-lock"
                      color="white"
                    >
                      mdi-lock
                    </v-icon>
                  </v-avatar>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card
                  color="#1976d2"
                  dark
                >
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title class="headline font-weight-bold" style="padding-top: 40px;">
                        <div style="font-size: 50px;">
                          20
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn text>Total Requisitions</v-btn>
                      </v-card-actions>
                    </div>
                    <v-avatar
                    class="ma-3"
                    slot="icon"
                    color="yellow darken-3"
                    size="125"
                  >
                    <v-icon
                      icon="mdi-lock"
                      color="white"
                    >
                      mdi-lock
                    </v-icon>
                  </v-avatar>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card
                  color="#1976d2"
                  dark
                >
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title class="headline font-weight-bold" style="padding-top: 40px;">
                        <div style="font-size: 50px;">
                          70%
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn text>Completed</v-btn>
                      </v-card-actions>
                    </div>
                    <v-avatar
                    class="ma-3"
                    slot="icon"
                    color="green lighten-1"
                    size="125"
                  >
                    <v-icon
                      icon="mdi-lock"
                      color="white"
                    >
                      mdi-lock
                    </v-icon>
                  </v-avatar>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card
                  color="#1976d2"
                  dark
                >
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title class="headline font-weight-bold" style="padding-top: 40px;">
                        <div style="font-size: 50px;">
                          30%
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn text>Rejected</v-btn>
                      </v-card-actions>
                    </div>
                    <v-avatar
                    class="ma-3"
                    slot="icon"
                    color="red lighten-1"
                    size="125"
                  >
                    <v-icon
                      icon="mdi-lock"
                      color="white"
                    >
                      mdi-lock
                    </v-icon>
                  </v-avatar>
                  </div>
                </v-card>
              </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  // Mixins
  // mixins: [validationMixin],

  // Form Validations
  // validations: {},

  // Props Received
  props: [],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    //
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
<style scoped></style>
