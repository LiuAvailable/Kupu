const tournamentsDatabase = require('../../database/tournaments/tournamentDatabase')

const getTournaments = async () => {
    const tournaments = await tournamentsDatabase.getTournaments();
    return tournaments;
}

const getTournament = async (id) => {
    const tournaments = await tournamentsDatabase.getTournament(id);
    return tournaments;
}

const getTournamentTeams = async (id) => {
    const teams = await tournamentsDatabase.getTournamentTeams(id);
    return teams;
}

const getRankingATK = async (id) => {
    const teams = await tournamentsDatabase.getRankingATK(id);
    return teams;
}

const getRankingDEF = async (id) => {
    const teams = await tournamentsDatabase.getRankingDEF(id);
    return teams;
}

const getTournamentFormat = async (type, teamSize, level) => {
    const id = await tournamentsDatabase.getTournamentFormat(type, teamSize, level);
    return id;
}

const newTournament = async (tournament) => {
    const id = await tournamentsDatabase.newTournament(tournament);
    return id;
}

const setTournamentFases = async (fase) => {
    const status = tournamentsDatabase.setTournamentFases(fase);
    return status;
}

const newTeam = async (team) => {
    const result = await tournamentsDatabase.newTeam(team);
    return result
}

const createMatches = async (id, match, round) => {
    const result = await tournamentsDatabase.createMatches(id, match, round);
    return result
}

module.exports = { 
    getTournaments, 
    getTournament, 
    getTournamentTeams, 
    getRankingATK, 
    getRankingDEF, 
    getTournamentFormat, 
    newTournament, 
    setTournamentFases, 
    newTeam,
    createMatches
};