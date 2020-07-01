<template>
  <v-card class="mx-auto" max-width=1500>
        <v-container> 
        <v-form>    
            <v-row>
                <v-col cols="12" sm="6">
                    <h5>Bid Opening Team</h5>
                </v-col>
                <v-col cols="12">
                    <v-list>
                        <v-list-item
                            v-for="item in team"
                            :key="item.title"
                        >
                            <v-text-field
                                :value="item.name"
                                outlined
                                readonly
                            ></v-text-field>
                        </v-list-item>
                    </v-list>

                </v-col>
            </v-row>
            <!-- <v-row>
                <v-btn color="warning" class="mr-4 ml-4">
                    Edit
                </v-btn>
            </v-row> -->
        </v-form>   
        </v-container>
    </v-card>
</template>

<script>

/* Note: When Declaring Variables, always think about how Form Validation Rules are applied */
export default {
  // Mixins
  // mixins: [validationMixin],

  // Form Validations
  // validations: {},

  // Props Received
  props: ['requisitionData'],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    autoUpdate: true,
    chairman: [],
    team: [],
    isUpdating: false,
    people: [
        { name: 'Sandra Adams', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        { name: 'Ali Connors', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { name: 'Trevor Hansen', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { name: 'Tucker Smith', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
    ],

    procurementId: '',
    techTeamId: ''

  }),

  watch: {
  },

  // Custom Methods and Functions
  methods: {
    getEmployees(){
        if(this.techTeamId == null){
            this.$http
                .get(`/api/director/getemployees`)
                .then(response => {
                    console.log(response);
                    this.people = response.data;
                })
                .catch(err => {
                    console.log(err);
            })
        }else{
            this.$http
                .get(`/api/director/get_tec_team?techTeamId=${this.techTeamId}`)
                .then(response => {
                    console.log(response);
                    this.selectedMemberCount = response.data.length;
                    this.team = response.data;
                })
                .catch(err => {
                    console.log(err);
            })
        }
        
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
      this.procurementId = this.requisitionData.procurement_id;
      this.techTeamId = this.requisitionData.tec_team_id;
      this.getEmployees();
  },
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
