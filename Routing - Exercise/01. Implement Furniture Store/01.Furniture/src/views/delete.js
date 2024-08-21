import { dataService } from "../service/catalogDataService.js";

export async function deleteItem(ctx) {
    const id = ctx.params.id;
    await dataService.deleteFurniture(id);
    ctx.goTo('/dashboard');
}