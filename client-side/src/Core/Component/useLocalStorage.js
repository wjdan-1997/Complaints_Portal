import jwt_decode from "jwt-decode";
import axios from "axios";

const handleUserLogin = () => {
    const loggedInUser = localStorage.getItem("currentUser");
    if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        axios.defaults.headers.common["Authorization"] = localStorage.getItem("token")
        
        return foundUser;
    }
    return { name: "", email: "" };
};

const setUserLogin = (token) => {
    const decode = jwt_decode(token)
    localStorage.setItem("currentUser", JSON.stringify(decode));
};



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
    setUserLogin,
    setComplaintInfo,
    getComplaintInfo,
    userLogout,
    handleUserLogin
};
