const usersService = require('../../services/users/usersService');

const validateTag = (tag) => {
    const idRegex = /^#[a-zA-Z0-9]{6,19}$/
    return idRegex.test(tag);
}

const getUsers = async (req, res) => {
    try {
        const users = await usersService.getUsers();
        if(users.length > 0) res.status(200).json(users)
        else res.status(200).send('There are no users available')
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

const getUser = async (req, res) => {
    const id = decodeURIComponent(req.params.id);

    if(validateTag(id)){
        try {
            const user = await usersService.getUser(id);
            if(user.length != 0) res.status(200).json(user)
            else res.status(404).send('User does not exist');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    } else res.status(422).send('User Id is not valid');
}

const getUserTournaments = async (req, res) => {
    const id = decodeURIComponent(req.params.id);
    if(validateTag(id)){
        try {
            const tournaments = await usersService.getUserTournaments(id);
            if(tournaments.length > 0) res.status(200).json(tournaments);
            else res.status(200).send('The user does not have any tournament')
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    } else res.status(422).send('User Id is not valid');
}

const getUserTeams = async (req, res) => {
    const id = decodeURIComponent(req.params.id);
    if(validateTag(id)){
        try {
            const teams = await usersService.getUserTeams(id);
            if(teams.length > 0) res.status(200).json(teams);
            else res.status(200).send('The user does not have any teams');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    } else res.status(422).send('User Id is not valid');
}

module.exports = { getUsers, getUser, getUserTournaments, getUserTeams };