function setUser(data) {
    sessionStorage.setItem("userData", JSON.stringify(data));
}

function getUser() {
    if (sessionStorage.getItem("userData") !== "undefined") {
        return JSON.parse(sessionStorage.getItem("userData"));
    }
}

function getUserId() {
    const userData = getUser();
    return userData?._id;
}

function clearUser() {
    sessionStorage.removeItem("userData");
}

function hasOwner(itemId) {
    const userData = getUser();
    if (userData) {
        return userData?._id === itemId;
    }
}

export const userUtils = {
    setUser,
    getUser,
    getUserId,
    clearUser,
    hasOwner
}