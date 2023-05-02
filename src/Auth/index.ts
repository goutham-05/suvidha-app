export const  isLoggedIn = () => {
    const data = localStorage.getItem('OTP');
    if (data !== null) {
        return true;
    }
    else {
        return false;
    }
}

export const doLoggin = (Data) => {
    localStorage.setItem("OTP", JSON.stringify(Data));
}

export const doLogout = (next) => {
    localStorage.removeItem("OTP");
    next()
}

export const getCurrentUserDetails = () => {
    if (isLoggedIn) {
        return JSON.parse(localStorage.getItem("OTP"));
    }
    else false;
}