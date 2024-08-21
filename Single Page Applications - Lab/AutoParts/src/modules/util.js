export function createSubmitHandler(callback) {
    return function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries);

        callback(data, event.target);
    }
}

export function setUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
}

export function getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
}

export function clearUserData() {
    localStorage.removeItem('userData');
}