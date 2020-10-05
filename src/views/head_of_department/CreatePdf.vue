<template>
  <v-row align="center">
    <v-col class="text-center" cols="12" sm="4">
      <div class="my-2">
        <v-btn
              class="ma-2"
              :disabled="!checkbox"
              depressed
              large
              color=""
              @click="reset"
              >Reset</v-btn
            >
      </div>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
    };
  },
  created() {
   
  }
};
</script>
