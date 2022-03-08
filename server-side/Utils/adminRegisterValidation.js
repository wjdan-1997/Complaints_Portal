const Validator = require("validator");
const isEmpty = require("is-empty"); 

const adminRegisterValidation = (data) => {
    var msg = {};

    if (isEmpty(data.name)) {
        msg = "Name field is required";
    }

    if (isEmpty(data.email)) {
        msg = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        msg = "Email is invalid";
    }

    if (isEmpty(data.passwordReceived)) {
        msg = "Password field is required";
    }

    if (isEmpty(data.phoneNumber)) {
        msg = "Phone number field is required";
    }

    return {
        msg,
        isValid: isEmpty(msg)
    };
};
module.exports = adminRegisterValidation;
