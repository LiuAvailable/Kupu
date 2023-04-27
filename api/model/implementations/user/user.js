const bcrypt = require('bcrypt');

class User {
    name;
    password;
    rol = "user";

    constructor(name){
        this.name = name;
        this.password = password;
    }

    setRol(rol){
        this.rol = rol;
    }
}

module.exports = User;