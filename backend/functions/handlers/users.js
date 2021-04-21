const config = require('../util/config');
const { db, admin } = require('../util/admin');
const { validateLogInData, validateSignUpData } = require('../util/validators');

const firebase = require('firebase');
firebase.initializeApp(config);


// SignUp route
exports.signUp = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        username: req.body.username
    };

    const { valid, errors } = validateSignUpData(newUser);

    if (!valid) return res.status(400).json( errors );

    const noImage = 'no-image.jpg';
    let token, userId;

    db.doc(`/users/${newUser.username}`).get()
    .then((doc) => {
        if (doc.exists) {
            return res.status(400).json({ message: 'This username is already taken. Please choose another one!'});
        } else {
            return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
    })
    .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then((idToken) => {
        token = idToken;

        const userCredentials = {
            username: newUser.username,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImage}?alt=media`,
            reportCount: 0,
            userId
        };

        return db.doc(`/users/${newUser.username}`).set(userCredentials);
    })
    .then(() => {
        return res.status(201).json({ token });
    })
    .catch((err) => {
        console.error(err);
        if (err.code == "auth/email-already-in-use") {
            return res.status(400).json({ email: 'Email already in use!'});
        }

        return res.status(500).json({ general: 'Something went wrong... Try again!' });
    });
};

// LogIn route
exports.logIn = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    
    const { valid, errors } = validateLogInData(user);

    if (!valid) return res.status(400).json( errors );

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
        return data.user.getIdToken();
    })
    .then((token) => {
        return res.json({ token });
    })
    .catch(err => {
        console.error(err);

        // auth/wrong-password
        // auth/user-not-found
        return res.status(403).json({ general: 'Wrong credentials... Please try again!' });
    });
};