import { ApiPostRequest, ApiPutRequest } from "../../../Core/API/ApiRequest";

const NewUserApi = async (values) => {
    const requestBody = {
        name: values.name,
        email: values.email,
        password: values.password,
        education: values.education,
        phoneNumber: values.phoneNumber,
        gender: values.gender,
        address: values.address,
    }
    const url = 'users/newUser';
    console.log("added new user");
    const response = await ApiPostRequest(url, requestBody)
    return response;
}
// edit the user information
const UserProfileApi = async (values, id) => {
    const requestBody = {
        name: values.name,
        email: values.email,
        education: values.education,
        phoneNumber: values.phoneNumber,
        gender: values.gender,
        address: values.address,
    }
    const url = `users/userProfile/${id}`;
    console.log("edit user");
    const response = await ApiPutRequest(url, requestBody)
    return response;
}
//this edit user information by admin 
const UserProfileByAdminApi = async (values, id) => {
    const requestBody = {
        name: values.name,
        email: values.email,
        education: values.education,
        phoneNumber: values.phoneNumber,
        gender: values.gender,
        address: values.address,
    }
    const url = `users/${id}`;
    console.log("edit user");
    const response = await ApiPutRequest(url, requestBody)
    return response;
}
export { NewUserApi, UserProfileApi, UserProfileByAdminApi }

