const mysql = require('mysql')

const mysql_con = mysql.createConnection({
    host : "153.92.211.176",
    user : "hospital",
    password : "Hospital$$GSCp.",
    database : "hospital"
});

mysql_con.connect((err) =>{

    if(err) throw err;
    console.log("Conectat a la BD!!")

})

module.exports = mysql_con
