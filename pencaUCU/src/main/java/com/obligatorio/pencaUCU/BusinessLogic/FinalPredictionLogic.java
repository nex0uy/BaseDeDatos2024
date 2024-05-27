package com.obligatorio.pencaUCU.BusinessLogic;

import com.obligatorio.pencaUCU.DataAccess.FinalPredictionDataAccess;
import com.obligatorio.pencaUCU.Models.FinalPrediction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FinalPredictionLogic {

    @Autowired
    private FinalPredictionDataAccess finalPredictionDataAccess;

    public void saveFinalPrediction(FinalPrediction finalPrediction) {
        if (finalPredictionDataAccess.existsByUserId(finalPrediction.getUserId())) {
            throw new IllegalArgumentException("El usuario ya agrego una prediccion final!");
        }
        finalPredictionDataAccess.save(finalPrediction);
    }

    public FinalPrediction getFinalPredictionById(int id) {
        return finalPredictionDataAccess.findById(id);
    }

    public List<FinalPrediction> getAllFinalPredictions() {
        return finalPredictionDataAccess.findAll();
    }

    public void calculateFinalPredictionPoints(int championTeamId, int runnerUpTeamId) {
        List<FinalPrediction> finalPredictions = finalPredictionDataAccess.findAll();
        for (FinalPrediction finalPrediction : finalPredictions) {
            int points = 0;
            if (finalPrediction.getWinningTeamId() == championTeamId) {
                points += 10; // Campeon
            }
            if (finalPrediction.getRunnerUpTeamId() == runnerUpTeamId) {
                points += 5; // Sub-Campeon
            }
            finalPredictionDataAccess.updatePoints(finalPrediction.getId(), points);
        }
    }
}
