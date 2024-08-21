import page from './node_modules/page/page.mjs';
import { render } from './node_modules/lit-html/lit-html.js';
import { showHomeView } from './views/home.js';

const body = document.querySelector('body');

page(updateCtx);
page(showHomeView);

page.start();

function updateCtx(ctx, next) {
    ctx.goTo = goTo;
    ctx.render = renderer;
    next();
}

function renderer(template) {
    render(template, body);
}

function goTo(path) {
    page.redirect(path);
}