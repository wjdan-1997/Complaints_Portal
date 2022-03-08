import { ApiPostRequest } from "../../../../Core/API/ApiRequest";



const UserLoginApi = async (values) => {
    const requestBody = {
        email: values.email,
        passwordReceived: values.password,
    }
    const url = 'users/signin';
    const response = await ApiPostRequest( url, requestBody )
    return response;
};
export default UserLoginApi