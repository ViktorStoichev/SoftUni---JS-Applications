import { services } from "./requester.js";
import { html, render } from './node_modules/lit-html/lit-html.js';

async function addItem() {
    const menu = document.getElementById('menu');
    const data = await services.get();
    const items = Object.values(data);

    // menu.innerHTML = '';
    render(items.map(optionsTemplate), menu)

    function optionsTemplate(data) {
        return html`
        <option value=${data._id}>${data.text}</option>`
    }

    const formRef = document.querySelector('form');
    formRef.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = formRef.querySelector('#itemText');
        console.log(text.value);

        await services.post({ text: text.value });
        addItem();
    })
}

addItem();