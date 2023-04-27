const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

class Token {
    refreshTokens;
    refreshToken;
    accessToken;
    secret;

    constructor() {
        this.refreshTokens = new Array();
        this.secret = process.env.ACCESS_TOKEN_SECRET
    }

    generateAccessToken(userDni) {
        this.accessToken = jwt.sign(userDni, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "80000000m"}) 
    }

    generateRefreshToken(userDni) {
        this.refreshToken = jwt.sign(userDni, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "80000000m"})
        this.refreshTokens.push(this.refreshToken);
    }

    eliminarRefreshToken(token) {
        this.refreshTokens = this.refreshTokens.filter( t => t != token);
    }
}

module.exports = Token;