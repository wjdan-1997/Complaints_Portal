const Validator = require("validator");
const isEmpty = require("is-empty");

const userUpdatedValidation = (data) => {
    var msg = {};

    if (isEmpty(data.name)) {
        msg = "Name field is required";
    }

    if (isEmpty(data.email)) {
        msg = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        msg = "Email is invalid";
    }

    if (isEmpty(data.phoneNumber)) {
        msg = "Phone number field is required";
    }
    if (isEmpty(data.education)) {
        msg = "Education field is required";
    }
    if (isEmpty(data.gender)) {
        msg = "Gender field is required";
    }
    if (isEmpty(data.address)) {
        msg = " Address field is required";
    }
    return {
        msg,
        isValid: isEmpty(msg)
    };
};
module.exports = userUpdatedValidation;
