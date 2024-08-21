
function setUser(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}

function getUser() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

function getToken() {
    const userData = getUser();
    const token = userData?.accessToken;
    return token;
}

function hasOwner(itemId) {
    const userData = getUser();
    return userData._id === itemId;
}

function clearUserData() {
    sessionStorage.removeItem('userData');
}

export const userUtil = {
    setUser,
    getUser,
    getToken,
    hasOwner,
    clearUserData
}