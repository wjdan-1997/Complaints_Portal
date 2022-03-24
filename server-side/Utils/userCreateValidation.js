const Validator = require("validator");
const isEmpty = require("is-empty"); 

const userCreateValidation = (data) => {  
    var msg = {};

    // console.log("data:", data);


    if (isEmpty(data.name)) {
        msg = "Name field is required";
    }
    if (isEmpty(data.email)) {
        msg = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        msg = "Email is invalid";
    }
    if (isEmpty(data.password)) {
        msg = "Password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        msg = "Password must be at least 6 characters";
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

module.exports = userCreateValidation;