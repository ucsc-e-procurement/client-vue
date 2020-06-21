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
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Procurement name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Initialized Date", value: "date" },
      ],
      procs: [
        {
          name: "Canon printer DM-10100",
          date: "2015-06-26",
        },
        {
          name: "iMac Pro for creative lab",
          date: "2015-06-26",
        },
        {
          name: "HDR display",
          date: "2015-06-26",
        },
        {
          name: "Toner for Canon DM-10100",
          date: "2015-06-26",
        },
        {
          name: "GeForce GTX 1080",
          date: "2015-06-26",
        },
        {
          name: "GeForce RTX 2070",
          date: "2015-06-26",
        },
        {
          name: "AMD Radeon RX Vega 24",
          date: "2015-06-26",
        },
        {
          name: "Mellanox Ethernet hub",
          date: "2015-06-26",
        },
        {
          name: "NEC 3D projector",
          date: "2015-06-26",
        },
        {
          name: "10GBit 120m ethernet cables",
          date: "2015-06-26",
        },
      ],
    };
  },
};
</script>
