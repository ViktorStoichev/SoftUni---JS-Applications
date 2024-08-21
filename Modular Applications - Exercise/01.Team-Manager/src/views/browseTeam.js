import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/dataService.js";
import { mapUserToTeam } from "../utility/findTeamMembers.js";
import { renderer } from "../utility/render.js";
import { userUtil } from "../utility/userUtil.js";

const template = (teams, hasUser) => html`
<section id="browse">

    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>

    ${hasUser && html`
        <article class="layout narrow">
            <div class="pad-small"><a href="#" class="action cta">Create Team</a></div>
        </article>`}

    ${teams.map(team => teamTemplate(team))}

</section>`

const teamTemplate = (team) => html`
<article class="layout">
    <img src=${team.logoUrl} class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="details">${team.members} Members</span>
        <div><a href="/details/${team._id}" class="action">See details</a></div>
    </div>
</article>`

export async function showBrowseTeamView() {
    const userData = userUtil.getUser();
    const allTeams = await dataService.getAllTeams();
    const membersCount = await dataService.getMembersCount();

    allTeams.forEach(team => {
        if (!team.hasOwnProperty('members')) {
            team.members = 0;
        }
        
        team.members = mapUserToTeam(team, membersCount);
    });

    renderer(template(allTeams, userData));
}