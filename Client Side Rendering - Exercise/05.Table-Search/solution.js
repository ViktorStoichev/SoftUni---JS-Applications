import { html, render } from './node_modules/lit-html/lit-html.js';
import { get } from './requester.js';
import { renderStudents } from './view.js';

async function solve() {

    document.querySelector('#searchBtn').addEventListener('click', onClick);
    const input = document.getElementById('searchField');
    renderStudents();

    function onClick() {
        const trElements = document.querySelectorAll('tbody tr');
        trElements.forEach(tr => {
            if (tr.hasAttribute('class')) {
                tr.removeAttribute('class');
            }
            tr.querySelectorAll('td').forEach(td => {
                if (td.textContent.toUpperCase().includes(input.value.toUpperCase())) {
                    tr.classList.add('select');
                    return;
                }
            })
        })
        input.value = '';
    }
}

solve()