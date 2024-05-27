package com.obligatorio.pencaUCU.DataAccess;

import com.obligatorio.pencaUCU.Models.Prediction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class PredictionDataAccess {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final String INSERT_PREDICTION_SQL = "INSERT INTO predictions (user_id, match_id, team_one_score, team_two_score, points) VALUES (?, ?, ?, ?, ?)";
    private final String SELECT_PREDICTION_SQL = "SELECT * FROM predictions WHERE id = ?";
    private final String SELECT_ALL_PREDICTIONS_SQL = "SELECT * FROM predictions";
    private final String UPDATE_PREDICTION_SQL = "UPDATE predictions SET user_id = ?, match_id = ?, team_one_score = ?, team_two_score = ?, points = ? WHERE id = ?";
    private final String DELETE_PREDICTION_SQL = "DELETE FROM predictions WHERE id = ?";
    private final String EXISTS_PREDICTION_SQL = "SELECT COUNT(*) FROM predictions WHERE user_id = ? AND match_id = ?";


    public void save(Prediction prediction) {
        jdbcTemplate.update(INSERT_PREDICTION_SQL,
                prediction.getUserId(),
                prediction.getMatchId(),
                prediction.getTeamOneScore(),
                prediction.getTeamTwoScore(),
                prediction.getPoints());
    }

    public Prediction findById(int id) {
        return jdbcTemplate.queryForObject(SELECT_PREDICTION_SQL, new PredictionRowMapper(), id);
    }

    public List<Prediction> findAll() {
        return jdbcTemplate.query(SELECT_ALL_PREDICTIONS_SQL, new PredictionRowMapper());
    }

    public void update(Prediction prediction) {
        jdbcTemplate.update(UPDATE_PREDICTION_SQL,
                prediction.getUserId(),
                prediction.getMatchId(),
                prediction.getTeamOneScore(),
                prediction.getTeamTwoScore(),
                prediction.getPoints(),
                prediction.getId());
    }

    public void delete(int id) {
        jdbcTemplate.update(DELETE_PREDICTION_SQL, id);
    }


    public boolean existsByUserIdAndMatchId(int userId, int matchId) {
        Integer count = jdbcTemplate.queryForObject(EXISTS_PREDICTION_SQL, Integer.class, userId, matchId);
        return count != null && count > 0;
    }
    
    private static final class PredictionRowMapper implements RowMapper<Prediction> {
        @Override
        public Prediction mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
            Prediction prediction = new Prediction();
            prediction.setId(rs.getInt("id"));
            prediction.setUserId(rs.getInt("user_id"));
            prediction.setMatchId(rs.getInt("match_id"));
            prediction.setTeamOneScore(rs.getInt("team_one_score"));
            prediction.setTeamTwoScore(rs.getInt("team_two_score"));
            prediction.setPoints(rs.getInt("points"));
            return prediction;
        }
    }
}
