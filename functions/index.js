const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");

// Decryption with CTR
const crypto = require('crypto');

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

// Encrypt
// app.post("/encrypt", async (req, res) => {
//   try {
//     const { data } = req.body;

//     const algorithm = 'aes256';

//     const key = crypto.randomBytes(32); 
//     var cipher = crypto.createCipher(algorithm,key.toString('hex'));
//     var endata = cipher.update(data,'utf8','hex') + cipher.final('hex');

//     await admin.firestore().collection('bids').doc('test').set({
//         [key.toString('hex')]: endata
//     }, {merge: true});

//     res.json({
//         'msg': 'working'
//     }).status(200);

//   }catch(error){
//       console.log(error);
//       res.json({'error':error}).status(500);
//   }

// })


// Invoke -> https://us-central1-ucsc-e-procurement.cloudfunctions.net/api/decrypt
// Decrypts the price schedule and adds to a separate collection
app.post("/decrypt", async (req, res) => {
  try {
    const { bidOpeningDate, data } = req.body;

    const algorithm = 'aes256';

    await admin.firestore().collection('bids').doc(bidOpeningDate).get().then((doc) => {

      // Document data | encrypted key -> encrypted price schedule
      var keys = doc.data();

      for (let key in keys) {

        // Decrypt
        var decipher = crypto.createDecipher(algorithm,data[key]);
        decipher.setAutoPadding(false);
        var decryptedPriceSchedule = decipher.update(keys[key],'hex','utf8') + decipher.final('utf8');
        
        var priceSchedule = JSON.parse(decryptedPriceSchedule)

        // Add the decrypted price schedule to the collection with the bid id as the dcument key
        admin.firestore().collection('priceSchedule').doc(priceSchedule.bid_id).set(priceSchedule);
      }
      return keys;
    });

    res.json({
        'msg': 'success'
    }).status(200);

  }catch(error){
      console.log(error);
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
