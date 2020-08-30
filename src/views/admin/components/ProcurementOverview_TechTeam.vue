<template>
  <v-container class="py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card color="" outlined>
          <v-container fluid class="ma-0 px-5">
            <v-row>
              <v-col cols="12">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-row no-gutters>
                        <h5 class="subtitle-1 font-weight-medium">
                          Members of the Technical Evaluation Team
                        </h5>
                        <v-spacer />
                        <v-chip
                          outlined
                          :color="tecTeam.length > 0 ? 'primary' : 'error'"
                          >{{
                            tecTeam.length > 0
                              ? `No. Of Members: ${tecTeam.length}`
                              : "No Members Has Assigned"
                          }}</v-chip
                        >
                      </v-row>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item two-line v-for="(member, i) in tecTeam" :key="i">
                  <span class="mr-5 mt-n4">{{ i + 1 }} ) </span>

                  <v-list-item-content>
                    <v-list-item-title>{{
                      member.employee_name
                    }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      member.capacity
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
  props: ["techTeamId"],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    isLoaded: false,
    tecTeam: [],

    // Alert
    alert: {
      show: true,
      type: "info",
      text: "test "
    }
  }),

  // Custom Methods and Functions
  methods: {
    getTechTeamById(techTeacmId) {
      return new Promise((resolve, reject) => {
        this.$http
          .get(`/api/admin/procurement/tech-team?id=${techTeacmId}`)
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    console.log("ZZZZZZZZZZZ ZZZZZZZZZZZZZZ");

    this.getTechTeamById(this.techTeamId)
      .then(res => {
        console.log("ZZZZZZZZZZZ ", res.team);
        this.tecTeam = JSON.parse(res.team);
      })
      .catch(err => {
        console.log(err);
      });
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
