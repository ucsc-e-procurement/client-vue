<template>
  <ValidationObserver ref="observer" v-slot="{}">
    <form id="request-form">
      <v-card class="overflow-hidden" color="grey lighten-1" dark>
        <v-toolbar flat outlined color="primary" font="balck">
          <v-icon>mdi-cards-variant</v-icon>
          <v-toolbar-title class="font-weight-light"
            >Request Form</v-toolbar-title
          >
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <ValidationProvider v-slot="{ errors }" name="Name" rules="required">
            <v-text-field
              v-model="name"
              color="black"
              label="Procurement Name"
              required
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="Type" rules="required">
            <v-autocomplete
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
          <ValidationProvider v-slot="{ errors }" name="checkbox">
            <v-checkbox
              v-model="checkbox"
              :error-messages="errors"
              value="false"
              label="Re-order"
              type="checkbox"
              required
            ></v-checkbox>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="Description"
            rules="required"
          >
            <v-textarea
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
          <v-btn color="success" @click.stop="dialog = true">Submit</v-btn>
        </v-card-actions>
      </v-card>
      <v-row justify="center">
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Confirm Request?</v-card-title>

            <v-card-text
              >By proceeding you are accepting to initialize a new procurement
              process</v-card-text
            >

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                class="mr-4"
                color="green darken-1"
                text
                @click="submit"
                to="/hod"
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
import axios from "axios";

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
      descript: "",
      dialog: false,
      model: null,
      statesProcType: [
        { name: "Services", abbr: "S", id: 1 },
        { name: "Work", abbr: "W", id: 2 },
        { name: "Goods", abbr: "G", id: 3 },
      ],
      checkbox: false,
      division: "ENG",
      head_of_division_id: "emp00004",
    };
  },

  methods: {
    submit() {
      this.$refs.observer.validate();
      axios
        .post("http://localhost:5001/api/hod/create_req", {
          //body
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
