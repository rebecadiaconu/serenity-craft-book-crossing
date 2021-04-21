const config = require('../util/config');
const { db, admin } = require('../util/admin');
const { validateLogInData, validateSignUpData, validateEmail, reduceUserDetails} = require('../util/validators');

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
        let errors = {};
        console.error(err);

        if (err.code == 'auth/wrong-password') {
            return res.status(403).json({ error: 'Wrong password! Please try again!' });
        } else if (err.code == 'auth/user-not-found') {
            return res.status(403).json({ error: 'Invalid email! Please try again!' });
        }
    });
};


// Forgot password
exports.forgotPassword = (req, res) => {
    let userEmail = req.body.email;

    const { valid, errors } = validateEmail(userEmail);

    if (!valid) return res.status(400).json(errors);

    firebase.auth().sendPasswordResetEmail(userEmail)
    .then(() => {
        return res.json({ message: 'Please verify your email!'});
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};


// Change account email
exports.changeEmail = (req, res) => {
    const user = {
        email: req.body.email,
        newEmail: req.body.newEmail,
        password: req.body.password
    };

    const { valid, errors } = validateLogInData(user);

    if (!valid) return res.status(400).json(errors);

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
        const { valid, errors } = validateEmail(user.newEmail);

        if (!valid) return res.status(400).json({ newEmail: errors.email });

        return data.user.updateEmail(user.newEmail);
    })
    .then(() => {
        return db.collection('users').where('email', '==', user.email).limit(1).get()
    })
    .then((data) => {
        if (data.empty) {
            return res.status(404).json({ error: user.email + ' User not found!' });
        }

        return db.doc(`/users/${data.docs[0].id}`).update({ email: user.newEmail });
    })
    .then(() => {
        return res.json({ message: 'Email updated successfully' });
    })
    .catch((err) => {
        console.error(err);

        if (err.code == "auth/email-already-in-use") {
            return res.status(400).json({ email: 'New email is already in use!'});
        }

        return res.status(500). json({ error: err.code });
    });
};


// change account password
exports.changePassword = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
        newPassword: req.body.newPassword
    };

    const { valid, errors } = validateLogInData(user);

    if (!valid) return res.status(400).json(errors);

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
        if (user.newPassword.trim() === '') return res.status(400).json({ password: 'Must not be empty!' });

        return data.user.updatePassword(user.newPassword)
    })
    .then(()=> {
        return res.json({ message: 'Password updated successfully' });
    })
    .catch((err) => {
        console.error(err);
        return res.status(500). json({ error: err.code });
    });
};


// Add user details
exports.addUserDetails = (req, res) => {
    let userDetails = reduceUserDetails(req.body);
    // let username;

    // if (req.body.hasOwnProperty('username')) {
    //     username = req.body.username.trim();


    // }

    db.doc(`/users/${req.user.username}`).update(userDetails)
    .then(() => {
        return res.json({ message: 'Details updated successfully!' });
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};


// // Get authenticated user
// exports.getAuthenticatedUser = (req, res) => {

// };


// // Get any user details
// exports.getUserDetails = (req, res) => {
    
// };


// Upload profile image for current user
exports.uploadImage = (req, res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = BusBoy({ headers: req.headers });

    let imageUrl;
    let imageFileName;
    let imageToBeUploaded = {};

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        if (mimetype !== 'image/jpeg' && mimetype !== 'image/jpg' && mimetype !== 'image/png') {
            return res.status(400).json({ error: 'Wrong file type submitted!' });
        }

        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        imageFileName = `${Math.round(Math.random()*1000000000000)}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);

        imageToBeUploaded = { filepath, mimetype };

        file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on('finish', () => {
        admin.storage().bucket().upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimetype
                }
            }
        })
        .then(() => {
            imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;

            return db.doc(`/users/${req.user.username}`).update({ imageUrl });
        })
        .then(() => {
            return res.json({message: 'Image uploaded successfully!'});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code});
        });
    });

    busboy.end(req.rawBody);
};