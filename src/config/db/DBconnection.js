const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')

var serviceAccount = require("../config.json");

initializeApp({
    credential: cert(serviceAccount)
});
  
const db = getFirestore();
module.exports = db;


