//Sets JWT/Bearer token to local Storage for using with requests!
export default function setAuthorizationToken(token) {
    if (token) {
        localStorage.setItem("jwtToken", token);
    } else {
        localStorage.removeItem("jwtToken");
    }
}