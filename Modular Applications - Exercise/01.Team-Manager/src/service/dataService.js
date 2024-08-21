
import { api } from "../utility/requester.js"

const endpoints = {
    allTeams: 'http://localhost:3030/data/teams',
    membersCount: 'http://localhost:3030/data/members?where=status%3D%22member%22',
    listOfMembers: (teamId) => `http://localhost:3030/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`
}

async function getAllTeams() {
    return await api.get(endpoints.allTeams);
}

async function getMembersCount() {
    return await api.get(endpoints.membersCount);
}

async function getTeamDetails(id) {
    return await api.get(endpoints.allTeams + '/' + id);
}

async function getListOfMembers(teamId) {
    return await api.get(endpoints.listOfMembers(teamId));
}


export const dataService = {
    getAllTeams,
    getMembersCount,
    getTeamDetails,
    getListOfMembers
}