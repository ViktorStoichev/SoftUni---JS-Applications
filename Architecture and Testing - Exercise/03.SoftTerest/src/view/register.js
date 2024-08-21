import { services } from "../api/userService.js";

const main = document.querySelector('main');
const section = document.querySelector('div[data-section="register"]');

const formRef = section.querySelector('form');
formRef.addEventListener('submit', onSubmit);

let context = null
export function showRegisterView(ctx) {
    context = ctx;
    main.replaceChildren(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { email, password, repeatPassword} = Object.fromEntries(formData);

    if (email.length < 3 || password.length < 3 || repeatPassword !== password) {
        return alert('Opa');
    }

    await services.register({ email, password });
    context.updateNav();
    context.goTo('/');
}