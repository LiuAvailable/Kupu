const jwt = require('jsonwebtoken')
const Token = require('../model/implementations/Token/token.js')
const connection = require('../db-utils/db-connection.js')



const token = new Token();

const login = async (req, res) => {
    
    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    console.log('AAAA')
    res.status(200).send('OK')
}

const apuntarse = (async (req, res) => {

    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');


    connection.query("insert into guardies_x_treballador (dni_treballador , id_guardia  , estat_guardia , estat) values (? , ? , 'apuntat' , 'actiu')",
        [req.token.dni, req.body.id_guardia],
        (err, result) => {
            if (err) {
                res.status(401).send("Error al apuntar-se");
            }

            res.status(200).send("Correcte!!")
        }
    )
})

const cancelar = (async (req,res) =>{
    
    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');


    connection.query("update guardies_x_treballador set estat = 'eliminat' where dni_treballador = ? and id_guardia = ?",
        [req.token.dni, req.body.id_guardia],
        (err, result) => {
            if (err) {
                res.status(401).send("Error al apuntar-se");
            }
            connection
            res.status(200).send("Correcte!!")
        }
    )
})

const getEstatDies = (async (req, res, next) => {

    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    res.header('Content-Type', 'application/json');

    let rangMes = obtenirRangMes(req.body.data)
   
    connection.query("select distinct id_guardia , data_guardia , estat_guardia , unitat from guardiesTreballadorData where dni_treballador = ? and data_guardia between ? and ?",
        [req.token.dni , rangMes.primer_dia , rangMes.ultim_dia],
        (err, result) => {
            if (err) {
                res.status(401).send("Error al obtenir guardies amb estat");
            }
            console.log(req.token.dni)
            console.log(rangMes.primer_dia)
            console.log(rangMes.ultim_dia)
            res.status(200).send({guardies : result})
        }
    )

});

const obtenirRangMes= (dataRequest) =>{

    let data = new Date(dataRequest)
    var firstDay = new Date(data.getFullYear(), data.getMonth(), 1);
    var lastDay = new Date(data.getFullYear(), data.getMonth() + 1, 0);

    var primerDiaMes = firstDay.getFullYear() + "-" + (firstDay.getMonth() +1) + "-" + firstDay.getDate();
    var ultimDiaMes = lastDay.getFullYear() + "-" + (lastDay.getMonth() + 1) + "-" + lastDay.getDate();

    return { primer_dia: primerDiaMes, ultim_dia: ultimDiaMes };
};

const getCategoriaTreballador = (async (req, res, next) => {

    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    res.header('Content-Type', 'application/json');

    console.log(req.token.dni)

    connection.query("select categoria from treballador where dni = ?", [req.token.dni],
        (err, result) => {
            if (err) {
                res.status(401).send("Error al obtenir categoria de treballador");
            }
            res.status(200).send({resultat : result})
        }
    )

})

const getGuardiesTreballadorPerData = (async(req,res) =>{
    connection.query("select distinct unitat , estat_guardia from guardiesTreballadorData where dni_treballador =? and data_guardia = ?", [req.token.dni , req.body.data], (err, result) => {
        if (err) {
            res.status(400).send('Error al obtenir guardies treballador per data error : ' + err)
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods','GET, POST ,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        });
    })
})

const validateToken = (async (req, res, next) => {

    const accessToken = req.headers["authorization"].split(" ")[1];
    if (accessToken == null) res.sendStatus(400).send("Token not present")
    jwt.verify(accessToken, token.secret, (err, token) => {
        if (err) res.status(403).send("Token invalid")
        else {
            req.token = token
            next();
        }
    })
});

module.exports = {
    login,
    apuntarse,
    cancelar,
    getGuardiesTreballadorPerData,
    validateToken,
    getEstatDies,
    getCategoriaTreballador
}