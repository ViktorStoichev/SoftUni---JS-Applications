
import { api } from "../utility/requester.js"

const endpoints = {
    baseCatalog: 'http://localhost:3030/data/catalog',
    idCatalog: 'http://localhost:3030/data/catalog/',
    myFurniture: (id) => `http://localhost:3030/data/catalog?where=_ownerId%3D%22${id}%22`
}

async function createFurniture(data) {
    return await api.post(endpoints.baseCatalog, data);
}

async function getAllFurniture() {
    return await api.get(endpoints.baseCatalog);
}

async function furnitureDetails(id) {
    return await api.get(endpoints.idCatalog + id);
}

async function updateFurniture(id, data) {
    return await api.put(endpoints.idCatalog + id, data);
}

async function deleteFurniture(id) {
    return await api.del(endpoints.idCatalog + id);
}

async function getMyFurniture(userId) {
    return await api.get(endpoints.myFurniture(userId));
}

export const dataService = {
    createFurniture,
    getAllFurniture,
    furnitureDetails,
    updateFurniture,
    deleteFurniture,
    getMyFurniture
}