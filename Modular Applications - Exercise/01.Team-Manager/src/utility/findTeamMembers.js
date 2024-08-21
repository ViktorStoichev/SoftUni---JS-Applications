export function mapUserToTeam(team, members) {
    const teamId = team._id;
    const count = members.filter(member => member.teamId === teamId).length;
    return count;
}