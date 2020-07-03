<template>
  <v-card color="warning">
    <v-card-title>Initialized</v-card-title>
    <v-spacer></v-spacer>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="procs"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      empid: "emp00004", //get employid from store
      search: "",
      headers: [
        {
          text: "Procurement Id",
          align: "start",
          sortable: false,
          value: "requisition_id",
        },
        { text: "Procurement Name", value: "procurement_name" },
        { text: "Description", value: "description" },
        { text: "Date", value: "date" },
      ],
      procs: [],
    };
  },
  created() {
    axios
      .get(`http://localhost:5001/api/hod/init/${this.empid}`)
      .then((response) => {
        this.procs = response.data;
      })
      .catch((error) => console.log(error));
  },
};
</script>
