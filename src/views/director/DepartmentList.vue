<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->

            <v-row class="justify-space-between">
              <v-col cols="12">
                <v-card v-if="isMounted">
                  <v-card-title class="text-center justify-center py-6">
                    <h4 class="font-weight-bold ">Departments</h4>
                  </v-card-title>
                  <v-card>
                    <v-card-title>
                      <v-text-field
                        v-model="search"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-card-title>
                    <v-data-table
                      :headers="headers"
                      :items="departmentList"
                      :search="search"
                      v-if="isMounted"
                    >
                      <!-- eslint-disable-next-line no-console vue/valid-v-slot -->
                      <template v-slot:item.controls="props">
                        <v-btn
                          class="mx-2"
                          small
                          color="primary"
                          @click="onButtonClick(props.item)"
                        >
                          VIEW
                        </v-btn>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* Note: When Declaring Variables, always think about how Form Validation Rules are applied */
export default {
  props: [],

  // Imported Components
  components: {},

  // Data Variables and Values
  data: () => ({
    search: "",
    isMounted: false,
    tab: null,
    departmentList: [],
    headers: [
      {
        text: "Department",
        align: "start",
        value: "departmentname"
      },
      { text: "Code", value: "department" },
      { text: "Department Head", value: "name" },
      { text: "Actions", value: "controls", sortable: false }
    ],
    departments: {
      ADM: 0,
      ADMTC: "Advanced Digital Media Technology Centre",
      APB: 0,
      CDF: "Centre for Digital Forensics",
      CSC: "Computing Services Centre",
      EDC: "External Degrees Centre",
      eLC: "E-Learning Centre",
      ENG: "Engineering Department",
      EXM: "Examination Department",
      FIN: "Finance Department",
      LIB: "Library",
      NOC: "Network Operating Centre",
      PRP: 0,
      PDC: "Professional Development Centre",
      QAC: 0,
      SDU: 0,
      STR: 0
    }
  }),

  // Custom Methods and Functions
  methods: {
    onButtonClick: function(event) {
      console.log(event);
      this.$router.push({
        path: `departments/${event.department.replace(/[/]/g, "")}`,
        query: {
          department: event.department,
          departmentname: event.departmentname
        }
      });
    },

    getDepartments() {
      this.$http
        .get("/api/director/get_departments")
        .then(response => {
          this.departmentList = response.data.map(el => {
            var o = Object.assign({}, el);
            o.departmentname = this.departments[el.department];
            return o;
          });
          this.isMounted = true;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {
    this.getDepartments();
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
