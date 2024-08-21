import { api } from "./api.js"

const endpoints = {
    'dashboard': '/data/characters?sortBy=_createdOn%20desc',
    'characterById': '/data/characters/',
    'characters': '/data/characters'
}

async function getAllCharacters() {
    return api.get(endpoints.dashboard);
}

async function getCharacterById(id) {
    return api.get(endpoints.characterById + id);
}

async function createCharacter({ category, imageUrl, description, moreInfo }) {
    return api.post(endpoints.characters, { category, imageUrl, description, moreInfo });
}

async function updateCharacter(id, characterData) {
    return api.put(endpoints.characterById + id, characterData);
}

async function deleteCharacter(id) {
    return api.del(endpoints.characterById + id);
}

export const characterService = {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter
}