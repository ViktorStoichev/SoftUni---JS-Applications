import { services } from "./src/api/userService.js";
import { userUtils } from "./src/utils/userUtils.js";
import { showCreateView } from "./src/view/create.js";
import { showDashboardView } from "./src/view/dashboard.js";
import { showDetailsView } from "./src/view/details.js";
import { showEditView } from "./src/view/edit.js";
import { showHomeView } from "./src/view/home.js";
import { showLoginView } from "./src/view/login.js";
import { showRegisterView } from "./src/view/register.js";

Array.from(document.querySelectorAll('div[data-section]')).forEach(section => section.remove());
const main = document.getElementsByTagName('main');
const nav = document.querySelector('nav');
nav.addEventListener('click', onNavigate);

const routes = {
    '/': showHomeView,
    '/login': showLoginView,
    '/register': showRegisterView,
    '/logout': onLogout,
    '/dashboard': showDashboardView,
    '/create': showCreateView,
    '/edit': showEditView,
    '/details': showDetailsView
}

async function onLogout() {
    await services.logout();
    updateNav();
    goTo('/');
}

function onNavigate(event) {
    event.preventDefault();
    
    let target = event.target;
    if (target.tagName !== 'A') {
        target = event.target.parentElement;
    }

    if (!target.href) {
        return;
    }

    const url = new URL(target);
    const viewName = url.pathname;
    goTo(viewName);
}

function updateNav() {
    const hasUser = userUtils.getUser();
    const userA = document.querySelectorAll('a[data-user]');
    const guestA = document.querySelectorAll('a[data-guest]');

    if (hasUser) {
        userA.forEach(a => a.style.display = 'block');
        guestA.forEach(a => a.style.display = 'none');
    } else {
        userA.forEach(a => a.style.display = 'none');
        guestA.forEach(a => a.style.display = 'block');
    }
}

const ctx = { 
    goTo,
    updateNav
};

function goTo(name, ...params) {
    const handler = routes[name];
    handler(ctx, params);
}

//Start page
goTo('/');
updateNav();
