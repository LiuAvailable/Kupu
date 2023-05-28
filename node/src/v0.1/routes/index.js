const express = require('express');
const router = express.Router();

const loginController = require("../../controllers/login/loginController");
const tournamentController = require("../../controllers/tournaments/tournamentController");
const userController = require("../../controllers/users/userController");


/* login */
router.post('/login', loginController.login)

/* tournaments */
router.get('/tournaments', tournamentController.getTournaments);
router.get('/tournaments/:id', tournamentController.getTournament);
router.get('/tournaments/:id/teams', tournamentController.getTournamentTeams);
router.get('/tournaments/:id/ranking', tournamentController.getTournamentATK);

router.get('/tournament_formats', tournamentController.getTournamentsFormats);

router.post('/tournaments', tournamentController.newTournament);
router.post('/tournaments/teams', tournamentController.newTeam);
router.post('/tournaments/matches', tournamentController.createMathces);



/* users */
router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getUser)
router.get('/users/:id/tournaments', userController.getUserTournaments)
router.get('/users/:id/organitzations', userController.getUserOrganitzations)
router.get('/users/:id/teams', userController.getUserTeams)
router.get('/users/:id/statistics', userController.getUserStatistics)

router.get('/users/:user/tournaments/:tournament/teams', userController.getTournamentTeam)




module.exports = router;