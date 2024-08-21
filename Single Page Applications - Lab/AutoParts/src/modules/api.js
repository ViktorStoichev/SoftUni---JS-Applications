import { getUserData } from "./util.js";

const hostName = 'http://localhost:3030';

export async function request(method, URL, data) {
    //URL param
    //method param
    //body param
    //authorization
    //error handling\

    const options = {
        method,
        headers: {}
    };

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();
    const accessToken = userData.accessToken;

    if (accessToken) {
        options.headers['X-Authorization'] = accessToken;
    }

    try {
        const response = await fetch(hostName + URL, options);
        if (!response.ok) {
            const error = await response.json();
            alert(error.message);
            if (response.status === 403 && error.message === 'Invalid access token') {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('userId');
            }
            
            throw new Error(error.message);
        }


        if (response.status === 204) {
            return response;
        } else {
            return response.json();
        }
    } catch(err) {
        alert(err.message);    
        throw err;
    }
}

export const get = (URL) => request('get', URL);
export const post = (URL, data) => request('post', URL, data);
export const put = (URL, data) => request('put', URL, data);
export const del = (URL) => request('delete', URL);