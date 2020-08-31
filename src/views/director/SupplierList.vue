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
                    <h4 class="font-weight-bold ">SUPPLIERS</h4>
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
                      :items="supplierList"
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
    supplierList: [],
    headers: [
      {
        text: "Supplier",
        align: "start",
        value: "name"
      },
      { text: "Category", value: "category" },
      { text: "Status", value: "status" },
      { text: "Actions", value: "controls", sortable: false }
    ]
  }),

  // Custom Methods and Functions
  methods: {
    onButtonClick: function(event) {
      console.log(event);
      this.$router.push({
        path: `suppliers/${event.supplier_id.replace(/[/]/g, "")}`,
        query: {
          supplierId: event.supplier_id
        }
      });
    },

    getSuppliers() {
      this.$http
        .get("/api/director/get_suppliers")
        .then(response => {
          // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", response);
          this.supplierList = response.data;
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
    this.getSuppliers();
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
