package com.obligatorio.pencaUCU.BusinessLogic;

import com.obligatorio.pencaUCU.DataAccess.MatchDataAccess;
import com.obligatorio.pencaUCU.DataAccess.PredictionDataAccess;
import com.obligatorio.pencaUCU.Models.Match;
import com.obligatorio.pencaUCU.Models.Prediction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchLogic {

    @Autowired
    private MatchDataAccess matchDataAccess;

    @Autowired
    private PredictionDataAccess predictionDataAccess;

    public void saveMatch(Match match) {
        matchDataAccess.save(match);
    }

    public Match getMatchById(int id) {
        return matchDataAccess.findById(id);
    }

    public List<Match> getAllMatches() {
        return matchDataAccess.findAll();
    }

    public void updateMatch(Match match) {
        matchDataAccess.update(match);
        calculatePredictionPoints(match);
    }

    public void deleteMatch(int id) {
        matchDataAccess.delete(id);
    }

    private void calculatePredictionPoints(Match match) {
        List<Prediction> predictions = predictionDataAccess.findByMatchId(match.getId());
        for (Prediction prediction : predictions) {
            int points = 0;
            if (prediction.getTeamOneScore() == match.getTeamOneScore() && prediction.getTeamTwoScore() == match.getTeamTwoScore()) {
                points = 4; // Resultado exacto
            } else if ((prediction.getTeamOneScore() > prediction.getTeamTwoScore() && match.getTeamOneScore() > match.getTeamTwoScore()) ||
                       (prediction.getTeamOneScore() < prediction.getTeamTwoScore() && match.getTeamOneScore() < match.getTeamTwoScore()) ||
                       (prediction.getTeamOneScore() == prediction.getTeamTwoScore() && match.getTeamOneScore() == match.getTeamTwoScore())) {
                points = 2; // Resultado correcto
            }
            prediction.setPoints(points);
            predictionDataAccess.updatePoints(prediction.getId(), points);
        }
    }
}
