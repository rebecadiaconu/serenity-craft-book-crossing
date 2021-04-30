const { db, admin } = require('../util/admin');
const firebase = require('firebase');
const e = require('express');
const { uuid } = require('uuidv4');

realtime = firebase.database();


// Send crossing request
exports.sendCrossingReq = (req, res) => {
    const newCrossing = {
        type: req.body.type.trim(),
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
        canceled: false
    };

    db.collection('crossings')
    .where('sender', '==', newCrossing.sender)
    .where('recipient', '==', newCrossing.recipient)
    .where('reqBookId', '==', newCrossing.reqBookId)
    .limit(1)
    .get()
    .then((data) => {
        if (!data.empty) return res.status(400).json({ error: 'You already sent one crossing request to this user for this book!' });
        return db.collection('crossings').add(newCrossing);
    })
    .then(() => {
        return res.json({ message: 'Crossing request sent successfully! '});
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

// Accept crossing request (only by recipient)
exports.acceptCrossing = (req, res) => {
    const crossingDoc = db.doc(`/crossings/${req.params.crossingId}`);
    let bookIdx = [];

    crossingDoc.get()
    .then((doc) => {
        if (!doc.exists) return res.status(404).json({ error: 'Crossing not found!' });

        if (doc.data().recipient === req.user.username) {
            bookIdx.push(doc.data().randomBookId);
            bookIdx.push(doc.data().reqBookId);            

            return doc.ref.update({status: 'accepted'})
            .then(() => {
                let newNotification = {
                    notificationId: uuid(),
                    createdAt: new Date().toISOString(),
                    read: false,
                    sender: req.user.username,
                    senderImage: req.user.imageUrl,
                    recipient: doc.data().sender,
                    type: 'accept-request',
                    crossingId: doc.id
                }

                return realtime.ref(`/notifications/${newNotification.notificationId}`).set(newNotification);
            });
        }
        else return res.status(403).json({ error: 'You can not accept the same request that you sent!' });
    })
    .then(() => {
        let promises = [];
        bookIdx.forEach((bookId) => {
            promises.push(db.doc(`/books/${bookId}`).update({available: false, crossingId: req.params.crossingId}));
        });

        return Promise.all(promises);
    })
    .then(() => {
        return res.json({ message: 'Book crossing accepted!' })
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

        return crossingDoc.delete();
        // notification to the sender
    })
    .then(() => {
        return res.json({ message: 'Book crossing rejected!' })
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    })
};

// Cancel book crossing (only if status > 'accepted')
// status == pending -> just sender can cancel it
// status == accepted -> any user
exports.cancelCrossing = (req, res) => {
    const crossingDoc = db.doc(`/crossings/${req.params.crossingId}`);
    let bookIdx = [];

    crossingDoc.get()
    .then((doc) => {
        if (!doc.exists) return res.status(404).json({ error: 'Book crossing not found!' });

        if (doc.data().status !== 'accepted' && doc.data().status !== 'pending') return res.status(400).json({ error: 'Seems like the crossing process has started, so it is too late to cancel it!' });

        if (doc.data().status === 'pending') {
            if (doc.data().sender === req.user.username) {
                bookIdx.push(doc.data().randomBookId);
                bookIdx.push(doc.data().reqBookId);

                return crossingDoc.delete();
            }
        } 

        return crossingDoc.update({
            canceled: true,
            canceledBy: req.user.username,
            reason: req.body.reason.trim()
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
        });
    })
    .then(() => {
        let promises = [];
        bookIdx.forEach((bookId) => {
            promises.push(db.doc(`/books/${bookId}`).update({available: true, crossingId: admin.firestore.FieldValue.delete()}));
        });

        return Promise.all(promises);
    })
    .then(() => {
        return res.json({ message: 'Book crossing canceled successfully!' });
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

    let senderProgress = {};
    let recipientProgress = {};
    let bookIdx = [];

    crossingDoc.get()
    .then(doc => {
        if (!doc.exists) return res.status(404).json({ error: 'Crossing not found!' });

        status = doc.data().status;

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
                if (senderProgress.sendBack && recipientProgress.sendBack) {
                    if (senderProgress.getBookBack && recipientProgress.getBookBack){
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
        bookIdx.forEach((bookId) => {
            promises.push(db.doc(`/books/${bookId}`).update({available: true, crossingId: admin.firestore.FieldValue.delete()}));
        });

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
        }

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
            });
        });

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

        if (doc.data().status !== 'done') return res.status(404).json({error: 'This crossing is not finished yet. You can not delete it!'});

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


// exports.getCrossingDetails = (req, res) => {
//     let crossingData = {};
//     db.doc(`/crossings/${req.params.crossingId}`).get()
//     .then((doc) => {
//         if (!doc.exists) return res.status(404).json({error: 'Book crossing not found!'});

//         crossingData = doc.data();
//         crossingData.crossingId = doc.id;

//         return realtime.ref(`/topics/${req.params.crossingId}`).get();
//     })
//     .then((data) => {
//         crossingData.topics = [];
//         if (data.exists()) {
//             crossingData.topics = Object.values(data.val()).reverse();
//         }
//     })
//     .then(() => {
//         return res.json(crossingData);
//     })
//     .catch((err) => {
//         console.error(err);
//         return res.status(500).json({error: err.code});
//     })
// };