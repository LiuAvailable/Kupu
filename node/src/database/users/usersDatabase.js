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
        const [rows, fields] = await connection.execute('select t.id, t.tournament_date, t.normativa, t.match_time, t.number_teams, t.start, t.rooster_change, t.rooster_change_start, t.rooster_change_end, t.numPlayers_team, t.description from TEAM_PLAYER2 p JOIN TOURNAMENT t ON p.tournament = t.id WHERE p.tag = ?', [id]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

const getUserOrganitzations = async (id) => {
    const connection = await conn.connection();
    try {
        const [rows, fields] = await connection.execute('select idTournament from ORGANITZATOR WHERE idUser = ?', [id]);
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
        const [rows, fields] = await connection.execute('select t.* from TEAM_PLAYER2 p JOIN TEAM t ON p.team = t.id where p.tag = ?', [id]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

const getUserStatistics = async (id) => {
    const connection = await conn.connection();
    const sql = `  
    SELECT 
    u.userId AS user,
    u.level AS nivel,
    GROUP_CONCAT(DISTINCT CONCAT('{"name":"', a.name, '", "tag":"', a.tag, '"}') SEPARATOR ',') AS cuentas,
    u.attacks,
    u.defences
    FROM USER_STATISTICS u
    LEFT JOIN account a ON u.userId = a.userId AND u.level = a.level
    WHERE u.userId = ?
    GROUP BY u.userId, u.level;
  `
    try {
        const [rows, fields] = await connection.execute(sql, [id]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }

}

const getTournamentTeam = async (user, tournament) => {
    const connection = await conn.connection();
    const sql = 'SELECT * FROM team_player2 WHERE tag = ? and tournament = ?';
    try {
        const [rows, fields] = await connection.execute(sql, [user, tournament]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = { getUsers, getUser, getUserTournaments, getUserTeams, getUserStatistics,getTournamentTeam,getUserOrganitzations };