package com.obligatorio.pencaUCU.DataAccess;

import com.obligatorio.pencaUCU.Models.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class TeamDataAccess {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final String INSERT_TEAM_SQL = "INSERT INTO teams (name) VALUES (?)";
    private final String SELECT_TEAM_SQL = "SELECT * FROM teams WHERE id = ?";
    private final String SELECT_ALL_TEAMS_SQL = "SELECT * FROM teams";
    private final String UPDATE_TEAM_SQL = "UPDATE teams SET name = ? WHERE id = ?";
    private final String DELETE_TEAM_SQL = "DELETE FROM teams WHERE id = ?";

    public void save(Team team) {
        jdbcTemplate.update(INSERT_TEAM_SQL, team.getName());
    }

    public Team findById(int id) {
        return jdbcTemplate.queryForObject(SELECT_TEAM_SQL, new TeamRowMapper(), id);
    }

    public List<Team> findAll() {
        return jdbcTemplate.query(SELECT_ALL_TEAMS_SQL, new TeamRowMapper());
    }

    public void update(Team team) {
        jdbcTemplate.update(UPDATE_TEAM_SQL, team.getName(), team.getId());
    }

    public void delete(int id) {
        jdbcTemplate.update(DELETE_TEAM_SQL, id);
    }

    private static final class TeamRowMapper implements RowMapper<Team> {
        @Override
        public Team mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
            Team team = new Team();
            team.setId(rs.getInt("id"));
            team.setName(rs.getString("name"));
            return team;
        }
    }
}
