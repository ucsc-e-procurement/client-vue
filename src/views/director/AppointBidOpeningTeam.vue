<template>
  <v-card class="mx-auto" max-width=1500>
        <v-container> 
        <v-form>    
            <v-row>
                <v-col cols="12">
                    <v-autocomplete
                        v-model="team"
                        :disabled="isUpdating"
                        :items="filterTeam"
                        filled
                        chips
                        color="blue-grey lighten-2"
                        label="Team Members"
                        item-text="name"
                        item-value="employee_id"
                        multiple
                    >
                    <template v-slot:selection="data">
                        <v-chip
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        close
                        @click="data.select"
                        @click:close="removeTeam(data.item)"
                        >
                        <v-avatar left color="blue">
                            <span class="white--text headline">{{data.item.name[0]}}</span>
                        </v-avatar>
                        {{ data.item.name }}
                        </v-chip>
                    </template>
                    <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                        <v-list-item-content v-text="data.item"></v-list-item-content>
                        </template>
                        <template v-else>
                        <v-list-item-avatar color="blue">
                            <span class="white--text headline">{{data.item.name[0]}}</span>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-html="data.item.name"></v-list-item-title>
                            <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                        </v-list-item-content>
                        </template>
                    </template>
                    </v-autocomplete>
                </v-col>
            </v-row>
        </v-form>  
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                >
                Assign
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Confirm Bid Opening Team?</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-col cols="12" sm="12">
                            <v-list>
                                <v-list-item
                                    v-for="item in team"
                                    :key="item"
                                >
                                    <v-text-field
                                        :value="people.filter(i => i.employee_id == item)[0].name"
                                        outlined
                                        readonly
                                    ></v-text-field>
                                </v-list-item>
                            </v-list>

                        </v-col>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="this.assignBidOpeningTeam">Confirm</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>  
        </v-container>
    </v-card>
</template>

<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";

/*

// Validation Library - Vuelidate
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

*/

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
    dialog: '',
    team: [],
    isUpdating: false,
    people: [
        { name: 'Sandra Adams', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        { name: 'Ali Connors', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { name: 'Trevor Hansen', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { name: 'Tucker Smith', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
    ],
    procurementId: '',
    tecTeamId: ''

  }),

  watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      },
  },

  // Custom Methods and Functions
  methods: {
    removeTeam (item) {
        const index = this.team.indexOf(item.employee_id)
        if (index >= 0) this.team.splice(index, 1)
    },
    getEmployeesNotInTecTeam(){
        this.$http
            .get(`/api/director/get_employees_not_in_tec_team?tecTeamId=${this.tecTeamId}`)
            .then(response => {
                console.log(response);
                this.people = response.data;
            })
            .catch(err => {
                console.log(err);
        })
    },
    assignBidOpeningTeam(){
        this.$http
            .post(`/api/director/procurements/appointBidOpeningTeam`,{
                bidOpeningTeamId: 'bot10',
                procurementId: this.procurementId,
                directorId: 'e0004',
                member_1: this.team[0],
                member_2: this.team[1]
            })
            .then(response => {
                console.log(response);
                this.people = response.data;
            })
            .catch(err => {
                console.log(err);
        })
        this.dialog=false;
        this.$emit('bidTeamAppointed', 5);
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
      this.procurementId = this.requisitionData.procurement_id;
      this.tecTeamId = this.requisitionData.tec_team_id;
      this.getEmployeesNotInTecTeam();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},

  // Computed Properties
  computed: {
      filterTeam(){
          if(this.team.length == 2){
              return this.people.filter(item => this.team.includes(item.employee_id))
          }else{
              return this.people
          }
          
      },
  }
};
</script>

// Custom CSS Rules and Classes
<style scoped></style>
