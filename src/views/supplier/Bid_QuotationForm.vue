<template>
  <v-container class="elevation-1">
    <v-row no-gutters>
      <h5 class="headline">Quotation Submission Form</h5>
    </v-row>
    <v-divider class="mt-1"></v-divider>
    <v-row no-gutters class="mt-4 caption">
      Date : {{ new Date().toISOString().substr(0, 10) }}
    </v-row>
    <v-row no-gutters class="mt-2 caption">
      No : {{ this.procurement.procurement_id }}
    </v-row>
    <v-row no-gutters class="mt-2 caption">
      To : Chairman, Procurement Committee, University of Colombo School of
      Computing
    </v-row>
    <v-row no-gutters class="mt-2 caption">
      We, the undersigned, declare that:<br />
      (a) We have examined and have no reservations to the Bidding Documents,
      including Addenda No.:<br />
      (b) We offer to supply in conformity with the Bidding Documents and in
      accordance with the Delivery Schedules specified in the Schedule of
      Requirements the following Goods and Related Services Supply &amp;
      Delivery of
      <b
        >[ {{ this.procurement.description }} ] [
        {{ this.procurement.procurement_id }} ]</b
      ><br />
      (c) Total price of our quotation without VAT, including any discounts
      offered is: Total before VAT <br />
      (d) Total price of our quotation including VAT, and any discounts offered
      is: Total After VAT.<br />
      (e) Our quotation shall be valid for the period of time specified in ITV
      Sub-Clause 8.1, from the date fixed for the quotation submission deadline
      in accordance with ITV Sub-Clause 11.1, and it shall remain binding upon
      us and may be accepted at any time before the expiration of that
      period;<br />
      (f) If our quotation is accepted, we commit to obtain a performance
      security in accordance with ITV Clause 22<br />
      (h) Our firm, its affiliates or subsidiaries—including any subcontractors
      or suppliers for any part of the contract—has not been declared
      blacklisted by the National Procurement Agency;<br />
      (k) We understand that this quotation, together with your written
      acceptance thereof included in your notification of award, shall
      constitute a binding contract between us, until a formal contract is
      prepared and executed.<br />
      (l) We understand that you are not bound to accept the lowest evaluated
      quotation or any other quotation that you may receive.<br />
    </v-row>
    <v-row no-gutters class="mt-4 caption">
      Signed:
    </v-row>
    <v-row no-gutters class="mt-4 caption">
      In the capacity of<br />
      Name:<br />
      Duly Authorize to sign the quotation for and on behalf of:<br />
      Dated on ____________ day of __________________
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["procurement"]
};
</script>
