import { ApiPostRequest } from "../../../../Core/API/ApiRequest";

const CustomerRegisterionApi = async (values) => {
    const requestBody = {
        name: values.name,
        email: values.email,
        password: values.password,
        education: values.education,
        phoneNumber: values.phoneNumber,
        gender: values.gender,
        address: values.address,

    }
    const url = 'users/signup';
    const response = await ApiPostRequest( url, requestBody )
    return response;
}


export {
    CustomerRegisterionApi
};