<template>
  <v-container class="elevation-1">
    <v-row no-gutters>
      <h5 class="headline">Data Sheet</h5>
    </v-row>
    <v-divider class="mt-1"></v-divider>
    <table>
      <tbody>
        <tr>
          <td width="10%" class="text-center">ITV Clause Reference</td>
          <td></td>
        </tr>
        <tr>
          <td width="10%" class="text-center">1.1</td>
          <td>
            The Purchaser is : <b>{{ this.data.itvCR_1_1.purchaser }}</b
            ><br />
            Address: <b>{{ this.data.itvCR_1_1.address }}</b>
          </td>
        </tr>
        <tr>
          <td width="10%" class="text-center">5.1</td>
          <td>
            If the bidder is allowed to quote for less than the all the items
            specified, indicate the details:<br />
            <b>{{ this.data.itvCR_5_1 }}</b>
          </td>
        </tr>
        <tr>
          <td width="10%" class="text-center">7.3</td>
          <td>{{ this.data.itvCR_7_3 }}</td>
        </tr>
        <tr>
          <td width="10%" class="text-center">8</td>
          <td>
            The Quotation shall be valid until:
            <b>{{ this.data.itvCR_8.quotationValidUntil }}</b>
          </td>
        </tr>
        <tr>
          <td width="10%" class="text-center">11.1</td>
          <td>
            Address for submission of Quotations is:<br />
            <b>{{ this.data.itvCR_11_1.address }}</b
            ><br />
            Deadline for submission of quoted items is:
            <b
              >{{ this.data.itvCR_11_1.deadlineDate }} -
              {{ this.data.itvCR_11_1.deadlineTime }}</b
            >
          </td>
        </tr>
        <tr>
          <td width="10%" class="text-center">3.1</td>
          <td>
            The Bidder shall submit the following additional documents:<br />
            <ul
              v-for="(doc, index) in this.data.itvCR_3_1.additionalDocuments"
              :key="index"
            >
              <li>{{ doc }}</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td width="10%" class="text-center">13</td>
          <td>
            The sealed quotation dropped into the tender box at the Finance
            branch UCSC on or before
            <b>{{ this.data.itvCR_13.quotationOpenAddress }}</b>
          </td>
        </tr>
        <tr>
          <td width="10%" class="text-center">16</td>
          <td>
            Other factors that will be considered for evaluation are (List and
            describe the methodology):<br />
            <ul
              v-for="(doc, index) in this.data.itvCR_16.evaluationFactors"
              :key="index"
            >
              <li>{{ doc }}</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td width="10%" class="text-center">20</td>
          <td>
            The method and conditions of payment to be made to the Supplier
            under this Contract shall be as follows:<br />
            {{ this.data.itvCR_20.methodsAndConditionsOfPayment }}
          </td>
        </tr>
      </tbody>
    </table>
  </v-container>
</template>
<script>
export default {
  props: ["deadline", "data"]
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
