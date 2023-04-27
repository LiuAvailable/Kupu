const express = require("express");
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


/* users */
router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getUser)
router.get('/users/:id/tournaments', userController.getUserTournaments)
router.get('/users/:id/teams', userController.getUserTeams)

module.exports = router;