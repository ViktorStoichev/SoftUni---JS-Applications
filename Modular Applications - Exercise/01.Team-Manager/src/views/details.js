import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/dataService.js";
import { mapUserToTeam } from "../utility/findTeamMembers.js";
import { renderer } from "../utility/render.js";
import { userUtil } from "../utility/userUtil.js";

const template = (team, members, role, pendingUsers, memberUsers) => html`
<section id="team-home">
    <article class="layout">
        <img src=${team.logoUrl} class="team-logo left-col">
        <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details">${members} Members</span>
            ${role && teamActionTemplate(role)}
        </div>
        ${membersTemplate(role, memberUsers, team._ownerId)}
        <div class="pad-large">
            ${role === 'admin' ? membershipRequestTemplate() : ''}
        </div>
    </article>
</section>`

const teamActionTemplate = (role) => html`
            <div>
                ${role === 'admin' ? html`<a href="#" class="action">Edit team</a>` : ''}
                ${role === 'userButNotMember' ? html`<a href="#" class="action">Join team</a>` : ''}
                ${role === 'userMember' ? html`<a href="#" class="action invert">Leave team</a>` : ''}
                ${role === 'userPending' ? html`Membership pending. <a href="#">Cancel request</a>` : ''}
            </div>`

const membersTemplate = (role, memberUsers, teamOwnerId) => html`
        <div class="pad-large">
            <h3>Members</h3>
            <ul class="tm-members">
                ${memberUsers.map(x => {
                    return html`
                    <li>
                        ${x.user._id === teamOwnerId ? 
                            x.user.username : 
                            html`${role === 'admin' && html`<a href="#" class="tm-control action">Remove from team</a>`}
                        `}
                    </li>`
                })}
                <!-- <li>My Username</li>
                <li>James ${role === 'admin' && html`<a href="#" class="tm-control action">Remove from team</a>`}</li>
                <li>Meowth${role === 'admin' && html`<a href="#" class="tm-control action">Remove from team</a>`}</li> -->
            </ul>
        </div>`

const membershipRequestTemplate = (pendingUsers) => html`
            <h3>Membership Requests</h3>
            <ul class="tm-members">
                <li>John<a href="#" class="tm-control action">Approve</a><a href="#"
                        class="tm-control action">Decline</a></li>
                <li>Preya<a href="#" class="tm-control action">Approve</a><a href="#"
                        class="tm-control action">Decline</a></li>
            </ul>`

export async function showDetailsView(ctx) {
    const id = ctx.params.id;
    let role = undefined;
    const teamDetails = await dataService.getTeamDetails(id);
    const allMembers = await dataService.getMembersCount();
    const count = mapUserToTeam(teamDetails, allMembers);
    const listOfMembers = await dataService.getListOfMembers(teamDetails._id);
    const pendingUsers = listOfMembers.filter(x => x.status === 'pending');
    const memberUsers = listOfMembers.filter(x => x.status === 'member');
    console.log(listOfMembers);

    if (userUtil.hasOwner(teamDetails._ownerId)) {
        role = 'admin'
    }
    renderer(template(teamDetails, count, role, pendingUsers, memberUsers));
}