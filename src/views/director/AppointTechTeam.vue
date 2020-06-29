<template>
  <v-card class="mx-auto" max-width=1500>
        <v-container> 
        <v-form>    
            <v-row>
                <v-col class="d-flex" cols="12" sm="6">
                    <v-select
                        :items="techMemberCount"
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
                        item-value="name"
                    >
                    <template v-slot:selection="data">
                        <v-chip
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        close
                        @click="data.select"
                        @click:close="removeChairman(data.item)"
                        >
                        <v-avatar left>
                            <v-img :src="data.item.avatar"></v-img>
                        </v-avatar>
                        {{ data.item.name }}
                        </v-chip>
                    </template>
                    <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                        <v-list-item-content v-text="data.item"></v-list-item-content>
                        </template>
                        <template v-else>
                        <v-list-item-avatar>
                            <img :src="data.item.avatar">
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
                        item-value="name"
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
                        <v-avatar left>
                            <v-img :src="data.item.avatar"></v-img>
                        </v-avatar>
                        {{ data.item.name }}
                        </v-chip>
                    </template>
                    <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                        <v-list-item-content v-text="data.item"></v-list-item-content>
                        </template>
                        <template v-else>
                        <v-list-item-avatar>
                            <img :src="data.item.avatar">
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
            <v-row>
                <v-btn
                    color="success"
                    class="mr-4 ml-4"
                    
                >
                    Assign
                </v-btn>
            </v-row>
        </v-form>   
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
  props: [],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    techMemberCount: [3, 5, 7, 9],
    selectedMemberCount: '',
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
        const index = this.chairman.indexOf(item.name)
        if (index >= 0) this.chairman.splice(index, 1)
    },
    removeTeam (item) {
        const index = this.team.indexOf(item.name)
        if (index >= 0) this.team.splice(index, 1)
    },
    assignMemberCount(count){
        // console.log(this.selectedMemberCount);
        this.selectedMemberCount = count
        return this.techMemberCount;
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
      filterList(){
          if(!this.chairman || this.selectedMemberCount == ''){
              return this.people.filter(item => item.name == 'pink panther')
          }
          else if(this.team.length + 1 != this.selectedMemberCount){
              return this.people.filter(item => !this.chairman.includes(item.name))
          }else{
              return this.people.filter(item => this.team.includes(item.name))
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
