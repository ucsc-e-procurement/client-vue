<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";
import { Doughnut } from "vue-chartjs";

/*

// Validation Library - Vuelidate
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

*/

/* Note: When Declaring Variables, always think about how Form Validation Rules are applied */
export default {
  // Mixins
  mixins: [Doughnut],

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
      labels: [],
      datasets: [
        {
          label: "Monthly Product Requisitions",
          backgroundColor: [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850"
          ],
          data: []
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Annual Category-Wise Procurement Distribution"
      }
    }
  }),

  // Custom Methods and Functions
  methods: {
    getData(year) {
      return new Promise((resolve, reject) => {
        this.$http
          .get(
            `api/admin-analytics/annual-method-wise-procurement-count?year=${year}`
          )
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
    this.getData(2020)
      .then(data => {
        data.map(obj => {
          this.chartData.labels.push(obj.method);
          this.chartData.datasets[0].data.push(obj.count);
          return;
        });
        console.log(this.chartData.labels);
        console.log(this.chartData.datasets);
      })
      .catch();
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
