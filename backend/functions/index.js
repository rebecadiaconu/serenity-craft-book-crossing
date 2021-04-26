const functions = require("firebase-functions");
const app = require('express')();

const { signUp, logIn, forgotPassword, changeEmail, changeUsername, changePassword, uploadImage, addUserDetails, getUserDetails } = require('./handlers/users');
const { addBook, uploadCoverImage, editBook, getAllBooks, getBook, reviewBook, editReview, deleteReview } = require('./handlers/books');
const { sendCrossingReq, getCrossingDetails, deleteCrossing } = require('./handlers/crossings');

const fbAuth = require("./util/fbAuth");
const bookOwnerAuth = require("./util/bookOwnerAuth");


// User routes
app.post('/signup', signUp);        // Sign up with email and password route
app.post('/login', logIn);        // Log in with email and password route
app.post('/forgotPassword', forgotPassword);
app.post('/user/image', fbAuth, uploadImage);        // Upload user profile picture
app.post('/user', fbAuth, addUserDetails);       // Add user details
app.post('/user/email', fbAuth, changeEmail);       // Change account email
app.post('/user/username', fbAuth, changeUsername);         // Change account username
app.post('/user/password', fbAuth, changePassword);       // Change account password
app.get('/user/:username', getUserDetails);          // Get any user details 

// Book routes
app.get('/books', getAllBooks);     // Get all books
app.post('/book', fbAuth, addBook);     // Add new book
app.post('/books/:bookId', bookOwnerAuth, editBook);       // Add/edit book details
app.post('/books/:bookId/cover', bookOwnerAuth, uploadCoverImage);        // Choose book's cover image
app.post('/books/:bookId/review', fbAuth, reviewBook);      // Add book Review
app.post('/books/:bookId/:reviewId', fbAuth, editReview);       // Edit book review
app.delete('/books/:bookId/:reviewId', fbAuth, deleteReview);       // Delete book review


// Crossing routes
// routes crossing??? '/books/..' -> calls the editReview route
app.post('/book/:bookId/crossing', fbAuth, sendCrossingReq);       // Send crossing request + add crossing
// app.get('/crossings/:crossingId', fbAuth, getCrossingDetails);      // Get crossing details (crossing data + topics + replies)
// app.delete('/crossings/:crossingId', fbAuth, deleteCrossing);       // Delete book crossing 

// TODO:

// USER
// app.get('/user', fbAuth,  getAuthenticatedUser);         // Get current user details  (books + crossings + notif)
// app.delete('/user/:username', fbAuth, deleteUserAccount);          // Delete account

// BOOKS
// app.delete('book/:bookId', bookOwnerAuth, deleteBook);          // Delete book
// app.get('/books/:bookId', fbAuth, getBook);     // Get book details


// ???
// app.get('/crossings', fbAuth, getUserCrossings);            // Get user crossings ??
// app.post('/book/:bookId/image', fbAuth, addBookImages);         // Add book's images


exports.api = functions.region('europe-west1').https.onRequest(app);