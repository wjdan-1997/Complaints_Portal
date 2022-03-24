import jwt_decode from "jwt-decode";
import axios from "axios";

const getCurrentUser = () => {
    const loggedInUser = localStorage.getItem("currentUser");
    if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        axios.defaults.headers.common["Authorization"] = localStorage.getItem("token")
        
        return foundUser;
    }
    return { name: "", email: "" };
};

const setCurrentUser = (token) => {
    const decode = jwt_decode(token)
    localStorage.setItem("currentUser", JSON.stringify(decode));
};
const getUsersInfo = () =>{
    
}

const setComplaintInfo = (values) => {
    localStorage.setItem("complaintInfo", JSON.stringify(values));
};
const getComplaintInfo = () => {
    const complaintInfo = JSON.parse(localStorage.getItem("complaintInfo"));
    return complaintInfo;
};
const userLogout = () => {
    localStorage.clear();
};
export {
    setCurrentUser,
    setComplaintInfo,
    getComplaintInfo,
    userLogout,
    getCurrentUser
};
    