import { userUtils } from "../utils/userUtils.js";

async function requester(method, URL, data) {

    const userData = userUtils.getUser();
    const option = {
        method,
        headers: {}
    };

    if (userData) {
        option.headers['X-Authorization'] = userData.accessToken;
    }

    if (data) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(URL, option);
        if (!response.ok) {
            if (response.status === 403) {
                userUtils.clearUser();
            }
            const error = response.json();
            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        }
        return response.json();
    } catch(err) {
        alert(err);
    }
}

async function get(URL) {
    return requester('get', URL);
}

async function post(URL, data) {
    return requester('post', URL, data);
}

async function put(URL, data) {
    return requester('put', URL, data);
}

async function del(URL) {
    return requester('delete', URL);
}

export const api = {
    get,
    post,
    put,
    del
};