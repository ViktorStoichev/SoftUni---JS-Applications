import { dataServices } from "../api/dataService.js";

const main = document.querySelector('main');
const section = document.querySelector('div[data-section="dashboard"]');
const h1 = section.querySelector('h1');

let context = null;
export function showDashboardView(ctx) {
    context = ctx;
    main.replaceChildren(section);
    loadAllIdea();
}

async function loadAllIdea() {
    const data = await dataServices.getAllIdeas();
    section.innerHTML = '';
    if (!data.length) {
        section.appendChild(h1);
    }
    data.forEach(idea => section.appendChild(renderIdeaCart(idea)));
}

function renderIdeaCart(data) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('card');
    divContainer.classList.add('overflow-hidden');
    divContainer.classList.add('current-card');
    divContainer.classList.add('details');
    divContainer.style.width = '20rem';
    divContainer.style.height = '18rem';
    divContainer.innerHTML = `
                <div class="card-body">
                    <p class="card-text">${data.title}</p>
                </div>
                <img class="card-image" src="${data.img}" alt="Card image cap">
                <a class="btn" data-id=${data._id} href="/details">Details</a>`
    divContainer.querySelector('a').addEventListener('click', onDetails);
    return divContainer;
}

function onDetails(event) {
    event.preventDefault();
    const id = event.target.dataset.id;

    context.goTo('/details', id);
}