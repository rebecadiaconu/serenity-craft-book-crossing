const functions = require("firebase-functions");
const app = require('express')();



exports.api = functions.region('europe-west1').https.onRequest(app);