import { userServices } from "./api/userService.js";
import { updateNav } from "./app.js"

function login() {
    const formRef = document.querySelector('form');
    formRef.addEventListener('submit', onLogin);

    async function onLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { email, password} = Object.fromEntries(formData);

        if (!email || !password) {
            return alert('Opa! Logincheto ne vaji');
        }

        await userServices.login({ email, password });
        updateNav();
        window.location = 'index.html';
        e.target.reset();
    }
}

updateNav();
login();