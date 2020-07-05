<template>
  <v-card color="warning">
    <v-card-title>Deputy Bursar Approved</v-card-title>
    <v-spacer></v-spacer>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table :headers="headers" :items="procs" :search="search"></v-data-table>
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
          text: "Request Id",
          align: "start",
          sortable: false,
          value: "requisition_id"
        },
        { text: "Description", value: "description" },
        { text: "Date", value: "date" }
      ],
      procs: []
    };
  },
  created() {
    axios
      .get(`http://localhost:5000/api/hod/approved/${this.empid}`)
      .then(response => {
        this.procs = response.data;
      })
      .catch(error => console.log(error));
  }
};
</script>
