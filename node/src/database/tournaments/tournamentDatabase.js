const conn = require('../mysql');

const getTournaments = async () => {
  const connection = await conn.connection();
  try {
    const sql_bk = `select f.type, f.teamSize, f.level, f.timeFormat ,t.id,t.name, t.tournament_date, t.normativa, t.match_time, t.number_teams, t.start, t.rooster_change, t.rooster_change_start, t.rooster_change_end, t.numPlayers_team, t.description
    FROM tournament t
    left JOIN TOURNAMENT_FORMAT_INTERMIDIATE as i
    on i.idTournament = t.id
    left JOIN TOURNAMENT_FORMAT as f
    on f.id = i.idFormat`
    const sql = `SELECT	id, name, description, normativa, logo, numPlayers_team, time_format, finish from tournament`
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
    const [rows, fields] = await connection.execute(`SELECT	id, name, description, normativa, logo, numPlayers_team, time_format, finish from tournament tournament WHERE id = ?`, [id]);
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


const newTournament = async (tournament) => {
  const connection = await conn.connection();
  const sql = `INSERT INTO TOURNAMENT(id, name, description, normativa, logo, numPlayers_team, time_format, finish, state, codi, password) 
  values (?, ?, ?, '', '', ?, ?, ?, 'public', '', '');`
  const selectSql = 'SELECT id FROM TOURNAMENT WHERE id = LAST_INSERT_ID();';
  const sql_org = `INSERT INTO ORGANITZATOR(idUser,idTournament) values (?,?)`;
  try {
    // Insertar el registro en la base de datos
    await connection.execute(sql, [tournament.id, tournament.name, tournament.descripcio, tournament.numPlayers_team, tournament.time_format, tournament.fi]);
    await connection.execute(sql_org, [tournament.org, tournament.id]);
    // Obtener el UUID del registro insertado
    const [rows, fields] = await connection.execute(selectSql);
    const id = rows[0].id;
    
    return id;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}
const setTournamentFases = async (fase) => {
  const connection = await conn.connection();
  const sql = `INSERT INTO TOURNAMENT_FORMAT(id, start, finish, number_teams, fase, format) 
  values (?,?,?,?,?,?);`
  try {
    // Insertar el registro en la base de datos
    await connection.execute(sql, [fase.id, fase.inici, fase.fi, fase.equipos, fase.fase, fase.type]);
    return true;
  } catch (error) {
    console.error("Error al insertar el registro:", error);
    return false;
  } finally {
    connection.release();
  }
}

const newTeam = async (team) => {
  const connection = await conn.connection();
  const sql = `INSERT INTO TEAM(id, tournamentId, tag, name, short_name, state) 
  values (?,?,?,?,?,'active');`
  const sql_players = `INSERT INTO team_player2(tag, player, tournament, team) VALUES (?,?,?,?)`;
  try {
    // Insertar el registro en la base de datos name, abrev, playerList, teamId, teamTag, tournament
    await connection.execute(sql, [team.teamId, team.tournament, team.teamTag, team.name, team.abrev]);
    for (const [index, p] of team.playerList.entries()) {
      await connection.execute(sql_players, [p, index, team.tournament, team.teamId]);
    }
    return true;
  } catch (error) {
    console.error("Error al insertar el registro:", error);
    return false;
  } finally {
    connection.release();
  }
}

const createMatches = async (id, match, round) => {
  const connection = await conn.connection();
  const sql = `INSERT INTO TOURNAMENT_MATCH(id, tournament, fase, team, opponent,round, next_match) VALUES(uuid(), ?,1,?,?,?,'')`;
  try {
    // Insertar el registro en la base de datos name, abrev, playerList, teamId, teamTag, tournament
    await connection.execute(sql, [id, match.team, match.opponent, round]);
    return true;
  } catch (error) {
    console.error("Error al insertar el registro:", error);
    return false;
  } finally {
    connection.release();
  }

}

const getMathces = async (id) => { 
  const connection = await conn.connection();
  const sql = `SELECT p.*, e1.name AS team_name, e1.short_name AS team_short_name, e2.name AS opponent_name,  e2.short_name AS opponent_short_name
  FROM TOURNAMENT_MATCH p
  JOIN team e1 ON p.team = e1.id
  JOIN team e2 ON p.opponent = e2.id where tournament = ?`;
  try {
    // Insertar el registro en la base de datos name, abrev, playerList, teamId, teamTag, tournament
    const [rows, fields] = await connection.execute(sql, [id]);
    return rows;
  } catch (error) {
    console.error("Error al insertar el registro:", error);
    return false;
  } finally {
    connection.release();
  }
}



module.exports = { 
  getTournaments, 
  getTournament,
  getTournamentTeams, 
  getRankingATK, 
  getRankingDEF,
  getTournamentFormat,
  newTournament,
  setTournamentFases,
  newTeam,
  createMatches,
  getMathces
};
