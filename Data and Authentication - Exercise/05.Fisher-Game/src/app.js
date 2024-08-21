import { api } from "./api/requester.js";
import { userServices } from "./api/userService.js";
import { userUtils } from "./utils/userUtils.js";

const endpoint = 'http://localhost:3030/data/catches'
const main = document.getElementById('main');
const loadBtn = document.querySelector('aside button.load');
if (loadBtn) {
    loadBtn.addEventListener('click', onLoad);
}
function home() {
    if (main) {
        main.style.display = 'none';
    }

    document.querySelector('a#logout').addEventListener('click', async (event) => {
        await userServices.logout();
        updateNav();
        window.location = 'index.html';
    })
}

home();

async function onLoad() {
    const user = userUtils.getUser();
    main.style.display = 'inline-block';
    const catchesDiv = document.getElementById('catches');
    catchesDiv.innerHTML = '';
    const data = await api.get(endpoint);
    data.forEach(catchh => {
        const div = document.createElement('div');
        div.classList.add('catch');
        div.innerHTML = `
                    <label>Angler</label>
                    <input type="text" class="angler" value="${catchh.angler}">
                    <label>Weight</label>
                    <input type="text" class="weight" value="${catchh.weight}">
                    <label>Species</label>
                    <input type="text" class="species" value="${catchh.species}">
                    <label>Location</label>
                    <input type="text" class="location" value="${catchh.location}">
                    <label>Bait</label>
                    <input type="text" class="bait" value="${catchh.bait}">
                    <label>Capture Time</label>
                    <input type="number" class="captureTime" value="${catchh.captureTime}">
                    <button class="update" data-id="${catchh._ownerId}">Update</button>
                    <button class="delete" data-id="${catchh._ownerId}">Delete</button>`

        div.querySelectorAll('button').forEach(b => {
            b.disabled = user._id === catchh._ownerId ? false : true;
        })
        div.querySelector('button.delete').addEventListener('click', async () => {
            await api.del(endpoint + '/' + catchh._id);
            onLoad();
        })
        div.querySelector('button.update').addEventListener('click', async () => {
            const angler = div.querySelector('input.angler').value;
            const weight = div.querySelector('input.weight').value;
            const species = div.querySelector('input.species').value;
            const location = div.querySelector('input.location').value;
            const bait = div.querySelector('input.bait').value;
            const captureTime = div.querySelector('input.captureTime').value;

            await api.put(endpoint + '/' + catchh._id, ({ angler, weight, species, location, bait, captureTime }));
            onLoad();
        })
        catchesDiv.appendChild(div);
    })
}

const addFormRef = document.getElementById('addForm');
if (addFormRef) {
    addFormRef.addEventListener('submit', addNewCatch)
}
async function addNewCatch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let { angler, weight, species, location, bait, captureTime } = Object.fromEntries(formData);
    weight = Number(weight);
    captureTime = Number(captureTime);

    if (!angler || !weight || !species || !location || !bait || !captureTime) {
        return;
    }

    await api.post(endpoint, ({ angler, weight, species, location, bait, captureTime }));
    onLoad();
    // e.target.reset()
}

export function updateNav() {
    const hasUser = userUtils.getUser('userData');
    if (hasUser) {
        document.querySelector('div#user').style.display = 'inline-block';
        document.querySelector('div#guest').style.display = 'none';
        document.querySelector('p.email span').textContent = hasUser.email;
        if (addFormRef) {
            addFormRef.querySelector('button').disabled = false;
        }
    } else {
        document.querySelector('div#user').style.display = 'none';
        document.querySelector('div#guest').style.display = 'inline-block';
        document.querySelector('p.email span').textContent = 'guest';
        if (addFormRef) {
            addFormRef.querySelector('button').disabled = true;
        }
    }
}

updateNav();