import { html, render } from '../node_modules/lit-html/lit-html.js';

const helloTemplate = (name) => html`
<p>Hello, ${name}!</p>
<input type="text" name="username" .value="${'Peter'}">
`;

const clockClassName = 'clock'
const clock = (hours, minutes, seconds) => html`
<div class="${clockClassName}">
    ${hours}:${padZero(minutes)}:${padZero(seconds)}
    <button @click=${() => alert('Button clicked')}>TEst butTon</button>
</div>
`

const main = document.querySelector('main');

const result = helloTemplate('Lit-HTML');
render(result, main);

document.querySelector('button').addEventListener('click', () => {
    render(helloTemplate('Dynamic updates'), main);
})

const container = document.getElementById('clock');

setInterval(updateClock, 1000);

function updateClock() {
    const now = new Date();
    render(clock(now.getHours(), now.getMinutes(), now.getSeconds()), container);
}

function padZero(value) {
    return ('00' + value).slice(-2);
}