<template>
  <v-container class="pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card class="px-5 pb-5">
          <v-card-title class="px-0"
            >Bid Openings of {{ currentMonth }}</v-card-title
          >
          <v-calendar
            ref="calendar"
            :now="today"
            :value="today"
            :events="events"
            color="primary"
            type="month"
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
    today: "",
    events: [],

    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],

    currentMonth: ""
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
    //   Set Today Date
    let d = new Date();
    this.today = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate() + 1}`;

    // Set Month
    this.currentMonth = this.months[d.getMonth()];

    this.getBidOpeningDates()
      .then(res => {
        res.forEach(procurement => {
          this.events.push({
            name: procurement.procurement_id,
            start: procurement.bid_opening_date.split("T")[0]
          });
        });
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
