const connection = require('./db-connection.js')



const getPlantilla = (async (req, res) => {

    connection.query("select * from plantilla_guardia where estat != 'eliminat';",
        (err, result) => {
            if (err) {
                res.status(400).send("Error al obtenir plantilla guardia");
            }
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
            res.status(200).send({
                "resultat": { "dades": result }
            })
        })
});

const getTreballador = (async (req, res) => {
    const DNI = req.query.dni;
    connection.query("select * from treballador where dni = '"+DNI+"' and estat = 'actiu'", (err, result) => {
        if (err) {
            res.status(400).send('Error al obtenir treballdors')
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        })
    })
});

const getTreballadors = (async (req, res) => {
    
    connection.query("select * from treballador where estat != 'eliminat' " , (err, result) => {
        if (err) {
            res.status(400).send('Error al obtenir treballdors')
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        })
    })
})

const getCategories = (async (req, res) => {
    connection.query("select nom from categoria where estat != 'eliminat'", (err, result) => {
        if (err) {
            res.status(400).send('Error al obternir categoria')
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        });
    })
});

const getTorns = (async (req, res) => {
    connection.query("select nom from torn where estat != 'eliminat'", (err, result) => {
        if (err) {
            res.status(400).send('Error al obternir categoria')
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        });
    })
});



const getFestius = (async (req, res) => {
    connection.query("select * from festius where estat != 'eliminat'", (err, result) => {
        if (err) {
            res.status(400).send('Error al obternir categoria')
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        });
    })
});

const getGuardiesTreballador = (async (req, res) => {
    const DADES_GuardiesTreballador = 'gx.id_guardia, gx.estat_guardia, gx.estat';
    const DADES_Guardia = ',g.id, g.data_guardia, g.unitat, g.torn, g.categoria';

    const DADES = DADES_GuardiesTreballador+" "+DADES_Guardia;
    const DNI = req.query.dni;
    let sql = "select "+ DADES +" from guardies_x_treballador as gx JOIN guardies as g on gx.id_guardia = g.id where gx.estat != 'eliminat' and gx.dni_treballador ='"+DNI+"' order by g.data_guardia";
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(400).send('Error al obternir guardies per treballador')
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        });
    })
});

const getTreballadorsGuardia = (async (req, res) => {
    const DADES_GuardiesTreballador = 'gx.id_guardia, gx.estat_guardia, gx.estat,gx.dni_treballador,gx.nom';
    const DADES_Guardia = ',g.id, g.unitat, g.categoria, g.torn';

    const DADES = DADES_GuardiesTreballador+" "+DADES_Guardia;
    const id = req.query.id_guardia;
    let sql = "select "+ DADES +" from guardies_x_treballador as gx JOIN guardies as g on gx.id_guardia = g.id where gx.estat != 'eliminat' and gx.id_guardia ='"+id+"' order by gx.estat_guardia='assignat' desc";
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(400).send('Error al obternir guardies per treballador')
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        });
    })
});

const getAgendaTreballador = (async (req, res) => {
    const DADES_GuardiesTreballador = 'gx.id_guardia, gx.estat_guardia, gx.estat';
    const DADES_Guardia = ',g.id, g.data_guardia, g.unitat, g.torn, g.categoria';

    const DADES = DADES_GuardiesTreballador+" "+DADES_Guardia;
    const DATA = req.query.data;
    const DNI = req.body.dni;
    let sql = "select "+ DADES +" from guardies_x_treballador as gx JOIN guardies as g on gx.id_guardia = g.id where gx.estat = 'actiu' and gx.dni_treballador ='"+DNI+"'";
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(400).send('Error al obternir guardies per treballador')
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        });
    })
});

const getHistorialTreballador = (async (req, res) => {
    const DADES_GuardiesTreballador = 'gx.id_guardia, gx.estat_guardia, gx.estat';
    const DADES_Guardia = ',g.id, g.data_guardia, g.unitat, g.torn, g.categoria';

    const DADES = DADES_GuardiesTreballador+" "+DADES_Guardia;
    const DNI = req.query.dni;
    const DATA = req.query.data;

    let sql = "select "+ DADES +" from guardies_x_treballador as gx JOIN guardies as g on gx.id_guardia = g.id where gx.estat != 'eliminat' and gx.dni_treballador ='"+DNI+"' and g.data_guardia < '"+DATA+"' order by g.unitat";
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(400).send('Error al obternir guardies per treballador')
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        });
    })
});


const getUnitats = (async (req, res) => {
    connection.query("select nom from unitat where estat != 'eliminat'", (err, result) => {
        if (err) {
            res.status(400).send('Error al obternir categoria')
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        });
    })
});

