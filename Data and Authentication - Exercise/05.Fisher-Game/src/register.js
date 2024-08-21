import { userServices } from "./api/userService.js";
import { updateNav } from "./app.js"

function register() {
    const formRef = document.querySelector('form');
    formRef.addEventListener('submit', onRegister);

    async function onRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { email, password, rePass } = Object.fromEntries(formData);

        if (!email || !password || rePass !== password) {
            return alert('Opa!!! Registracione nema funkcione');
        }

        await userServices.register({ email, password });
        updateNav();
        window.location = 'index.html';
        e.target.reset();
    }
}

updateNav();
register();