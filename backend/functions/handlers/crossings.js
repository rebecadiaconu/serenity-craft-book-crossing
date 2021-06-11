const { db, admin } = require('../util/admin');
const firebase = require('firebase');
const e = require('express');
const { uuid } = require('uuidv4');

realtime = firebase.database();

    
// Send crossing request
exports.sendCrossingReq = (req, res) => {
    const newCrossing = {
        type: "temporar",
        createdAt: new Date().toISOString(),
        sender: req.user.username,
        senderProgress: {
            sendBook: false,
            receiveBook: false,
            sendBack: false,
            getBookBack: false
        },
        senderData: {
            userImage: req.user.imageUrl,
            show: true
        },
        recipient: req.body.owner,
        recipientProgress: {
            sendBook: false,
            receiveBook: false,
            sendBack: false,
            getBookBack: false
        },
        recipientData: {
            userImage: req.body.ownerImage,
            show: true
        },
        reqBookId: req.params.bookId,
        randomBookId: req.body.randomBookId,
        reqBook: req.body.reqBook,
        randomBook: req.body.randomBook,
        status: 'pending',
        canceled: false,
        read: false
    };

    if (newCrossing.type === "temporar") {
        newCrossing.senderPermanent = false;
        newCrossing.recipientPermanent = false;
    }

    db.collection('crossings')
    .where('sender', '==', newCrossing.sender)
    .where('recipient', '==', newCrossing.recipient)
    .where('reqBookId', '==', newCrossing.reqBookId)
    .where('status', '!=', 'done')
    .where('canceled', '==', false)
    .limit(1)
    .get()
    .then((data) => {
        console.log(data);
        if (!data.empty) return res.status(400).json({ error: 'You already sent one crossing request to this user for this book!' });
        else return db.doc(`/books/${newCrossing.randomBookId}`).update({ involved: true })
        .then(() => {
            return db.collection('crossings').add(newCrossing);
        });
    })
    .then(() => {
        return res.json({ message: 'Crossing request send successfully!' });
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

// Choose random book for sending request
exports.chooseRandomBook = (req, res) => {
    let sender = req.params.sender;
    let recipient = req.params.recipient;

    let randomBook = {};
    let mainInterests = [];
    let senderBooks = [];
    let filteredBooks = [];

    db.doc(`/users/${recipient}`).get()
    .then((doc) => {
        if (!doc.exists) return res.status(404).json({ error: 'User not found! '});
        else {
            mainInterests = doc.data().mainInterests;

            return db.collection('books').where("owner", "==", recipient).get();
        }
    })
    .then((data) => {
        if(data.empty) return res.status(400).json({ error: 'Recipient has no books added!' });
        else {
            // data.forEach((doc) => {
            //     let bookData = doc.data();
            //     bookData.bookId = doc.id;
            //     recipientBooks.push(bookData);
            // });

            return db.collection('books').where("owner", "==", sender).where('available', '==', true).where("involved", '==', false).get();
        }
    })
    .then((data) => {
        if (data.empty) return res.status(400).json({ error: 'Sender has no books added or none of them is available now!' });
        else {
            data.forEach((doc) => {
                let bookData = doc.data();
                bookData.bookId = doc.id;
                senderBooks.push(bookData);
                if(bookData.genres.some((genre) => mainInterests.includes(genre))) filteredBooks.push(bookData);
            });

            if (senderBooks.length === 0) return res.status(400).json({ error: 'Sender has no books unpromised in a crossing request!' });
            
            if(filteredBooks.length === 0) {
                let bookIndex = Math.floor(Math.random() * senderBooks.length);
                randomBook = {
                    randomBookId: senderBooks[bookIndex].bookId,
                    title: senderBooks[bookIndex].title,
                    author: senderBooks[bookIndex].author,
                    coverImage: senderBooks[bookIndex].coverImage,
                    averageRating: senderBooks[bookIndex].averageRating
                };
            } else {
                filteredBooks.sort((a, b) => {
                    return -(a.averageRating - b.averageRating);
                });
                randomBook = {
                    randomBookId: filteredBooks[0].bookId,
                    title: filteredBooks[0].title,
                    author: filteredBooks[0].author,
                    coverImage: filteredBooks[0].coverImage,
                    averageRating: filteredBooks[0].averageRating
                };
            }

            return res.json(randomBook);
        }
    })
    .catch((err) => {
        console.log(err.message);
        return res.status(500).json({ error: err.code });
    });
};

// Change crossing status from temporar to permanent
exports.changeToPermanent = (req, res) => {
    let status;
    let isSender = false;
    let permanent = false;
    let crossingType = {};
    const crossingDoc = db.doc(`/crossings/${req.params.crossingId}`);

    crossingDoc.get()
    .then((doc) => {
        if (!doc.exists) return res.status(404).json({ error: 'Crossing not found!' });
        else if (doc.data().type === "permanent") return res.status(400).json({ error: 'Crossing already permanent!' });
        else {
            if (req.user.username === doc.data().sender) {
                isSender = true;
                crossingType.senderPermanent = true;
                crossingType.recipientPermanent = doc.data().recipientPermanent;
            } else {
                crossingType.recipientPermanent = true;
                crossingType.senderPermanent = doc.data().senderPermanent;
            }

            if (crossingType.senderPermanent && crossingType.recipientPermanent && doc.data().senderProgress.sendBook && doc.data().recipientProgress.sendBook && doc.data().senderProgress.receiveBook && doc.data().recipientProgress.receiveBook) status = 'done';

            return crossingDoc.update( !!status ? {
                status: status,
                type: crossingType.senderPermanent && crossingType.recipientPermanent ? "permanent" : "temporar", 
                senderPermanent: crossingType.senderPermanent, 
                recipientPermanent: crossingType.recipientPermanent 
            } : {
                type: crossingType.senderPermanent && crossingType.recipientPermanent ? "permanent" : "temporar", 
                senderPermanent: crossingType.senderPermanent, 
                recipientPermanent: crossingType.recipientPermanent 
            })
            .then(() => {
                let message;
                if (crossingType.senderPermanent && crossingType.recipientPermanent) {
                    permanent = true;
                    message = 'Crossing type set to permanent!';
                }
                else message = 'Changes updated successfully! We are waiting for your crossing mate updates to make it official!';
                
                if (!permanent) {
                    return res.json({ message: message });
                } else {
                    let newNotification = {
                        notificationId: uuid(),
                        createdAt: new Date().toISOString(),
                        read: false,
                        sender: req.user.username,
                        senderImage: req.user.imageUrl,
                        recipient: isSender ? doc.data().recipient : doc.data().sender,
                        type: 'type-permanent',
                        crossingId: req.params.crossingId
                    }

                    return realtime.ref(`/notifications/${newNotification.notificationId}`).set(newNotification)
                    .then(() => {
                        return res.json({ message: message });
                    })
                }
            })
        }
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

// Change random book
exports.changeCrossingBook = (req, res) => {
    let crossingId = req.params.crossingId;
    let newbookId = req.params.newBookId;

    let crossingDoc = db.doc(`/crossings/${crossingId}`);
    let oldBookId;
    let crossingData = {};
    let newbookData = {};

    crossingDoc.get()
    .then((doc) => {
        if (!doc.exists) return res.status(404).json({ error: 'Crossing not found!' });
       
        crossingData = doc.data();
        crossingData.crossingId = crossingId;
        oldBookId = crossingData.randomBookId;

        if (crossingData.recipient !== req.user.username) return res.status(400).json({ error: 'Only the recipient can change his book! You choosed yours once!' });

        return db.doc(`/books/${oldBookId}`).get()
        .then((doc) => {
            if (!doc.exists) return res.status(404).json({ error: 'Old book not found!' });

            return db.doc(`/books/${oldBookId}`).update({ available: true })
            .then(() => {
                return db.doc(`/books/${newbookId}`).get()
                .then((doc) => {
                    if (!doc.exists) return res.status(404).json({ error: 'New chosen book not found!' });
                    else if (!doc.data().available) return res.status(400).json({ error: 'Chosen book is already shared! Choose an available one!' });
                    else {
                        newbookData = doc.data();
                        return db.doc(`/books/${newbookId}`).update({ available: false });
                    }
                })
                .then(() => {
                    let randomBook = {
                        author: newbookData.author,
                        title: newbookData.title,
                        coverImage: newbookData.coverImage,
                        averageRating: newbookData.averageRating
                    };

                    return crossingDoc.update({ randomBookId: newbookId, randomBook: randomBook });
                });
            })
            .then(() => {
                return res.json({ message: 'Book changed successfully!' });
            });
        });
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

// Accept crossing request (only by recipient)
exports.acceptCrossing = (req, res) => {
    const crossingDoc = db.doc(`/crossings/${req.params.crossingId}`);
    let bookId;
    let notifRecip;
    let sendChecknotif = false;
    let bookIdx = [];

    crossingDoc.get()
    .then((doc) => {
        if (!doc.exists) return res.status(404).json({ error: 'Crossing not found!' });

        if (doc.data().recipient === req.user.username) {
            bookIdx.push(doc.data().randomBookId);
            bookIdx.push(doc.data().reqBookId);  
            
            bookId = doc.data().reqBookId;
            notifRecip = doc.data().sender;

            return db.doc(`/books/${bookId}`).get()
            .then((doc) => {
                if (doc.data().available === false) return res.status(400).json({ error: 'Your book is not available now... Accept it later!' });
                else {
                    console.log('passed...');
                    const batch = db.batch();

                    return db.collection('crossings').where('randomBookId', '==', bookId).where('status', '==', 'pending').get()
                    .then((data) => {
                        let promises = [];
                        if (!data.empty) sendChecknotif = true;
                        data.forEach((doc) => {
                            if (doc.data().sender === req.user.username) promises.push(batch.delete(db.doc(`/crossings/${doc.id}`)));
                        });

                        return Promise.all(promises);
                    })
                    .then(() => {
                        return batch.commit();
                    })
                    .then(() =>  {
                        if (sendChecknotif) {
                                let newNotification = {
                                notificationId: uuid(),
                                createdAt: new Date().toISOString(),
                                read: false,
                                sender: req.user.username,
                                senderImage: req.user.imageUrl,
                                recipient: req.user.username,
                                type: 'check-request',
                                crossingId: req.params.crossingId
                            }

                            return realtime.ref(`/notifications/${newNotification.notificationId}`).set(newNotification);
                        }
                    })
                    .then(() => {
                        return crossingDoc.update({status: 'accepted', read: true})
                        .then((doc) => {
                            let newNotification = {
                                notificationId: uuid(),
                                createdAt: new Date().toISOString(),
                                read: false,
                                sender: req.user.username,
                                senderImage: req.user.imageUrl,
                                recipient: notifRecip,
                                type: 'accept-request',
                                crossingId: req.params.crossingId
                            }

                            return realtime.ref(`/notifications/${newNotification.notificationId}`).set(newNotification);
                        })
                        .then(() => {
                            let promises = [];
                            bookIdx.forEach((bookId) => {
                                promises.push(db.doc(`/books/${bookId}`).update({available: false, involved: true}));
                            });
                    
                            return Promise.all(promises);
                        })
                        .then(() => {
                            return res.json({ message: 'Book crossing accepted!' })
                        });
                    });
                }
            });
        }
        else return res.status(403).json({ error: 'You can not accept the same request that you sent!' });
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
}

// Reject crossing request (only by recipient)
exports.rejectCrossing = (req, res) => {
    const crossingDoc = db.doc(`/crossings/${req.params.crossingId}`);

    crossingDoc.get()
    .then((doc) => {
        if (!doc.exists) return res.status(404).json({ error: 'Book crossing not found!' });

        if (doc.data().recipient !== req.user.username) {
            return res.status(403).json({ error: 'Unauthorized!' });
        }

        return db.doc(`/books/${doc.data().randomBookId}`).update({ involved: false})
        .then(() => {
            return crossingDoc.delete();
        });
    })
    .then(() => {
        return res.json({ message: 'Book crossing rejected!' })
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    })
};

// Cancel book crossing (only if status <= 'accepted')
// status == pending -> just sender can cancel it
// status == accepted -> any user
exports.cancelCrossing = (req, res) => {
    const crossingDoc = db.doc(`/crossings/${req.params.crossingId}`);
    let bookIdx = [];

    crossingDoc.get()
    .then((doc) => {
        if (!doc.exists) return res.status(404).json({ error: 'Book crossing not found!' });
        else if (doc.data().status !== 'accepted' && doc.data().status !== 'pending') return res.status(400).json({ error: 'Seems like the crossing process has started, so it is too late to cancel it!' });
        else {
            bookIdx.push(doc.data().randomBookId);
            bookIdx.push(doc.data().reqBookId);

            if (doc.data().status === 'pending') {
                if (doc.data().sender === req.user.username) {
                    return crossingDoc.delete()
                    .then(() => {
                        let promises = [];
                        bookIdx.forEach((bookId) => {
                            promises.push(db.doc(`/books/${bookId}`).update({available: true, involved: false}));
                        });
                
                        return Promise.all(promises)
                        .then(() => {
                            return res.json({ message: 'Book crossing canceled successfully!' });
                        });
                    });
                }
            } 
            else return crossingDoc.update({
                canceled: true,
                canceledBy: req.user.username
            })
            .then(() => { 
                let newNotification = {
                    notificationId: uuid(),
                    createdAt: new Date().toISOString(),
                    read: false,
                    sender: req.user.username,
                    senderImage: req.user.imageUrl,
                    type: 'cancel-request',
                    crossingId: doc.id
                }
    
                if (doc.data().sender === req.user.username) newNotification.recipient = doc.data().recipient;
                else newNotification.recipient = doc.data().sender;
    
                return realtime.ref(`/notifications/${newNotification.notificationId}`).set(newNotification);
            })
            .then(() => {
                let promises = [];
                bookIdx.forEach((bookId) => {
                    promises.push(db.doc(`/books/${bookId}`).update({available: true, involved: false}));
                });
        
                return Promise.all(promises)
                .then(() => {
                    return res.json({ message: 'Book crossing canceled successfully!' });
                });
            });
        }
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({error: err.code});
    })
};

// Change each user crossing progress -> status updated by itself
exports.changeCrossingStatus = (req, res) => {
    const crossingDoc = db.doc(`/crossings/${req.params.crossingId}`);

    let isSender = false;
    let status;
    let crossingData = {};

    let senderProgress = {};
    let recipientProgress = {};
    let bookIdx = [];

    crossingDoc.get()
    .then(doc => {
        if (!doc.exists) return res.status(404).json({ error: 'Crossing not found!' });

        status = doc.data().status;
        crossingData = doc.data();

        if (doc.data().sender === req.user.username) {
            isSender = true;
            senderProgress = {
                sendBook: req.body.sendBook,
                receiveBook: req.body.receiveBook,
                sendBack: req.body.sendBack,
                getBookBack: req.body.getBookBack
            };
            recipientProgress = doc.data().recipientProgress;
        }
        else {
            senderProgress = doc.data().senderProgress;
            recipientProgress = {
                sendBook: req.body.sendBook,
                receiveBook: req.body.receiveBook,
                sendBack: req.body.sendBack,
                getBookBack: req.body.getBookBack
            };
        }

        if (senderProgress.sendBook && recipientProgress.sendBook) {
            if (senderProgress.receiveBook && recipientProgress.receiveBook) {
                if (doc.data().type === "permanent") {
                    bookIdx.push(doc.data().randomBookId);
                    bookIdx.push(doc.data().reqBookId);
                    status = 'done';
                } else if (senderProgress.sendBack && recipientProgress.sendBack) {
                    if (senderProgress.getBookBack && recipientProgress.getBookBack) {
                        bookIdx.push(doc.data().randomBookId);
                        bookIdx.push(doc.data().reqBookId);
                        status = 'done';
                    } 
                    else status = 'send-back';
                }
                else status = 'start-reading';
            }
            else status = 'book-send';
        }

        if (isSender) {
            return doc.ref.update({
                status: status,
                senderProgress: senderProgress
            });
        } else {
            return doc.ref.update({
                status: status,
                recipientProgress: recipientProgress
            });
        }
    })
    .then(() => {
        let promises = [];

        if (status === 'done') {
            let senderNotification = {
                notificationId: uuid(),
                createdAt: new Date().toISOString(),
                read: false,
                sender: req.user.username,
                senderImage: req.user.imageUrl,
                recipient: crossingData.sender,
                type: 'crossing-done',
                crossingId: req.params.crossingId
            }

            let recipientNotification = {
                notificationId: uuid(),
                createdAt: new Date().toISOString(),
                read: false,
                sender: req.user.username,
                senderImage: req.user.imageUrl,
                recipient: crossingData.recipient,
                type: 'crossing-done',
                crossingId: req.params.crossingId
            }

            promises.push(realtime.ref(`/notifications/${senderNotification.notificationId}`).set(senderNotification));
            promises.push(realtime.ref(`/notifications/${recipientNotification.notificationId}`).set(recipientNotification));
        }

        if (status === 'done' && crossingData.type === "permanent" && bookIdx.length === 2) {
            promises.push(db.doc(`/books/${bookIdx[0]}`).update({
                owner: crossingData.recipient,
                ownerImage: crossingData.recipientData.userImage,
                available: true,
                involved: false
            }));
            promises.push(db.doc(`/books/${bookIdx[1]}`).update({
                owner: crossingData.sender,
                ownerImage: crossingData.senderData.userImage,
                available: true,
                involved: false
            }));
        } else {
            bookIdx.forEach((bookId) => {
                promises.push(db.doc(`/books/${bookId}`).update(
                        {available: true, involved: false}
                    ));
            });
        }

        return Promise.all(promises);
    })
    .then(() => {
        return res.json({ message: 'Crossing status updated successfully!' });
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    })
};

// Get book crossing details
exports.getCrossingDetails = (req, res) => {
    let crossingData = {};
    crossingData.topics = [];

    db.doc(`/crossings/${req.params.crossingId}`).get()
    .then((doc) => {
        if (!doc.exists) return res.status(404).json({error: 'Book crossing not found!'});

        crossingData = doc.data();
        crossingData.crossingId = doc.id;

        return realtime.ref(`/topics/`).orderByChild("crossingId").equalTo(req.params.crossingId).get();
    })
    .then((data) => {
        if (data.exists()) {
            crossingData.topics = Object.values(data.val()).reverse();
        } else crossingData.topics = [];

        let prom = [];
        crossingData.topics.map((topic) => {    
            topic.replyData = [];
            if (topic.replyCount > 0) {
                topic.replies.map( (reply) => {
                    prom.push(realtime.ref(`/replies/${reply}`).get());
                });
            }
        });

        return Promise.all(prom);
    })
    .then((responses) => {
        responses.forEach((response) => {
            reply = response.val();

            crossingData.topics.map((topic) => {
                if (topic.topicId === reply.topicId) topic.replyData.push(reply);
                topic.replyData.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
            });
        });

        crossingData.topics.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
        return res.json(crossingData);
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({error: err.code});
    });
};

// Delete book crossing (only if its finished)
exports.deleteCrossing = (req, res) => {
    const crossingDoc = db.doc(`/crossings/${req.params.crossingId}`);
    let crossingData = {};
    crossingData.topics = [];

    deleteIt = false;
    isSender = false;

    crossingDoc.get()
    .then((doc) => {
        if (!doc.exists) return res.status(404).json({ error: 'Book crossing already deleted!' });

        crossingData = doc.data();
        crossingData.crossingId = req.params.crossingId;

        if (doc.data().status !== 'done' && !doc.data().canceled) return res.status(404).json({error: 'This crossing is not finished yet. You can not delete it!'});

        if (doc.data().sender === req.user.username) {
            isSender = true;
            if (doc.data().recipientData.show === false) {
                deleteIt = true;
            }
        } else if (doc.data().recipient === req.user.username) {
            if (doc.data().senderData.show === false) {
                deleteIt = true;
            }
        }

        if (deleteIt) {
            return crossingDoc.delete();
        }
        
        if (isSender) {
            crossingData.senderData.show = false;
            return crossingDoc.update({
                senderData: crossingData.senderData
            });
        } else {
            crossingData.recipientData.show = false;
            return crossingDoc.update({
                recipientData: crossingData.recipientData
            });
        }
    })
    .then(() => {
        if (deleteIt) {
            let promises = [];
            realtime.ref(`/topics/`).orderByChild("crossingId").equalTo(req.params.crossingId).get()
            .then((data) => {
                if (data.exists()) {
                    crossingData.topics = Object.values(data.val());
                }

                if (crossingData.topics) {
                    crossingData.topics.map((topic) => {
                        if (topic.replyCount > 0) {
                            topic.replies.map( (reply) => {
                                promises.push(realtime.ref(`/replies/${reply}`).remove());
                            });
                        }
    
                        promises.push(realtime.ref(`/topics/${topic.topicId}`).remove());
                    });
                }

                return realtime.ref(`/notifications/`).orderByChild("crossingId").equalTo(req.params.crossingId).get();
            })
            .then((data) => {
                if (data.exists()) {
                    let notifications = Object.values(data.val());
                    notifications.forEach((notif) => {
                        promises.push(realtime.ref(`/notifications/${notif.notificationId}`).remove());
                    });
                }

                return Promise.all(promises);
            });
        }
    })
    .then(() => {
        return res.json({ message: 'Book crossing deleted successfully!' });
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({error: err.code});
    });
};

// Mark crossing requests read
exports.markCrossingReqRead = (req, res) => {
    db.doc(`/crossings/${req.params.crossingId}`).update({ read: true })
    .then(() => {
        return res.json({message: 'Crossing request marked read.'});
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({error: err.code});
    });
};