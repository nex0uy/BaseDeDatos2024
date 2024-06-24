package com.obligatorio.pencaUCU.DataAccess;

import com.obligatorio.pencaUCU.Models.FinalPrediction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Repository
public class FinalPredictionDataAccess {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final String INSERT_FINAL_PREDICTION_SQL = "INSERT INTO final_predictions (user_id, winning_team_id, runner_up_team_id, points) VALUES (?, ?, ?, ?)";
    private final String SELECT_FINAL_PREDICTION_SQL = "SELECT * FROM final_predictions WHERE id = ?";
    private final String SELECT_ALL_FINAL_PREDICTIONS_SQL = "SELECT * FROM final_predictions";
    private final String EXISTS_FINAL_PREDICTION_SQL = "SELECT COUNT(*) FROM final_predictions WHERE user_id = ?";
    private final String UPDATE_POINTS_FINAL_PREDICTION_SQL = "UPDATE final_predictions SET points = ? WHERE id = ?";
    private final String SELECT_FINAL_PREDICTION_POINTS_BY_CAREER_SQL = "SELECT u.career, SUM(fp.points) AS total_points, COUNT(fp.id) AS total_predictions " +
            "FROM final_predictions fp " +
            "JOIN users u ON fp.user_id = u.id " +
            "GROUP BY u.career";
    private final String SELECT_FINAL_PREDICTION_POINTS_BY_USER_SQL = "SELECT user_id, SUM(points) AS total_points " +
            "FROM final_predictions " +
            "GROUP BY user_id";
    private final String CALCULATE_TOTAL_POINTS_BY_USER_SQL = "SELECT SUM(points) FROM final_predictions WHERE user_id = ?";
    private final String SELECT_FINAL_PREDICTION_BY_USER_SQL = "SELECT * FROM final_predictions WHERE user_id = ?";

    

    public void save(FinalPrediction finalPrediction) {
        jdbcTemplate.update(INSERT_FINAL_PREDICTION_SQL,
                finalPrediction.getUserId(),
                finalPrediction.getWinningTeamId(),
                finalPrediction.getRunnerUpTeamId(),
                finalPrediction.getPoints());
    }

    public FinalPrediction findById(int id) {
        try {
            return jdbcTemplate.queryForObject(SELECT_FINAL_PREDICTION_SQL, new FinalPredictionRowMapper(), id);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public FinalPrediction findByUserId(int userId) {
        try {
            return jdbcTemplate.queryForObject(SELECT_FINAL_PREDICTION_BY_USER_SQL, new FinalPredictionRowMapper(), userId);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }    


    public List<FinalPrediction> findAll() {
        return jdbcTemplate.query(SELECT_ALL_FINAL_PREDICTIONS_SQL, new FinalPredictionRowMapper());
    }

    public boolean existsByUserId(int userId) {
        Integer count = jdbcTemplate.queryForObject(EXISTS_FINAL_PREDICTION_SQL, Integer.class, userId);
        return count != null && count > 0;
    }

    public void updatePoints(int id, int points) {
        jdbcTemplate.update(UPDATE_POINTS_FINAL_PREDICTION_SQL, points, id);
    }

    public List<Map<String, Object>> findFinalPredictionPointsByCareer() {
        return jdbcTemplate.query(SELECT_FINAL_PREDICTION_POINTS_BY_CAREER_SQL, new CareerPointsRowMapper());
    }

    private static final class FinalPredictionRowMapper implements RowMapper<FinalPrediction> {
        @Override
        public FinalPrediction mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
            FinalPrediction finalPrediction = new FinalPrediction();
            finalPrediction.setId(rs.getInt("id"));
            finalPrediction.setUserId(rs.getInt("user_id"));
            finalPrediction.setWinningTeamId(rs.getInt("winning_team_id"));
            finalPrediction.setRunnerUpTeamId(rs.getInt("runner_up_team_id"));
            finalPrediction.setPoints(rs.getInt("points"));
            return finalPrediction;
        }
    }

    public List<Map<String, Object>> findFinalPredictionPointsByUser() {
        return jdbcTemplate.queryForList(SELECT_FINAL_PREDICTION_POINTS_BY_USER_SQL);
    }

    public int calculateTotalPointsByUserId(int userId) {
        return jdbcTemplate.queryForObject(CALCULATE_TOTAL_POINTS_BY_USER_SQL, Integer.class, userId);
    }


    private static final class CareerPointsRowMapper implements RowMapper<Map<String, Object>> {
        @Override
        public Map<String, Object> mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
            return Map.of(
                    "career", rs.getString("career"),
                    "total_points", rs.getLong("total_points"),
                    "total_predictions", rs.getLong("total_predictions")
            );
        }
    }
}
