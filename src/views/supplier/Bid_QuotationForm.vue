<template>
    <v-container class="elevation-1">
        <v-row no-gutters>
        <h5 class="headline">Quotation Submission Form</h5>
        </v-row>
        <v-divider class="mt-1"></v-divider>
        <v-row no-gutters class="mt-4 caption">
            If exceeds the delivery period :<b>[ Insert Delivery Period ]</b> weeks, Late delivery charges 0.5% per week of 
            the total contract sum.
            <ul><li>The maximum amount of Late Delivery charges shall be 10% of the total contract sum.</li></ul>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props: ['products']
}
</script>
