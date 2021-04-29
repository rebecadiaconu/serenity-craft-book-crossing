const { db } = require('../util/admin');
const firebase = require('firebase');
const { uuid } = require('uuidv4');

realtime = firebase.database();


exports.addTopic = (req, res) => {

    let errors = {};

    if (req.body.title.trim() === '') errors.title = 'Must not be empty!';
    if (req.body.body.trim() === '') errors.body = 'Must not be empty!';

    if (!Object.keys(errors).length === 0) return res.status(400).json(errors);

    let newTopic = {
        crossingId: req.params.crossingId,
        createdAt: new Date().toISOString(),
        username: req.user.username,
        userImage: req.user.imageUrl,
        title: req.body.title.trim(),
        body: req.body.body.trim(),
        replies: [],   
        replyCount: 0
    };

    db.doc(`/crossings/${req.params.crossingId}`).get()
    .then((doc) => {
        if (!doc.exists) return res.status(404).json({ error: 'Book crossing not found!' });

        let topicId = uuid();
        newTopic.topicId = topicId;

        let updates = {};
        updates['/topics/' + topicId] = newTopic;

        return realtime.ref().update(updates);
    })
    .then(() => {
        return res.json(newTopic);
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};


exports.editTopic = (req, res) => {
    let errors = {};

    console.log("EDIT TOPIC!");

    if (req.body.title.trim() === '') errors.title = 'Must not be empty!';
    if (req.body.body.trim() === '') errors.body = 'Must not be empty!';

    if (!(Object.keys(errors).length === 0)) return res.status(400).json(errors);

    let topicData = {};
    let updates = {};
    updates['title'] = req.body.title.trim();
    updates['body'] = req.body.body.trim();

    realtime.ref(`/topics/${req.params.topicId}`).get()
    .then((data) => {
        if (!data.exists()) return res.status(404).json({ error: 'Topic not found!' });

        topicData = data.val();

        if (topicData.username !== req.user.username) return res.status(403).json({ error: 'Unauthorized!' });

        return realtime.ref(`/topics/${req.params.topicId}`).update(updates);
    })
    .then(() => {
        return res.json({ message: 'Topic updated successfully!' });
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};


exports.deleteTopic = (req, res) => {
    let topicData = {};

    realtime.ref(`/topics/${req.params.topicId}`).get()
    .then((data) => {
        if (!data.exists()) return res.status(404).json({ error: 'Topic already deleted!' });

        topicData = data.val();

        if (topicData.username !== req.user.username) return res.status(403).json({ error: 'Unauthorized!' });

        return realtime.ref(`/topics/${req.params.topicId}`).remove();
    })
    .then(() => {
        let promises = [];

        topicData.replies.forEach((reply) => {
            promises.push(realtime.ref(`/replies/${reply}`).remove());
        });

        return Promise.all(promises);
    })
    .then(() => {
        return res.json({ message: 'Topic deleted successfully!' });
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};


exports.addReply = (req, res) => {
    let errors = {};

    if (req.body.body.trim() === '') errors.body = 'Must not be empty!';

    if (!(Object.keys(errors).length === 0)) return res.status(400).json(errors);

    let newReply = {
        replyId: uuid(),
        topicId: req.params.topicId,
        createdAt: new Date().toISOString(),
        username: req.user.username,
        userImage: req.user.imageUrl,
        body: req.body.body.trim()
    };
    let topicData ={};

    realtime.ref(`/topics/${req.params.topicId}`).get()
    .then((data) => {
        if (!data.exists()) return res.status(404).json({ error: 'Topic not found!' });

        topicData = data.val();

        if (topicData.replyCount > 0) topicData.replies.push(newReply.replyId);
        else topicData.replies = [newReply.replyId];
        topicData.replyCount++;

        let topicUpdates = {};
        topicUpdates['replyCount'] = topicData.replyCount;
        topicUpdates['replies'] = topicData.replies;

        return realtime.ref(`/topics/${req.params.topicId}`).update(topicUpdates);
    })
    .then(() => {
        return realtime.ref(`/replies/${newReply.replyId}`).set(newReply);
    })
    .then(() => {
        return res.json(newReply);
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};


exports.deleteReply = (req, res) => {
    realtime.ref(`/topics/${req.params.topicId}`).get()
    .then((data) => {
        if (!data.exists()) return res.status(404).json({ error: 'Topic not found!' });

        topicData = data.val();

        if (topicData.replyCount > 0 && topicData.replies.includes(req.params.replyId)) {
            topicData.replyCount--;
            topicData.replies.splice(topicData.replies.indexOf(req.params.replyId), 1);
        }
        else return res.status(404).json({ error: 'Do not belong to this topic!' });

        let topicUpdates = {};
        topicUpdates['replyCount'] = topicData.replyCount;
        topicUpdates['replies'] = topicData.replies;

        return realtime.ref(`/topics/${req.params.topicId}`).update(topicUpdates);
    })
    .then(() => {
        return realtime.ref(`/replies/${req.params.replyId}`).remove();
    })
    .then(() => {
        return res.json({ message: 'Reply deleted successfully!' });
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};