<template>
  <v-card class="overflow-hidden" color="grey lighten-1" dark>
    <v-toolbar flat color="grey darken-3">
      <v-icon>mdi-cards-variant</v-icon>
      <v-toolbar-title class="font-weight-light">Request Form</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="grey " fab small @click="isEditing = !isEditing">
        <v-icon v-if="isEditing">mdi-close</v-icon>
        <v-icon v-else>mdi-pencil</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-text-field :disabled="!isEditing" color="black" label="Procurement Name"></v-text-field>
      <v-autocomplete
        :disabled="!isEditing"
        :items="statesProcType"
        :filter="customFilter"
        color="black"
        item-text="name"
        label="Type of Procurment"
      ></v-autocomplete>
      <v-autocomplete
        :disabled="!isEditing"
        :items="statesProcMethod"
        :filter="customFilter"
        color="black"
        item-text="name"
        label="Procurment Method"
      ></v-autocomplete>
      <v-textarea :disabled="!isEditing" outlined name="input-7-4" label="Product Description"></v-textarea>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :disabled="!isEditing" color="success" @click="save">Save</v-btn>
    </v-card-actions>
    <v-snackbar
      v-model="hasSaved"
      :timeout="2000"
      absolute
      bottom
      left
    >Your request has been updated</v-snackbar>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      hasSaved: false,
      isEditing: null,
      model: null,
      statesProcType: [
        { name: "Services", abbr: "S", id: 1 },
        { name: "Work", abbr: "W", id: 2 },
        { name: "Goods", abbr: "G", id: 3 }
      ],
      statesProcMethod: [
        { name: "Direct Method", abbr: "DM", id: 1 },
        { name: "National Shopping", abbr: "NS", id: 2 },
        { name: "National Competitive Bidding", abbr: "NCB", id: 3 }
      ]
    };
  },

  methods: {
    save() {
      this.isEditing = !this.isEditing;
      this.hasSaved = true;
    }
  }
};
</script>