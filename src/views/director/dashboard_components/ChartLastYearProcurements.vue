<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";
import { Bar } from "vue-chartjs";

/*

// Validation Library - Vuelidate
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

*/

/* Note: When Declaring Variables, always think about how Form Validation Rules are applied */
export default {
  // Mixins
  mixins: [Bar],

  // Form Validations
  // validations: {},

  // Props Received
  props: [],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    //
    chartData: {
      labels: [
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
      datasets: [
        {
          label: "Procurements - 2019",
          backgroundColor: "#42A5F5",
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  }),

  // Custom Methods and Functions
  methods: {
    // getProcurements(){
    //   this.$http
    //     .get("/api/director/procurements")
    //     .then(response => {
    //     //   console.log(response);
    //       var totalProcurements = response.data.filter(item => item.status == 'on-going').length + response.data.filter(item => item.status == 'completed').length + response.data.filter(item => item.status == 'terminated').length
    //       this.ongoingProcurementCount = response.data.filter(item => item.status == 'on-going').length / totalProcurements;
    //       this.completedProcurementCount = response.data.filter(item => item.status == 'completed').length / totalProcurements;
    //       this.terminatedProcurementCount = response.data.filter(item => item.status == 'terminated').length / totalProcurements;
    //       this.requisitionCount = response.data.filter(item => new Date(item.date).getFullYear() == new Date().getFullYear()).length;
    //       // this.isMounted = true;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     })
    // },
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {

  },
  beforeMount() {},
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
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
