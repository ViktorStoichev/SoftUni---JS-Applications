function setUser(data) {
    localStorage.setItem('userData', JSON.stringify(data));
}

function getUser() {
    return JSON.parse(localStorage.getItem('userData'));
}

function getUserId() {
    const userData = getUser();
    return userData._id;
}

function clearUser() {
    localStorage.removeItem('userData');
}

function hasOwner(itemId) {
    const userData = getUser();
    if (userData) {
        return userData._id === itemId;
    }
}

export const userUtils = {
    setUser,
    getUser,
    getUserId,
    clearUser,
    hasOwner
}