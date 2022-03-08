const Validator = require("validator");
const isEmpty = require("is-empty"); 

const complaintValidation = (data) => {
    var msg = {};

    if (isEmpty(data.complainType)) {
        msg = "Type field is required";
    }

    if (isEmpty(data.subject)) {
        msg = "Subject field is required";
    } 

    if (isEmpty(data.description)) {
        msg = "Description field is required";
    }

    if (isEmpty(data.severity)) {
        msg = "Severity number field is required";
    }
    if(isEmpty(data.preferedLanguage)){
        msg = "prefered Language number field is required";
    }

    return {
        msg,
        isValid: isEmpty(msg)
    };
};
module.exports = complaintValidation;
