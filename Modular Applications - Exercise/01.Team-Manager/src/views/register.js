import { html } from "../../node_modules/lit-html/lit-html.js";
import { userService } from "../service/userService.js";
import { goTo } from "../utility/goTo.js";
import { updateNavBar } from "../utility/navigation.js";
import { renderer } from "../utility/render.js";

const template = (error) => html`
<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form @submit=${onSubmit} id="register-form" class="main-form pad-large">
            ${error && html`<div class="error">${error}</div>`}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="#" class="invert">Sign in here</a>
        </footer>
    </article>
</section>`

export function showRegisterView() {
    renderer(template());
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, username, password, repass } = Object.fromEntries(formData);

    if (!email) {
        return renderer(template('email is required'));
    }

    if (username.length < 3) {
        return renderer(template('username must be at least 3 characters'));
    }

    if (!/^[a-zA-Z]+$/.test(username)) {
        return renderer(template('username must be filled without digits'))
    }

    if (password.length < 3) {
        return renderer(template('password must be at least 3 characters/digits'))
    }

    if (repass !== password) {
        return renderer(template('passwords are not the same'));
    }

    await userService.register({ email, username, password });
    updateNavBar();
    goTo('/myTeam');
}