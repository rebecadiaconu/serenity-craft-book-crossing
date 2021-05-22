const firebase = require('firebase');
const config = require('../util/config');
const { db, admin } = require('../util/admin');

const { validateBookData, reduceBookDetails } = require('../util/validators');
const { uuid } = require('uuidv4');

realtime = firebase.database();


// Get all books
exports.getAllBooks = (req, res) => {
    db.collection('books')
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let books = [];
            data.forEach((doc) => {
                let bookData = doc.data();
                bookData.bookId = doc.id;
                books.push(bookData);
            });

            return res.json(books);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};

// Add new book
exports.addBook = (req, res) => {
    let noImage= 'nobook-image2.png';
    let hasReview = false;

    const newBook = {
        title: req.body.title.trim(),
        author: req.body.author.trim(),
        publisher: req.body.publisher.trim(),
        numPages: req.body.numPages,
        genres: req.body.genres,
        language: req.body.language.trim(),
        bookQuality: req.body.bookQuality,
        averageRating: 0,
        numReviews: 0,
        numExchanges: 0,
        createdAt: new Date().toISOString(),
        available: true,
        owner: req.user.username,
        ownerImage: req.user.imageUrl,
        coverImage: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImage}?alt=media`,
        inAuction: false
    }

    if (req.body.hasOwnProperty("publicationYear")) newBook.publicationYear = req.body.publicationYear;

    if (req.body.hasOwnProperty("summary")) newBook.summary = req.body.summary.trim();

    if (req.body.hasOwnProperty("ownerReview")) {
        hasReview = true;
        newBook.numReviews = 1;
        newBook.ownerReview = req.body.ownerReview.trim();
    }

    if (req.body.hasOwnProperty("ownerRating")) {
        hasReview = true;
        newBook.numReviews = 1;
        newBook.averageRating = req.body.ownerRating;
        newBook.ownerRating = req.body.ownerRating;
    }

    db.collection('books')
    .where('owner', '==', req.user.username)
    .where('title', '==', newBook.title)
    .where('author', '==', newBook.author)
    .where('publisher', '==', newBook.publisher)
    .where('language', '==', newBook.language)
    .limit(1)
    .get()
    .then((data) => {
        if (!data.empty) return res.status(400).json({ error: 'You already added this book!' });

        const { valid, errors } = validateBookData(newBook);

        if (!valid) return res.status(400).json(errors);

        let resBook = newBook;

        db.collection('books').add(newBook)
        .then((doc) => {
            resBook.bookId = doc.id;
            
            if (hasReview) {
                let reviewData = {
                    createdAt: new Date().toISOString(),
                    username: req.user.username,
                    userImage: req.user.imageUrl,
                    bookId: doc.id
                };

                if (req.body.hasOwnProperty("ownerReview")) reviewData.body = req.body.ownerReview.trim();

                if (req.body.hasOwnProperty("ownerRating")) reviewData.rating = req.body.ownerRating;

                return db.collection('reviews').add(reviewData)
                .then(() => {
                    return res.json(resBook);
                });
            } else {
                return res.json(resBook);
            }
        });
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

// Get book details
exports.getBook = (req, res) => {
    const bookDocument = db.doc(`/books/${req.params.bookId}`);
    let bookData = {};

    bookDocument.get()
    .then((doc) => {
        if (!doc.exists) return res.status(404).json({ error: 'Book not found!' });

        bookData = doc.data();
        bookData.bookId = doc.id;

        return db.collection('reviews').where('bookId', '==', bookData.bookId).orderBy('createdAt', 'desc').get();
    })
    .then((data) => {
        bookData.reviews = [];
        data.forEach(doc => {
            bookData.reviews.push(doc.data());
        });

        return res.json(bookData);
    })
    .catch(err => {
        console.error(err);

        return res.status(500).json({ error: err.code });
    });
};

// Add book details
exports.editBook = (req, res) => {
    let bookDetails = reduceBookDetails(req.body);

    const { valid, errors } = validateBookData(bookDetails);

    if (!valid) return res.status(400).json(errors);

    db.doc(`/books/${req.params.bookId}`).update(bookDetails)
    .then(() => {
        return res.json({ message: 'Book details updated successfully!' });
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

// Delete book
exports.deleteBook = (req, res) => {
    const path = require('path');
    const bookDocument = db.doc(`/books/${req.params.bookId}`);
    let bookData = {};

    bookDocument.get()
    .then((doc) => {
        if (!doc.exists) return res.status(404).json({ error: 'Book not found!' });

        if (doc.data().available == false) return res.status(400).json({ error: 'Seems like this book is not available. You can not delete it!' });

        bookData = doc.data();
        bookData.bookId = doc.id;

        batch = db.batch();

        return db.collection("reviews").where("bookId", "==", req.params.bookId).get()
        .then((data) => {
            data.forEach((doc) => {
                batch.delete(db.doc(`/reviews/${doc.id}`));
            });
    
            const reqBooks = db.collection("crossings").where("reqBookId", "==", req.params.bookId).get();
            const randomBooks = db.collection("crossings").where("randomBookId", "==", req.params.bookId).get();
    
            return Promise.all([reqBooks, randomBooks]);
        })
        .then((responses) => {
            responses.forEach((response) => {
                response.docs.forEach((doc) => {
                    let promises = [];
                    let crossingData = doc.data();
                    crossingData.crossingId = doc.id;
                    
                    realtime.ref(`/topics/${crossingData.crossingId}`).get()
                    .then((data) => {
                        if (data.exists()) {
                            crossingData.topics = Object.values(data.val());
                        } else crossingData.topics = [];
    
                        crossingData.topics.map((topic) => {
                            if (topic.replyCount > 0) {
                                topic.replies.map( (reply) => {
                                    promises.push(realtime.ref(`/replies/${reply}`).remove());
                                });
                            }
    
                            promises.push(realtime.ref(`/topics/${crossingData.crossingId}/${topic.topicId}`).remove());
                        });

                        return Promise.all(promises);
                    })
                    .then(() => {
                        let newNotification = {
                            notificationId: uuid(),
                            createdAt: new Date().toISOString(),
                            sender: req.user.username,
                            senderImage: req.user.imageUrl,
                            read: false,
                            type: 'info'
                        };
    
                        if (crossingData.sender === req.user.username) newNotification.recipient = crossingData.recipient;
                        else newNotification.recipient = crossingData.sender;
    
                        newNotification.message = `Seems like ${newNotification.sender} deleted one book present in your crossings or pending requests, so these are gone too!`;
    
                        return realtime.ref(`/notifications/${newNotification.notificationId}`).set(newNotification);
                    })
                    .then(() => {
                        batch.delete(db.doc(`/crossings/${crossingData.crossingId}`));
                    });
                });
            });
        })
        .then(() => {
            console.log("COMMIT!");
            return batch.commit();
        })
        .then(() => {
            return realtime.ref(`/notifications/`).orderByChild("bookId").equalTo(req.params.bookId).get();
        })
        .then((data) => {
            let promises = [];
            if (data.exists()) {
                let notifications = Object.values(data.val());
                notifications.forEach((notif) => {
                    promises.push(realtime.ref(`/notifications/${notif.notificationId}`).remove());
                });
            }

            return Promise.all(promises);
        })
        .then(() => {
            oldImageFilename = path.basename(bookData.coverImage).split('?')[0];

            if (oldImageFilename !== 'nobook-image2.png') {
                admin.storage().bucket().file(oldImageFilename).delete();
            }

            return bookDocument.delete();
        });
    })
    .then(() => {
        return res.json({ message: 'Book deleted successfully!' });
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    })

};

// Upload book cover image
exports.uploadCoverImage = (req, res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = BusBoy({ headers: req.headers });
    const bookDoc = db.doc(`/books/${req.params.bookId}`);

    let oldImageUrl;
    let coverImage;
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
            coverImage = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
            const batch = db.batch();

            bookDoc.get()
            .then((doc) => {
                if (!doc.exists) return res.status(404).json({ error: 'Book not found!' });

                oldImageUrl = doc.data().coverImage;
                oldImageFilename = path.basename(oldImageUrl).split('?')[0];

                if (oldImageFilename !== 'nobook-image2.png') {
                    admin.storage().bucket().file(oldImageFilename).delete();
                }

                return bookDoc.update({ coverImage });
            })
            .then(() => {
                return db.collection('crossings').where('reqBookId', '==', req.params.bookId).get();
            })
            .then((data) => {
                data.forEach((doc) => {
                    reqBook = doc.data().reqBook;
                    reqBook.coverImage = coverImage;

                    batch.update(db.doc(`/crossings/${doc.id}`), {reqBook: reqBook});
                });
                
                return db.collection('crossings').where('randomBookId', '==', req.params.bookId).get();
            })
            .then((data) => {
                data.forEach((doc) => {
                    randomBook = doc.data().randomBook;
                    randomBook.coverImage = coverImage;

                    batch.update(db.doc(`/crossings/${doc.id}`), {randomBook: randomBook});
                });

                return batch.commit();
            });
        })
        .then(() => {
            return res.json({message: 'Cover image uploaded successfully!'});
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({error: err.code});
        });
    });

    busboy.end(req.rawBody);
};

// Review book
exports.reviewBook = (req, res) => {
    if (req.hasOwnProperty('body')) {
        if (req.body.body.trim() === '') {
            return res.status(400).json({ error: 'Must not be empty!' });
        }
    }

    const newReview = {
        createdAt: new Date().toISOString(),
        username: req.user.username,
        userImage: req.user.imageUrl,
        bookId: req.params.bookId,
        body: req.body.body.trim(),
        rating: req.body.rating
    };

    db.collection('reviews').where('bookId', '==', req.params.bookId).where('username', '==', req.user.username).limit(1).get()
    .then((data) => {
        if (!data.empty) return res.status(400).json({ error: 'You already reviewed this book!' });

        return db.doc(`/books/${req.params.bookId}`).get();
    })
    .then((doc) => {
        if (!doc.exists) return res.status(404).json({ error: 'Book not found!' });
        else if (doc.data().owner === req.user.username) {
            return doc.ref.update({
                ownerReview: req.body.body.trim(),
                ownerRating: req.body.rating,
                averageRating: (doc.data().averageRating * doc.data().numReviews + req.body.rating) / (doc.data().numReviews + 1),
                numReviews: doc.data().numReviews + 1
            });
        } else{
            return doc.ref.update({
                averageRating: (doc.data().averageRating * doc.data().numReviews + req.body.rating) / (doc.data().numReviews + 1),
                numReviews: doc.data().numReviews + 1
            })
            .then(() => {
                let newNotification = {
                    notificationId: uuid(),
                    sender: req.user.username,
                    senderImage: req.user.imageUrl,
                    createdAt: new Date().toISOString(),
                    recipient: doc.data().owner,
                    read: false,
                    type: 'review',
                    bookId: doc.id
                };

                return realtime.ref(`/notifications/${newNotification.notificationId}`).set(newNotification);
            });
        }
    })
    .then(() => {
        return db.collection('reviews').add(newReview);
    })
    .then((doc) => {
        newReview.reviewId = doc.id;
        return res.json({newReview});
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

// Edit book review
exports.editReview = (req, res) => {
    const bookDoc = db.doc(`/books/${req.params.bookId}`);

    let oldRating;
    let bookData = {};
    let reviewDetails = {};

    if (req.body.hasOwnProperty('body')) {
        reviewDetails.body = req.body.body.trim();
    }

    if (req.body.hasOwnProperty('rating')) {
        reviewDetails.rating = req.body.rating;
    }

    bookDoc.get()
    .then((doc) => {
        if (!doc.exists) return res.status(404).json({ error: 'Book not found!' });

        bookData = doc.data();
        bookData.bookId = doc.id;

        return db.collection('reviews').where('username', '==', req.user.username).where('bookId', '==', req.params.bookId).limit(1).get();
    })
    .then((data) => {
        if (data.empty)  return res.status(404).json({ error: 'Review not found!' });

        oldRating = data.docs[0].data().rating;

        db.doc(`/reviews/${req.params.reviewId}`).update(reviewDetails)
        .then(() => {
            bookData.averageRating = (bookData.averageRating * bookData.numReviews - oldRating + reviewDetails.rating) / bookData.numReviews

            if (bookData.owner === req.user.username) {
                return bookDoc.update({
                    ownerRating: reviewDetails.rating,
                    ownerReview: reviewDetails.body,
                    averageRating: bookData.averageRating
                });
            }
            
            return bookDoc.update({ averageRating: bookData.averageRating });
        })
        .then(() => {
            return res.json({ message: 'Review updated successfully!' });
        });
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

// Delete review
exports.deleteReview = (req, res) => {
    const bookDoc = db.doc(`/books/${req.params.bookId}`);

    let deletedRating;
    let bookData = {};

    bookDoc.get()
    .then((doc) => {
        if (!doc.exists) return res.status(404).json({ error: 'Book not found!'});

        bookData = doc.data();
        bookData.bookId = doc.id;

        return db.collection('reviews').where('username', '==', req.user.username).where('bookId', '==', req.params.bookId).limit(1).get();
    })
    .then((data) => {
        if (data.empty)  return res.status(404).json({ error: 'Review already deleted!' });

        deletedRating = data.docs[0].data().rating;

        console.log(deletedRating);

        return db.doc(`/reviews/${req.params.reviewId}`).delete()
        .then(() => {
            bookData.numReviews--;
            if (bookData.numReviews === 0) bookData.averageRating = 0;
            else bookData.averageRating = (bookData.averageRating * (bookData.numReviews + 1) - deletedRating) / (bookData.numReviews);

            console.log(bookData.averageRating);

            if (bookData.owner === req.user.username) {
                return bookDoc.update({
                    averageRating: bookData.averageRating,
                    numReviews: bookData.numReviews,
                    ownerRating: admin.firestore.FieldValue.delete(),
                    ownerReview: admin.firestore.FieldValue.delete()
                });
            }

            return bookDoc.update({
                averageRating: bookData.averageRating,
                numReviews: bookData.numReviews
            });
        })
        .then(() => {
            return res.json(bookData);
        });
    })
    .catch((err) => {
        console.error(err);

        return res.status(500).json({ error: err.code });
    });
};