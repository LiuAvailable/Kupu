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

module.exports = { getTournaments, getTournament, getTournamentTeams, getRankingATK, getRankingDEF, getTournamentFormat };