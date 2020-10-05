<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <v-card class="px-5 pb-5">
          <v-card-title class="px-0">Bid Openings </v-card-title>
          <v-calendar
            :events="events"
            color="primary"
            type="month"
            :now="today"
            :event-overlap-mode="mode"
            :event-overlap-threshold="30"
          ></v-calendar>
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
  props: [],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    //
    today: "2020-10-05",
    events: [
      {
        name: "Weekly Meeting",
        start: "2019-10-07 09:00",
        end: "2019-10-12 10:00"
      },
      {
        name: "Thomas' Birthday",
        start: "2019-10-05"
      }
    ]
  }),

  // Custom Methods and Functions
  methods: {
    getBidOpeningDates() {
      return new Promise((resolve, reject) => {
        this.$http
          .get("/api/admin/bids/opening-schedule")
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
    // this.getBidOpeningDates()
    //   .then(res => {
    //     console.log("Result: ", res);
    //     this.events = res.map(procurement => {
    //       return {
    //         name: procurement.procurement_id,
    //         start: "2019-10-02"
    //       };
    //     });
    //     console.log("Events: ", this.events);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
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
