//TODO update user service with user identity by project requirements

import { userUtility } from "../util.js";
import { api } from "./api.js";

const endpoints = {
    'login': '/users/login',
    'register': '/users/register',
    'logout': '/users/logout'
}


async function login(email, password) {
    const result = await api.post(endpoints.login, { email, password });

    userUtility.setUserData({
        _id: result._id,
        email: result.email,
        accessToken: result.accessToken
    });
}

async function register(email, password) {
    const result = await api.post(endpoints.register, { email, password });

    userUtility.setUserData({
        _id: result._id,
        email: result.email,
        accessToken: result.accessToken
    });
}

async function logout() {
    const promise = api.get(endpoints.logout);
    userUtility.clearUserData();

    await promise;
}

export const userService = {
    login,
    register,
    logout
}