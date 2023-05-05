const usersService = require('../../services/users/usersService');

const validateId = (id) => {
    const tagRegex = /^#[a-zA-Z0-9]{6,19}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valid = false;
    if(tagRegex.test(id) || emailRegex.test(id)){
        valid = true;
    }
    
    return valid;
}

const getUsers = async (req, res) => {
    try {
        const users = await usersService.getUsers();
        if(users.length > 0) res.status(200).json(users)
        else res.status(200).send({data:'There are no users available'})
    } catch (error) {
        console.error(error);
        res.status(500).send({data:'Server Error'});
    }
}

const getUser = async (req, res) => {
    const id = decodeURIComponent(req.params.id);

    if(validateId(id)){
        try {
            const user = await usersService.getUser(id);
            if(user.length != 0) res.status(200).json(user)
            else res.status(404).send({data:'User does not exist'});
        } catch (error) {
            console.error(error);
            res.status(500).send({data:'Server Error'});
        }
    } else res.status(422).send({data:'User Id is not valid'});
}

const getUserTournaments = async (req, res) => {
    const id = decodeURIComponent(req.params.id);
    if(validateId(id)){
        try {
            const tournaments = await usersService.getUserTournaments(id);
            if(tournaments.length > 0) res.status(200).json(tournaments);
            else res.status(200).send({data:'The user does not have any tournament'})
        } catch (error) {
            console.error(error);
            res.status(500).send({data:'Server Error'});
        }
    } else res.status(422).send({data:'User Id is not valid'});
}

const getUserTeams = async (req, res) => {
    const id = decodeURIComponent(req.params.id);
    if(validateTag(id)){
        try {
            const teams = await usersService.getUserTeams(id);
            if(teams.length > 0) res.status(200).json(teams);
            else res.status(200).send({data:'The user does not have any teams'});
        } catch (error) {
            console.error(error);
            res.status(500).send({data:'Server Error'});
        }
    } else res.status(422).send({data:'User Id is not valid'});
}

const getUserStatistics = async (req, res) => {
    const id = decodeURIComponent(req.params.id);
    if(validateId(id)){
        try {
            const user = await usersService.getUserStatistics(id);
            if(user.length > 0) {
                const usuario = [];
                user.forEach((row) => {
                    const u = {}
                    u.user = row.user;
                    u.nivel = row.nivel;
                    if (row.cuentas) {
                        const cuentas = JSON.parse(`[${row.cuentas}]`);
                        u.cuentas = cuentas;
                    }
                    u.medias = { attacks: row.attacks, defences: row.defences };
                    usuario.push(u)
                });
                res.status(200).json(usuario)
            }else res.status(404).send({data:'User does not exist'});
        } catch (error) {
            console.error(error);
            res.status(500).send({data:'Server Error'});
        }
    } else res.status(422).send({data:'User Id is not valid'});
}

module.exports = { getUsers, getUser, getUserTournaments, getUserTeams, getUserStatistics };