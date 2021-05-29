import firebase from "firebase";

const config = {
    apiKey: "AIzaSyCClMWPcK2oi72BhAVxPDvmhKJfMpitP8o",
    authDomain: "serenity-craft-liceapp.firebaseapp.com",
    databaseURL: "https://serenity-craft-liceapp-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "serenity-craft-liceapp",
    storageBucket: "serenity-craft-liceapp.appspot.com",
    messagingSenderId: "1072054297819",
    appId: "1:1072054297819:web:0eb64b9e68062b765ad8fe",
    measurementId: "G-E737QGJN9F"
};


firebase.initializeApp(config);

export const realtime = firebase.database();