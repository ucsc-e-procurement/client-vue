<template>
  <v-container fluid class="px-0 py-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-container>
            <!-- Page Title -->
            <v-row no-gutters>
              <h5 class="headline">Add Signature</h5>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <!-- ------------------------------------------------------- Page Content ---------------------------------------------------------------- -->
            <v-row no-gutters class="mt-10">
              <v-col cols="12">
                <v-stepper v-model="e1">
                  <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1"
                      >Add an Image of the Signature</v-stepper-step
                    >

                    <v-divider></v-divider>

                    <v-stepper-step :complete="e1 > 2" step="2"
                      >Preview Image</v-stepper-step
                    >

                    <v-divider></v-divider>

                    <v-stepper-step step="3">OTP Verifiaction</v-stepper-step>
                  </v-stepper-header>

                  <!-- Step 1 - Add an Image of the Signature -->
                  <v-stepper-items>
                    <v-stepper-content step="1">
                      <v-card flat>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-file-input
                                v-model="selectedImageFile"
                                color="primary accent-4"
                                counter
                                label="File input"
                                placeholder="Select an Image File of Your Signature"
                                prepend-icon=""
                                outlined
                                :show-size="1000"
                                @change="onImageFileSelect"
                                @click:clear="clearImage"
                              >
                                <template v-slot:selection="{ index, text }">
                                  <v-chip
                                    color="primary accent-4"
                                    dark
                                    label
                                    small
                                  >
                                    {{ text }}
                                  </v-chip>
                                </template>
                              </v-file-input>

                              <v-row no-gutters>
                                <!-- <v-image-input
                :image-quality="0.85"
                clearable
                image-format="jpeg"
              /> -->
                                <v-col
                                  cols="12"
                                  md="6"
                                  v-show="showImageinStep1"
                                >
                                  <clipper-basic
                                    :src="imageURL"
                                    ref="clipper"
                                    :preview="preview"
                                  >
                                    <div class="placeholder" slot="placeholder">
                                      No image
                                    </div>
                                  </clipper-basic>
                                </v-col>
                                <v-col
                                  cols="12"
                                  md="6"
                                  v-show="showImageinStep1"
                                >
                                  <!-- <v-btn @click="getClippingResult">Preview</v-btn>
                <v-img :src="resultURL"></v-img> -->
                                  <clipper-preview
                                    :name="preview"
                                    class="my-clipper"
                                  >
                                    <div class="placeholder" slot="placeholder">
                                      preview area
                                    </div>
                                  </clipper-preview>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-card-actions>
                          <v-row no-gutters>
                            <v-btn text>Cancel</v-btn>

                            <v-spacer />
                            <v-btn color="primary" @click="gotoStep2">
                              Next
                            </v-btn>
                          </v-row>
                        </v-card-actions>
                      </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                      <v-card flat>
                        <!-- <v-row class="justify-center">
                          <v-progress-circular
                            :indeterminate="true"
                            :size="64"
                            color="primary"
                            
                          />
                        </v-row> -->
                        <v-row>
                          <v-img
                            :src="proccessedImageURL"
                            width="512"
                            height="256"
                            contain
                          >
                            <template v-slot:placeholder>
                              <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                              >
                                <v-progress-circular
                                  indeterminate
                                  :size="50"
                                  color="primary"
                                ></v-progress-circular>
                              </v-row>
                            </template>
                          </v-img>
                        </v-row>
                        <v-card-actions>
                          <v-row no-gutters>
                            <v-btn @click="goBackToStep1">Back</v-btn>
                            <v-spacer />
                            <v-btn color="primary" @click="gotoStep3">
                              Next
                            </v-btn>
                          </v-row>
                        </v-card-actions>
                      </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                      <v-card
                        class="mb-12"
                        color="grey lighten-1"
                        height="200px"
                      ></v-card>

                      <v-btn color="primary" @click="e1 = 1">
                        Continue
                      </v-btn>

                      <v-btn text>Cancel</v-btn>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Componenets

// import NoInternet_Offline from "../../components/NoInternet_Offline.vue";

/*

// Validation Library - Vuelidate
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

*/

// import VImageInput from "vuetify-image-input";
import Vue from "vue";
import VueRx from "vue-rx";
// install vue-rx
Vue.use(VueRx);

import { clipperBasic, clipperPreview } from "vuejs-clipper";
/* Note: When Declaring Variables, always think about how Form Validation Rules are applied */
export default {
  // Mixins
  // mixins: [validationMixin],

  // Form Validations
  // validations: {},

  // Props Received
  props: [],

  // Imported Components
  components: {
    clipperBasic,
    clipperPreview
    // clipperUpload
  },

  // Data Variables and Values
  data: () => ({
    //   Stepper Control
    e1: 1,
    selectedImageFile: null,
    imageURL: "",
    resultURL: "",
    proccessedImageURL: "",
    preview: "my-preview",
    showImageinStep1: false,

    // Loaders
    loaderPreviewImage: true
  }),

  // Custom Methods and Functions
  methods: {
    onImageFileSelect() {
      if (
        this.selectedImageFile === null ||
        this.selectedImageFile === undefined ||
        this.selectedImageFile === ""
      )
        return;
      this.imageURL = window.URL.createObjectURL(this.selectedImageFile);
      this.showImageinStep1 = true;
    },
    getClippingResult() {
      const canvas = this.$refs.clipper.clip(); //call component's clip method
      this.resultURL = canvas.toDataURL("image/jpeg", 1); //canvas->image
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    },
    uploadImageFile() {
      this.getClippingResult();

      let clippedFile = this.dataURLtoFile(this.resultURL, "sfsdf.jpeg");

      console.log("Result: ", this.resultURL);
      let formData = new FormData();
      //   formData.append("file_", this.selectedImageFile);
      formData.append("file_", clippedFile);

      this.$http
        .post("/api/signature/upload", formData)
        .then(res => {
          console.log("Rsponse base64 Image: ", res.data.base64_image);
          this.proccessedImageURL = res.data.base64_image;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // Step Handlers
    gotoStep2() {
      this.e1 = 2;
      this.uploadImageFile();
    },
    gotoStep3() {
      this.e1 = 3;
    },
    goBackToStep1() {
      this.e1 = 1;
    },

    clearImage() {
      this.selectedImageFile = null;
      this.imageURL = "";
      this.resultURL = "";
      this.proccessedImageURL = "";
      this.showImageinStep1 = false;
      console.log("CLicked", this.selectedImageFile);
    }
  },

  // Life Cycle Hooks
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},

  // Computed Properties
  computed: {}
};
</script>

// Custom CSS Rules and Classes
<style scoped>
.placeholder {
  text-align: center;
  padding: 20px;
  background-color: lightgray;
}
</style>
