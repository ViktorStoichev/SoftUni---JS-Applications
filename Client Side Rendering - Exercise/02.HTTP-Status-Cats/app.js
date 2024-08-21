import { html, render } from "./node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";

const section = document.getElementById('allCats');
render(catsTemplate(cats), section);

function catsTemplate(cats) {
    return html`
    <ul>
        ${cats.map(cat => html`
            <li>
                <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button class="showBtn" @click=${(event) => {
            event.preventDefault();
            const button = event.target
            const div = event.target.parentElement.querySelector('div');
            const currentState = div.style.display;
            
            div.style.display = currentState === 'block' ? 'none' : 'block';
            button.textContent = currentState === 'block' ? 'Show status code' : 'Hide status code';
        }}>Show status code</button>
                    <div class="status" style="display: none" id=${cat.id}>
                        <h4>Status Code: ${cat.statusCode}</h4>
                        <p>${cat.statusMessage}</p>
                    </div>
                </div>
            </li>`)}
    </ul>`
}