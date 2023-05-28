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
    if(id){
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

const getTournamentsFormats = async (req, res) => {
    const type = req.body.type;
    const teamSize = req.body.teamSize;
    const level = req.body.level
    if(type && teamSize && level){
        const id = await tournamentService.getTournamentFormat(type, teamSize,level);
        if(id) res.status(200).send(id[0])
        else res.status(404).send({data:'format not found'})
    } else res.status(422).send({data:'empty parameters'})

}

/***********
 * POSTS
 **********/
const newTournament = async (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const descripcio = req.body.descripcio;
    const numPlayers_team = req.body.numPlayers_team;
    const time_format = req.body.time_format;
    const fi = req.body.fases[req.body.fases.length -1]?.fi; // data fi última fase
    const org = req.body.organizator;

    const UUIDdate = dateUUIDformat(new Date())
    const UUIDname = nameUUIDformat(name)
    const id = `T-${UUIDname}-${UUIDdate}-${Math.floor(Math.random() * 100)}`

    const fases = req.body.fases;

    // const state = req.body.state;
    if(name && descripcio && numPlayers_team && time_format && fi && fases.length > 0 && org){
        let tournament = {id, name, descripcio, numPlayers_team, time_format, fi, org }
        try{
            const tournamentId = await tournamentService.newTournament(tournament) // insert tournament
            if(tournamentId) {
                let num_fase = 1;
                const DBfases = []
                // insert fases
                try {
                    fases.forEach(fase => {
                        fase['id'] = id;
                        fase['fase'] = num_fase;
                        fase['type'] = fase.type == 'Eliminatoria' ? 'playoff' : 'league';
    
                        DBfases.push({id: fase.id, start: fase.inici})
                        if(!tournamentService.setTournamentFases(fase)) res.status(400).send({data:'data incorrect'})
    
                        num_fase ++;
                    });
                    res.status(200).send({id:tournamentId});
                } catch(e){
                    console.log(e)
                    res.status(500).data({data:'internal error'})
                } 
            } else res.status(500).send({data:'internal error'})
        } catch(e){console.log(e); res.status(500).send({data:'internal error'})}
    } else res.status(422).send({data:'empty params'})
}


function dateUUIDformat(fecha) {
    const year = fecha.getFullYear().toString();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
    const hours = fecha.getHours().toString().padStart(2, '0');
    const minutes = fecha.getMinutes().toString().padStart(2, '0');
    const seconds = fecha.getSeconds().toString().padStart(2, '0');
    
    return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}

function nameUUIDformat(string) {
    const sinEspacios = string.replace(/\s/g, '');
    const primerosDiez = sinEspacios.slice(0, 10);
    const resultado = primerosDiez.padEnd(10, '0');
    
    return resultado;
}

const newTeam = async (req, res)=> {
    console.log(req.body)
    const name = req.body.name;
    const abrev = req.body.abrev;
    const playerList = req.body.playerList;
    const tournament = req.body.tournament;
    const teamId = req.body.teamId;
    const teamTag = req.body.teamTag;

    if(name && abrev && playerList.length > 0 && teamId && teamTag && tournament){
        const team = {name, abrev, playerList, teamId, teamTag, tournament}
        try{
            result = await tournamentService.newTeam(team)
            if(result) {
                res.status(200).send({data:'OK'})
            } else res.status(400).send({data:'Error creating team'})
        } catch(e){
            console.log(e);
            res.status(500).send({data: 'Internal error'});
        }


    } else res.status(422).send({data:'empty values'});
}
  
const createMathces = async (req, res) => {
    const id = req.body.id;
    const matches = req.body.matches;
    if(matches.length > 2 && id){
        try{
            let round = 1;
            for (const match of matches) {
                console.log(match);
                let result = await tournamentService.createMatches(id, match, round);
                if (!result) {
                  res.status(500).send({ data: 'Error creating matches' });
                  return; // Agregar un "return" para salir de la función en caso de error
                }
                round++;
              }
        }catch(e){
            console.log(e);
            res.status(500).send({data:'internal error'});
        }
    } else res.status(422).send({data:'Few matches provided'});

    res.status(200).send({data:'OK'});
}

module.exports = { 
    getTournaments, 
    getTournament, 
    getTournamentTeams,
    getTournamentATK, 
    getTournamentsFormats,
    newTournament,
    newTeam,
    createMathces
};