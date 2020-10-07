<template>
  <v-container fluid class="px-0 py-0">
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-stepper v-if="this.procurement.procurement_method == 'shopping'" v-model="step">
          <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1"></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" step="2"></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 3" step="3"></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 4" step="4"></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 5" step="5"></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 6" step="6"></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 7" step="7"></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 8" step="8"></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 9" step="9"></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="10"></v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <instructions v-if="this.method" />
              <v-btn color="primary mt-3" @click="step = 2">Continue</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <datasheet
                v-if="this.method"
                :deadline="this.procurement.deadline"
                :data="this.fbData[0].doc"
              />
              <v-btn class="mt-3" text @click.native="step = 1">Back</v-btn>
              <v-btn color="primary mt-3 float-right" @click="step = 3"
                >Continue</v-btn
              >
            </v-stepper-content>

            <v-stepper-content step="3">
              <schedule :products="JSON.parse(this.procurement.products)" />
              <v-btn class="mt-3" text @click.native="step = 2">Back</v-btn>
              <v-btn color="primary mt-3 float-right" @click="step = 4"
                >Continue</v-btn
              >
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-container class="elevation-1">
                <v-row no-gutters>
                  <h5 class="headline">
                    Technical Specification and Compliance
                  </h5>
                </v-row>
                <v-divider class="mt-1"></v-divider>
                <v-container
                  v-for="(item, index) in this.fbData[0].items"
                  :key="index"
                >
                  <table class="mt-4" style="width: 100%; font-size: 12px">
                    <caption>
                      {{
                        item.ItemName
                      }}
                    </caption>
                    <thead>
                      <tr>
                        <th wdith="15%">Features</th>
                        <th>Minimum Specification</th>
                        <th width="20%">Bidder Response (Yes/No)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <ul
                            v-for="(feature, index) in item.Features"
                            :key="index"
                          >
                            <li class="py-2">{{ feature }}</li>
                          </ul>
                        </td>
                        <td>
                          <ul
                            v-for="(requirement,
                            index) in item.MinimumRequirement"
                            :key="index"
                          >
                            <li class="py-2">{{ requirement }}</li>
                          </ul>
                        </td>
                        <td>
                          <ul
                            v-for="(response, index) in item.bidderResponse"
                            :key="index"
                            style="list-style-type: none"
                          >
                            <li class="py-2 text-center">
                              <input
                                type="checkbox"
                                true-value="Yes"
                                false-value="No"
                                v-model="item.bidderResponse[index]"
                              />
                              <span> {{ response }}</span>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-container>
              </v-container>
              <v-btn class="mt-3" text @click.native="step = 3">Back</v-btn>
              <v-btn color="primary mt-3 float-right" @click="step = 5"
                >Continue</v-btn
              >
            </v-stepper-content>

            <v-stepper-content step="5">
              <v-container class="elevation-1">
                <v-row no-gutters>
                  <h5 class="headline">Price Schedule</h5>
                </v-row>
                <v-divider class="mt-1"></v-divider>

                <v-row no-gutters class="my-2">
                  <h4>UNIVERSITY OF COLOMBO SCHOOL OF COMPUTING</h4>
                </v-row>
                <v-row no-gutters>
                  <h5>Tender Number : {{ this.procurement.procurement_id }}</h5>
                </v-row>
                <v-row no-gutters>
                  <h5>Closing Date & Time : {{ this.procurement.deadline }}</h5>
                </v-row>

                <v-card class="my-2 py-2 px-1" id="schedule">
                  <table class="mt-4">
                    <thead>
                      <tr>
                        <th rowspan="2">#</th>
                        <th scope="col" rowspan="2" class="border-bottom-2">
                          Description of Materials/Services required
                        </th>
                        <th width="5%" scope="col" rowspan="2">Qty</th>
                        <th width="20%" scope="col" colspan="3">
                          Unit Price (Rs.)
                        </th>
                        <th width="10%" scope="col" rowspan="2">
                          Make/Model & Trademark
                        </th>
                        <th width="10%" scope="col" rowspan="2">
                          Date by which delivery can be completed
                        </th>
                        <th width="5%" scope="col" rowspan="2">
                          Quotation validity period
                        </th>
                        <th width="10%" scope="col" rowspan="2">
                          Period for which credit facilities offered
                        </th>
                        <th width="10%" rowspan="2">Action</th>
                      </tr>
                      <tr>
                        <th width="10%">Without VAT</th>
                        <th width="10%">VAT</th>
                        <th width="10%">Discount (if any)</th>
                      </tr>
                    </thead>
                    <tbody class="text-center">
                      <tr v-for="(item, index) in items" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td style="max-width: 30px">
                          <span v-if="editIndex !== index">{{
                            item.description
                          }}</span>
                          <span v-if="editIndex === index">
                            <v-text-field v-model="item.description" disabled />
                          </span>
                        </td>
                        <td>
                          <span v-if="editIndex !== index">{{ item.qty }}</span>
                          <span v-if="editIndex === index">
                            <v-text-field
                              type="number"
                              min="0"
                              oninput="validity.valid||(value='')"
                              v-model.number="item.qty"
                            />
                          </span>
                        </td>
                        <td>
                          <span v-if="editIndex !== index">{{
                            item.figures
                          }}</span>
                          <span v-if="editIndex === index">
                            <v-text-field
                              type="number"
                              step=".01"
                              min="0"
                              oninput="validity.valid||(value='')"
                              v-model.number="item.figures"
                            />
                          </span>
                        </td>
                        <td>
                          <span v-if="editIndex !== index">{{ item.vat }}</span>
                          <span v-if="editIndex === index">
                            <v-text-field
                              type="number"
                              step=".01"
                              min="0"
                              oninput="validity.valid||(value='')"
                              v-model.number="item.vat"
                            />
                          </span>
                        </td>
                        <td>
                          <span v-if="editIndex !== index">{{ item.discount }}</span>
                          <span v-if="editIndex === index">
                            <v-text-field
                              type="number"
                              step=".01"
                              min="0"
                              oninput="validity.valid||(value='')"
                              v-model.number="item.discount"
                            />
                          </span>
                        </td>
                        <td>
                          <span v-if="editIndex !== index">{{
                            item.make
                          }}</span>
                          <span v-if="editIndex === index">
                            <v-text-field v-model="item.make" />
                          </span>
                        </td>
                        <td>
                          <span v-if="editIndex !== index">{{
                            item.date
                          }}</span>
                          <span v-if="editIndex === index">
                            <v-menu
                              v-model="menu"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="item.date"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="item.date"
                                @input="menu = false"
                              ></v-date-picker>
                            </v-menu>
                          </span>
                        </td>
                        <td>
                          <span v-if="editIndex !== index">{{
                            item.validity
                          }}</span>
                          <span v-if="editIndex === index">
                            <v-text-field
                              type="number"
                              min="0"
                              oninput="validity.valid||(value='')"
                              v-model.number="item.validity"
                            />
                          </span>
                        </td>
                        <td>
                          <span v-if="editIndex !== index">{{
                            item.credit
                          }}</span>
                          <span v-if="editIndex === index">
                            <v-text-field
                              type="number"
                              min="0"
                              oninput="validity.valid||(value='')"
                              v-model.number="item.credit"
                            />
                          </span>
                        </td>
                        <td class="py-2">
                          <span v-if="editIndex !== index">
                            <v-icon @click="edit(item, index)" class="mx-1"
                              >mdi-pencil</v-icon
                            >
                          </span>
                          <span v-else>
                            <v-icon @click="cancel(item)" class="mx-1"
                              >mdi-close</v-icon
                            >
                            <v-icon @click="save(item)" class="mx-1"
                              >mdi-check</v-icon
                            >
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-card>

                <v-row no-gutters class="my-2 mt-4">
                  <v-col cols="12" sm="6">
                    <v-card class="px-3 py-3">
                      <v-text-field
                        :value="this.subTotal | money"
                        label="Grand Total without VAT (Rs.)"
                        readonly
                      ></v-text-field>
                      <v-text-field
                        class="mt-4"
                        :value="this.total | money"
                        label="Grand Total with VAT (Rs.)"
                        readonly
                      ></v-text-field>
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="5" class="ml-6">
                    <v-form
                      ref="form"
                      v-model="valid"
                    >
                      <v-text-field
                        v-model="vatNo"
                        label="Vat Registration No."
                        placeholder="Enter Vat Registration Number"
                        outlined
                        dense
                        :rules="[rules.vat]"
                      />
                    </v-form>
                  </v-col>
                </v-row>
              </v-container>
              <v-btn class="mt-3" text @click.native="step = 4">Back</v-btn>
              <v-btn color="primary mt-3 float-right" @click="validatePriceSchedule"
                >Continue</v-btn
              >
            </v-stepper-content>

            <v-stepper-content step="6">
              <quotationForm
                :procurement="this.procurement"
                :subtotal="this.subTotal | money"
                :total="this.total | money"
              />
              <v-btn class="mt-3" text @click.native="step = 5">Back</v-btn>
              <v-btn color="primary mt-3 float-right" @click="step = 7"
                >Continue</v-btn
              >
            </v-stepper-content>

            <v-stepper-content step="7">
              <v-container class="elevation-1">
                <v-row no-gutters>
                  <h5 class="headline">Manufacturer's Authorization</h5>
                </v-row>
                <v-divider class="mt-1"></v-divider>
                <v-row no-gutters class="py-2">
                  Download the document<v-icon
                    @click="downloadLetter"
                    class="mx-2"
                    >mdi-package-down</v-icon
                  >
                </v-row>
                <v-form
                    ref="form1"
                    v-model="valid"
                  >
                  <v-file-input
                    v-model="manufacturerDoc"
                    accept="image/jpg, image/png"
                    placeholder="Attach manufacturer's authorization"
                    hint="This should be a scanned image document"
                    persistent-hint
                    :rules="[rules.general]"
                  ></v-file-input>
                </v-form>
              </v-container>
              <v-btn class="mt-3" text @click.native="step = 6">Back</v-btn>
              <v-btn color="primary mt-3 float-right" @click="validateManAuth"
                >Continue</v-btn
              >
            </v-stepper-content>

            <v-stepper-content step="8">
              <v-container class="elevation-1">
                <v-row no-gutters>
                  <h5 class="headline">Bid Guarantee</h5>
                </v-row>
                <v-divider class="mt-1"></v-divider>
                <v-row no-gutters class="py-2">
                  Download the document<v-icon @click="downloadBid" class="mx-2"
                    >mdi-package-down</v-icon
                  >
                </v-row>
                <v-form
                  ref="form2"
                  v-model="valid"
                >
                <v-file-input
                  v-model="bidGuarantee"
                  accept="image/jpg, image/png"
                  placeholder="Attach bid guarantee here"
                  hint="This should be a scanned image document"
                  persistent-hint
                  :rules="[rules.general]"
                ></v-file-input>
                </v-form>
              </v-container>
              <v-btn class="mt-3" text @click.native="step = 7">Back</v-btn>
              <v-btn color="primary mt-3 float-right" @click="validateBidGuarantee"
                >Continue</v-btn
              >
            </v-stepper-content>

            <v-stepper-content step="9">
              <v-form
                ref="form3"
                v-model="valid"
              >
                <v-container class="elevation-1">
                  <v-row no-gutters>
                    <h5 class="headline">Authorization to sign the Bid</h5>
                  </v-row>
                  <v-divider class="mt-1"></v-divider>
                  <v-row no-gutters class="caption mt-4">
                    Chairman – DPC<br />
                    University of Colombo School of Computing<br />
                    No 35 Reid Avenue Colombo 00700.
                  </v-row>
                  <v-row no-gutters class="caption mt-4">
                    Dear Sir
                  </v-row>
                  <v-row no-gutters class="subheading mt-4">
                    {{ this.procurement.description }} [
                    {{ this.procurement.procurement_id }} ]
                  </v-row>
                  <v-row no-gutters class="caption my-4">
                    This is to authorize that the under mentioned person, to sign
                    the documents pertaining to the above bid on behalf of your
                    organization.
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="authorizedName"
                        label="Authorized Person"
                        placeholder="Name of authorized person"
                        outlined
                        dense
                        :rules="[rules.general]"
                      />
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="authorizedNIC"
                        label="NIC No."
                        placeholder="NIC number of authorized person"
                        outlined
                        dense
                        :rules="[rules.general]"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="authorizedDesignation"
                        label="Designation"
                        placeholder="Designation of authorized person"
                        outlined
                        dense
                        :rules="[rules.general]"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <v-btn class="mt-3" text @click.native="step = 8">Back</v-btn>
              <v-btn color="primary mt-3 float-right" @click="validateAuthorization"
                >Continue</v-btn
              >
            </v-stepper-content>

            <v-stepper-content step="10">
              <v-container class="elevation-1">
                <v-row no-gutters>
                  <h5 class="headline">Other attachments</h5>
                </v-row>
                <v-file-input
                  v-model="otherDoc"
                  accept="application/pdf"
                  placeholder="Attach any other drawings/attachments"
                  hint="This should be a pdf file"
                  persistent-hint
                ></v-file-input>
              </v-container>
              <v-btn class="mt-3" text @click.native="step = 9">Back</v-btn>
              <v-btn color="primary mt-3 float-right" @click="submitBid"
                >Submit</v-btn
              >
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>

        <!-- View for Direct method quotation submission -->
        <v-container class="elevation-1" v-if="this.procurement.procurement_method == 'direct'">
          <v-row no-gutters>
            <h5 class="headline">Price Schedule</h5>
          </v-row>
          <v-divider class="mt-1"></v-divider>

          <v-row no-gutters class="my-2">
            <h4>UNIVERSITY OF COLOMBO SCHOOL OF COMPUTING</h4>
          </v-row>
          <v-row no-gutters>
            <h5>Tender Number : {{ this.procurement.procurement_id }}</h5>
          </v-row>
          <v-row no-gutters>
            <h5>Closing Date & Time : {{ this.procurement.deadline }}</h5>
          </v-row>

          <v-card class="my-2 py-2 px-1" id="schedule">
            <table class="mt-4">
              <thead>
                <tr>
                  <th rowspan="2">#</th>
                  <th scope="col" rowspan="2" class="border-bottom-2">
                    Description of Materials/Services required
                  </th>
                  <th width="5%" scope="col" rowspan="2">Qty</th>
                  <th width="20%" scope="col" colspan="3">
                    Unit Price (Rs.)
                  </th>
                  <th width="10%" scope="col" rowspan="2">
                    Make/Model & Trademark
                  </th>
                  <th width="10%" scope="col" rowspan="2">
                    Date by which delivery can be completed
                  </th>
                  <th width="5%" scope="col" rowspan="2">
                    Quotation validity period
                  </th>
                  <th width="10%" scope="col" rowspan="2">
                    Period for which credit facilities offered
                  </th>
                  <th width="10%" rowspan="2">Action</th>
                </tr>
                <tr>
                  <th width="10%">Without VAT</th>
                  <th width="10%">VAT</th>
                  <th width="10%">Discount (if any)</th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr v-for="(item, index) in items" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td style="max-width: 30px">
                    <span v-if="editIndex !== index">{{
                      item.description
                    }}</span>
                    <span v-if="editIndex === index">
                      <v-text-field v-model="item.description" disabled />
                    </span>
                  </td>
                  <td>
                    <span v-if="editIndex !== index">{{ item.qty }}</span>
                    <span v-if="editIndex === index">
                      <v-text-field
                        type="number"
                        min="0"
                        oninput="validity.valid||(value='')"
                        v-model.number="item.qty"
                      />
                    </span>
                  </td>
                  <td>
                    <span v-if="editIndex !== index">{{
                      item.figures
                    }}</span>
                    <span v-if="editIndex === index">
                      <v-text-field
                        type="number"
                        step=".01"
                        min="0"
                        oninput="validity.valid||(value='')"
                        v-model.number="item.figures"
                      />
                    </span>
                  </td>
                  <td>
                    <span v-if="editIndex !== index">{{ item.vat }}</span>
                    <span v-if="editIndex === index">
                      <v-text-field
                        type="number"
                        step=".01"
                        min="0"
                        oninput="validity.valid||(value='')"
                        v-model.number="item.vat"
                      />
                    </span>
                  </td>
                  <td>
                    <span v-if="editIndex !== index">{{ item.discount }}</span>
                    <span v-if="editIndex === index">
                      <v-text-field
                        type="number"
                        step=".01"
                        min="0"
                        oninput="validity.valid||(value='')"
                        v-model.number="item.discount"
                      />
                    </span>
                  </td>
                  <td>
                    <span v-if="editIndex !== index">{{
                      item.make
                    }}</span>
                    <span v-if="editIndex === index">
                      <v-text-field v-model="item.make" />
                    </span>
                  </td>
                  <td>
                    <span v-if="editIndex !== index">{{
                      item.date
                    }}</span>
                    <span v-if="editIndex === index">
                      <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="item.date"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="item.date"
                          @input="menu = false"
                        ></v-date-picker>
                      </v-menu>
                    </span>
                  </td>
                  <td>
                    <span v-if="editIndex !== index">{{
                      item.validity
                    }}</span>
                    <span v-if="editIndex === index">
                      <v-text-field
                        type="number"
                        min="0"
                        oninput="validity.valid||(value='')"
                        v-model.number="item.validity"
                      />
                    </span>
                  </td>
                  <td>
                    <span v-if="editIndex !== index">{{
                      item.credit
                    }}</span>
                    <span v-if="editIndex === index">
                      <v-text-field
                        type="number"
                        min="0"
                        oninput="validity.valid||(value='')"
                        v-model.number="item.credit"
                      />
                    </span>
                  </td>
                  <td class="py-2">
                    <span v-if="editIndex !== index">
                      <v-icon @click="edit(item, index)" class="mx-1"
                        >mdi-pencil</v-icon
                      >
                    </span>
                    <span v-else>
                      <v-icon @click="cancel(item)" class="mx-1"
                        >mdi-close</v-icon
                      >
                      <v-icon @click="save(item)" class="mx-1"
                        >mdi-check</v-icon
                      >
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-card>

          <v-row no-gutters class="my-2 mt-4">
            <v-col cols="12" sm="6">
              <v-card class="px-3 py-3">
                <v-text-field
                  :value="this.subTotal | money"
                  label="Grand Total without VAT (Rs.)"
                  readonly
                ></v-text-field>
                <v-text-field
                  class="mt-4"
                  :value="this.total | money"
                  label="Grand Total with VAT (Rs.)"
                  readonly
                ></v-text-field>
              </v-card>
            </v-col>

            <v-col cols="12" sm="5" class="ml-6">
              <v-form
                ref="form_quo"
                v-model="valid"
              >
                <v-text-field
                  v-model="vatNo"
                  label="Vat Registration No."
                  placeholder="Enter Vat Registration Number"
                  outlined
                  dense
                  :rules="[rules.vat]"
                />
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="authorizedName"
                      label="Authorized Person"
                      placeholder="Name of authorized person"
                      outlined
                      dense
                      :rules="[rules.general]"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="authorizedNIC"
                      label="NIC No."
                      placeholder="NIC number of authorized person"
                      outlined
                      dense
                      :rules="[rules.general]"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="authorizedDesignation"
                      label="Designation"
                      placeholder="Designation of authorized person"
                      outlined
                      dense
                      :rules="[rules.general]"
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
          <v-btn color="primary mt-3" @click="submitQuotation"
            >Submit Quotation</v-btn
          > 
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import instructions from "./Bid_Instructions";
import datasheet from "./Bid_Datasheet";
import schedule from "./Bid_Requirements";
import quotationForm from "./Bid_QuotationForm";

