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
        finalPredictionDataAccess.save(finalPrediction);
    }

    public FinalPrediction getFinalPredictionById(int id) {
        return finalPredictionDataAccess.findById(id);
    }

    public List<FinalPrediction> getAllFinalPredictions() {
        return finalPredictionDataAccess.findAll();
    }

    public void updateFinalPrediction(FinalPrediction finalPrediction) {
        finalPredictionDataAccess.update(finalPrediction);
    }

    public void deleteFinalPrediction(int id) {
        finalPredictionDataAccess.delete(id);
    }
}
