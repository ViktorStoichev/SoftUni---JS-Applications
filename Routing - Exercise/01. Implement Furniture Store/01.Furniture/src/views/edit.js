import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/catalogDataService.js";

const template = (details, error) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control ${findHasError(error, 'make')}" id="new-make" type="text" name="make" value=${details.make}>
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control ${findHasError(error, 'model')}" id="new-model" type="text" name="model" value=${details.model}>
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control ${findHasError(error, 'year')}" id="new-year" type="number" name="year" value=${details.year}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control ${findHasError(error, 'description')}" id="new-description" type="text" name="description" value=${details.description}>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control ${findHasError(error, 'price')}" id="new-price" type="number" name="price" value=${details.price}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control ${findHasError(error, 'img')}" id="new-image" type="text" name="img" value=${details.img}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" value=${details.material}>
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>`

function findHasError(error, property) {
    if (!error) {
        return;
    }
    return error[property] ? 'is-invalid' : 'is-valid';
}

let context = null;
export async function showEditView(ctx) {
    context = ctx;
    const id = ctx.params.id;
    const details = await dataService.furnitureDetails(id);
    console.log(details);
    ctx.renderer(template(details))
}

async function onSubmit(e) {
    e.preventDefault();
    const id = context.params.id;
    const formData = new FormData(e.target);
    let { make, model, year, description, price, img, material } = Object.fromEntries(formData);
    year = Number(year);
    price = Number(price);
    let error = {};
    let hasError = false;

    if (make.length < 4) {
        error.make = true;
        hasError = true;
    }

    if (model.length < 4) {
        error.model = true;
        hasError = true;
    }

    if (year < 1950 || year > 2050) {
        error.year = true;
        hasError = true;
    }

    if (description.length <= 10) {
        error.description = true;
        hasError = true;
    }

    if (price < 1) {
        error.price = true;
        hasError = true;
    }

    if (!img) {
        error.img = true;
        hasError = true;
    }

    if (hasError) {
        return context.renderer(template({ make, model, year, description, price, img, material }, error));
    }

    await dataService.updateFurniture(id, { make, model, year, description, price, img, material });
    context.goTo(`/details/${id}`);
    
}