import firebase from "firebase";

export default {
  // Props Received
  props: ["procurement"],

  // Imported Components
  components: {
    instructions,
    datasheet,
    schedule,
    quotationForm
  },

  filters: {
    money: value =>
      new Intl.NumberFormat("sl-SL", {
        style: "currency",
        currency: "LKR"
      }).format(value)
  },

  // Data Variables and Values
  data: () => ({
    fbData: [],
    step: 1,
    method: true,
    valid: true,
    vatNo: null,
    authorizedName: "",
    authorizedDesignation: "",
    authorizedNIC: "",
    manufacturerDoc: null,
    bidGuarantee: null,
    otherDoc: null,
    editIndex: null,
    originalData: null,
    rules: {
      vat: v => !!v || "Vat Registration No. is required",
      general: v => !!v || "This is required"
    },
    items: [],
    menu: false,
    doc_id: null,
    encrypted: null
  }),

  // Custom Methods and Functions
  methods: {
    async getBidData() {
      let invRef = firebase.firestore().collection("ScheduleOfRequirements");
      let doc_id;
      this.fbData.push({
        doc: await invRef
          .where("InvitationNo", "==", this.procurement.procurement_id)
          .get()
          .then(function(querySnapshot) {
            let docArr;

            querySnapshot.forEach(function(doc) {
              docArr = doc.data();
              doc_id = doc.id;
            });

            return docArr;
          }),
        items: await invRef
          .doc(doc_id)
          .collection("Items")
          .get()
          .then(function(querySnapshot) {
            let itemArr = [];
            let iterator = 0;

            querySnapshot.forEach(function(doc) {
              itemArr.push(doc.data());
              itemArr[iterator].bidderResponse = [];
              for (const index in doc.data().Features) {
                itemArr[iterator].bidderResponse.push("No");
              }
              console.log(itemArr[iterator]);
              iterator++;
            });

            return itemArr;
          })
      });
      this.doc_id = doc_id;
    },

    // Price schedule table creation
    createTable() {
      let products = JSON.parse(this.procurement.products);
      console.log(this.procurement.procurement_method)
      this.originalData = null;
      for (const index in products) {
        this.items.push({
          prod_id: products[index]["product_id"],
          description: products[index]["product_name"],
          qty: products[index]["qty"],
          figures: 0,
          vat: 0,
          discount: 0,
          make: "-",
          date: new Date().toISOString().substr(0, 10),
          validity: 0,
          credit: 0
        });
      }
    },

    edit(item, index) {
      this.originalData = Object.assign({}, item);
      this.editIndex = index;
    },

    cancel(item) {
      this.editIndex = null;

      if (!this.originalData) {
        this.items.splice(this.items.indexOf(item), 1);
        return;
      }

      Object.assign(item, this.originalData);
      this.originalData = null;
    },

    save(item) {
      if (item.description && item.make) {
        this.originalData = null;
        this.editIndex = null;
      }
    },

    subtotal(item) {
      return item.qty * (item.figures - item.discount);
    },

    subtotalVAT(item) {
      return item.qty * (item.figures + item.vat - item.discount);
    },

    validatePriceSchedule() {
      if(this.$refs.form.validate()) {
        this.step = 6;
      }
    },

    // Manufacture authorization pdf download
    downloadLetter() {
      this.$http.get("/api/supplier/price_schedule/get_file").then(res => {
        if(res.data == "Successful") {
          let bytes = new Uint8Array(res.data.data);
          let blob = new Blob([bytes], { type: "application/pdf" });
          let fileURL = window.URL.createObjectURL(blob);
          let fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute("download", "manufacturer_auth.pdf");
          document.body.appendChild(fileLink);
          fileLink.click();
        } else alert("Something went wrong with downloading the file. Try again later!");
      });
    },

    // Download bid guarantee
    downloadBid() {
      this.$http
        .get("/api/supplier/price_schedule/get_bid_guarantee")
        .then(res => {
          if(res.data == "Successful") {
            let bytes = new Uint8Array(res.data.data);
            let blob = new Blob([bytes], { type: "application/pdf" });
            let fileURL = window.URL.createObjectURL(blob);
            let fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "bid_guarantee.pdf");
            document.body.appendChild(fileLink);
            fileLink.click();
          } else alert("Something went wrong with downloading the file. Try again later!");
        });
    },

    // Form validation methods
    validateManAuth() {
      if(this.fbData[0].doc.itvCR_7_3 == "Manufacture’s Authorization is required") {
        if(this.$refs.form1.validate()) {
          this.step = 8;
        }
      }
      else this.step = 8;  
    },

    validateBidGuarantee() {
      if(this.$refs.form2.validate()) {
        this.step = 9;
      }
    },

    validateAuthorization() {
      if(this.$refs.form3.validate()) {
        this.step = 10;
      }
    },

    // Shopping method bid submission
    submitBid() {
      let form = new FormData();

      form.append("supplier_id", this.procurement.supplier_id);
      form.append("procurement_id", this.procurement.procurement_id);
      form.append("vat_no", this.vatNo);
      form.append("authorized", this.authorizedName);
      form.append("designation", this.authorizedDesignation);
      form.append("nic", this.authorizedNIC);
      form.append("auth", this.manufacturerDoc);
      form.append("guarantee", this.bidGuarantee);
      form.append("extra", this.otherDoc);
      
      this.$http
        .get("/api/supplier/price_schedule/encryption_data", {
          params: {
            items: this.items,
            subTotal: this.subTotal,
            total: this.total
          }
        })
        .then(res => {
          this.encrypted = res.data.encrypted;
          // Get encrypted client key
          this.$http
            .post("https://us-central1-encryption-server.cloudfunctions.net/encrypt", {
              clientKey: res.data.key, 
              bidOpeningDate: this.fbData[0].doc.itvCR_11_1.deadlineDate
            })
            .then(res => {
              // Save data in firebase
              this.$http
                .post("/api/supplier/price_schedule/update_firebase", {
                  supplier_id: this.procurement.supplier_id,
                  doc_id: this.doc_id,
                  items: this.fbData[0].items,
                  bod: this.fbData[0].doc.itvCR_11_1.deadlineDate,
                  key: res.data.encryptedKey, 
                  encrypted: this.encrypted
                })
                .then(res => {
                  this.$http
                    .post("/api/supplier/price_schedule/:procurement", form)
                    .then(res => {
                      if(res.data == "Successful") {
                        // store images in firebase
                      let storageRef = firebase.storage().ref();
                      storageRef.child('man_auth/'+'bid0001').put(this.manufacturerDoc).then(function(snapshot) {
                        console.log(snapshot);
                      });
                      if(this.bidGuarantee != null) {
                        storageRef.child('bid_guarantee/'+'bid0001').put(this.bidGuarantee).then(function(snapshot) {
                          console.log(snapshot);
                        });
                      }
                      if(this.otherDoc != null) {
                        storageRef.child('other/'+'bid0001').put(this.otherDoc).then(function(snapshot) {
                          console.log(snapshot);
                        });
                      }
                      alert('bid submission successful');
                      this.$router.go(-1);
                      } else alert ('Error in submitting bid. Please try again later!')
                    });
                });
            });
        })
    },

    // Direct submission function
    submitQuotation() {
      if(this.$refs.form_quo.validate()) {
        this.$http.post('/api/supplier/price_schedule_direct/:procurement', {
          supplier_id: this.procurement.supplier_id,
          procurement_id: this.procurement.procurement_id,
          items: this.items,
          subtotal: this.subTotal,
          total_with_vat: this.total,
          vat_no: this.vatNo,
          authorized: this.authorizedName,
          designation: this.authorizedDesignation,
          nic: this.authorizedNIC
        })
          .then(res => {
            console.log(res);
            alert('Quotation submission successful');
            this.$router.go(-1);
          })
      }
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {},
  beforeMount() {
    this.createTable();
    this.getBidData();   
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},

  // Computed Properties
  computed: {
    subTotal() {
      return this.items
        .map(item => this.subtotal(item))
        .reduce((a, b) => a + b, 0);
    },

    total() {
      return this.items
        .map(item => this.subtotalVAT(item))
        .reduce((a, b) => a + b, 0);
    }
  }
};
</script>

<style scoped>
  input[type="number"] {
    text-align: right;
  }

  th {
    border: 1px solid #000;
  }

  .v-icon {
    color: #000;
  }

  #schedule {
    font-size: 12px;
  }

  table .v-text-field {
    font-size: 12px;
  }
</style>
