const isEmpty = (value) => {
    if (value.trim() === '') return true;
    else return false;
};

const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.match(emailRegEx)) return true;
    else return false;
};


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
    } else if (isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Please confirm your password!";
    } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Passwords must match!";
    }

    if (isEmpty(data.username)) {
        errors.handle = 'Must not be empty.';
    }

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