<template>
  <ValidationObserver ref="observer" v-slot="{}">
    <form>
      <v-card class="overflow-hidden" color="grey lighten-1" dark>
        <v-toolbar flat outlined color="primary" font="balck">
          <v-icon>mdi-cards-variant</v-icon>
          <v-toolbar-title class="font-weight-light"
            >Request Form</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn color="grey " fab small @click="isEditing = !isEditing">
            <v-icon v-if="isEditing">mdi-close</v-icon>
            <v-icon v-else>mdi-pencil</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <ValidationProvider v-slot="{ errors }" name="Name" rules="required">
            <v-text-field
              v-model="name"
              :disabled="!isEditing"
              color="black"
              label="Procurement Name"
              required
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="Type" rules="required">
            <v-autocomplete
              :disabled="!isEditing"
              v-model="selectProcType"
              :items="statesProcType"
              :filter="customFilter"
              color="black"
              item-text="name"
              label="Type of Procurment"
              required
              :error-messages="errors"
            ></v-autocomplete>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="Method"
            rules="required"
          >
            <v-autocomplete
              :disabled="!isEditing"
              v-model="selectProcMethod"
              :items="statesProcMethod"
              :filter="customFilter"
              color="black"
              item-text="name"
              label="Procurment Method"
              required
              :error-messages="errors"
            ></v-autocomplete>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="Description"
            rules="required"
          >
            <v-textarea
              :disabled="!isEditing"
              v-model="descript"
              outlined
              name="input-7-4"
              label="Product Description"
              required
              :error-messages="errors"
            ></v-textarea>
          </ValidationProvider>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!isEditing" color="success" @click="save"
            >Save</v-btn
          >
        </v-card-actions>
        <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left
          >Your request has been updated</v-snackbar
        >
      </v-card>
      <v-row justify="center">
        <v-btn color="warning" dark @click.stop="dialog = true">Submit</v-btn>

        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Submit Request?</v-card-title>

            <v-card-text
              >By proceeding you are accepting to initialize a new procurement
              process</v-card-text
            >

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click="submit" to="/hod"
                >Proceed</v-btn
              >

              <v-btn color="red darken-1" text @click="dialog = false"
                >Cancel</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </form>
  </ValidationObserver>
</template>

<script>
import { required } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

export default {
  components: { ValidationProvider, ValidationObserver },

  data() {
    return {
      name: "",
      selectProcType: null,
      selectProcMethod: null,
      descript: "",
      dialog: false,
      hasSaved: false,
      isEditing: null,
      model: null,
      statesProcType: [
        { name: "Services", abbr: "S", id: 1 },
        { name: "Work", abbr: "W", id: 2 },
        { name: "Goods", abbr: "G", id: 3 },
      ],
      statesProcMethod: [
        { name: "Direct Method", abbr: "DM", id: 1 },
        { name: "National Shopping", abbr: "NS", id: 2 },
        { name: "National Competitive Bidding", abbr: "NCB", id: 3 },
      ],
    };
  },

  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    save() {
      this.isEditing = !this.isEditing;
      this.hasSaved = true;
    },
  },
};
</script>
