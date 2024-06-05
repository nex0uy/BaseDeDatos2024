package com.obligatorio.pencaUCU.Controllers;

import com.obligatorio.pencaUCU.BusinessLogic.PredictionLogic;
import com.obligatorio.pencaUCU.Dtos.PredictionDTO;
import com.obligatorio.pencaUCU.Models.Prediction;
import com.obligatorio.pencaUCU.Security.AuthorizationChecker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/predictions")
public class PredictionController {

    @Autowired
    private PredictionLogic predictionLogic;

    @Autowired
    private AuthorizationChecker authorizationChecker;

    @PostMapping
    public ResponseEntity<String> createPrediction(@RequestBody PredictionDTO predictionDTO) {
        try {
            Prediction prediction = new Prediction(
                    predictionDTO.getUserId(),
                    predictionDTO.getMatchId(),
                    predictionDTO.getTeamOneScore(),
                    predictionDTO.getTeamTwoScore());
            predictionLogic.savePrediction(prediction);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PredictionDTO> getPredictionById(@PathVariable int id) {
        Prediction prediction = predictionLogic.getPredictionById(id);
        if (!authorizationChecker.checkUserAccess(prediction.getUserId())) {
            throw new AccessDeniedException("Acceso Denegado");
        }
        PredictionDTO predictionDTO = new PredictionDTO(prediction);
        return ResponseEntity.ok(predictionDTO);
    }

    @GetMapping
    public ResponseEntity<List<PredictionDTO>> getAllPredictions() {
        List<Prediction> predictions = predictionLogic.getAllPredictions();
        List<PredictionDTO> predictionDTOs = predictions.stream().map(PredictionDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(predictionDTOs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updatePrediction(@PathVariable int id, @RequestBody PredictionDTO predictionDTO) {
        try {
            Prediction prediction = new Prediction(
                    predictionDTO.getUserId(),
                    predictionDTO.getMatchId(),
                    predictionDTO.getTeamOneScore(),
                    predictionDTO.getTeamTwoScore());
            prediction.setId(id);
            if (!authorizationChecker.checkUserAccess(prediction.getUserId())) {
                throw new AccessDeniedException("Acceso Denegado");
            }
            predictionLogic.updatePrediction(prediction);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrediction(@PathVariable int id) {
        Prediction prediction = predictionLogic.getPredictionById(id);
        if (!authorizationChecker.checkUserAccess(prediction.getUserId())) {
            throw new AccessDeniedException("Acceso Denegado");
        }
        predictionLogic.deletePrediction(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PredictionDTO>> getPredictionsByUserId(@PathVariable int userId) {
        List<Prediction> predictions = predictionLogic.getPredictionsByUserId(userId);
        List<PredictionDTO> predictionDTOs = predictions.stream().map(PredictionDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(predictionDTOs);
    }
}
