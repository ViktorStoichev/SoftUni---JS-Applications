import { api } from "./requester.js"
import { userUtils } from '../utils/userUtils.js';

const endpoint = {
    register: 'http://localhost:3030/users/register',
    login: 'http://localhost:3030/users/login',
    logout: 'http://localhost:3030/users/logout'
}

async function register(data) {
    const userData = await api.post(endpoint.register, data);
    return userUtils.setUser(userData);
}

async function login(data) {
    const userData = await api.post(endpoint.login, data);
    return userUtils.setUser(userData);
}

async function logout() {
    await api.get(endpoint.logout);
    return userUtils.clearUser();
}

export const services = {
    register,
    login,
    logout
}