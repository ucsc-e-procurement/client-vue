<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <form id="request-form" @submit.prevent="handleSubmit(onSubmit)">
      <v-card class="overflow-hidden" color="grey lighten-1" dark>
        <v-toolbar flat outlined color="grey" font="balck">
          <v-icon>mdi-cards-variant</v-icon>
          <v-toolbar-title class="font-weight-light"
            >Request Form</v-toolbar-title
          >
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <ValidationProvider v-slot="{ errors }" name="Type" rules="required">
            <v-autocomplete
              v-model="selectProcType"
              :items="statesProcType"
              :filter="customFilter"
              color="black"
              item-text="name"
              label="Type of Procurment"
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
          <!-- include the inputs here-->
          <ValidationProvider>
            <v-btn
              class="ma-2"
              :disabled="!checkbox"
              depressed
              large
              color="primary"
              @click="additem"
              >Add item</v-btn
            >
            <v-btn
              class="ma-2"
              :disabled="!checkbox"
              depressed
              large
              color="warning"
              @click="reset"
              >Reset</v-btn
            >
            <!-- <ValidationObserver ref="addItemObsever"> -->
            <v-row align="center">
              <v-col cols="8">
                <v-autocomplete
                  :disabled="!checkbox"
                  v-model="value"
                  :items="item_list"
                  dense
                  filled
                  label="Search Item"
                ></v-autocomplete>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  :disabled="!checkbox"
                  v-model="quantity"
                  type="number"
                  label="Quantity"
                  min="1"
                  oninput="validity.valid||(value='')"
                />
              </v-col>
            </v-row>
            <!-- </ValidationObserver> -->
            <v-simple-table
              :disabled="!checkbox"
              :dense="dense"
              :fixed-header="fixedHeader"
              :height="height"
              light
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Item</th>
                    <th class="text-left">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in product_request" :key="item.product_name">
                    <td>{{ item.product_name }}</td>
                    <td>{{ item.qnty }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </ValidationProvider>
          <!-- item inclusion-->
          <ValidationProvider
            v-slot="{ errors }"
            name="Description"
            rules="required"
          >
            <div class="my-2">
              <v-textarea
                v-model="descript"
                outlined
                name="input-7-4"
                label="Product Description"
                required
                :error-messages="errors"
              ></v-textarea>
            </div>
          </ValidationProvider>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click.stop="dialog1 = true">Submit</v-btn>
        </v-card-actions>
      </v-card>
      <v-row justify="center">
        <v-dialog v-model="dialog1" max-width="290">
          <v-card>
            <v-card-title class="headline">Confirm Request?</v-card-title>

            <v-card-text>
              By proceeding you are accepting to initialize a new procurement
              process
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn type="submit" color="green darken-1" text @click="submit"
                >Proceed</v-btn
              >

              <v-btn color="red darken-1" text @click="dialog2 = false"
                >Cancel</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="dialog2" max-width="290">
          <v-card>
            <v-card-title class="headline">Error</v-card-title>

            <v-card-text>Please select product!</v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="red darken-1" text @click="dialog2 = false"
                >Ok</v-btn
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
  setInteractionMode
} from "vee-validate";
import axios from "axios";
setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});
export default {
  components: { ValidationProvider, ValidationObserver },
  data() {
    return {
      dialog1: false,
      dialog2: false,
      model: null,
      dense: true,
      fixedHeader: false,
      height: 300,
      selectProcType: null,
      descript: "",
      statesProcType: [
        { name: "Services", abbr: "S", id: 1 },
        { name: "Work", abbr: "W", id: 2 },
        { name: "Goods", abbr: "G", id: 3 }
      ],
      checkbox: false,
      division: "ENG",
      head_of_division_id: "emp00004",
      director_id: "",
      deputy_bursar_id: "",
      reorder: false,
      procurement_type: "",
      product_request: [],
      products: [],
      item_list: [
        "Canon laser printer DM-1000X",
        "Canon digital scanner NP-3200T",
        "Canon DM-1000X printer toner",
        "30GSM A4 standard quality paper",
        "60GSM A4 printer quality paper"
      ],
      value: "",
      quantity: 1
    };
  },
  created() {
    axios
      .get(`http://localhost:5000/api/hod/dir_empid`)
      .then(response => {
        this.director_id = response.data[0].employee_id;
      })
      .catch(error => console.log(error));
    axios
      .get(`http://localhost:5000/api/hod/db_empid`)
      .then(response => {
        this.deputy_bursar_id = response.data[0].employee_id;
      })
      .catch(error => console.log(error));
    axios
      .get(`http://localhost:5000/api/hod/products`)
      .then(response => {
        this.products = response.data[0].employee_id;
      })
      .catch(error => console.log(error));
    //getAllProducts();
  },
  methods: {
    getAllProducts() {
      for (const item of this.products.product_name) {
        this.item_list.push(item);
      }
    },
    reset() {
      this.product_request = [];
      this.value = "";
    },
    additem() {
      if (this.value == "") {
        this.dialog2 = true;
        return;
      }
      var obj = {};
      obj["product_name"] = this.value;
      obj["qnty"] = this.quantity;
      this.product_request.push(obj);
    },
    submit() {
      this.$refs.observer.validate().then(success => {
        if (!success) {
          return;
        }
        switch (this.selectProcType) {
          case "Services":
            this.procurement_type = "S";
            break;
          case "Work":
            this.procurement_type = "W";
            break;
          default:
            this.procurement_type = "G";
            break;
        }
        {
          this.checkbox ? (this.reorder = true) : (this.reorder = false);
        }
        axios
          .post("http://localhost:5000/api/hod/create_req", {
            description: this.descript,
            procurement_type: this.procurement_type,
            head_of_division_id: this.head_of_division_id,
            director_id: this.director_id,
            deputy_bursar_id: this.deputy_bursar_id,
            division: this.division,
            reorder: this.reorder
          })
          .then(response => {
            console.log(response);
            // alert(JSON.stringify(response));
          })
          .catch(error => {
            console.log(error);
            // alert(JSON.stringify(error));
          });
        window.location.href = "http://localhost:8080/hod";
      });
    }
  }
};
</script>
