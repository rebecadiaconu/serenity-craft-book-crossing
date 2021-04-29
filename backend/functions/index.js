const functions = require("firebase-functions");
const app = require('express')();

const { signUp, logIn, forgotPassword, changeEmail, changeUsername, changePassword, uploadImage, addUserDetails, getAuthenticatedUser, getUserDetails } = require('./handlers/users');
const { addBook, uploadCoverImage, editBook, getBook, deleteBook, getAllBooks, reviewBook, editReview, deleteReview } = require('./handlers/books');
const { sendCrossingReq, acceptCrossing, rejectCrossing, cancelCrossing, changeCrossingStatus, getCrossingDetails, deleteCrossing } = require('./handlers/crossings');
const { addTopic, editTopic, deleteTopic, addReply, deleteReply } = require('./handlers/topics');

const { fbAuth, bookOwnerAuth, crossingPartener } = require('./util/middleware');


// User routes
app.post('/signup', signUp);        // Sign up with email and password route
app.post('/login', logIn);        // Log in with email and password route
app.post('/forgotPassword', forgotPassword);
app.get('/user', fbAuth,  getAuthenticatedUser);         // Get current user details  (books + crossings + notif + req)
app.post('/user', fbAuth, addUserDetails);       // Add user details
app.post('/user/image', fbAuth, uploadImage);        // Upload user profile picture
app.post('/user/email', fbAuth, changeEmail);       // Change account email
app.post('/user/username', fbAuth, changeUsername);         // Change account username
app.post('/user/password', fbAuth, changePassword);       // Change account password
app.get('/user/:username', getUserDetails);          // Get any user details 
// app.delete('/user', fbAuth, deleteUserAccount);          // Delete account


// Book routes
app.post('/book', fbAuth, addBook);     // Add new book
app.post('/book/:bookId/cover', bookOwnerAuth, uploadCoverImage);        // Choose book's cover image
app.post('/book/:bookId/review', fbAuth, reviewBook);      // Add book Review
app.post('/book/:bookId/:reviewId', fbAuth, editReview);       // Edit book review
app.delete('/book/:bookId/:reviewId', fbAuth, deleteReview);       // Delete book review

app.get('/books', getAllBooks);     // Get all books
app.get('/books/:bookId', getBook);     // Get book details
app.post('/books/:bookId', bookOwnerAuth, editBook);       // Add/edit book details
app.delete('/books/:bookId', bookOwnerAuth, deleteBook);          // Delete book


// Crossing routes
app.post('/crossing/:bookId', fbAuth, sendCrossingReq);       // Send crossing request + add crossing
app.post('/crossing/:crossingId/accept', crossingPartener, acceptCrossing);     // Accept crossing request by recipient
app.post('/crossing/:crossingId/reject', crossingPartener, rejectCrossing);     // Accept crossing request by recipient
app.post('/crossing/:crossingId/cancel', crossingPartener, cancelCrossing);     // Accept crossing request by recipient
app.post('/crossing/:crossingId/status', crossingPartener, changeCrossingStatus);       // Change book crossing status progress 
app.get('/crossings/:crossingId', crossingPartener, getCrossingDetails);      // Get crossing details (crossing data + topics + replies)
app.delete('/crossings/:crossingId', crossingPartener, deleteCrossing);       // Delete book crossing 


// Topics routes
app.post('/crossing/:crossingId/topic', crossingPartener, addTopic);       // Add topic in book crossing page
app.post('/topics/:topicId', fbAuth, editTopic);        // Edit topic title and body
app.delete('/topics/:topicId', fbAuth, deleteTopic);        // Delete topic


// Replies routes
app.post('/topics/:topicId/reply', fbAuth, addReply);
app.delete('/topics/:topicId/:replyId', fbAuth, deleteReply);


// ???
// app.post('/book/:bookId/image', fbAuth, addBookImages);         // Add book's images
// app.post('/crossing/:crossingId/type, crossingPartener, changeCrossingType); 


exports.api = functions.region('europe-west1').https.onRequest(app);