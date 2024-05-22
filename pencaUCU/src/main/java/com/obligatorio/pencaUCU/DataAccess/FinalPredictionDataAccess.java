package com.obligatorio.pencaUCU.DataAccess;

import com.obligatorio.pencaUCU.Models.FinalPrediction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class FinalPredictionDataAccess {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final String INSERT_FINAL_PREDICTION_SQL = "INSERT INTO final_predictions (user_id, winning_team_id, runner_up_team_id) VALUES (?, ?, ?)";
    private final String SELECT_FINAL_PREDICTION_SQL = "SELECT * FROM final_predictions WHERE id = ?";
    private final String SELECT_ALL_FINAL_PREDICTIONS_SQL = "SELECT * FROM final_predictions";
    private final String UPDATE_FINAL_PREDICTION_SQL = "UPDATE final_predictions SET user_id = ?, winning_team_id = ?, runner_up_team_id = ? WHERE id = ?";
    private final String DELETE_FINAL_PREDICTION_SQL = "DELETE FROM final_predictions WHERE id = ?";

    public void save(FinalPrediction finalPrediction) {
        jdbcTemplate.update(INSERT_FINAL_PREDICTION_SQL,
                finalPrediction.getUserId(),
                finalPrediction.getWinningTeamId(),
                finalPrediction.getRunnerUpTeamId());
    }

    public FinalPrediction findById(int id) {
        return jdbcTemplate.queryForObject(SELECT_FINAL_PREDICTION_SQL, new FinalPredictionRowMapper(), id);
    }

    public List<FinalPrediction> findAll() {
        return jdbcTemplate.query(SELECT_ALL_FINAL_PREDICTIONS_SQL, new FinalPredictionRowMapper());
    }

    public void update(FinalPrediction finalPrediction) {
        jdbcTemplate.update(UPDATE_FINAL_PREDICTION_SQL,
                finalPrediction.getUserId(),
                finalPrediction.getWinningTeamId(),
                finalPrediction.getRunnerUpTeamId(),
                finalPrediction.getId());
    }

    public void delete(int id) {
        jdbcTemplate.update(DELETE_FINAL_PREDICTION_SQL, id);
    }

    private static final class FinalPredictionRowMapper implements RowMapper<FinalPrediction> {
        @Override
        public FinalPrediction mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
            FinalPrediction finalPrediction = new FinalPrediction();
            finalPrediction.setId(rs.getInt("id"));
            finalPrediction.setUserId(rs.getInt("user_id"));
            finalPrediction.setWinningTeamId(rs.getInt("winning_team_id"));
            finalPrediction.setRunnerUpTeamId(rs.getInt("runner_up_team_id"));
            return finalPrediction;
        }
    }
}
