
import {  ApiPutRequest } from "../../../../Core/API/ApiRequest";
const ChangePasswordApi = async (values,id) => {
    const requestBody ={
        passwordReceived: values.password,
        newPassword: values.newPassword,
    }
    const url = `users/chnagePassword/${id}`;
    const response = await ApiPutRequest( url, requestBody )
    return response;
};
export default ChangePasswordApi;