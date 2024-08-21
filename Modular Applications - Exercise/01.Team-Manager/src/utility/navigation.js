import { userUtil } from "./userUtil.js";


export function updateNavBar() {
    const userData = userUtil.getUser();
    const userNav = document.querySelectorAll('nav a[data-nav="user"]');
    const guestNav = document.querySelectorAll('nav a[data-nav="guest"]');
    if (userData) {
        userNav.forEach(user => user.style.display = 'inline-block');
        guestNav.forEach(guest => guest.style.display = 'none');
    } else {
        userNav.forEach(user => user.style.display = 'none');
        guestNav.forEach(guest => guest.style.display = 'inline-block');
    }
}