function setUserData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
}

function getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
}

function clearUserData() {
    localStorage.removeItem('userData');
}

function createSubmitHandler(callback) {
    return function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        callback(data, event.target);
    }
}

function updateNav() {
    const userData = getUserData();

    if(userData) {
        document.querySelector('div.user').style.display = 'block';
        document.querySelector('div.guest').style.display = 'none';
    } else {
        document.querySelector('div.user').style.display = 'none';
        document.querySelector('div.guest').style.display = 'block';
    }
}

export const userUtility = {
    setUserData,
    getUserData,
    clearUserData,
    createSubmitHandler,
    updateNav
}