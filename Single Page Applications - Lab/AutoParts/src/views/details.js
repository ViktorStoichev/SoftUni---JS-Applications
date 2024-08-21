import { get } from "../modules/api.js";

export function startDetails(furnitureId) {
    
    document.querySelector("h2").innerHTML = "Loading furniture &hellip;";
    document.querySelector(".price").innerHTML = "Loading price &hellip;";
    document.querySelector(".description").innerHTML = "Loading description &hellip;";
    document.querySelector(".year").innerHTML = "Loading year &hellip;";
    document.querySelector(".material").innerHTML = "Loading material &hellip;";

    loadDetails(furnitureId)
}

async function loadDetails(furnitureId) {

    const data = await get(`/data/catalog/${furnitureId}`);
    showDetails(data)
}

function showDetails(data) {
    const section = document.getElementById("details");
    section.querySelector("h2").textContent = `${data.make} (${data.model})`;
    section.querySelector(".price").textContent = `Price: $${data.price}`;
    section.querySelector(".description").textContent = `Description: ${data.description}`;
    section.querySelector(".year").textContent = `Year: ${data.year}`;
    section.querySelector(".material").textContent = `Material: ${data.material}`;
}