<template>
  <v-container class="elevation-1">
    <v-row no-gutters>
      <h5 class="headline">Schedule of Requirements</h5>
    </v-row>
    <v-divider class="mt-1"></v-divider>
    <table>
      <thead>
        <tr>
          <th>Description of Goods</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="(item, index) in this.products" :key="index">
          <td>{{ item.product_name }}</td>
          <td>{{ item.qty }}</td>
        </tr>
      </tbody>
    </table>
    <v-row no-gutters class="mt-4 caption">

      If exceeds the delivery period :<b>[ Insert Delivery Period ]</b> weeks,
      Late delivery charges 0.5% per week of the total contract sum.

      <ul>
        <li>
          The maximum amount of Late Delivery charges shall be 10% of the total
          contract sum.
        </li>
      </ul>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["products"]
};
</script>

<style scoped>
table {
  width: 100%;
  font-size: 12px;
}
td {
  border: 1px solid black;
  padding: 5px;
}
</style>
