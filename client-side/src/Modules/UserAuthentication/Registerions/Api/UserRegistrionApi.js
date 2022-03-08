import { ApiPostRequest } from "../../../../Core/API/ApiRequest";

const CustomerRegisterionApi = async (values) => {
    const requestBody = {
        name: values.name,
        email: values.email,
        passwordReceived: values.password,
        education: values.education,
        phoneNumber: values.phoneNumber,
        gender: values.gender,
        address: values.address,

    }
    const url = 'users/signup';
    const response = await ApiPostRequest( url, requestBody )
    return response;
}

const AdminRegisterionApi = async (values) => {
    const requestBody = {
        name: values.name,
        email: values.email,
        passwordReceived: values.password,
        phoneNumber: values.phoneNumber,
    }
    const url = 'users/signupforadmin';
    const response = await ApiPostRequest( url, requestBody )
    return response;
}
export {
    CustomerRegisterionApi,
    AdminRegisterionApi
};