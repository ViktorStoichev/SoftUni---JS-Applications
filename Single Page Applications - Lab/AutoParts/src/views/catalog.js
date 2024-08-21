import { get } from "../modules/api.js";
import { showView } from "../nav.js";
import { startDetails } from "./details.js";

export function startCatalog() {
    const list = document.getElementById("furniture");
    list.innerHTML = "Loading &hellip;"

    loadFurniture();
}

async function loadFurniture() {
    const furniture = await get('/data/catalog');
    showFurniture(furniture);
}

function showFurniture(furniture) {
    const elements = furniture.map(createFurniturePreview);

    const list = document.getElementById("furniture");

    list.replaceChildren(...elements);
}

function createFurniturePreview(data) {
    const li = document.createElement("li");
    
    li.innerHTML = `<a id="${data._id}" href="/catalog/${data._id}">${data.make} (${data.model}) - $${data.price}<a/>`;

    li.querySelector("a").addEventListener("click", (event) => {
        event.preventDefault();

        showView("details", startDetails, data._id);
    })
    return li;
}