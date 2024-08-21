import { html, render } from "./node_modules/lit-html/lit-html.js";

const form = document.querySelector('form');
const rootDiv = document.getElementById('root');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let {towns} = Object.fromEntries(formData);
    towns = towns.split(', ');
    render(createUL(towns), rootDiv)
})

function createUL(data) { return html`<ul>${data.map(town => html`<li>${town}</li>`)}</ul>`};

