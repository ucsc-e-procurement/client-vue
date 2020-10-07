<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <form id="request-form" @submit.prevent="handleSubmit(onSubmit)">
      <v-card class="overflow-hidden" color="">
        <v-toolbar flat outlined color="" font="balck">
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
              outlined
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
              color=""
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
                  label="Search Item"
                  outlined
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
                  outlined
                  dense
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
          <v-btn color="primary" @click.stop="dialog1 = true">Submit</v-btn>
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

              <v-btn type="submit" color="green darken-1" text @click="submit()"
                >Proceed</v-btn
              >

              <v-btn color="red darken-1" text @click="dialog1 = false"
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
      item_list: [],
      value: "",
      quantity: 1,
      req_seq: 0, //last updated sequance
      requisition_id: "",
      current_date: ""
    };
  },
  created() {
    axios
      .get(`http://localhost:5000/api/hod/dir_empid`)
      .then(response => {
        this.director_id = response.data[0].employee_id;
        //console.log(this.director_id);
      })
      .catch(error => console.log(error));
    axios
      .get(`http://localhost:5000/api/hod/db_empid`)
      .then(response => {
        this.deputy_bursar_id = response.data[0].employee_id;
        //console.log(this.deputy_bursar_id);
      })
      .catch(error => console.log(error));
    axios
      .get(`http://localhost:5000/api/hod/get_req_seq`)
      .then(response => {
        this.req_seq = response.data[0].id;
        console.log(this.req_seq);
      })
      .catch(error => console.log(error));
    axios
      .get(`http://localhost:5000/api/hod/products`)
      .then(response => {
        this.products = response.data;
        this.products.forEach((value, index) =>{
          console.log(value.product_name);
          this.item_list.push(value.product_id + ': [' + value.product_name + ']')
        });
      })
      .catch(error => console.log(error));
    //getAllProducts();
    this.getCurrentDate();
    this.getReqID();
  },
  methods: {

    getCurrentDate(){
      var today = new Date();
      var dd = today.getDate();

      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear();
      if(dd<10) 
      {
          dd='0'+dd;
      } 

      if(mm<10) 
      {
          mm='0'+mm;
      }
      var final = yyyy+'-'+mm+'-'+dd;
      this.current_date = final;
    },

    getAllProducts() {
      for (const item of this.products.product_name) {
        this.item_list.push(item);
      }
    },
    zeroFill( number, width ){
        width -= number.toString().length;
        if ( width > 0 ){
          return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
        }
        return number + ""; // always return a string
      },

    getReqID(){
       var str1 = "2020/";
      var next = this.req_seq + 1;
      var str2 = this.zeroFill(next, 7);
      this.requisition_id = str1.concat(str2);
      console.log(this.requisition_id);
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
      obj["requisition_id"] = this.requisition_id;
      obj["product_name"] = this.value;
      obj["qnty"] = this.quantity;
      this.product_request.push(obj);
      console.log(this.product_request);
      this.value = "";
      this.quantity = 1;
    },
    submit() {
      this.$refs.observer.validate().then(success => {
        if (!success) {
          alert("Your here");
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
        window.location.href = "http://localhost:8080/hod";

        //creating requisition
        axios
          .post(`http://localhost:5000/api/hod/create_req`, {
            requisition_id: this.requisition_id,
            description: this.descript,
            date: this.current_date,
            procurement_type: this.procurement_type,
            head_of_division_id: this.head_of_division_id,
            director_id: this.director_id,
            deputy_bursar_id: this.deputy_bursar_id,
            division: this.division,
            reorder: this.reorder
          })
          .then(response => {
            alert(response);
            //window.location.href = "http://localhost:8080/hod";
             console.log(JSON.stringify(response));
          })
          .catch(error => {
            alert(error);
            //window.location.href = "http://localhost:8080/hod";
            console.log(JSON.stringify(error));
          });

        //incrementing index
        let new_id = this.req_seq + 1;
        axios
          .post(`http://localhost:5000/api/hod/get_req_seq`, {
            id: new_id
          })
          .then(response => {
            alert(response);
            //window.location.href = "http://localhost:8080/hod";
            // alert(JSON.stringify(response));
          })
          .catch(error => {
            alert(error);
            //window.location.href = "http://localhost:8080/hod";
            // alert(JSON.stringify(error));
          });

        //adding products into product table
        if (this.product_request == []){
          window.location.href = "http://localhost:8080/hod";
          return;
        }
        axios
          .post(`http://localhost:5000/api/hod/add_prod`, {
            porduct_list: this.product_request
          })
          .then(response => {
            alert(response);
            //window.location.href = "http://localhost:8080/hod";
            // alert(JSON.stringify(response));
          })
          .catch(error => {
            alert(error);
            //window.location.href = "http://localhost:8080/hod";
            // alert(JSON.stringify(error));
          });
        
        //window.location.href = "http://localhost:8080/hod";
      });
    }
  }
};
</script>
