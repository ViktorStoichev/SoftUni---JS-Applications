import { userUtility } from "../util.js";

const host = 'http://localhost:3030'

async function request(method, URL, data) {
    const options = {
        method,
        headers: {}
    };

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = userUtility.getUserData();

    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        const response = await fetch(host + URL, options);

        if (!response.ok) {
            const err = await response.json();

            if (response.status === 403 && err.message === 'Invalid access token') {
                userUtility.clearUserData();
            }

            throw new Error(err.message);
        }

        if(response.status === 204) {
            return response;
        } else {
            return response.json();
        }
    } catch (error) {
        // TODO use error reporting technique as described in exam requirements
        alert(error.message);
        
        throw error;
    }
}

const get = (URL) => request('get', URL);
const post = (URL, data) => request('post', URL, data);
const put = (URL, data) => request('put', URL, data);
const del = (URL) => request('delete', URL);

export const api = {
    get,
    post,
    put,
    del
}