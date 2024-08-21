import { dataServices } from '../api/dataService.js'
import { userUtils } from '../utils/userUtils.js';
const main = document.querySelector('main');
const section = document.querySelector('div[data-section="create"]');

const formRef = section.querySelector('form');
formRef.addEventListener('submit', onSubmit);

let context = null
export function showCreateView(ctx) {
    context = ctx;
    main.replaceChildren(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const userData = userUtils.getUser();
    const formData = new FormData(event.target);
    if (userData) {
        const { title, description, imageURL } = Object.fromEntries(formData);

        if (title.length < 6 || description.length < 10 || imageURL.length < 5) {
            return alert('Opa: ne stigat characters');
        }

        await dataServices.createIdea({ title, description, 'img': imageURL });
        event.target.reset();
        context.goTo('/dashboard');
    }
}