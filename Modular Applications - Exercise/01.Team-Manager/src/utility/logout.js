import { userService } from "../service/userService.js";
import { goTo } from "./goTo.js";
import { updateNavBar } from "./navigation.js";

export async function logout() {
    await userService.logout();
    updateNavBar();
    goTo('/');
}