const validate = (values) => {
    let msg = {}
    if (!values.name) {
        msg.name = 'This field required'
    }
    if (!values.email) {
        msg.email = 'This field required'
    }
    if (!values.phoneNumber) {
        msg.phoneNumber = 'This field required'
    }
    if (!values.education) {
        msg.education = 'This field required'
    }
    if (!values.gender) {
        msg.gender = 'This field required'
    }
    if (!values.address) {
        msg.address = 'This field required'
    }
    return msg;
}
const changePasswordValidation = (values) => {
    let msg = {}
    if (!values.password) {
        msg.password = 'This field required'
    }
    if (!values.newPassword) {
        msg.newPassword = 'This field required'
    }
    return msg;
}
export { validate, changePasswordValidation };