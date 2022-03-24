/* eslint-disable   */

import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3005/api/";



const ApiGetRequest = async (url) => { 
    const requestConfig = {
        method: 'GET',
        url: url
    };
    const requestPromise = axios(requestConfig);
   
    return GetResponse(requestPromise);
}
const ApiPostRequest = async (url, data = {}) => {
    const requestConfig = {
        method: 'POST',
        url: url,
        data: data
    };
    const requestPromise = axios(requestConfig);

    return GetResponse(requestPromise);
}
const ApiPutRequest = async (url, data = {}) => {
    const requestConfig = {
        method: 'PUT',
        url: url,
        data: data
    };
    const requestPromise = axios(requestConfig);

    return GetResponse(requestPromise);
}
const ApiDeleteRequest = async (url) => {
    const requestConfig = {
        method: 'DELETE',
        url: url
    };
    const requestPromise = axios(requestConfig);

    return GetResponse(requestPromise);
}

// Private 

const GetResponse = async (requestPromise) => {
    const response = {
        isSuccessful: true,
        data: {},
    };

    try {
        const apiResponse = await requestPromise;
        response.data = { ...apiResponse.data };
        console.log(`responseBody ${JSON.stringify(response.data)}`);

    } catch (err) {
        response.isSuccessful = false;
        if (err.response?.data?.errorMessage) {
            response.errorMessage = err.response.data.errorMessage;
            console.log(`err.message ${response.errorMessage}`);
        }
    }
    return response;
}


export { ApiGetRequest, ApiPostRequest, ApiPutRequest, ApiDeleteRequest } 
