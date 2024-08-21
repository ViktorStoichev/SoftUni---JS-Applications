import { startCatalog } from "./views/catalog.js";
import { showView } from "./nav.js";
import "./views/login.js";
import "./views/create.js";

const views = {
    "home-nav": ["home"],
    "catalog-nav": ["catalog", startCatalog],
    "catalog-link": ["catalog", startCatalog],
    "login-nav": ["login"],
    "login-link": ["login"],
    "register-nav": ["register"],
    "register-link": ["register"],
    "create-nav": ["create"]
}

for (let keyId in views) {
    document.getElementById(keyId).addEventListener("click", (event) => {
        event.preventDefault();

        const [sectionId, callback] = views[keyId];

        showView(sectionId, callback);
    })
}

showView("home");