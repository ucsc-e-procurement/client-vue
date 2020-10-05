<template>
    <v-card class="mx-auto" max-width=1500>
        <v-container> 
        <v-form>    
            <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">HOD Recommendation</h5>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12">
                <v-text-field
                    :value="'None'"
                    label="Remarks"
                    outlined
                    readonly
                ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                <v-text-field
                    :value="'Recommended'"
                    label="HOD Recommendation"
                    outlined
                    readonly
                ></v-text-field>
                </v-col>
            </v-row>

            <v-divider class="mt-1"></v-divider>
            <v-row no-gutters>
                <h5 class="headline pt-5 pb-5">Debuty Bursar Recommendation</h5>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12">
                <v-text-field
                    :value="'None'"
                    label="Deputy Bursar Remarks"
                    outlined
                    readonly
                ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                <v-text-field
                    :value="'Recommended'"
                    label="Deputy Bursar Recommendation"
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
  name: 'Recommendation',
  props: [],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
  }),

  // Custom Methods and Functions
  methods: {

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
}
</script>