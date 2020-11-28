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

            The Purchaser is :
            <b>[ University of Colombo School of Computing ]</b><br />
            Address: <b>No:35, Reid Avenue, Colombo 07.</b>

          </td>
        </tr>
        <tr>
          <td width="10%" class="text-center">5.1</td>
          <td>
            If the bidder is allowed to quote for less than the all the items
            specified, indicate the details:<br />

            <b>[ Should be quote for total Items ]</b>

          </td>
        </tr>
        <tr>
          <td width="10%" class="text-center">7.3</td>

          <td>Manufacture’s Authorization is required</td>

        </tr>
        <tr>
          <td width="10%" class="text-center">8</td>
          <td>

            The Quotation shall be valid until: <b>{{ this.deadline }}</b>

          </td>
        </tr>
        <tr>
          <td width="10%" class="text-center">11.1</td>
          <td>
            Address for submission of Quotations is:<br />

            <b
              >Assistant Bursar – Procurement<br />
              University of Colombo School of Computing<br />
              No 35 Reid Avenue Colombo 00700.</b
            ><br />
            Deadline for submission of quoted items is:
            <b>{{ this.deadline }}</b>

          </td>
        </tr>
        <tr>
          <td width="10%" class="text-center">3.1</td>
          <td>
            The Bidder shall submit the following additional documents:<br />

            a) Bidder should have a proven track record in selling and
            maintaining of Office Chairs for a minimum period of 03 Years.<br />
            b) Comprehensive Warranty confirmation from the Vendor<br />
            c) Vendor should provide documentary evidence to substantiate these
            conditions.<br />

          </td>
        </tr>
        <tr>
          <td width="10%" class="text-center">13</td>
          <td>
            The sealed quotation dropped into the tender box at the Finance

            branch UCSC on or before <b>{{ this.deadline }}</b>

          </td>
        </tr>
        <tr>
          <td width="10%" class="text-center">16</td>
          <td>
            Other factors that will be considered for evaluation are (List and
            describe the methodology):<br />

            a) The Price as quoted;<br />
            b) Price adjustment for correction of arithmetical errors;<br />
            c) Price adjustment due to discounts offered.<br />
            d) Bidder should have a proven track record in selling and
            maintaining <b>[ Insert goods name ]</b> for a minimum period of
            <b>[ Insert no of years ]</b> Years.<br />
            e) Bidder shall not be allowed to quote part of the bid.<br />
            f) Sample should be according to the specification &amp; good
            quality.

          </td>
        </tr>
        <tr>
          <td width="10%" class="text-center">20</td>
          <td>
            The method and conditions of payment to be made to the Supplier
            under this Contract shall be as follows:<br />

            <ul>
              <li>Advance payment will not be allowed.</li>
              <li>
                Payment shall be made in Sri Lanka Rupees within Thirty (30)
                days of presentation of claim supported by a certificate from
                the Purchaser declaring that the Goods have been delivered and
                that all other contracted Services have been performed.
              </li>
            </ul>

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
