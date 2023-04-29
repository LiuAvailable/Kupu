const conn = require('../mysql');
const bcrypt = require('bcrypt');

function hashPassword(password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash.substring(0, 500); // Trunca el hash a 500 caracteres
  }

const getUsers = async () => {
    const connection = await conn.connection();
    try {
      const [rows, fields] = await connection.execute('SELECT id, username, screenMode, language, state, privileges FROM user');
      return rows;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
};

const getUser = async (id, password) => {
    const connection = await conn.connection();
    try {
        let result;
        if(password){
            const [rows, fields] = await connection.execute('SELECT id, username, screenMode, language, state, privileges, password FROM user WHERE ( id = ? or email = ? )', [id, id]);
            if (rows.length === 1) {
                const user = rows[0];
                const isPasswordMatch = await bcrypt.compare(password, user.password);
                if (isPasswordMatch) {
                    result = { id: user.id, username: user.username, screenMode: user.screenMode, language: user.language, state: user.state, privileges: user.privileges };
                } else {
                    result = {error: "Invalid password"};
                }
            } else {
                result = null;
            }
        } else {
            const [rows, fields] = await connection.execute('SELECT id, username, screenMode, language, state, privileges FROM user WHERE id = ? or email = ?', [id, id]);
            if (rows.length === 1) {
                const user = rows[0];
                result = { id: user.id, username: user.username, screenMode: user.screenMode, language: user.language, state: user.state, privileges: user.privileges };
            } else {
                result = null;
            }
        }
        return result;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const getUserTournaments = async (id) => {
    const connection = await conn.connection();
    try {
        const [rows, fields] = await connection.execute('select t.id, t.tournament_date, t.normativa, t.match_time, t.number_teams, t.start, t.rooster_change, t.rooster_change_start, t.rooster_change_end, t.numPlayers_team, t.description from TEAM_PLAYER p JOIN TOURNAMENT t ON p.tournament = t.id WHERE p.tag = ?', [id]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

const getUserTeams = async (id) => {
    const connection = await conn.connection();
    try {
        const [rows, fields] = await connection.execute('select t.* from TEAM_PLAYER p JOIN TEAM t ON p.team = t.id where p.tag = ?', [id]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = { getUsers, getUser, getUserTournaments, getUserTeams };