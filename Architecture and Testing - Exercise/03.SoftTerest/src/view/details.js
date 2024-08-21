import { dataServices } from "../api/dataService.js";
import { userUtils } from "../utils/userUtils.js";

const main = document.querySelector('main');
const section = document.querySelector('div[data-section="details"]');

let context = null;
export async function showDetailsView(ctx, params) {
    context = ctx;
    const id = params[0];
    main.replaceChildren(section);
    const idea = await dataServices.getDetails(id);

    renderDetails(idea);
}

function renderDetails(idea) {
    const hasUser = userUtils.getUser();
    console.log(hasUser);
    const hasOwner = userUtils.hasOwner(idea._ownerId);
    let template = `
            <img class="det-img" src=${idea.img} />
            <div class="desc">
                <h2 class="display-5">${idea.title}</h2>
                <p class="infoType">Description:</p>
                <p class="idea-description">${idea.description}</p>
            </div>`
    if (hasUser) {
        if (hasOwner) {
            template += `<div class="text-center">
                    <a class="btn detb" data-id=${idea._id} href="">Delete</a>
                </div>`
        }
    }
    section.innerHTML = template;
    if (!hasUser) {
        if (section.contains(section.querySelector('div.text-center'))) {
            section.querySelector('div.text-center').style.display = 'none';
        }
    }
    if (hasOwner) {
        section.querySelector('a').addEventListener('click', async (event) => {
            event.preventDefault();
            await dataServices.deleteIdea(idea._id);
            context.goTo('/dashboard');
        })
    }
}