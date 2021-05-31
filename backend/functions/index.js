const functions = require("firebase-functions");
const app = require('express')();

var cors = require('cors');
app.use(cors());

const { 
    signUp, 
    logIn, 
    forgotPassword, 
    changeEmail, 
    changeUsername, 
    changePassword, 
    uploadImage, 
    deleteImage, 
    addUserDetails, 
    getAuthenticatedUser, 
    getRequests, 
    getNotifications, 
    getUserDetails, 
    addToFavs,
    removeFromFavs,
    markNotificationRead, 
    deleteUserAccount 
} = require('./handlers/users');
const { 
    addBook, 
    uploadCoverImage, 
    deleteCoverImage, 
    editBook, 
    getBook, 
    deleteBook, 
    getAllBooks, 
    reviewBook, 
    getReview, 
    editReview,
    deleteReview 
} = require('./handlers/books');
const { 
    sendCrossingReq, 
    markCrossingReqRead, 
    chooseRandomBook, 
    changeToPermanent, 
    acceptCrossing, 
    rejectCrossing, 
    cancelCrossing, 
    changeCrossingStatus, 
    changeCrossingBook, 
    getCrossingDetails, 
    deleteCrossing } = require('./handlers/crossings');
const { 
    addTopic, 
    getTopic, 
    editTopic, 
    deleteTopic, 
    addReply, 
    deleteReply } = require('./handlers/topics');

const { fbAuth, bookOwnerAuth, crossingPartener } = require('./util/middleware');


// User routes
app.post('/signup', signUp);        // Sign up with email and password route
app.post('/login', logIn);        // Log in with email and password route
app.post('/forgotPassword', forgotPassword);
app.get('/user', fbAuth,  getAuthenticatedUser);         // Get current user details  (books + crossings + notif + req)
app.post('/user', fbAuth, addUserDetails);       // Add user details
app.post('/user/favs/:bookId', fbAuth, addToFavs);      // Add book to Favorites
app.post('/user/noFavs/:bookId', fbAuth, removeFromFavs);      // Add book to Favorites
app.post('/user/delete', fbAuth, deleteUserAccount);          // Delete account
app.post('/user/image', fbAuth, uploadImage);        // Upload user profile picture
app.post('/user/noImage', fbAuth, deleteImage);        // Remove user profile picture
app.post('/user/email', fbAuth, changeEmail);       // Change account email
app.post('/user/username', fbAuth, changeUsername);         // Change account username
app.post('/user/password', fbAuth, changePassword);       // Change account password
app.get('/user/requests', fbAuth, getRequests);      // Get auth user crossing requests
app.get('/user/notifications', fbAuth, getNotifications);      // Get auth user notifications
app.get('/user/:username', getUserDetails);          // Get any user details 
app.post('/notifications', fbAuth, markNotificationRead);       // Mark user notifications as read


// Book routes
app.post('/book', fbAuth, addBook);     // Add new book
app.post('/book/:bookId/cover', bookOwnerAuth, uploadCoverImage);        // Choose book's cover image
app.post('/book/:bookId/noCover', bookOwnerAuth, deleteCoverImage);        // Remove book's cover image
app.post('/book/:bookId/review', fbAuth, reviewBook);      // Add book Review
app.post('/book/:bookId/:reviewId', fbAuth, editReview);       // Edit book review
app.delete('/book/:bookId/:reviewId', fbAuth, deleteReview);       // Delete book review

app.get('/books', getAllBooks);     // Get all books
app.get('/books/:bookId', getBook);     // Get book details
app.post('/books/:bookId', bookOwnerAuth, editBook);       // Add/edit book details
app.delete('/books/:bookId', bookOwnerAuth, deleteBook);          // Delete book

app.get('/reviews/:reviewId', fbAuth, getReview);       // Get review

// Crossing routes
app.post('/requests', fbAuth, markCrossingReqRead); // Mark crossing requests seen
app.post('/crossing/:bookId', fbAuth, sendCrossingReq);       // Send crossing request + add crossing
app.post('/crossing/:crossingId/accept', crossingPartener, acceptCrossing);     // Accept crossing request by recipient
app.post('/crossing/:crossingId/reject', crossingPartener, rejectCrossing);     // Reject crossing request by recipient
app.post('/crossing/:crossingId/cancel', crossingPartener, cancelCrossing);     // Cancel crossing request by recipient
app.post('/crossing/:crossingId/status', crossingPartener, changeCrossingStatus);       // Change book crossing status progress 
app.post('/crossing/:crossingId/permanent', crossingPartener, changeToPermanent);       // Change type to permanent 
app.get('/crossings/:crossingId', crossingPartener, getCrossingDetails);      // Get crossing details (crossing data + topics + replies)
app.delete('/crossings/:crossingId', crossingPartener, deleteCrossing);       // Delete book crossing 
app.post('/crossings/:crossingId/:newBookId', crossingPartener, changeCrossingBook); // Recipient changed crossing book

app.post('/random/:sender/:recipient', fbAuth, chooseRandomBook);   // Choose random book for crossing

// Topics routes
app.post('/crossing/:crossingId/topic', crossingPartener, addTopic);       // Add topic in book crossing page
app.get('/topics/:topicId', fbAuth, getTopic);        // Get topic details
app.post('/topics/:topicId', fbAuth, editTopic);        // Edit topic title and body
app.delete('/topics/:topicId', fbAuth, deleteTopic);        // Delete topic


// Replies routes
app.post('/topics/:topicId/reply', fbAuth, addReply);
app.delete('/topics/:topicId/:replyId', fbAuth, deleteReply);


exports.api = functions.region('europe-west1').https.onRequest(app);