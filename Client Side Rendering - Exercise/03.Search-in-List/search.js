import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

function search() {
    const townsList = document.getElementById('towns');
    render(townsTemplate(towns), townsList)

    function townsTemplate(towns) {
        return html`
        <ul>
            ${towns.map(t => html`<li>${t}</li>`)}
        </ul>`
    }

    const result = document.getElementById('result');
    const input = document.getElementById('searchText');
    const button = document.querySelector('button');
    button.addEventListener('click', () => {
        let count = 0;
        result.textContent = '';
        const liElements = townsList.querySelectorAll('li');
        liElements.forEach(el => {
            if(el.hasAttribute('class')) {
                el.removeAttribute('class');
            }
            if (el.textContent.includes(input.value)) {
                count++;
                el.classList.add('active');
            }
        })

        result.textContent = `${count} matches found`;
    })
}

search()
