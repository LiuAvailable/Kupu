const usersDatabase = require('../../database/users/usersDatabase')

const getUsers = async () => {
    const tournaments = await usersDatabase.getUsers();
    return tournaments;
}

const getUser = async (id, password) => {
    const user = await usersDatabase.getUser(id, password);
    return user;
}

const getUserTournaments = async (id) => {
    const tournaments = await usersDatabase.getUserTournaments(id);
    return tournaments;
}

const getUserTeams = async (id) => {
    const teams = await usersDatabase.getUserTeams(id);
    return teams;
}

const getUserStatistics = async (id) => {
    const user = await usersDatabase.getUserStatistics(id);
    return user;
}   

module.exports = { getUsers, getUser, getUserTournaments, getUserTeams, getUserStatistics };