
import { ApiPostRequest } from '../../../Core/API/ApiRequest';

const CreateCompalintApi = async (values) => {
    const requestBody = {
        complainType: values.complainType,
        subject: values.subject,
        severity: values.severity,
        description: values.description,
        preferedLanguage:values.preferedLanguage,
    }
    const url = "complaints";
    const response = await ApiPostRequest( url, requestBody )
    return response;
};
export default CreateCompalintApi;