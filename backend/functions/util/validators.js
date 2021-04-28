const isEmpty = (value) => {
    if (value.trim() === '') return true;
    else return false;
};


const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.match(emailRegEx)) return true;
    else return false;
};


// User validators
exports.validateEmail = (data) => {
    let errors = {};

    if (isEmpty(data)) errors.email = 'Must not be empty!';
    else if (!isEmail(data)) errors.email = 'Must be a valid email!';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

exports.validateSignUpData = (data) => {
    let errors = {};

    if (isEmpty(data.email)) {
        errors.email = 'Must not be empty!';
    } else if (!isEmail(data.email)) {
        errors.email = 'Must be a valid email address!';
    }

    if (isEmpty(data.password)) {
        errors.password = 'Must not be empty.';
    } else if (data.password.length < 8) {
        errors.password = 'Must be at least 8 characters long!';
    } else if (isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Please confirm your password!";
    } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Passwords must match!";
    }

    if (isEmpty(data.username)) {
        errors.handle = 'Must not be empty.';
    }
    // else if (data.username.includes('@')) {
    //     errors.username = 'Must not contain  @.';
    // }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
};

exports.validateLogInData = (data) => {
    
    let errors = {};

    if (isEmpty(data.email)) errors.email = "Must not be empty!";
    else if (!isEmail(data.email)) errors.email = "Must be a valid email!";
    if (isEmpty(data.password)) errors.password = "Must not be empty!";

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
};

exports.reduceUserDetails = (data) => {
    let userDetails = {};

    if (data.hasOwnProperty('bio')) {
        userDetails.bio = data.bio.trim();
    }

    userDetails.mainInterests = [];
    if (data.hasOwnProperty('mainInterests')) {        
        if (data.mainInterests.length !== 0) {
            data.mainInterests.forEach(doc => {
                userDetails.mainInterests.push(doc.trim());
            });
        }
    }

    if (data.hasOwnProperty('location')) {
        userDetails.location = data.location.trim();
    }

    return userDetails;
};



// Book validators
exports.validateBookData = (data) => {
    let errors = {};

    if (isEmpty(data.title)) errors.title = 'Must not be empty!';
    else if (data.title.length < 3) errors.title = 'Must be at least 3 characters long!';
    else if (data.title.length > 60) errors.title = 'Maximum length reached!';

    if (isEmpty(data.author)) errors.author = 'Must not be empty!';
    else if (data.author.trim().length < 3) errors.author = 'Must be at least 3 characters long!';
    else if (data.author.trim().length > 50) errors.author = 'Maximum length reached!';

    if (isEmpty(data.publisher)) errors.publisher = 'Must not be empty!';
    else if (data.publisher.trim().length < 2) errors.publisher = 'Must be at least 2 characters long!';

    if (typeof(data.numPages) !== 'number') errors.numPages = 'Must be a number!';
    else if (data.numPages === 0) errors.numPages = 'Must not be zero!';
    else if (data.numPages < 0) errors.numPages = 'Must be greater than zero!';

    if (data.genres.length === 0) errors.genres = 'Must choose at least one genre!';
    
    if (isEmpty(data.language)) errors.language = 'Must not be empty!';
    else if (data.language.trim().length < 2) errors.language = 'Must be at least 2 characters long!';

    if (data.hasOwnProperty('ownerRating')) {
        if (typeof(data.ownerRating) !== 'number') errors.ownerRating = 'Must be a number!';
        else if (data.ownerRating < 0 ) errors.ownerRating = 'Must be greater than 0!';
        else if (data.ownerRating > 5) errors.ownerRating = 'Must be less than 5!';
    }

    if (typeof(data.bookQuality) !== 'number') errors.bookQuality = 'Must be a number!';
    else if (data.bookQuality < 0 ) errors.bookQuality = 'Must be greater than 0!';
    else if (data.bookQuality > 10) errors.bookQuality = 'Must be less than 10!';

    if (data.hasOwnProperty('publicationYear')) {
        if (typeof(data.publicationYear) !== 'number') errors.publicationYear = 'Must be a number!';
        else if (data.publicationYear < 0 ) errors.publicationYear = 'Must be greater than 0!';
        else if (data.publicationYear > new Date().getFullYear()) errors.publicationYear = 'Must be a valid year!';
    }

    if (data.hasOwnProperty('summary')) {
        if (isEmpty(data.summary)) errors.summary = 'Must not be empty!';
        else if (data.summary.length > 400 ) errors.summary = 'Maximum length reached!';
    }

    if (data.hasOwnProperty('ownerReview')) {
        if (isEmpty(data.ownerReview)) errors.ownerReview = 'Must not be empty!';
        else if (data.ownerReview.length > 500 ) errors.ownerReview = 'Maximum length reached!';
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
};

exports.reduceBookDetails = (data) => {
    let bookDetails = {};

    if (data.hasOwnProperty('title')) {
        bookDetails.title = data.title.trim();
    }

    if (data.hasOwnProperty('author')) {
        bookDetails.author = data.author.trim();
    }

    if (data.hasOwnProperty('publisher')) {
        bookDetails.publisher = data.publisher.trim();
    }

    if (data.hasOwnProperty('language')) {
        bookDetails.language = data.language.trim();
    }

    if (data.hasOwnProperty('summary')) {
        bookDetails.summary = data.summary.trim();
    }

    if (data.hasOwnProperty('ownerReview')) {
        bookDetails.ownerReview = data.ownerReview.trim();
    }

    bookDetails.genres = [];
    if (data.hasOwnProperty('genres')) {        
        if (data.genres.length !== 0) {
            data.genres.forEach(doc => {
                bookDetails.genres.push(doc.trim());
            });
        }
    }

    if (data.hasOwnProperty('publicationYear')) {
        bookDetails.publicationYear = data.publicationYear;
    }

    if (data.hasOwnProperty('numPages')) {
        bookDetails.numPages = data.numPages;
    }

    if (data.hasOwnProperty('bookQuality')) {
        bookDetails.bookQuality = data.bookQuality;
    }

    if (data.hasOwnProperty('ownerRating')) {
        bookDetails.ownerRating = data.ownerRating;
    }

    return bookDetails;
};