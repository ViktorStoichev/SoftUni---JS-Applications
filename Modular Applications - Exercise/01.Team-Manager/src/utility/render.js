import { render } from "../../node_modules/lit-html/lit-html.js";

const root = document.querySelector('main');

export function renderer(template) {
    render(template, root);
}