const config = require('../util/config');
const { db, admin } = require('../util/admin');
const { validateLogInData, validateSignUpData, validateEmail, reduceUserDetails} = require('../util/validators');

const firebase = require('firebase');
const { DataSnapshot } = require('firebase-functions/lib/providers/database');
firebase.initializeApp(config);

realtime = firebase.database();


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
            return res.status(400).json({ username: 'This username is already taken. Please choose another one!'});
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
            banned: false,
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
            return res.status(400).json({ email: 'Email already in use!' });
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
    .catch((err) => {
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

    db.collection("users").where("email", "==", req.body.email).get()
    .then((data) => {
        if (data.empty) return res.status(404).json({ error: 'User not found! '});

        return firebase.auth().sendPasswordResetEmail(userEmail);
    })
    .then(() => {
        return res.json({ message: 'Please verify your email!'});
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

// Get authenticated user
exports.getAuthenticatedUser = (req, res) => {
    let userData = {};

    db.doc(`/users/${req.user.username}`).get()
    .then((doc) => {
        if (!doc.exists) return res.status(404).json({error: 'User not found!' });

        userData.credentials = doc.data();

        return db.collection('books').orderBy('createdAt', 'desc').where('owner', '==', req.user.username).get();
    })
    .then((data) => {
        userData.books = [];
        data.forEach(doc => {
            userData.books.push(doc.data());
        });

        const recipientCross = db.collection("crossings").where("recipient", "==", req.user.username).get();
        const senderCross = db.collection("crossings").where("sender", "==", req.user.username).get();

        return Promise.all([recipientCross, senderCross]);
    })
    .then((responses) => {
        userData.crossings = [];
        responses.forEach((response) => {
            response.docs.forEach((doc) => {
                userData.crossings.push(doc.data());
            })
        });

        return res.json(userData);
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

// Add user details
exports.addUserDetails = (req, res) => {
    let userDetails = reduceUserDetails(req.body);

    db.doc(`/users/${req.user.username}`).update(userDetails)
    .then(() => {
        return res.json({ message: 'Details updated successfully!' });
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

// Upload profile image for current user
exports.uploadImage = (req, res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = BusBoy({ headers: req.headers });
    const userDoc = db.doc(`/users/${req.user.username}`);

    let imageUrl;
    let imageFileName;
    let imageToBeUploaded = {};

    let oldImageUrl = req.user.imageUrl;

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
            return userDoc.get();
        })
        .then((doc) => {
            if (!doc.exists) return res.status(404).json({ error: 'User not found!' });

            const batch = db.batch();

            return db.collection('books').where('owner', '==', req.user.username)
            .get()
            .then((data) => {
                data.forEach((doc) => {
                    batch.update(db.doc(`/books/${doc.id}`), { ownerImage: imageUrl });
                });

                return db.collection('reviews').where('username', '==', req.user.username).get();
            })
            .then((data) => {
                data.forEach((doc) => {
                    batch.update(db.doc(`/reviews/${doc.id}`), {userImage: imageUrl });
                });

                return db.collection('crossings').where('sender', '==', req.user.username).get();
            })
            .then((data) => {
                data.forEach((doc) => {
                    let senderData = doc.data().senderData;
                    senderData.userImage = imageUrl;
                    batch.update(db.doc(`/crossings/${doc.id}`), {senderData});
                });

                return db.collection('crossings').where('recipient', '==', req.user.username).get();
            })
            .then((data) => {
                data.forEach((doc) => {
                    let recipientData = doc.data().recipientData;
                    recipientData.userImage = imageUrl;
                    batch.update(db.doc(`/crossings/${doc.id}`), {recipientData});
                });

                return realtime.ref(`/topics/`).orderByChild("username").equalTo(req.user.username).get();
            })
            .then((data) => {
                let topicData = [];
                let promises = [];

                if (data.exists()) {
                    topicData = Object.values(data.val());
                    topicData.forEach((doc) => {
                        let updates = {};
                        updates['userImage'] = imageUrl;
                        promises.push(realtime.ref(`/topics/${doc.topicId}`).update(updates));
                    });
    
                }

                return Promise.all(promises);
            })
            .then(() => {
                return realtime.ref(`/replies/`).orderByChild("username").equalTo(req.user.username).get();
            })
            .then((data) => {
                let replyData = [];
                let promises = [];
                if (data.exists()) {
                    replyData = Object.values(data.val()).reverse();

                    replyData.forEach((doc) => {
                        let updates = {};
                        updates['userImage'] = imageUrl;
                        promises.push(realtime.ref(`/replies/${doc.replyId}`).update(updates));
                    });
                }

                return Promise.all(promises);
            })
            .then(() => {
                return batch.commit();
            });
        })
        .then(() => {
            return userDoc.update({imageUrl});
        })
        .then(() => {
            oldImageFilename = path.basename(oldImageUrl).split('?')[0];

            if (oldImageFilename !== 'no-image.jpg') {
                admin.storage().bucket().file(oldImageFilename).delete();
            }

            return res.json({message: 'Image uploaded successfully!'});
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
    });

    busboy.end(req.rawBody);
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

        db.collection('users').where('email', '==', user.email).limit(1).get()
        .then((data) => {
            if (data.empty) {
                return res.status(404).json({ error: user.email + ' User not found!' });
            }

            if (data.docs[0].data().username !== req.user.username) return res.status(400).json({ error: 'Wrong credentials!' });
    
            return db.doc(`/users/${data.docs[0].id}`).update({ email: user.newEmail });
        })
        .then(() => {
            return data.user.updateEmail(user.newEmail);
        });
    })
    .then(() => {
        return res.json({ message: 'Email updated successfully' });
    })
    .catch((err) => {
        console.error(err);

        if (err.code == "auth/email-already-in-use") {
            return res.status(400).json({ newEmail: 'New email is already in use!' });
        }

        if (err.code == "auth/user-not-found") {
            return res.status(400).json({ email: 'Invalid email!' });
        }
        if (err.code == "auth/wrong-password") {
            return res.status(400).json({ password: 'Wrong password!' });
        }

        return res.status(500).json({ error: err.code });
    });
};

// Change username
exports.changeUsername = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
        newUsername: req.body.newUsername
    };

    if (user.newUsername.trim() === '') return res.status(400).json({ username: 'Must not be empty!' });

    let userData = {};
    let oldUsername = req.user.username;

    const userDocument = db.doc(`/users/${oldUsername}`);

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((data) => { 
        const { valid, errors } = validateLogInData(user);

        if (!valid) return res.status(400).json(errors);
        
        userDocument.get()
        .then((doc) => {
            if (!doc.exists) return res.status(404).json({ error: 'User not found!' });
    
            if (doc.data().email !== req.body.email) return res.status(400).json({ error: 'Wrong credentials!' });

            userData = doc.data();
            userData.username = user.newUsername;

            const batch = db.batch();

            return db.collection('books').where('owner', '==', req.user.username)
            .get()
            .then((data) => {
                data.forEach((doc) => {
                    batch.update(db.doc(`/books/${doc.id}`), { owner: user.newUsername });
                });

                return db.collection('reviews').where('username', '==', req.user.username).get();
            })
            .then((data) => {
                data.forEach((doc) => {
                    batch.update(db.doc(`/reviews/${doc.id}`), {username: user.newUsername });
                });

                return db.collection('crossings').where('sender', '==', req.user.username).get();
            })
            .then((data) => {
                data.forEach((doc) => {
                    let sender = user.newUsername;
                    batch.update(db.doc(`/crossings/${doc.id}`), {sender});
                });

                return db.collection('crossings').where('recipient', '==', req.user.username).get();
            })
            .then((data) => {
                data.forEach((doc) => {
                    let recipient = user.newUsername;
                    batch.update(db.doc(`/crossings/${doc.id}`), {recipient});
                });

                return realtime.ref(`/topics/`).orderByChild("username").equalTo(req.user.username).get();
            })
            .then((data) => {
                let topicData = [];
                let promises = [];

                if (data.exists()) {
                    topicData = Object.values(data.val()).reverse();
                    console.log(topicData);
                    topicData.forEach((doc) => {
                        console.log(doc.id);
                        let updates = {};
                        updates['username'] = user.newUsername;
                        promises.push(realtime.ref(`/topics/${doc.topicId}`).update(updates));
                    });
    
                }

                return Promise.all(promises);
            })
            .then(() => {
                return realtime.ref(`/replies/`).orderByChild("username").equalTo(req.user.username).get();
            })
            .then((data) => {
                let replyData = [];
                let promises = [];
                if (data.exists()) {
                    replyData = Object.values(data.val()).reverse();
                    console.log(replyData);

                    replyData.forEach((doc) => {
                        console.log(doc.id);
                        let updates = {};
                        updates['username'] = user.newUsername;
                        promises.push(realtime.ref(`/replies/${doc.replyId}`).update(updates));
                    });
                }

                return Promise.all(promises);
            })
            .then(() => {
                return batch.commit();
            });
        })
        .then(() => {
            return userDocument.delete();
        })
        .then(() => {
            return db.doc(`/users/${user.newUsername}`).set(userData);
        });
    })
    .then(() => {
        return res.json({ message: 'Username updated successfully!' });
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });

};

// Change account password
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
        if (user.newPassword.length < 8) return res.status(400).json({ password: 'Must be at least 8 characters long!' });

        db.collection('users').where('email', '==', user.email).limit(1).get()
        .then((userData) => {
            if (userData.empty) {
                return res.status(404).json({ error: user.email + ' User not found!' });
            }

            if (userData.docs[0].data().username !== req.user.username) return res.status(400).json({ error: 'Wrong credentials!' });
            return data.user.updatePassword(user.newPassword);
        });
    })
    .then(()=> {
        return res.json({ message: 'Password updated successfully' });
    })
    .catch((err) => {
        console.error(err);
        return res.status(500). json({ error: err.code });
    });
};

// // Get any user details
exports.getUserDetails = (req, res) => {
    let userData = {};
    db.doc(`/users/${req.params.username}`).get()
    .then((doc) => {
        if (doc.exists) {
            userData.user = doc.data();
            return db.collection('books').where('owner', '==', req.params.username).orderBy('createdAt', 'desc').get();
        } else {
            return res.status(404).json({error: 'User not found!' });
        }
    })
    .then((data) => {
        userData.books = [];
        data.forEach((doc) => {
            userData.books.push({
                title: doc.data().title,
                author: doc.data().author,
                publisher: doc.data().publisher,
                publicationYear: doc.data().publicationYear,
                createdAt: doc.data().createdAt,
                owner: doc.data().owner,
                ownerImage: doc.data().ownerImage,
                numReviews: doc.data().numReviews,
                numExchanges: doc.data().numExchanges,
                averageRating: doc.data().averageRating,
                available: doc.data().available,
                inAuction: doc.data().inAuction,
                auctionId: doc.data().auctionId,
                bookId: doc.id
            });
        });

        // TO ADD
        // return db.collection('auctions').where('owner', '==', req.params.username).orderBy('createdAt', 'desc').get();

        return res.json(userData);
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

// Delete user account
// exports.deleteUserAccount = (req, res) => {

// };