import { userUtil } from "./userUtil.js";

async function requester(method, URL, data) {
    const option = {
        method,
        headers: {}
    }

    const userToken = userUtil.getToken();
    
    if (userToken) {
        option.headers['X-Authorization'] = userToken;
    }

    if (data) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(URL, option);

        if (!response.ok) {
            const error = response.json();
            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        }

        return await response.json();
    } catch (error) {
        alert(error);
        throw new Error(error);
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
}