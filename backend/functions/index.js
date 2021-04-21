const functions = require("firebase-functions");
const app = require('express')();

const { signUp, logIn } = require('./handlers/users');

// User routes
app.post('/signup', signUp);        // Sign up with email and password route
app.post('/login', logIn);        // Log in with email and password route

exports.api = functions.region('europe-west1').https.onRequest(app);