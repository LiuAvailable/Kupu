const conn = require('../mysql');

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

const getUser = async (id) => {
    const connection = await conn.connection();
    try {
        const [rows, fields] = await connection.execute('SELECT id, username, screenMode, language, state, privileges FROM user WHERE id = ?', [id]);
        console.log(rows)
        return rows;
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
        console.log(rows)
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
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = { getUsers, getUser, getUserTournaments, getUserTeams };