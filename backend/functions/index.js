const functions = require("firebase-functions");
const app = require('express')();

const { signUp, logIn, forgotPassword, changeEmail, changePassword, uploadImage, addUserDetails } = require('./handlers/users');
const fbAuth = require("./util/fbAuth");


// User routes
app.post('/signup', signUp);        // Sign up with email and password route
app.post('/login', logIn);        // Log in with email and password route
// TODO:
app.post('/user/image', fbAuth, uploadImage);        // Upload user profile picture
app.post('/user', fbAuth, addUserDetails);       // Add user details
// app.get('/user', fbAuth,  getAuthenticatedUser);         // Get current user details
// app.get('/user/:username', getUserDetails);          // Get any user details

app.post('/forgotPassword', forgotPassword);
app.post('/settings/changeEmail', fbAuth, changeEmail);
app.post('/settings/changePassword', fbAuth, changePassword);


exports.api = functions.region('europe-west1').https.onRequest(app);