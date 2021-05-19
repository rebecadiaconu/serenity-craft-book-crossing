const { db, admin } = require('./admin');


exports.fbAuth = (req, res, next) => {
    let idToken;

    if (req.headers.authorization &&  req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
    }
    else {
        console.error('No token found!');
        return res.status(403).json({error: 'Unauthorized!'});
    }

    admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
        req.user = decodedToken;

        return db.collection('users')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => { 
        req.user.email = data.docs[0].data().email;
        req.user.username = data.docs[0].data().username;
        req.user.imageUrl = data.docs[0].data().imageUrl;
        
        return next();
    })
    .catch((err) => {
        console.error('Error while verifying token ', err);
        return res.status(403).json(err);
    });
};


exports.bookOwnerAuth = (req, res, next) => {
    let idToken;

    if (req.headers.authorization &&  req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
    }
    else {
        console.error('No token found!');
        return res.status(403).json({error: 'Unauthorized!'});
    }

    admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
        req.user = decodedToken;

        return db.collection('users')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => { 
        req.user.email = data.docs[0].data().email;
        req.user.username = data.docs[0].data().username;
        req.user.imageUrl = data.docs[0].data().imageUrl;

        db.doc(`/books/${req.params.bookId}`).get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Book not found!' });
            }

            if (doc.data().owner === req.user.username) return next();
            else return res.status(403).json({ error: 'Unauthorized!' });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json(err);
        });
    })
    .catch((err) => {
        console.error('Error while verifying token ', err);
        return res.status(403).json(err);
    });
};


exports.crossingPartener = (req, res, next) => {
    let idToken;

    if (req.headers.authorization &&  req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
    }
    else {
        console.error('No token found!');
        return res.status(403).json({error: 'Unauthorized!'});
    }

    admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
        req.user = decodedToken;

        return db.collection('users')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => { 
        req.user.username = data.docs[0].data().username;
        req.user.imageUrl = data.docs[0].data().imageUrl;
        
        db.doc(`/crossings/${req.params.crossingId}`).get()
        .then((doc) => {
            if (!doc.exists) return res.status(404).json({ error: 'Crossing not found!' });

            if (doc.data().recipient === req.user.username || doc.data().sender === req.user.username) return next();
            else return res.status(403).json({ error: 'Unathorized!' });
        });
    })
    .catch((err) => {
        console.error('Error while verifying token ', err);
        return res.status(403).json(err);
    });
};