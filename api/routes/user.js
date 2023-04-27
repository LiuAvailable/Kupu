const express = require('express')
const router = express.Router()
const userActions = require('../controllers/user.js')

router.post('/login', userActions.login)
router.post('/apuntar-se' , userActions.validateToken , userActions.apuntarse)
router.post('/cancelar' , userActions.validateToken , userActions.cancelar)
router.post('/estatdies' , userActions.validateToken , userActions.getEstatDies)
router.get('/categoria' , userActions.validateToken , userActions.getCategoriaTreballador )
router.post('/guardiesTreballadorData' , userActions.validateToken ,userActions.getGuardiesTreballadorPerData)
module.exports = router;