const insertFestiu = (async (req, res) => {
    try {
        let sql = `INSERT into festius(dia, estat) VALUES (?, ?)`;
        connection.query(sql,[req.body.dia,req.body.estat], (error, results, fields) => {
        if (error) {
            if(error.code === 'ER_DUP_ENTRY'){
                let updateSql = `UPDATE festius SET estat = ? WHERE dia = ?`;
                connection.query(updateSql, [req.body.estat, req.body.dia], (error, results) => {
                    if (error) throw error;
                    res.send({"message": "El valor del campo estat ha sido actualizado"});
                });
            } 
            else {
                throw error;
            }
        }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Ha ocurrido un error al insertar el festiu" });
    }
});

const savePlantilla = (async (req, res) => {
    try {
        let plantilla = req.body;
        let sql = `INSERT into plantilla_guardia(unitat, torn, categoria, places, estat) VALUES (?, ?,?,?,?)`;
        connection.query(sql,[plantilla.unitat,plantilla.torn, plantilla.categoria, plantilla.places, 'actiu'], (error, results, fields) => {
        if (error) {
            if(error.code === 'ER_DUP_ENTRY'){
                let updateSql = `UPDATE plantilla_guardia SET estat = ?, places = ? WHERE unitat = ? and torn = ? and categoria = ?`;
                connection.query(updateSql, ['actiu', plantilla.places, plantilla.unitat, plantilla.torn, plantilla.categoria ], (error, results) => {
                    if (error) throw error;
                    res.send({"message": "El valor del campo estat ha sido actualizado"});
                });
            } 
            else {
                throw error;
            }
        }
        });
    } catch (error) {
        res.status(500).send({ error: "Ha ocurrido un error al insertar el festiu" });
    }
});


const getGuardiesData = (async (req,res) => {

    connection.query("select * from guardiesMesInscripcions where data_guardia = ? order by unitat asc;", [req.body.data] ,(err, result) => {

        if (err) {
            res.status(400).send('Error al obternir guardies per data error : ' + err)
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods','GET, POST ,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        });
    })

})

const createGuardies = (async (req, res) => {
    let plantilles = []
    let dates = req.body;

    connection.query("SELECT * FROM plantilla_guardia where estat = 'actiu'", (err, result) => {
        plantilles = result;

        dates.forEach(data => {
            plantilles.forEach(plantilla => {
                try{
                    let sql = 'INSERT INTO guardies(data_guardia, unitat, torn, categoria, places, estat) VALUES(?,?,?,?,?,?)';
                    connection.query(sql,[data, plantilla.unitat, plantilla.torn, plantilla.categoria, plantilla.places, 'actiu' ], (err, resultat) => {
                        
                    });
                }catch(err){
                }
            });
        })
        res.status(200).send({
            "resultat": { "dades": 'correct' }
        });
    });
});
const getGuardiesMesAny = (async (req, res) => {

    connection.query("SELECT * FROM hospital.guardies where data_guardia between ? and ? order by data_guardia asc;", [req.query.primer_dia , req.query.ultim_dia], (err, result) => {
        if (err) {
            res.status(400).send('Error al obternir guardies per data error : ' + err)
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods','GET, POST ,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        });
    })
});

const assignarEstatGuardia =(async(req,res) =>{
    try{
    connection.query("UPDATE guardies_x_treballador SET estat_guardia ='assignat' WHERE dni_treballador=?;", [req.query.dni_treballador], (err, result) => {
      if (err){
      res.status(400).send("Error al canviar l'estat de les guardies: " + err)
    }})}
    catch (error) {
        console.log(error);
        res.status(500).send({ error: "Error al canviar l'estat" });
    }
});

const desAssignarEstatGuardia =(async(req,res) =>{
    try{
    connection.query("UPDATE guardies_x_treballador SET estat_guardia ='apuntat' WHERE dni_treballador=?;", [req.query.dni_treballador], (err, result) => {
      if (err){
      res.status(400).send("Error al canviar l'estat de les guardies: " + err)
    }})}
    catch (error) {
        console.log(error);
        res.status(500).send({ error: "Error al canviar l'estat" });
    }
});


const getGuardiesTreballadorPerData = (async(req,res) =>{
    connection.query("select distinct unitat , estat_guardia from guardiesTreballadorData where dni_treballador =? and data_guardia = ?", [req.body.dni , req.body.data], (err, result) => {
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


const refreshToken = (async (req, res) => {
    console.log('refresh')
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        console.log('ERROR')
        return res.status(401).send({ message: 'No refresh token provided' });
    }
    try {
        console.log('AAAAAAA')
        console.log(refreshToken)
        console.log(jwt.verify(refreshToken, 'SECRET'))
        const decoded = jwt.verify(refreshToken, 'SECRET');
        console.log('-----')
        const userId = decoded.userId;
        console.log('BBBBB')
        const user = users.find(u => u.id === userId);
        console.log('cccc')
        if (!user) {
            return res.status(401).send({ message: 'Invalid refresh token' });
        }
        const newAccessToken = jwt.sign({ userId: user.id }, 'SECRET', { expiresIn: '15min' });
        return res.send({ accessToken: newAccessToken });
    } catch (err) {
        return res.status(401).send({ message: 'Invalid refresh token' });
    }
  });


module.exports = {
    getGuardiesMesAny,
    getGuardiesData,
    getPlantilla, 
    getTreballadors,
    getUnitats, 
    getTreballador,
    getCategories, 
    getGuardiesTreballador, 
    getAgendaTreballador, 
    getTorns, 
    getUnitats,
    getHistorialTreballador,
    getFestius,
    insertFestiu,
    savePlantilla,
    createGuardies,
    getTreballadorsGuardia,
    assignarEstatGuardia,
    desAssignarEstatGuardia,
    refreshToken
 };


