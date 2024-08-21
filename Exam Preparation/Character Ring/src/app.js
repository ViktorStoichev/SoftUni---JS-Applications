import { userService } from "./data/user.js";
import { page } from "./lib.js";
import { userUtility } from "./util.js";
import { createView } from "./views/create.js";
import { dashboardView } from "./views/dashboard.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";

userUtility.updateNav();

page('/', homeView);
page('/dashboard', dashboardView);
page('/catalog/:id', detailsView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/edit/:id', editView);

page.start();

document.getElementById('logoutLink').addEventListener('click', () => {

    userService.logout();
    userUtility.updateNav();
    page.redirect('/');
})