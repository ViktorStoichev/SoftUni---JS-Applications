import { services } from "../api/userService.js";

const main = document.querySelector('main');
const section = document.querySelector('div[data-section="login"]');

const formRef = section.querySelector('form');
formRef.addEventListener('submit', onLogin);

let context = null;
export function showLoginView(ctx) {
    context = ctx;
    main.replaceChildren(section);
}

async function onLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData);

    if (!email || !password) {
        return alert('Opa - pishi neshto');
    }

    await services.login({ email, password });
    context.updateNav();
    context.goTo('/');
    event.target.reset();
}