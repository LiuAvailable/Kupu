const tournamentService = require('../../services/tournaments/tournamentService')

const validateTournamentId = (id) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id)
}

const getTournaments = async (req, res) => {
    try {
        const tournaments = await tournamentService.getTournaments();
        res.status(200).json(tournaments)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

const getTournament = async (req, res) => {

    const id = req.params.id;

    if (validateTournamentId(id)) {
        try {
            const tournaments = await tournamentService.getTournament(id);
            if(tournaments.length != 0) res.status(200).json(tournaments)
            else res.status(404).send('Tournament does not exist');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
      } else res.status(422).send('Tournament Id is not valid')
}

const getTournamentTeams = async (req, res) => {
    const id = req.params.id;
    if(validateTournamentId(id)){
        try {
            const teams = await tournamentService.getTournamentTeams(id);
            if(teams.length != 0) res.status(200).json(teams)
            else res.status(404).send('There are no teams in the tournament');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    } else res.status(422).send('Tournament Id is not valid')
}

const getTournamentATK = async (req, res) => {
    const id = req.params.id;
    if(validateTournamentId(id)){
        switch(req.query.table){
            case 'atk':
                getRankingATK(id, res)
                break;
            case 'def':
                getRankingDEF(id, res)
                break;
            default:
                res.status(422).send('The request parameter is not valid')
                break;
        }
    } else res.status(422).send('Tournament Id is not valid')
}

const getRankingATK = async (id, res) => {
    try{
        const players = await  tournamentService.getRankingATK(id)
        if(players.length != 0) res.status(200).json(players)
        else res.status(200).send('Tournament has no player rank');
    }catch(e){
        console.log(e)
        res.status(500).send('Server Error')
    }
}
const getRankingDEF = async (id, res) => {
    try{
        const players = await  tournamentService.getRankingDEF(id)
        if(players.length != 0) res.status(200).json(players)
        else res.status(200).send('Tournament has no player rank');
    }catch(e){
        console.log(e)
        res.status(500).send('Server Error')
    }
}

module.exports = { getTournaments, getTournament, getTournamentTeams, getTournamentATK };