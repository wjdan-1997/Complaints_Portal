// there are tow validation 

const CustomerRegisterionValidation = (values) => {
    let msg = {}
    if (!values.name) {
        msg.name = 'This field is required'
    }
    if (!values.email) {
        msg.email = 'This field is required'
    }
    if (!values.password) {
        msg.password = 'This field is required'
    }
    if (!values.phoneNumber) {
        msg.phoneNumber = 'This field is required'
    }
    if (!values.education) {
        msg.education = 'This field is required'
    }
    if (!values.gender) {
        msg.gender = 'This field is required'
    }
    if(!values.address){
        msg.address = 'This field is required'
    }
return msg;
}


export {
    CustomerRegisterionValidation
}