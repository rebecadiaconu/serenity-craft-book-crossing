const { db, admin } = require('../util/admin');


exports.sendCrossingReq = (req, res) => {
    const newCrossing = {
        type: req.body.type.trim(),
        createdAt: new Date().toISOString(),
        sender: req.user.username,
        senderData: {
            userImage: req.user.imageUrl,
            show: true
        },
        recipient: req.body.owner,
        recipientData: {
            userImage: req.body.ownerImage,
            show: true
        },
        reqBookId: req.params.bookId,
        randomBookId: req.body.randomBookId,
        reqBook: req.body.reqBook,
        randomBook: req.body.randomBook,
        status: 'pending',
    };

    db.collection('crossings')
    .where('sender', '==', newCrossing.sender)
    .where('recipient', '==', newCrossing.recipient)
    .where('reqBookId', '==', newCrossing.reqBookId)
    .limit(1)
    .get()
    .then((data) => {
        if (!data.empty) return res.status(400).json({ error: 'You already sent one crossing request for this book!' });

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


exports.getCrossingDetails = (req, res) => {

};


exports.deleteCrossing = (req, res) => {

};