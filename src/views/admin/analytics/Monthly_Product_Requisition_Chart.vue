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
      type: "horizontalBar",
      labels: [],
      datasets: [
        {
          label: "Monthly Product Requisitions",
          backgroundColor: "#f87979",
          data: []
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              suggestedMin: 0,
              suggestedMax: 50,
              max: 50,
              min: 0,
              stepSize: 5
            }
          }
        ]
      }
    }
  }),

  // Custom Methods and Functions
  methods: {
    getData(year) {
      return new Promise((resolve, reject) => {
        this.$http
          .get(
            `api/admin-analytics/monthly-product-requisition-count?year=${year}`
          )
          .then(res => {
            console.log("+++++++++++++++++++++++ ", res.data);
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
    this.getData(2020)
      .then(data => {
        console.log("Data: ", data);
        data.map(obj => {
          this.chartData.labels.push(obj.month);
          this.chartData.datasets[0].data.push(obj.count);
          return;
        });
        console.log(">>", this.chartData.labels);
        console.log(">>", this.chartData.datasets);
        this.renderChart(this.chartData, this.options);
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
