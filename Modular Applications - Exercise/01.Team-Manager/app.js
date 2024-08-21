import page from "./node_modules/page/page.mjs";
import { logout } from "./src/utility/logout.js";
import { updateNavBar } from "./src/utility/navigation.js";
import { showBrowseTeamView } from "./src/views/browseTeam.js";
import { showDetailsView } from "./src/views/details.js";
import { showHomeView } from "./src/views/home.js";
import { showLoginView } from "./src/views/login.js";
import { showRegisterView } from "./src/views/register.js";

page('/', showHomeView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/logout', logout);
page('/browseTeams', showBrowseTeamView);
page('/myTeam', () => console.log('myTeam'));
page('/details/:id', showDetailsView);

page.start();
updateNavBar();
