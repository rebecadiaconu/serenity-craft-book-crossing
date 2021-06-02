const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

const emailAccount = {
    email: "serenity.craft31@gmail.com",
    password: "licenta2021"
};

module.exports = { admin, db, emailAccount };