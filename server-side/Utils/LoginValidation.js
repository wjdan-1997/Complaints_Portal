const Validator = require("validator");
const isEmpty = require("is-empty"); 

const loginValidation = (data) => {  
    var msg = {};

    if (isEmpty(data.email)) {
        msg = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        msg = "Email is invalid";
    }

    if (isEmpty(data.passwordReceived)) {
        msg = "Password field is required";
    }

    return {
        msg,
        isValid: isEmpty(msg)
    };
};

module.exports = loginValidation;