const conn = require('../mysql');

const getTournaments = async () => {
  const connection = await conn.connection();
  try {
    const sql = `select f.type, f.teamSize, f.level, f.timeFormat ,t.id,t.name, t.tournament_date, t.normativa, t.match_time, t.number_teams, t.start, t.rooster_change, t.rooster_change_start, t.rooster_change_end, t.numPlayers_team, t.description
    FROM tournament t
    left JOIN TOURNAMENT_FORMAT_INTERMIDIATE as i
    on i.idTournament = t.id
    left JOIN TOURNAMENT_FORMAT as f
    on f.id = i.idFormat`
    const [rows, fields] = await connection.execute(sql);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

const getTournament = async (id) => {
  const connection = await conn.connection();
  try {
    const [rows, fields] = await connection.execute(`select t.id, t.tournament_date, t.normativa, t.match_time, t.number_teams, t.start, t.rooster_change, t.rooster_change_start, t.rooster_change_end, t.numPlayers_team, t.description FROM tournament t WHERE id = ?`, [id]);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

const getTournamentTeams = async (id) => {
  const connection = await conn.connection();
  try {
    const [rows, fields] = await connection.execute(`select * from TEAM WHERE tournamentId = ?`, [id]);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

const getRankingATK = async (id) => {
  const connection = await conn.connection();
  try {
    const [rows, fields] = await connection.execute(`select * from ATK_RANKING WHERE tournament = ? order by stars DESC, percentage DESC, attaks`, [id]);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}
const getRankingDEF = async (id) => {
  const connection = await conn.connection();
  try {
    const [rows, fields] = await connection.execute(`select * from DEF_RANKING WHERE tournament = ? order by stars, percentage, attaks DESC`, [id]);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

const getTournamentFormat = async (type, teamSize, level) => {
  const connection = await conn.connection();
  try {
    const [rows, fields] = await connection.execute(`select id from TOURNAMENT_FORMAT WHERE type = ? and teamSize = ? and level = ?`, [type, teamSize, level]);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = { getTournaments, getTournament,getTournamentTeams, getRankingATK, getRankingDEF,getTournamentFormat };
