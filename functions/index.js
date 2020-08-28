const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");

//initialize express server
const app = express();

// The Firebase Admin SDK to access Cloud Firestore.
admin.initializeApp();

//initialize the database and the collection
const db = admin.firestore();

// Automatically allow cross-origin requests
const cors = require("cors");
app.use(cors({ origin: true }));

// Middleware that transforms the raw string of req.body into json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ###########################################################################################################################################
//                                                  REST End points - Functions
// ###########################################################################################################################################

// Invoke -> https://us-central1-ucsc-e-procurement.cloudfunctions.net/api/test
app.get("/test", (req, res) => {
  return cors(req, res, () => {
    res.send("Ayubowan!, From Cloud Functions. I'm Working :)");
  });
});

// Invoke -> https://us-central1-ucsc-e-procurement.cloudfunctions.net/api/decrypt
app.post("/decrypt", async (req, res) => {
  try {
    const { bidOpeningDate, data } = req.body;

    await admin.firestore().collection('bids').doc(bidOpeningDate).get().then((doc) => {

      var keys = doc.data();

      for (let key in keys) {
        // console.log(key, keys[key]);
        // Decrypt
      }
      return keys;
    });

    res.json({
        'msg': 'working'
    }).status(200);

}catch(error){
    res.json({'error':error}).status(500);
}

})

// ###########################################################################################################################################
//                                                  Firestore Database Triggers - Functions
// ###########################################################################################################################################

// ###########################################################################################################################################
//                                                  CRON JOBS - Functions
// ###########################################################################################################################################

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);
