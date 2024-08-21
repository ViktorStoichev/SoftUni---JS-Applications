import { post } from "../modules/api.js";
import { createSubmitHandler, setUserData } from "../modules/util.js";

document.querySelector("#login form").addEventListener("submit", createSubmitHandler(onLogin));

async function onLogin({ email, password }, form) {
    const userData = await post('/users/login', { email, password });
    
    setUserData(userData);

    form.reset();

    window.location = "/";
}