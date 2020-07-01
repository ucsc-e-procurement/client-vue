<template>
  <v-card class="mx-auto" max-width=1500>
        <v-container> 
        <v-form>    
            <v-row>
                <v-col class="d-flex" cols="12" sm="6">
                    <v-select
                        :items="techMemberCount"
                        :value="this.techTeamId != null ? this.selectedMemberCount : null"
                        label="Number of Members"
                        dense
                        outlined
                        @change="assignMemberCount"
                    ></v-select>
                </v-col>
                <v-col cols="12">
                    <v-autocomplete
                        v-model="chairman"
                        :disabled="isUpdating"
                        :items="filterChairman"
                        filled
                        chips
                        color="blue-grey lighten-2"
                        label="Chairman"
                        item-text="name"
                        item-value="employee_id"
                    >
                    <template v-slot:selection="data">
                        <v-chip
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        close
                        @click="data.select"
                        @click:close="removeChairman(data.item)"
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
                <v-col cols="12">
                    <v-autocomplete
                        v-model="team"
                        :disabled="isUpdating"
                        :items="filterList"
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
            <!-- <v-row>
                <v-btn color="success" class="mr-4 ml-4">
                    Assign
                </v-btn>
            </v-row> -->
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
                    <span class="headline">Confirm Technical Team?</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                       <v-col cols="12" sm="6">
                            <v-list>
                                <v-list-item>
                                    <v-text-field
                                        :value="this.selectedMemberCount"
                                        label="Member Count"
                                        outlined
                                        readonly
                                    ></v-text-field>
                                </v-list-item>
                            </v-list>
                        </v-col>
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
                    <v-btn color="blue darken-1" text @click="this.assignTecTeam">Confirm</v-btn>
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
    techMemberCount: [3, 5, 7, 9],
    selectedMemberCount: '',
    autoUpdate: true,
    chairman: [],
    team: [],
    dialog: false,
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
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      },
  },

  // Custom Methods and Functions
  methods: {
    removeChairman (item) {
        const index = this.chairman.indexOf(item.employee_id)
        if (index >= 0) this.chairman.splice(index, 1)
    },
    removeTeam (item) {
        const index = this.team.indexOf(item.employee_id)
        if (index >= 0) this.team.splice(index, 1)
    },
    assignMemberCount(count){
        // console.log(this.selectedMemberCount);
        this.selectedMemberCount = count
        return this.techMemberCount;
    },
    getEmployees(){
        this.$http
            .get(`/api/director/getemployees`)
            .then(response => {
                console.log(response);
                this.people = response.data;
            })
            .catch(err => {
                console.log(err);
        })
    },
    assignTecTeam(){
        var i;
        var ids = [];
        for(i=0;i<this.team.length; i++){
            ids.push(['tec10', this.team[i]])
        }
        ids.push(['tec10', this.chairman]);

        this.$http
            .post(`/api/director/procurements/appointTechTeam`,{
                techTeamId: 'tec10',
                procurementId: this.procurementId,
                directorId: 'e0004',
                employees: ids
            })
            .then(response => {
                console.log(response);
                this.people = response.data;
            })
            .catch(err => {
                console.log(err);
        })
        this.dialog=false;
        this.$emit('update', 4);
        
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
  computed: {
      filterList(){
          if(!this.chairman || this.selectedMemberCount == ''){
              return this.people.filter(item => item.name == 'pink panther')
          }
          else if(this.team.length + 1 != this.selectedMemberCount){
            //   console.log(this.team);
              return this.people.filter(item => !this.chairman.includes(item.employee_id))
          }else{
              return this.people.filter(item => this.team.includes(item.employee_id))
          }
      },
      filterChairman(){
          if(this.selectedMemberCount == ''){
              return this.people.filter(item => item.name == 'pink panther')
          }else{
              return this.people
          }
      },
      
  }
};
</script>

// Custom CSS Rules and Classes
<style scoped></style>
