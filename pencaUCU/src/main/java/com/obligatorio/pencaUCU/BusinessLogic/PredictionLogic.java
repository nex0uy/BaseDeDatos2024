package com.obligatorio.pencaUCU.BusinessLogic;

import com.obligatorio.pencaUCU.DataAccess.MatchDataAccess;
import com.obligatorio.pencaUCU.DataAccess.PredictionDataAccess;
import com.obligatorio.pencaUCU.Models.Match;
import com.obligatorio.pencaUCU.Models.Prediction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.time.LocalDateTime;


@Service
public class PredictionLogic {

    @Autowired
    private PredictionDataAccess predictionDataAccess;

    @Autowired
    private MatchDataAccess matchDataAccess;


    public void savePrediction(Prediction prediction) {
        Match match = matchDataAccess.findById(prediction.getMatchId());
        LocalDateTime matchDateTime = match.getDate().toLocalDateTime();
        if (LocalDateTime.now().isAfter(matchDateTime.minusHours(1))) {
            throw new IllegalArgumentException("Las predicciones solo pueden realizarse una hora antes del partido!");
        }
        predictionDataAccess.save(prediction);
    }

    public Prediction getPredictionById(int id) {
        return predictionDataAccess.findById(id);
    }

    public List<Prediction> getAllPredictions() {
        return predictionDataAccess.findAll();
    }

    public void updatePrediction(Prediction prediction) {
        Match match = matchDataAccess.findById(prediction.getMatchId());
        LocalDateTime matchDateTime = match.getDate().toLocalDateTime();
        if (LocalDateTime.now().isAfter(matchDateTime.minusHours(1))) {
            throw new IllegalArgumentException("Las predicciones solo pueden modificarse una hora antes del aprtido!");
        }
        predictionDataAccess.update(prediction);
    }

    public void deletePrediction(int id) {
        predictionDataAccess.delete(id);
    }
}
