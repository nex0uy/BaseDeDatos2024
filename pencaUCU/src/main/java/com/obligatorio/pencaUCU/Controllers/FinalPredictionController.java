package com.obligatorio.pencaUCU.Controllers;

import com.obligatorio.pencaUCU.BusinessLogic.FinalPredictionLogic;
import com.obligatorio.pencaUCU.Dtos.FinalPredictionDTO;
import com.obligatorio.pencaUCU.Models.FinalPrediction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/final_predictions")
public class FinalPredictionController {

    @Autowired
    private FinalPredictionLogic finalPredictionLogic;

    @PostMapping
    public ResponseEntity<String> createFinalPrediction(@RequestBody FinalPredictionDTO finalPredictionDTO) {
        try {
            FinalPrediction finalPrediction = new FinalPrediction(
                    finalPredictionDTO.getUserId(),
                    finalPredictionDTO.getWinningTeamId(),
                    finalPredictionDTO.getRunnerUpTeamId());
            finalPredictionLogic.saveFinalPrediction(finalPrediction);
            return ResponseEntity.ok("Prediccion final creada con exito!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<FinalPredictionDTO> getFinalPredictionById(@PathVariable int id) {
        FinalPrediction finalPrediction = finalPredictionLogic.getFinalPredictionById(id);
        FinalPredictionDTO finalPredictionDTO = new FinalPredictionDTO(finalPrediction);
        return ResponseEntity.ok(finalPredictionDTO);
    }

    @GetMapping
    public ResponseEntity<List<FinalPredictionDTO>> getAllFinalPredictions() {
        List<FinalPrediction> finalPredictions = finalPredictionLogic.getAllFinalPredictions();
        List<FinalPredictionDTO> finalPredictionDTOs = finalPredictions.stream().map(FinalPredictionDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(finalPredictionDTOs);
    }
}
