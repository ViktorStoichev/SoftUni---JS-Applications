import { userUtility } from "../util.js";
import { api } from "./api.js";

const endpoints = {
    like: '/data/useful',
    likesByCharacterId: (id) => `/data/useful?where=characterId%3D%22${id}%22&distinct=_ownerId&count`,
    likesByUserId: (characterId, userId) =>
         `/data/useful?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

async function likeCharacter(characterId) {
    return api.post(endpoints.like, { characterId });
}

async function getLikesByCharacterId(characterId) {
    const userData = userUtility.getUserData();

    const requests = [
        api.get(endpoints.likesByCharacterId(characterId))
    ];

    if (userData) {
        requests.push(api.get(endpoints.likesByUserId(characterId, userData._id)));
    }

    const [likes, hasLiked] = await Promise.all(requests);

    return {
        likes,
        hasLiked: Boolean(hasLiked)
    }
}

export const likeService = {
    likeCharacter,
    getLikesByCharacterId
}