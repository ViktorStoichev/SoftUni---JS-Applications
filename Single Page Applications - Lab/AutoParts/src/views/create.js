import { post } from "../modules/api.js";
import { createSubmitHandler } from "../modules/util.js";
import { showView } from "../nav.js";
import { startDetails } from "./details.js";

document.querySelector("#create form").addEventListener("submit", createSubmitHandler(onCreate));

async function onCreate({ make, model, price, description, year, material }, form) {
    price = Number(price);
    year = Number(year);

    if (!make || !price || !description || !year || !material) {
        return alert("All fields are required");
    }

    if (price < 0) {
        return alert("Price must be a positive number");
    }

    if (year < 0) {
        return alert("Year must be a positive number");
    }

    const result = await post('/data/catalog', {
        make,
        model,
        price,
        description,
        year,
        material
    });

    form.reset();

    showView('details', startDetails, result._id);
}