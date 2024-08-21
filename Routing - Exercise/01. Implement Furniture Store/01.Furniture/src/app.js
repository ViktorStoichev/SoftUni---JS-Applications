import page from '../node_modules/page/page.mjs'
import { render } from '../node_modules/lit-html/lit-html.js';
import { showHomeView } from './views/home.js';
import { showRegisterView } from './views/register.js';
import { showLoginView } from './views/login.js';
import { userService } from './service/userService.js';
import { userUtil } from './utility/userUtil.js';
import { showCreateView } from './views/create.js';
import { showDetailsView } from './views/details.js';
import { showMyFurnitureView } from './views/myFurniture.js';
import { showEditView } from './views/edit.js';
import { deleteItem } from './views/delete.js';

const root = document.querySelector('div.container');
const userNav = document.getElementById('user');
const guestNav = document.getElementById('guest');

page(updateCtx);
page('/', showHomeView);
page('/dashboard', showHomeView);
page('/create', showCreateView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/delete/:id', deleteItem);
page('/login', showLoginView);
page('/my-furniture', showMyFurnitureView);
page('/register', showRegisterView);
page('/logout', onLogout);

page.start();
updateNav();

function updateCtx(ctx, next) {
    ctx.goTo = goTo;
    ctx.renderer = renderer;
    ctx.updateNav = updateNav;
    next();
}

function renderer(temp) {
    render(temp, root);
}

function goTo(path) {
    page.redirect(path);
}

function updateNav() {
    const userData = userUtil.getUser();
    if (userData) {
        userNav.style.display = 'inline-block';
        guestNav.style.display = 'none';
    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'inline-block';
    }
}

async function onLogout() {
    await userService.logout();
    updateNav();
    goTo('/dashboard');
}
