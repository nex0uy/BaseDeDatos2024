package com.obligatorio.pencaUCU.DataAccess;

import com.obligatorio.pencaUCU.Models.Match;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class MatchDataAccess {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final String INSERT_MATCH_SQL = "INSERT INTO matches (date, team_one_score, team_two_score, phase, team_one_id, team_two_id) VALUES (?, ?, ?, ?, ?, ?)";
    private final String SELECT_MATCH_SQL = "SELECT * FROM matches WHERE id = ?";
    private final String SELECT_ALL_MATCHES_SQL = "SELECT * FROM matches";
    private final String UPDATE_MATCH_SQL = "UPDATE matches SET date = ?, team_one_score = ?, team_two_score = ?, phase = ?, team_one_id = ?, team_two_id = ? WHERE id = ?";
    private final String DELETE_MATCH_SQL = "DELETE FROM matches WHERE id = ?";

    public void save(Match match) {
        jdbcTemplate.update(INSERT_MATCH_SQL,
                match.getDate(),
                match.getTeamOneScore(),
                match.getTeamTwoScore(),
                match.getPhase(),
                match.getTeamOneId(),
                match.getTeamTwoId());
    }

    public Match findById(int id) {
        return jdbcTemplate.queryForObject(SELECT_MATCH_SQL, new MatchRowMapper(), id);
    }

    public List<Match> findAll() {
        return jdbcTemplate.query(SELECT_ALL_MATCHES_SQL, new MatchRowMapper());
    }

    public void update(Match match) {
        jdbcTemplate.update(UPDATE_MATCH_SQL,
                match.getDate(),
                match.getTeamOneScore(),
                match.getTeamTwoScore(),
                match.getPhase(),
                match.getTeamOneId(),
                match.getTeamTwoId(),
                match.getId());
    }

    public void delete(int id) {
        jdbcTemplate.update(DELETE_MATCH_SQL, id);
    }

    private static final class MatchRowMapper implements RowMapper<Match> {
        @Override
        public Match mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
            Match match = new Match();
            match.setId(rs.getInt("id"));
            match.setDate(rs.getTimestamp("date"));
            match.setTeamOneScore((Integer) rs.getObject("team_one_score"));
            match.setTeamTwoScore((Integer) rs.getObject("team_two_score"));
            match.setPhase(rs.getString("phase"));
            match.setTeamOneId(rs.getInt("team_one_id"));
            match.setTeamTwoId(rs.getInt("team_two_id"));
            return match;
        }
    }
}
